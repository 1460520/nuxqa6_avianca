import { test, expect, webkit, chromium } from '@playwright/test';
import { getRandomDelay, takeScreenshot } from './utilities';
 
type Lang = 'es' | 'en' | 'pt' | 'fr';
 
type copysType = {
idioma: Lang,
pais: string,
fecha_salida: string,
fecha_llegada: string,
ciudad_origen: string,
ciudad_destino: string,
es: {
origen: string,
destino: string,
buscar: string,
vuelta: string,
pagar: string
},
en: {
origen: string,
destino: string,
buscar: string,
vuelta: string,
pagar: string
},
pt: {
origen: string,
destino: string,
buscar: string,
vuelta: string,
pagar: string
},
fr: {
origen: string,
destino: string,
buscar: string,
vuelta: string,
pagar: string
},
getLang: () => Lang
}
 
const copys: copysType = {
idioma: 'es' as Lang,
pais: 'CO',
fecha_salida: 'jun 10',
fecha_llegada: 'jun 15',
ciudad_origen: 'CLO',
ciudad_destino: 'BOG',
es: {
origen: 'Origen',
destino: 'Hacia',
buscar: 'Buscar',
vuelta: 'Vuelta',
pagar: 'Ir a pagar',
},
en: {
origen: 'Origin',
destino: 'Destination',
buscar: 'Search',
vuelta: 'Return',
pagar: 'Go to payment',
},
pt: {
origen: 'Origem',
destino: 'Destino',
buscar: 'Buscar voos',
vuelta: 'Regresso',
pagar: 'Vá pagar',
},
fr: {
origen: 'Origen',
destino: 'Destination',
buscar: 'Rechercher',
vuelta: 'Retour',
pagar: ' Continuer',
},
getLang: () => copys.idioma
};

export class Payment{

flujo_payment = async (page) => {
        await page.waitForTimeout(5000);
    // await expect(page.locator('.payment-container_title')).toBeVisible();
    // await takeScreenshot("pagos");
    
    // const noOtraTarjeta = page.locator('.fb-left-container');
    // await expect(noOtraTarjeta).toBeVisible();
    // await noOtraTarjeta.click();
    await page.waitForTimeout(1000);
    // Llenar datos de facturación
    await page.waitForSelector('input#email', { timeout: 15_000 });
    
    // Correo electrónico
    const emailInput = page.locator('input#email');
    await expect(emailInput).toBeVisible();
    await emailInput.fill('monitoreo.digital@avianca.com');
    
    // Dirección de residencia
    const addressInput = page.locator('input#address');
    await expect(addressInput).toBeVisible();
    await addressInput.fill('Calle 123 #45-67');
    
    // Ciudad
    const cityInput = page.locator('input#city');
    await expect(cityInput).toBeVisible();
    await cityInput.fill('Bogotá');
    
    // País
    const countryBtn = page.locator('button#country');
    await expect(countryBtn).toBeVisible();
    await countryBtn.click();
    
    // Esperar a que aparezcan las opciones
    await page.waitForSelector('div.ds-select-dropdown li button', { timeout: 5_000 });
    
    // Seleccionar “Colombia”
    const countryOption = page
    .locator('div.ds-select-dropdown li button')
    .filter({ hasText: 'Colombia' });
    await expect(countryOption).toBeVisible();
    await countryOption.click({ delay: getRandomDelay()} );
    
    await takeScreenshot('19-country-seleccionado',page,testInfo);
    
    // Aceptar Términos
    const termsCheckbox = page.locator('input#terms');
    await expect(termsCheckbox).toBeVisible();
    await termsCheckbox.check();
    await takeScreenshot('20-aceptar-terminos',page,testInfo);
    
    // Captura final de facturación
    await takeScreenshot('21-datos-facturacion',page,testInfo);
    

};

}




