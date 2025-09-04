import { test, expect, webkit, chromium } from '@playwright/test';
import { cerrarPopupError } from './utilities';
import { Config } from './config';
import { Home } from './homePage';
import { Booking } from './bookingPage';
import { Seat } from './seatPage';
import { Passenger } from './passengerPage';
import { Services } from './servicesPage';
import { Payment } from './paymentPage';

 
type Lang = 'es' | 'en' | 'pt' | 'fr';
 
type copysType = {
url:string,
idioma: Lang,
pais: string,
fecha_salida: string,
fecha_llegada: string,
ciudad_origen: string,
ciudad_destino: string,
getLang: () => Lang
}
 
const copys: copysType = {
url:'https://www.avianca.com/',
idioma: 'es' as Lang,
pais: 'CO',
fecha_salida: 'jun 15',
fecha_llegada: 'jun 18',
ciudad_origen: 'CLO',
ciudad_destino: 'BOG',
getLang: () => copys.idioma
};
test('prueba home avianca', async ({  }, testInfo) => {
test.setTimeout(300_000);

const idioma = copys.getLang();
 
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
await page.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', {
    get: () => false,
    });
});
await page.goto(copys['url']+ idioma + '/', {
        waitUntil: "domcontentloaded",
    });
    await page.waitForSelector("#searchComponentDiv");
    let home = new Home();
    home.flujo_home(page,idioma,copys['ciudad_origen'],copys['ciudad_destino'],copys['fecha_salida'],copys['fecha_llegada'],copys['url'],testInfo);
//const intervalId = cerrarPopupError(page);
// const booking = new Booking();
// booking.flujo_booking(page,testInfo);
// const passenger = new Passenger();
// passenger.flujo_passenger(page,testInfo);
// const services=new Services();
// services.flujo_servicios(page,testInfo);
// const seat = new Seat();
// seat.flujo_seat(page,idioma,testInfo);
// await clearInterval(intervalId); 
// const payment=new Payment();
// payment.flujo_payment(page);
});
