const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    // Navigate to the Autocomplete component page
    await page.goto('https://mui.com/material-ui/react-autocomplete/#combo-box');

    // Click on the combo box to focus and type a query
    await page.click('#combo-box-demo');
    await page.type('#combo-box-demo', 'The Godfather');

    // Wait for the suggestions panel to appear and become visible
    await page.waitForSelector('ul[role="listbox"] > li', { state: 'visible' });

    // Select a specific option from the suggestions
    await page.click('ul[role="listbox"] >> text=The Godfather');

    // Verify the selected value in the combo box
    const selectedValue = await page.inputValue('#combo-box-demo');
    console.log(`Selected value: ${selectedValue}`);
  } catch (error) {
    console.error('Error occurred:', error);
  } finally {
    await browser.close();
  }
})();
