import { Page } from "puppeteer";

export default async function getElementByText(
	page: Page,
	text: string,
	callBack = (e: any) => {
		e.click();
	},
	timeout = 30000
) {
	const element = await page.waitForXPath(`//span[text()='${text}']`, {
		timeout: timeout,
	});
	callBack(element);
	return element;
}
