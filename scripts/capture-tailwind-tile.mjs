import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173');
  await page.waitForTimeout(1500);

  const tailwindTile = page.locator('text=Tailwind CSS').first().locator('xpath=ancestor::div[contains(@class, "w-[420px]")]');
  await tailwindTile.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await tailwindTile.screenshot({ path: 'screenshots/tailwind-tile-close-up.png' });

  // Also copy to artifact directory
  const artifactDir = 'C:\\Users\\satvi\\.gemini\\antigravity\\brain\\54043555-8799-4494-b17f-cd09700e3cd5';
  fs.copyFileSync('screenshots/tailwind-tile-close-up.png', path.join(artifactDir, 'tailwind-tile-close-up.png'));

  console.log('Captured tailwind tile close-up successfully!');
  await browser.close();
}

run();
