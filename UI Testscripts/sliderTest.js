const { chromium } = require('playwright');

(async () => {

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Navigate to the page with sliders
    await page.goto('https://mui.com/material-ui/react-slider/#continuous-sliders');

    // Wait for the Volume slider to be available
    await page.waitForSelector('[aria-label="Volume"]');

    // Evaluate and set the value of the Volume slider
    /*await page.evaluate(() => {
      const volumeSlider = document.querySelector('[aria-label="Volume"]');
      volumeSlider.value = 50;
      volumeSlider.dispatchEvent(new Event('input', { bubbles: true }));
    });*/

    await page.waitForTimeout(1000);

    // Get the value of the Volume slider
    const volumeSliderValue = await page.$eval('[aria-label="Volume"]', slider => slider.getAttribute('aria-valuenow'));

    console.log('Volume slider value:', volumeSliderValue);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close the browser
    await browser.close();
  }
})();
