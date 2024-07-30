import puppeteer, { Protocol } from "puppeteer";
import _share from "./_share";
import { cookiesError, urlError } from "./exceptions";
import { eventBody } from "./eventBody";

export default async function share(eventBody: eventBody, wsUrl: string) {
	// Luanch browser
	const browser = await puppeteer.connect({
		slowMo: 100,
		browserWSEndpoint: wsUrl,
	});

	const [page] = await browser.pages();

	// Set cookies
	try {
		await page.setCookie(...eventBody.cookies);
	} catch (error) {
		throw new cookiesError(
			"An error occured while setting your cookies, please consider checking them"
		);
	}

	//Go to facebook page and start the game
	try {
		await page.goto(eventBody.url);
	} catch (error) {
		throw new urlError("invalid url!");
	}
	await _share(page);

	await browser.close();
}
