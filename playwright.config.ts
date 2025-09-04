import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './pruebas',
  timeout: 60000,
reporter: 'html',
outputDir: 'test-results',
use: {
headless: false,
screenshot: 'on',
video: 'on',
ignoreHTTPSErrors: true,
},
projects: [
{
name: 'chrome',
use: {
browserName: 'chromium',
channel: 'chrome',
userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
viewport: { width: 1320, height: 700 },
locale: 'es-ES',
extraHTTPHeaders: {
'accept-language': 'es-ES,es;q=0.9',
},
video: 'on'
},
},
],
});