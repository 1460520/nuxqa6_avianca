import { test, expect, webkit, chromium } from '@playwright/test';
import { getRandomDelay, takeScreenshot } from './utilities';

export class Services{

flujo_servicios = async (page,testInfo) => {
        const services=new Services();
        services.iniciar_servicios(page);
        await takeScreenshot("Pagina-de-servicios",page,testInfo);
        services.seleccionar_business_lounge(page);
        await takeScreenshot("Servicio avianca-lounges",page,testInfo);
        services.seleccionar_special_assistance(page);
        await takeScreenshot("Servicio asistencia especial",page,testInfo);
};

iniciar_servicios = async (page) => {
    await page.waitForTimeout(2000);
    await page.waitForSelector(".button.page_button.btn-action");
    await expect(page.locator(".button.page_button.btn-action").last()).toBeVisible();
    await page.locator(".button.page_button.btn-action").last().click({ delay: getRandomDelay()} );
};

seleccionar_business_lounge = async (page) => {
    await page.waitForSelector(".main-banner--section-offer");
    await page.waitForTimeout(8000);
    await expect(page.locator("#serviceButtonTypeBusinessLounge")).toBeVisible();
    await page.waitForSelector("#serviceButtonTypeBusinessLounge");
    await page.locator('#serviceButtonTypeBusinessLounge').click({ delay: getRandomDelay()} );
    await page.waitForSelector(".service_item_button.button");
    await page.locator('.service_item_button.button').first().click({ delay: getRandomDelay()} );
    await page.locator('.button.amount-summary_button.amount-summary_button-action.is-action.ng-star-inserted').last().click({ delay: getRandomDelay()} );
};

seleccionar_special_assistance = async (page) => {
    await expect(page.locator('#serviceButtonTypeSpecialAssistance')).toBeVisible();
    await page.waitForSelector("#serviceButtonTypeSpecialAssistance");
    await page.locator('#serviceButtonTypeSpecialAssistance').click({ delay: getRandomDelay()} );
    await page.waitForSelector(".service_item_button.button");
    await page.locator('.service_item_button.button').first().click({ delay: getRandomDelay()} );
    await page.locator('.button.amount-summary_button.amount-summary_button-action.is-action.ng-star-inserted').last().click({ delay: getRandomDelay()} );
};

confirmar_servicios  = async (page) => {
    await expect(page.locator('.services-card_action_button.button').last()).toBeVisible();
    await page.waitForSelector(".services-card_action_button.button");
    await page.locator('.services-card_action_button.button').last().click({ delay: getRandomDelay()} );
    await page.waitForSelector(".button.amount-summary_button.amount-summary_button-action.is-action.ng-star-inserted.FB-newConfirmButton");
    await page.locator('.button.amount-summary_button.amount-summary_button-action.is-action.ng-star-inserted.FB-newConfirmButton').click({ delay: getRandomDelay()} );
    await expect(page.locator(".button_label").last()).toBeVisible();
    await page.locator('.button_label').last().click({ delay: getRandomDelay()} );
    
    const upsellService = await page.locator('.terciary-button').last().isVisible()
    if (upsellService) {
    await page.locator('.terciary-button').last().click({ delay: getRandomDelay()} )
    }
};

}




