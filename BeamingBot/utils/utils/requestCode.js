const { chromium } = require('playwright');

module.exports = (async (email) => {
    try {
        const browser = await chromium.launch({
            headless: false,
            args: ['--disable-background-timer-throttling', '--disable-renderer-backgrounding'],
            ignoreHTTPSErrors: true,
            slowMo: 0,
        });
        const context = await browser.newContext();
        const page = await context.newPage();

        await page.goto('https://www.microsoft.com/account', { timeout: 20000 });
        page.setViewportSize({ width: 1920, height: 1080 });

        // Wait for element to be visible
        await page.waitForSelector('#id__4', { visible: true });
        await page.click('#id__4');

        await page.fill('input[name="loginfmt"]', email);
        await page.click('input[type="submit"]');

        // Wait for element to exist on the page
        await page.waitForSelector('#idA_PWD_SwitchToCredPicker', { visible: true });
        if (!(await page.$('#idA_PWD_SwitchToCredPicker'))) {
            await page.click('text="Email code"');
        } else {
            await page.click('#idA_PWD_SwitchToCredPicker');
        }
        await page.click(`text="Email ${email}"`);
        await browser.close();
    } catch (error) {
        throw error;
    }
});
