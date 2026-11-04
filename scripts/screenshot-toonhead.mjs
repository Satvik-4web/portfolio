import { chromium } from 'playwright';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

async function run() {
  const screenshotsDir = path.resolve('screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  console.log('Starting preview server on port 4173...');
  const server = spawn('npx', ['vite', 'preview', '--port', '4173', '--strictPort'], {
    shell: true,
    stdio: 'pipe',
  });

  server.stdout.on('data', (d) => console.log(`[Preview Server] ${d}`));
  server.stderr.on('data', (d) => console.error(`[Preview Server Err] ${d}`));

  await new Promise((r) => setTimeout(r, 2500));

  const browser = await chromium.launch();

  try {
    // 1. Desktop 1440x900
    console.log('Capturing Desktop 1440px...');
    const desktopPage = await browser.newPage({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
    });
    await desktopPage.goto('http://localhost:4173', { waitUntil: 'networkidle' });
    // Let R3F canvas and initial animations settle
    await desktopPage.waitForTimeout(2000);
    await desktopPage.screenshot({ path: path.join(screenshotsDir, 'toonhead-hero-1440.png') });

    // 2. Mobile 390x844
    console.log('Capturing Mobile 390px...');
    const mobilePage = await browser.newPage({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
    });
    await mobilePage.goto('http://localhost:4173', { waitUntil: 'networkidle' });
    await mobilePage.waitForTimeout(2000);
    await mobilePage.screenshot({ path: path.join(screenshotsDir, 'toonhead-hero-390.png') });

    // 3. Tablet 768x1024
    console.log('Capturing Tablet 768px...');
    const tabletPage = await browser.newPage({
      viewport: { width: 768, height: 1024 },
      deviceScaleFactor: 1,
    });
    await tabletPage.goto('http://localhost:4173', { waitUntil: 'networkidle' });
    await tabletPage.waitForTimeout(1500);
    await tabletPage.screenshot({ path: path.join(screenshotsDir, 'toonhead-hero-768.png') });

    console.log('Screenshots captured successfully!');
  } catch (err) {
    console.error('Error during screenshot capture:', err);
  } finally {
    await browser.close();
    server.kill();
    process.exit(0);
  }
}

run();
