import { chromium } from 'playwright';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

async function run() {
  const screenshotsDir = path.resolve('screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  console.log('Starting preview server...');
  const server = spawn('npx', ['vite', 'preview', '--port', '4173', '--strictPort'], {
    shell: true,
    stdio: 'pipe',
  });

  server.stdout.on('data', (d) => console.log(`[Preview Server] ${d}`));
  server.stderr.on('data', (d) => console.error(`[Preview Server Err] ${d}`));

  await new Promise((r) => setTimeout(r, 2000));

  const browser = await chromium.launch();

  // Helper to scroll page smoothly to trigger all whileInView intersections
  async function scrollEntirePage(page) {
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let currentPos = 0;
        const distance = 300;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          currentPos += distance;

          if (currentPos >= scrollHeight + 800) {
            clearInterval(timer);
            // Settle at the bottom
            setTimeout(() => {
              // Now scroll back to top smoothly
              window.scrollTo({ top: 0, behavior: 'instant' });
              setTimeout(resolve, 800);
            }, 600);
          }
        }, 80);
      });
    });
  }

  try {
    // 1. Mobile 390px viewport
    console.log('Capturing Mobile 390px...');
    const mobilePage = await browser.newPage({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
    });
    await mobilePage.goto('http://localhost:4173', { waitUntil: 'networkidle' });
    await mobilePage.waitForTimeout(1000);
    await mobilePage.screenshot({ path: path.join(screenshotsDir, 'portfolio-mobile-hero-390.png') });

    await scrollEntirePage(mobilePage);
    await mobilePage.waitForTimeout(600);
    await mobilePage.screenshot({ path: path.join(screenshotsDir, 'portfolio-mobile-full-390.png'), fullPage: true });

    // 2. Desktop 1440px viewport
    console.log('Capturing Desktop 1440px...');
    const desktopPage = await browser.newPage({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
    });
    await desktopPage.goto('http://localhost:4173', { waitUntil: 'networkidle' });
    await desktopPage.waitForTimeout(1000);
    await desktopPage.screenshot({ path: path.join(screenshotsDir, 'portfolio-desktop-hero-1440.png') });

    await scrollEntirePage(desktopPage);
    await desktopPage.waitForTimeout(600);
    await desktopPage.screenshot({ path: path.join(screenshotsDir, 'portfolio-desktop-full-1440.png'), fullPage: true });

    // Also capture direct section shots of Projects & Footer on desktop
    await desktopPage.evaluate(() => {
      document.querySelector('#projects')?.scrollIntoView({ behavior: 'instant' });
    });
    await desktopPage.waitForTimeout(600);
    await desktopPage.screenshot({ path: path.join(screenshotsDir, 'portfolio-desktop-projects-1440.png') });

    await desktopPage.evaluate(() => {
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'instant' });
    });
    await desktopPage.waitForTimeout(600);
    await desktopPage.screenshot({ path: path.join(screenshotsDir, 'portfolio-desktop-footer-1440.png') });

    console.log('All screenshots captured successfully!');
  } catch (err) {
    console.error('Error during screenshot capture:', err);
  } finally {
    await browser.close();
    server.kill();
    process.exit(0);
  }
}

run();
