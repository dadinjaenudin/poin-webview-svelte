const playwright = require('playwright');

(async () => {
  const browser = await playwright.chromium.launch();
  const page = await browser.newPage();
  
  // Listen to console
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  
  // Navigate to app
  await page.goto('http://localhost:5174');
  await page.waitForTimeout(2000);
  
  // Find and click Scan Member button
  console.log('Looking for Scan Member button...');
  
  // Try to find button by text
  const buttons = await page.$$('button');
  console.log(`Found ${buttons.length} buttons`);
  
  for (let i = 0; i < buttons.length; i++) {
    const text = await buttons[i].textContent();
    console.log(`Button ${i}: ${text}`);
    
    if (text.includes('Scan') && text.includes('Member')) {
      console.log('Found Scan Member button! Clicking...');
      await buttons[i].click();
      await page.waitForTimeout(2000);
      console.log('Clicked!');
      break;
    }
  }
  
  await browser.close();
})();
