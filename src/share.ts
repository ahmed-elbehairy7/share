import { launch, Protocol } from "puppeteer-core";
import _share from "./_share";
import Chromium from "@sparticuz/chromium";
import { cookiesError, urlError } from "./exceptions";

export default async function share(
	cookies: Array<Protocol.Network.Cookie>,
	url: string
) {
	// Luanch browser
	const browser = await launch({
		// executablePath: "/usr/bin/chromium-browser",
		slowMo: 100,
		args: [
			...Chromium.args,
			"--no-sandbox",
			"--disabled-setupid-sandbox",
			"--window-size=1200,800",
		],
		executablePath: await Chromium.executablePath(),
		ignoreDefaultArgs: ["--disable-extensions"],
		headless: Chromium.headless,
	});
	const [page] = await browser.pages();

	// Set cookies
	try {
		await page.setCookie(...cookies);
	} catch (error) {
		throw new cookiesError(
			"An error occured while setting your cookies, please consider checking them"
		);
	}

	//Go to facebook page and start the game
	try {
		await page.goto(url);
	} catch (error) {
		throw new urlError("invalid url!");
	}
	await _share(page);

	await browser.close();
}
