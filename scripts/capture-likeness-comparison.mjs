import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

async function run(passNum = 1) {
  const screenshotsDir = path.resolve('screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const browser = await chromium.launch();

  try {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1.5,
    });

    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
    // Let R3F canvas and initial 3D animations stabilize
    await page.waitForTimeout(1600);

    // Capture the avatar hero screenshot
    const avatarCanvas = page.locator('canvas').first();
    const avatarBox = await avatarCanvas.boundingBox();

    // Create an HTML page in the browser context that puts face-source.jpg and the hero avatar side by side
    const comparisonPage = await browser.newPage({
      viewport: { width: 1200, height: 680 },
      deviceScaleFactor: 1,
    });

    const photoBase64 = fs.readFileSync(path.resolve('public/face-source.jpg')).toString('base64');
    const avatarBuffer = await page.screenshot({
      clip: avatarBox ? {
        x: Math.max(0, avatarBox.x - 20),
        y: Math.max(0, avatarBox.y - 20),
        width: avatarBox.width + 40,
        height: avatarBox.height + 40,
      } : { x: 450, y: 300, width: 540, height: 600 }
    });
    const avatarBase64 = avatarBuffer.toString('base64');

    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          background: #0C0C0C;
          color: #D7E2EA;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          padding: 20px;
        }
        .header {
          margin-bottom: 24px;
          text-align: center;
        }
        .header h1 {
          font-size: 22px;
          color: #5EEAD4;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .header p {
          font-size: 13px;
          color: #8AA2FF;
          margin-top: 4px;
          font-family: monospace;
        }
        .grid {
          display: flex;
          gap: 36px;
          align-items: center;
        }
        .card {
          background: #14171E;
          border: 1px solid #232A36;
          border-radius: 16px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.6);
        }
        .card h2 {
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #D7E2EA;
        }
        .card img {
          width: 360px;
          height: 420px;
          object-fit: cover;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.08);
          background: #000;
        }
        .specs {
          font-family: monospace;
          font-size: 11px;
          color: #8AA2FF;
          display: flex;
          gap: 12px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Likeness Calibration — Pass ${passNum}</h1>
        <p>Real Photo Reference vs. Procedural React Three Fiber ToonHead</p>
      </div>
      <div class="grid">
        <div class="card">
          <h2>Photo Reference (Satvik)</h2>
          <img src="data:image/jpeg;base64,${photoBase64}" />
          <div class="specs">
            <span>Thick Brows</span> &bull; <span>Wavy Quiff</span> &bull; <span>Collared Shirt</span>
          </div>
        </div>
        <div class="card">
          <h2>Procedural ToonHead Avatar</h2>
          <img src="data:image/png;base64,${avatarBase64}" />
          <div class="specs">
            <span>Toon Mesh</span> &bull; <span>Orbit Halo</span> &bull; <span>3-Tone Shading</span>
          </div>
        </div>
      </div>
    </body>
    </html>
    `;

    await comparisonPage.setContent(htmlContent);
    await comparisonPage.waitForTimeout(500);
    const outputPath = path.join(screenshotsDir, `avatar-comparison-pass${passNum}.png`);
    await comparisonPage.screenshot({ path: outputPath });

    console.log(`Saved comparison screenshot: ${outputPath}`);
  } catch (err) {
    console.error('Error generating comparison:', err);
  } finally {
    await browser.close();
    process.exit(0);
  }
}

const passArg = process.argv[2] ? parseInt(process.argv[2], 10) : 1;
run(passArg);
