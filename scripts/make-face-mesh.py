"""
Extracts 3D Face Mesh landmarks and triangulation indices from Satvik's photo
using MediaPipe FaceLandmarker, outputting public/face-mesh.json.
"""

import json
import os
import sys
import mediapipe as mp
from mediapipe.tasks import python
from mediapipe.tasks.python import vision
from scipy.spatial import Delaunay
import numpy as np

def generate_face_mesh():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    model_path = os.path.join(base_dir, "scripts", "face_landmarker.task")
    
    if not os.path.exists(model_path):
        print(f"Error: model not found at {model_path}", file=sys.stderr)
        return False

    # Prefer face-source.jpg or portrait.png
    input_path = os.path.join(base_dir, "public", "face-source.jpg")
    if not os.path.exists(input_path):
        input_path = os.path.join(base_dir, "public", "portrait.png")

    if not os.path.exists(input_path):
        print(f"Error: image not found at {input_path}", file=sys.stderr)
        return False

    print(f"Processing face image: {input_path}")
    base_options = python.BaseOptions(model_asset_path=model_path)
    options = vision.FaceLandmarkerOptions(
        base_options=base_options,
        output_face_blendshapes=False,
        output_facial_transformation_matrixes=False,
        num_faces=1
    )
    detector = vision.FaceLandmarker.create_from_options(options)

    image = mp.Image.create_from_file(input_path)
    detection_result = detector.detect(image)

    if not detection_result.face_landmarks:
        print("Error: No face detected in image", file=sys.stderr)
        return False

    raw_landmarks = detection_result.face_landmarks[0]
    landmarks = [[round(lm.x, 5), round(lm.y, 5), round(lm.z, 5)] for lm in raw_landmarks]
    print(f"Extracted {len(landmarks)} landmarks")

    # Canonical MediaPipe tesselation edges
    tess_connections = list(vision.FaceLandmarksConnections.FACE_LANDMARKS_TESSELATION)
    edges = [[conn.start, conn.end] for conn in tess_connections]
    # Flattened indices for Three.js LineSegments BufferGeometry
    line_indices = []
    for conn in tess_connections:
        line_indices.append(conn.start)
        line_indices.append(conn.end)

    # 2D Delaunay triangulation for mesh surface/shading if needed
    pts2d = np.array([[lm[0], lm[1]] for lm in landmarks[:468]])
    tri = Delaunay(pts2d)
    triangles = tri.simplices.flatten().tolist()

    key_landmarks = {
        "noseTip": 1,
        "noseBridge": 6,
        "forehead": 10,
        "chin": 152,
        "leftEye": 33,
        "rightEye": 263,
        "leftEyePupil": 468 if len(landmarks) > 468 else 33,
        "rightEyePupil": 473 if len(landmarks) > 473 else 263,
        "leftJaw": 234,
        "rightJaw": 454,
        "mouthLeft": 61,
        "mouthRight": 291,
        "upperLip": 0,
        "lowerLip": 17
    }

    out_data = {
        "count": len(landmarks),
        "landmarks": landmarks,
        "edges": edges,
        "indices": line_indices,
        "triangles": triangles,
        "keyLandmarks": key_landmarks
    }

    output_path = os.path.join(base_dir, "public", "face-mesh.json")
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(out_data, f, separators=(',', ':'))

    print(f"Successfully wrote {output_path} ({len(landmarks)} landmarks, {len(edges)} edges)")
    return True

if __name__ == "__main__":
    generate_face_mesh()
