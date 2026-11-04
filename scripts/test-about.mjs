import { chromium } from 'playwright';

async function test() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  
  // Scroll to about
  await page.locator('#about').scrollIntoViewIfNeeded();
  await page.waitForTimeout(2000);
  
  const info = await page.evaluate(() => {
    const about = document.querySelector('#about');
    const h2 = about?.querySelector('h2');
    const p = about?.querySelector('p');
    const canvas = about?.querySelector('canvas');
    const headingWrap = h2?.parentElement;
    
    return {
      aboutExists: !!about,
      aboutRect: about?.getBoundingClientRect(),
      h2Text: h2?.textContent,
      h2Opacity: h2 ? window.getComputedStyle(h2).opacity : null,
      headingWrapOpacity: headingWrap ? window.getComputedStyle(headingWrap).opacity : null,
      headingWrapTransform: headingWrap ? window.getComputedStyle(headingWrap).transform : null,
      pText: p?.textContent?.substring(0, 30),
      canvasRect: canvas?.getBoundingClientRect(),
      canvasZIndex: canvas ? window.getComputedStyle(canvas).zIndex : null,
      aboutHTML: about?.innerHTML?.substring(0, 500)
    };
  });
  
  console.log('DOM Info:', JSON.stringify(info, null, 2));
  
  await page.screenshot({ path: 'scripts/test-about-current.png' });
  await browser.close();
}

test();
