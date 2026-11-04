"""
Generates public/portrait-depth.png from public/portrait.png and public/face-source.jpg.
Creates a high-fidelity 8-bit grayscale depth map for WebGL parallax & displacement:
- White/light (255) = closest to camera (nose tip, front of face)
- Medium (120-180) = neck, hair, shoulders
- Black (0) = transparent background
"""

import os
import json
import numpy as np
from PIL import Image, ImageFilter
from scipy.interpolate import griddata

def generate_depth_map():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    portrait_path = os.path.join(base_dir, "public", "portrait.png")
    mesh_path = os.path.join(base_dir, "public", "face-mesh.json")
    depth_out_path = os.path.join(base_dir, "public", "portrait-depth.png")

    if not os.path.exists(portrait_path):
        print(f"Error: portrait not found at {portrait_path}")
        return False

    portrait = Image.open(portrait_path).convert("RGBA")
    w, h = portrait.size
    alpha = np.array(portrait)[:, :, 3] / 255.0  # 0 to 1

    # Load face mesh landmarks if available
    landmarks = []
    if os.path.exists(mesh_path):
        with open(mesh_path, "r", encoding="utf-8") as f:
            mesh_data = json.load(f)
            landmarks = mesh_data.get("landmarks", [])

    # Base body depth model (torso/head approximation)
    # Head center around (0.50, 0.38)
    yy, xx = np.mgrid[0:h, 0:w]
    norm_x = xx / float(w)
    norm_y = yy / float(h)

    # 3D dome for the head
    head_cx, head_cy = 0.50, 0.40
    head_rad_x, head_rad_y = 0.22, 0.28
    dist_head_sq = ((norm_x - head_cx) / head_rad_x) ** 2 + ((norm_y - head_cy) / head_rad_y) ** 2
    head_depth = np.clip(1.0 - dist_head_sq, 0.0, 1.0) ** 0.5 * 0.75 + 0.25

    # Torso/shoulder depth (slopes forward towards chest, further back than face)
    torso_depth = 0.45 + 0.15 * np.clip((norm_y - 0.55) / 0.45, 0.0, 1.0) - 0.15 * np.abs(norm_x - 0.5)

    # Composite base depth
    base_depth = np.maximum(head_depth * (norm_y < 0.65), torso_depth * (norm_y >= 0.55))
    base_depth = np.clip(base_depth, 0.3, 0.95)

    if landmarks and len(landmarks) >= 468:
        # Use MediaPipe 3D z-depths for high precision facial relief
        pts_x = np.array([lm[0] * w for lm in landmarks])
        pts_y = np.array([lm[1] * h for lm in landmarks])
        pts_z = np.array([lm[2] for lm in landmarks])

        # MediaPipe z: negative is closer to camera, positive is further
        # Invert so higher value = closer to camera
        z_norm = -(pts_z - np.mean(pts_z))
        z_min, z_max = np.min(z_norm), np.max(z_norm)
        if z_max > z_min:
            z_scaled = 0.65 + 0.35 * (z_norm - z_min) / (z_max - z_min)
        else:
            z_scaled = np.full_like(z_norm, 0.85)

        # Interpolate across face region grid
        min_x, max_x = int(np.min(pts_x)), int(np.max(pts_x))
        min_y, max_y = int(np.min(pts_y)), int(np.max(pts_y))
        
        # Expand slightly
        pad = 20
        min_x = max(0, min_x - pad)
        max_x = min(w - 1, max_x + pad)
        min_y = max(0, min_y - pad)
        max_y = min(h - 1, max_y + pad)

        grid_y, grid_x = np.mgrid[min_y:max_y, min_x:max_x]
        face_interp = griddata(
            (pts_y, pts_x),
            z_scaled,
            (grid_y, grid_x),
            method='linear',
            fill_value=np.nan
        )

        # Blend face relief into base depth where valid
        valid_mask = ~np.isnan(face_interp)
        base_depth[min_y:max_y, min_x:max_x][valid_mask] = (
            base_depth[min_y:max_y, min_x:max_x][valid_mask] * 0.3 +
            face_interp[valid_mask] * 0.7
        )

    # Multiply by alpha silhouette
    final_depth = base_depth * alpha

    # Soft feathering at the bottom 15% to guarantee seamless blend
    bottom_fade_start = int(h * 0.85)
    fade_len = h - bottom_fade_start
    if fade_len > 0:
        fade_curve = np.linspace(1.0, 0.0, fade_len)[:, None]
        final_depth[bottom_fade_start:, :] *= fade_curve

    depth_img_data = (np.clip(final_depth, 0.0, 1.0) * 255.0).astype(np.uint8)
    depth_image = Image.fromarray(depth_img_data, mode="L")
    
    # Slight Gaussian filter to ensure butter-smooth displacement in WebGL
    depth_image = depth_image.filter(ImageFilter.GaussianBlur(radius=1.5))
    depth_image.save(depth_out_path, format="PNG")
    print(f"Successfully generated {depth_out_path} ({w}x{h})")
    return True

if __name__ == "__main__":
    generate_depth_map()
