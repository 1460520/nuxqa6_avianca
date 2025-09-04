import { test, expect, webkit, chromium } from '@playwright/test';
import { getRandomDelay, takeScreenshot } from './utilities';

export class Booking{

flujo_booking = async (page,testInfo) => {
    const booking = new Booking();
    booking.seleccion_vuelo_ida(page);
    takeScreenshot('09-seleccion-vuelo-ida',page,testInfo);
    await page.waitForTimeout(1500);
    booking.confirmar_modal_upsell(page);
    booking.seleccion_vuelo_regreso(page);
    takeScreenshot('13-seleccion-vuelo-regreso',page,testInfo);
    await page.waitForTimeout(1500);
    booking.confirmar_modal_upsell(page);
    takeScreenshot('13-resumen-de-vuelos-seleccionados',page,testInfo);
    booking.confirmar_vuelos(page);
};

seleccion_vuelo_ida = async (page) => {
    await page.waitForSelector('#pageWrap');
    await page.waitForSelector('.journey_price_fare-select_label-text');
    await expect(page.locator(".journey_price_fare-select_label-text").first()).toBeVisible();
    await page.locator('.journey_price_fare-select_label-text').first().click({ delay: getRandomDelay()} );
    await page.waitForSelector(".journey_fares");
    await page.locator('.journey_fares').first().locator('.light-basic.cro-new-basic-button').click({ delay: getRandomDelay()} );
};

confirmar_modal_upsell = async (page) => {
    const isVisibleModal = await page.locator(".cro-button.cro-no-accept-upsell-button").first().isVisible();
    if (isVisibleModal) {
    await expect(page.locator(".cro-button.cro-no-accept-upsell-button")).toBeVisible();
    await page.locator(".cro-button.cro-no-accept-upsell-button").first().click({ delay: getRandomDelay()} );
    }
};

seleccion_vuelo_regreso = async (page) => {
    await page.waitForSelector("#journeysContainerId_1", { timeout: 15000 });
    const containerVuelta = page.locator("#journeysContainerId_1");
    await expect(containerVuelta).toBeVisible();
    await containerVuelta.locator(".journey_price_fare-select_label-text").first().click({ delay: getRandomDelay()} );
    await containerVuelta.locator('.journey_fares').first().locator('.light-basic.cro-new-basic-button').click({ delay: getRandomDelay()} );
};

confirmar_vuelos = async (page) => {
    await page.waitForSelector(".trip-summary");
    const buttonConfirmResumen = page.locator(".button.page_button.btn-action");
    await expect(buttonConfirmResumen).toBeVisible();
    buttonConfirmResumen.scrollIntoViewIfNeeded();
    await buttonConfirmResumen.click({ delay: getRandomDelay()} );
};

}




