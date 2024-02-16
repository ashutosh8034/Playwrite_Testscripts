const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    await page.goto('https://mui.com/material-ui/react-toggle-button/#exclusive-selection');

    const buttonAriaLabels = ['left aligned', 'centered', 'right aligned'];

    for (const ariaLabel of buttonAriaLabels) {
      // Click the button and wait for the action to be processed
      await page.click(`[aria-label="${ariaLabel}"]`);
      await page.waitForTimeout(500);


      const isSelected = await page.evaluate(({ ariaLabel }) => {
        const button = Array.from(document.querySelectorAll('button')).find(b => b.ariaLabel === ariaLabel);
        return button && button.getAttribute('aria-pressed') === 'true';
      }, { ariaLabel });

      console.log(`Button "${ariaLabel}" selected: ${isSelected}`);

      // Ensure no other buttons are selected
      for (const otherLabel of buttonAriaLabels.filter(l => l !== ariaLabel)) {
        const isOtherSelected = await page.evaluate(({ otherLabel }) => {
          const button = Array.from(document.querySelectorAll('button')).find(b => b.ariaLabel === otherLabel);
          return button && button.getAttribute('aria-pressed') === 'true';
        }, { otherLabel });

        console.log(`Button "${otherLabel}" should not be selected: ${!isOtherSelected}`);
      }
    }
  } catch (error) {
    console.error('Error occurred:', error);
  } finally {
    await page.waitForTimeout(3000);
    await browser.close();
  }
})();
