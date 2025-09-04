import { test, expect, webkit, chromium } from '@playwright/test';

let step = 0;
export const takeScreenshot = async (label: string,page,testInfo) => {
    step++;
    const timestamp = getTimestamp();
    const name = `step${step}-${label}-${timestamp}.png`;
    const buffer = await page.screenshot({ path: name });
    await testInfo.attach(`${label} (${timestamp})`, {
    body: buffer,
    contentType: 'image/png',
    });
};
 
export const getTimestamp = () => {
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const dd = pad(now.getDate());
    const mm = pad(now.getMonth() + 1);
    const yyyy = now.getFullYear();
    const hh = pad(now.getHours());
    const mi = pad(now.getMinutes());
    const ss = pad(now.getSeconds());
    return `fecha-${dd}-${mm}-${yyyy}_hora-${hh}-${mi}-${ss}`;
};

export const cerrarPopupError = (page) => {
    const intervalId = setInterval(async () => {
		        //console.log('entro a intervalo playwright');
                if(page){
                    const isVisibleModalError = await page.locator(".action-message_container").isVisible();
                    if (isVisibleModalError) {
                        await page.waitForTimeout(1500); 
                        await page.waitForTimeout(1500);
                        await expect(page.locator(".close")).toBeVisible();
                        await page.locator(".close").click();
                    }
                }
                
     }, 500)
     return intervalId;
};

export const getRandomDelay = () => Math.random() * (200 - 50) + 50;
 

