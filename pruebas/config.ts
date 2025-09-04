import { test, expect, webkit, chromium } from '@playwright/test';

export class Config{

get_page = async () => {
    const { chromium } = require("playwright-extra");

    const browser = await chromium.launch({
        headless: false,
        args: ['--disable-blink-features=AutomationControlled',
               '--enable-webgl',
               '--use-gl=swiftshader',
               '--enable-accelerated-2d-canvas'
        ]
    });
    const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        viewport: { width: 1280, height: 720 },
        locale: 'en-US',
        timezoneId: 'America/New_York',
        deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    return page;
};

inicializar_script = async (page) => {
    await page.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', {
    get: () => false,
    });
    });

};

}