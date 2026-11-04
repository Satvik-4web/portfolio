import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

async function capture() {
  const targetDir = path.resolve('public/projects/nextime');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  console.log('Launching headless browser to capture NexTime...');
  const browser = await chromium.launch();

  try {
    // 1. Desktop: 1440x900 -> a.webp
    console.log('Capturing Desktop 1440x900 to a.webp...');
    const desktopContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
    });
    const desktopPage = await desktopContext.newPage();
    await desktopPage.goto('https://nextime-omega.vercel.app/', { waitUntil: 'networkidle', timeout: 30000 });
    await desktopPage.screenshot({ path: path.join(targetDir, 'a.webp'), type: 'png' });
    console.log('Saved public/projects/nextime/a.webp');

    // 2. Mobile: 390x844 -> b.webp
    console.log('Capturing Mobile 390x844 to b.webp...');
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto('https://nextime-omega.vercel.app/', { waitUntil: 'networkidle', timeout: 30000 });
    await mobilePage.screenshot({ path: path.join(targetDir, 'b.webp'), type: 'png' });
    console.log('Saved public/projects/nextime/b.webp');

  } catch (err) {
    console.error('Error during screenshot capture:', err);
  } finally {
    await browser.close();
  }
}

capture();
