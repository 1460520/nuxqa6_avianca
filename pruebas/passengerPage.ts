import { test, expect, webkit, chromium } from '@playwright/test';
import { getRandomDelay, takeScreenshot } from './utilities';

export class Passenger{
    flujo_passenger = async (page,testInfo) => {
            //await page.waitForSelector(".passenger_data_group");
            await takeScreenshot("inicio-de-llenado-pagina-de-pasajeros",page,testInfo);
            
            await page.evaluate(() => {
                            const userNamesData: Array<string> = [
                                "john doe",
                                "jane smith",
                                "alexander wilson",
                                "maria gomez",
                                "roberto perez",
                                "lucia martinez",
                                "david hernandez",
                                "carla jones",
                                "luis vega",
                                "susan brown"
                            ];

                            const lastNamesData: Array<string> = [
                                "Doe",
                                "Smith",
                                "Wilson",
                                "Gomez",
                                "Perez",
                                "Martinez",
                                "Hernandez",
                                "Jones",
                                "Vega",
                                "Brown"
                            ];

                            const emailsData: Array<string> = [
                                "monitoreo.digital@avianca.com"
                            ];

                            const phoneNumbersData: Array<string> = [
                                "123456",
                                "987654",
                                "654321",
                                "321654",
                                "987123",
                                "456789",
                                "102938",
                                "112233",
                                "778899",
                                "334455"
                            ];

                            const getDataRandom = (data: Array<string> = []): string => {
                                return data[Math.floor(Math.random() * data.length)];
                            }

                            const getValueElement = (element: HTMLInputElement): string => {
                                let value: string | null = null;
                                if (element.name === "email") {
                                    console.log('----ENTRO-----');
                                    value = getDataRandom(emailsData);
                                }
                                else if (element.name === "confirmEmail") {
                                    value = getDataRandom(emailsData);
                                    console.log('----ENTRO-----');
                                }
                                else if (element.name === "phone_phoneNumberId") {
                                    value = getDataRandom(phoneNumbersData);
                                    console.log('----ENTRO-----');
                                }
                                else if (element.id.includes("IdFirstName")) {
                                    value = getDataRandom(userNamesData);
                                    console.log('----ENTRO-----');
                                }
                                else {
                                    value = getDataRandom(lastNamesData);
                                    console.log('----ENTRO-----lastNamesData' +lastNamesData);
                                }
                                return value;
                            }

                            const getButtonAndClickItem = () => {
                                const listOptions = document.querySelector(".ui-dropdown_list");
                                const buttonElement = listOptions?.querySelector(".ui-dropdown_item>button") as HTMLButtonElement;
                                buttonElement.click();
                            }

                            const setValuesDefaultAutoForm = async () => {
                                const elements = document.querySelectorAll('.ui-input');
                                Array.from(elements).forEach((element) => {
                                    if (element.tagName === "BUTTON") {
                                        
                                        const elementButton = element as HTMLButtonElement;
                                        elementButton.click();
                                        const listOptions = document.querySelector(".ui-dropdown_list");
                                        (listOptions?.querySelector(".ui-dropdown_item>button") as HTMLButtonElement)?.click();
                                        console.log('****element.id****' + element.id);
                                        if (element.id === "passengerId") {
                                                elementButton.click();
                                            setTimeout(() => {
                                                console.log('++++++++++Entro++++++++');
                                                getButtonAndClickItem();
                                            }, 1000);
                                        }
                                        else if (element.id === 'phone_prefixPhoneId') {
                                            setTimeout(() => {
                                                console.log('++++++++++Entro++++++++');
                                                elementButton.click();
                                                getButtonAndClickItem();
                                            }, 1000);
                                        }
                                        else {
                                            const checkAccept = document.querySelector('#acceptNewCheckbox') as HTMLButtonElement;
                                            checkAccept.click();
                                            elementButton.click();
                                            getButtonAndClickItem();
                                        }
                                    }
                                    else if (element.tagName === "INPUT") {
                                        const elementInput = element as HTMLInputElement;
                                        const containers = document.querySelectorAll(".ui-input-container");
                                        Array.from(containers).forEach(e => { e.classList.add("is-focused") });
                                        let eventBlur: Event = new Event("blur");
                                        let eventFocus: Event = new Event("focus");
                                        elementInput.value = getValueElement(elementInput);
                                        ['change', 'input'].forEach(event => {
                                            let handleEvent = new Event(event, { bubbles: true, cancelable: false });
                                            element.dispatchEvent(handleEvent);
                                        });
                                        element.dispatchEvent(eventFocus);
                                        setTimeout(() => {
                                            element.dispatchEvent(eventBlur);
                                            Array.from(containers).forEach(e => { e.classList.remove("is-focused") });
                                        }, 1000);
                                    }
                                });

                                await expect(page.locator('id=email')).toBeVisible();
                                await (page.locator('id=email')).fill('test@gmail.com');

                                await expect(page.locator('id=confirmEmail')).toBeVisible();
                                await (page.locator('id=confirmEmail')).fill('test@gmail.com');
                                
                                await page.waitForSelector("id=acceptNewCheckbox");
                                await expect(page.locator('id=acceptNewCheckbox')).toBeVisible();
                                await (page.locator('id=acceptNewCheckbox')).click()

                            }
                            setValuesDefaultAutoForm();
                        });

            await takeScreenshot("llenado-de-pasajeros-ok",page,testInfo);
    };
}




