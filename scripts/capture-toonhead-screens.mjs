import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

async function run() {
  const screenshotsDir = path.resolve('screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const browser = await chromium.launch();

  try {
    // 1. Desktop 1440x900 Viewport
    console.log('Capturing Desktop 1440px...');
    const desktopPage = await browser.newPage({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
    });
    await desktopPage.goto('http://localhost:5173', { waitUntil: 'networkidle' });
    // Let R3F canvas and initial 3D animations load
    await desktopPage.waitForTimeout(2500);
    await desktopPage.screenshot({ path: path.join(screenshotsDir, 'toonhead-hero-1440.png') });

    // 2. Mobile 390x844 Viewport
    console.log('Capturing Mobile 390px...');
    const mobilePage = await browser.newPage({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
    });
    await mobilePage.goto('http://localhost:5173', { waitUntil: 'networkidle' });
    await mobilePage.waitForTimeout(2500);
    await mobilePage.screenshot({ path: path.join(screenshotsDir, 'toonhead-hero-390.png') });

    // 3. Tablet 768x1024 Viewport
    console.log('Capturing Tablet 768px...');
    const tabletPage = await browser.newPage({
      viewport: { width: 768, height: 1024 },
      deviceScaleFactor: 1,
    });
    await tabletPage.goto('http://localhost:5173', { waitUntil: 'networkidle' });
    await tabletPage.waitForTimeout(2000);
    await tabletPage.screenshot({ path: path.join(screenshotsDir, 'toonhead-hero-768.png') });

    console.log('All hero screenshots captured successfully!');
  } catch (err) {
    console.error('Error during screenshot capture:', err);
  } finally {
    await browser.close();
    process.exit(0);
  }
}

run();
