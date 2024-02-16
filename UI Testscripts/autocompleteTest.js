const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    await page.goto('https://mui.com/material-ui/react-autocomplete/#combo-box');

    // This will click on the combo box to focus and type a query "The Godfather"
    await page.click('#combo-box-demo');
    await page.type('#combo-box-demo', 'The Godfather');

    await page.waitForSelector('ul[role="listbox"] > li', { state: 'visible' });

    await page.click('ul[role="listbox"] >> text=The Godfather');

    const selectedValue = await page.inputValue('#combo-box-demo');
    console.log(`Selected value: ${selectedValue}`);
  } catch (error) {
    console.error('Error occurred:', error);
  } finally {
    await browser.close();
  }
})();
