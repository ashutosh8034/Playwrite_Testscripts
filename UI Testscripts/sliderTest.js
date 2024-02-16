const { chromium } = require('playwright');

(async () => {

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto('https://mui.com/material-ui/react-slider/#continuous-sliders');

    await page.waitForSelector('[aria-label="Volume"]');

    await page.waitForTimeout(1000);

    // This line will get the value of the Volume slider
    const volumeSliderValue = await page.$eval('[aria-label="Volume"]', slider => slider.getAttribute('aria-valuenow'));

    console.log('Volume slider value:', volumeSliderValue);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();
