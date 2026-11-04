import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

async function run() {
  const screenshotsDir = path.resolve('screenshots');
  const artifactDir = 'C:\\Users\\satvi\\.gemini\\antigravity\\brain\\54043555-8799-4494-b17f-cd09700e3cd5';
  
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const browser = await chromium.launch();

  try {
    // 1. Desktop 1440x900
    console.log('Capturing Desktop 1440px...');
    const desktopPage = await browser.newPage({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
    });
    await desktopPage.goto('http://localhost:5173', { waitUntil: 'networkidle' });
    await desktopPage.waitForTimeout(2000);
    // Subtle cursor position to show 3D head angle
    await desktopPage.mouse.move(950, 400);
    await desktopPage.waitForTimeout(600);
    const hero1440Path = path.join(screenshotsDir, 'clean-3d-hero-1440.png');
    await desktopPage.screenshot({ path: hero1440Path });

    // 2. User's exact Split-screen width: 960x900 (as seen in user upload)
    console.log('Capturing Split-Screen 960px...');
    const splitPage = await browser.newPage({
      viewport: { width: 960, height: 900 },
      deviceScaleFactor: 1,
    });
    await splitPage.goto('http://localhost:5173', { waitUntil: 'networkidle' });
    await splitPage.waitForTimeout(2000);
    await splitPage.mouse.move(600, 420);
    await splitPage.waitForTimeout(600);
    const hero960Path = path.join(screenshotsDir, 'clean-3d-hero-960.png');
    await splitPage.screenshot({ path: hero960Path });

    // 3. Mobile 390x844
    console.log('Capturing Mobile 390px...');
    const mobilePage = await browser.newPage({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
    });
    await mobilePage.goto('http://localhost:5173', { waitUntil: 'networkidle' });
    await mobilePage.waitForTimeout(2000);
    const hero390Path = path.join(screenshotsDir, 'clean-3d-hero-390.png');
    await mobilePage.screenshot({ path: hero390Path });

    // Copy to artifact directory
    const filesToCopy = [
      { src: hero1440Path, destName: 'clean-3d-hero-1440.png' },
      { src: hero960Path, destName: 'clean-3d-hero-960.png' },
      { src: hero390Path, destName: 'clean-3d-hero-390.png' },
    ];

    for (const f of filesToCopy) {
      if (fs.existsSync(f.src)) {
        fs.copyFileSync(f.src, path.join(artifactDir, f.destName));
        console.log(`Copied ${f.destName} to artifact directory.`);
      }
    }

    console.log('All screenshots generated successfully!');
  } catch (err) {
    console.error('Error during capture:', err);
  } finally {
    await browser.close();
    process.exit(0);
  }
}

run();
