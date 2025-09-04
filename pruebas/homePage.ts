import { test, expect, webkit, chromium } from '@playwright/test';
import { getRandomDelay, takeScreenshot } from './utilities';
 
type copysType = {
es: {
origen: string,
destino: string,
buscar: string,
},
en: {
origen: string,
destino: string,
buscar: string,
},
pt: {
origen: string,
destino: string,
buscar: string,
},
fr: {
origen: string,
destino: string,
buscar: string,
},
}
 
const copys: copysType = {
es: {
origen: 'Origen',
destino: 'Hacia',
buscar: 'Buscar',
},
en: {
origen: 'Origin',
destino: 'Destination',
buscar: 'Search',
},
pt: {
origen: 'Origem',
destino: 'Destino',
buscar: 'Buscar voos',
},
fr: {
origen: 'Origen',
destino: 'Destination',
buscar: 'Rechercher',
},
};

export class Home{

cancelar_cookies = async (page) => {
    const consentBtn = page.locator('#onetrust-pc-btn-handler', { delay: getRandomDelay() });
    if (await consentBtn.isVisible()) {
        await page.waitForSelector("#onetrust-pc-btn-handler");
    await consentBtn.click();
    await page.locator('.save-preference-btn-handler.onetrust-close-btn-handler').click({ delay: getRandomDelay()} );
    }
};

flujo_home  = async (page,idioma,ciudad_origen,ciudad_destino,fecha_salida,fecha_llegada,url,testInfo) => {
    let home = new Home();
    // home.abrir_url(page,idioma,url);
    await takeScreenshot('01-goto-avianca',page,testInfo);
    home.cancelar_cookies(page);
    //await page.waitForTimeout(2000); 
    home.seleccionar_ciudad_origen(page,idioma,ciudad_origen);
    takeScreenshot('03-ciudad-origen',page,testInfo);
    await page.waitForTimeout(2000);  
    home.seleccionar_ciudad_destino(page,idioma,ciudad_destino);
    await page.waitForTimeout(2000);  
    await takeScreenshot('04-ciudad-destino',page,testInfo);
    await page.waitForTimeout(2000);
    home.seleccionar_fecha_salida(page,fecha_salida);
    await takeScreenshot('05-fecha-ida',page,testInfo);
    await page.waitForTimeout(2000);
    home.seleccionar_fecha_llegada(page,fecha_llegada); 
    await takeScreenshot('06-fecha-vuelta',page,testInfo);
    home.seleccionar_pasajeros(page); 
    await takeScreenshot('07-seleccion-pasajeros',page,testInfo);
    await page.waitForTimeout(2000);
    home.buscar(page,idioma);
    await takeScreenshot('08-buscar',page,testInfo);
};

abrir_url= async (page,idioma,url) => {
    await page.goto(url+ idioma + '/', {
        waitUntil: "domcontentloaded",
    });
    await page.waitForSelector("#searchComponentDiv");
};

seleccionar_ciudad_origen = async (page,idioma,ciudad_origen) => {
    await expect(page.locator('.content-wrap')).toBeVisible();
    await page.waitForSelector("#originBtn");
    await expect(page.locator('#originBtn')).toBeVisible();
    const origen = page.getByPlaceholder(copys[idioma].origen);
    await page.locator('button#originBtn').click({ delay: getRandomDelay()} );
    await origen.fill(ciudad_origen, { delay: getRandomDelay() });
    await origen.press('Enter');
    await (page.locator('id=' + ciudad_origen)).click({ delay: getRandomDelay()} )
};

seleccionar_ciudad_destino = async (page,idioma,ciudad_destino) => {
    await expect(page.getByPlaceholder(copys[idioma].destino)).toBeVisible();
    const destino = page.getByPlaceholder(copys[idioma].destino);
    await destino.click({ delay: getRandomDelay()} );
    await destino.fill(ciudad_destino, { delay: getRandomDelay() });
    await destino.press('Enter');
    await (page.locator('id=' + ciudad_destino)).click({ delay: getRandomDelay()} );
};

seleccionar_fecha_salida = async (page,fecha_salida) => {
    await page.waitForSelector("#departureInputDatePickerId");
    const fechaIda = await page.locator('id=departureInputDatePickerId')
    fechaIda.click({ delay: getRandomDelay()} );
    await page.locator('span').filter({ hasText: fecha_salida }).click({ delay: getRandomDelay()} );
};

seleccionar_fecha_llegada = async (page,fecha_llegada) => {
    await page.locator('span').filter({ hasText: fecha_llegada }).click({ delay: getRandomDelay()} );
};

seleccionar_pasajeros = async (page) => {
    await page.getByRole('button', { name: '' }).nth(1).click();
    await page.getByRole('button', { name: '' }).nth(2).click();
    await page.getByRole('button', { name: '' }).nth(3).click();
    const confirmar = await page.locator('div#paxControlSearchId > div > div:nth-of-type(2) > div > div > button')
    confirmar.click({ delay: getRandomDelay()} );
};

buscar = async (page,idioma) => {
    await expect(page.getByRole('button', { name: copys[idioma].buscar, exact: true })).toBeVisible()
    await page.getByRole('button', { name: copys[idioma].buscar, exact: true }).click({ delay: getRandomDelay()} );
};

}




