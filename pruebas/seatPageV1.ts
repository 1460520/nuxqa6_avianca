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

export class Seat{

flujo_seat = async (page,idioma,testInfo) => {
        const seat = new Seat();
        await page.waitForTimeout(12000);
        await takeScreenshot("Pagina-de-seleccion-asientos",page,testInfo);
        seat.seleccionar_asientos_ida(page);
        await takeScreenshot("seleccion-asientos ida",page,testInfo);
        seat.confirmar_asientos_ida(page);
        await takeScreenshot("seleccion-asiento-vuelta",page,testInfo);
        seat.seleccionar_asientos_regreso(page);
        await takeScreenshot("asiento-seleccionado-vuelta",page,testInfo);
        seat.ir_a_pagar(page,idioma);
};

seleccionar_asientos_ida = async (page) => {
    await page.waitForTimeout(12000);
    const pasajeros = page.locator(".pax-selector_pax-avatar")
    for (const e of await pasajeros.all()) {
        await expect(page.locator(".seat-number").first()).toBeVisible();
        await page.locator('.seat-number').first().click({ delay: getRandomDelay()} );
        await page.waitForTimeout(8000);
    }
};

confirmar_asientos_ida = async (page) => {
    await page.waitForSelector(".next-flight-code");
    await expect(page.locator(".next-flight-code")).toBeVisible();
    await page.locator('.next-flight-code').click({ delay: getRandomDelay()} );
};

seleccionar_asientos_regreso = async (page) => {
    const pasajerosVuelta = page.locator(".pax-selector_pax-avatar")
    for (const j of await pasajerosVuelta.all()) {
        await expect(page.locator(".seat-number").first()).toBeVisible();
        await page.locator('.seat-number').first().click({ delay: getRandomDelay()} );
        await page.waitForTimeout(8000);
    }
};

ir_a_pagar = async (page,idioma) => {
    await expect(page.getByRole('button', { name: copys[idioma].pagar, exact: true })).toBeVisible()
    await page.getByRole('button', { name: copys[idioma].pagar, exact: true }).click({ delay: getRandomDelay()} );
    await page.waitForTimeout(5000);
};

}

