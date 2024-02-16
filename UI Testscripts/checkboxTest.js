const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch(); 
  const page = await browser.newPage();

  try {
    console.log('Navigating to the MUI Checkbox component page...');
    await page.goto('https://mui.com/material-ui/react-checkbox/#basic-checkboxes');

    // Wait for the checkboxes to be visible on the page
    await page.waitForSelector('[aria-label="Checkbox demo"]');

    const checkboxes = await page.$$('[aria-label="Checkbox demo"]');

    console.log(`Total found checkboxes: ${checkboxes.length}.`);

    for (const [index, checkbox] of checkboxes.entries()) {
      const isDisabled = await checkbox.isDisabled();
      const isChecked = await checkbox.isChecked();

      console.log(`Checkbox ${index + 1}: Checked = ${isChecked}, Disabled = ${isDisabled}`);

      // Only interact with checkboxes that are enabled and not already checked
      if (!isDisabled && !isChecked) {
        await checkbox.click();
        // Verify and log the new state after clicking
        const newState = await checkbox.isChecked();
        console.log(`Checkbox ${index + 1} after click: New State = ${newState}`);
      }
    }
  } catch (error) {
    console.error('Error occurred:', error);
  } finally {
    await browser.close();
  }
})();
