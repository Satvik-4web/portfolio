import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

const BRAIN_DIR = 'C:/Users/satvi/.gemini/antigravity/brain/54043555-8799-4494-b17f-cd09700e3cd5';

async function capture() {
  console.log('Launching browser...');
  const browser = await chromium.launch();

  try {
    // -------------------------------------------------------------
    // 1. DESKTOP (1440 x 900)
    // -------------------------------------------------------------
    console.log('Testing Desktop 1440px...');
    const desktopContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
    });
    const desktopPage = await desktopContext.newPage();
    await desktopPage.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

    // Wait for initial load
    await desktopPage.waitForTimeout(1000);

    // Scroll to the point where About section enters viewport (mid-reveal)
    // Let's get the position of #about
    const aboutBox = await desktopPage.locator('#about').boundingBox();
    console.log('About section bounding box on desktop:', aboutBox);

    // Scroll so about is partially into view (e.g., top of #about is ~250px below top of viewport)
    await desktopPage.evaluate((y) => {
      window.scrollTo({ top: y - 280, behavior: 'instant' });
    }, aboutBox.y);
    await desktopPage.waitForTimeout(800);

    // Capture MID-REVEAL Desktop
    const midDesktopPath = path.join(BRAIN_DIR, 'about-1440-mid.png');
    await desktopPage.screenshot({ path: midDesktopPath });
    console.log('Saved:', midDesktopPath);

    // Scroll directly into center of #about and let safety net/animations settle (fully revealed)
    await desktopPage.locator('#about').scrollIntoViewIfNeeded();
    await desktopPage.waitForTimeout(2000);

    const fullDesktopPath = path.join(BRAIN_DIR, 'about-1440-full.png');
    await desktopPage.screenshot({ path: fullDesktopPath });
    console.log('Saved:', fullDesktopPath);

    await desktopContext.close();

    // -------------------------------------------------------------
    // 2. MOBILE (390 x 844)
    // -------------------------------------------------------------
    console.log('Testing Mobile 390px...');
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

    await mobilePage.waitForTimeout(1000);

    const mobileAboutBox = await mobilePage.locator('#about').boundingBox();
    console.log('About section bounding box on mobile:', mobileAboutBox);

    // Scroll so about is partially into view (mid-reveal on mobile)
    await mobilePage.evaluate((y) => {
      window.scrollTo({ top: y - 200, behavior: 'instant' });
    }, mobileAboutBox.y);
    await mobilePage.waitForTimeout(800);

    const midMobilePath = path.join(BRAIN_DIR, 'about-390-mid.png');
    await mobilePage.screenshot({ path: midMobilePath });
    console.log('Saved:', midMobilePath);

    // Scroll directly to about and wait for full reveal
    await mobilePage.locator('#about').scrollIntoViewIfNeeded();
    await mobilePage.waitForTimeout(2000);

    const fullMobilePath = path.join(BRAIN_DIR, 'about-390-full.png');
    await mobilePage.screenshot({ path: fullMobilePath });
    console.log('Saved:', fullMobilePath);

    await mobileContext.close();

  } catch (err) {
    console.error('Error during capture:', err);
  } finally {
    await browser.close();
  }
}

capture();
