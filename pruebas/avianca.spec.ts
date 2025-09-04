import { test, type Page } from '@playwright/test';
import { AviancaCore } from '../core/avianca.core';
import type { THomePage } from '../pages/home.page';
import type { TBookingPage } from '../pages/booking.page';
import type { TPassengerPage } from "../pages/passenger.page";
import { TServicesPage } from '../pages/services.page';
import { PlaywrightHelper as helper } from "../helpers/avianca.helper";
import { dataTest } from '../data/setDataTest';
import {
  HomePage,
  BookingPage,
  PassengerPage,
  ServicesPage,
  SeatPage,
  PaymentPage,
  type TSeatPage,
  type TPaymentPage
} from "../pages/index";
import { skip } from 'node:test';

test.describe("Test End to End Avianca", () => {

  let page: Page | undefined | any;
  let homePage: THomePage = HomePage;
  let bookingPage: TBookingPage = BookingPage;
  let passengerPage: TPassengerPage = PassengerPage;
  let servicesPage: TServicesPage = ServicesPage;
  let seatPage: TSeatPage = SeatPage;
  let paymentPage: TPaymentPage = PaymentPage;

  test.beforeEach(async ({}, testInfo) => {

    await AviancaCore.initializeBrowser();
    page = AviancaCore.getPage();

    if (page) {
      helper.init(page, testInfo);
      homePage.initPage(page);
      bookingPage.initPage(page);
      passengerPage.initPage(page);
      servicesPage.initPage(page);
      seatPage.initPage(page);
      paymentPage.initPage(page);
    }
  });

  test.afterEach(async () => {
    await AviancaCore.closeBrowser();
    page = undefined;
  });

  for (const data of dataTest) {
    const descripcion = data.descripcion;
    const target = data.target_page;
    const permitidos_home = ['home','booking','passenger','service','seat','payment'];
    const permitidos_booking = ['booking','passenger','service','seat','payment'];
    const permitidos_passenger = ['passenger','service','seat','payment'];
    const permitidos_service = ['service','seat','payment'];
    const permitidos_seat = ['seat','payment'];
    const permitidos_payment = ['payment'];
    test(`Prueba ${descripcion}`, async ({ }) => {
    test.setTimeout(990_000);
    await AviancaCore.initTests();
    if(permitidos_home.includes(target)){
      await homePage.run(data);
      if(permitidos_booking.includes(target)){
        await bookingPage.run(data);
        if(permitidos_passenger.includes(target)){
          await passengerPage.run();
          if(permitidos_service.includes(target)){
            await page.waitForTimeout(2000);
            await servicesPage.run();
            if(permitidos_seat.includes(target)){
              await seatPage.run();
              if(permitidos_payment.includes(target)){
                await paymentPage.run();
              }
            }
          }
        }
      }
    }
    
    
    });
  }
});