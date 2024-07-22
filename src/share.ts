import { launch, Protocol } from "puppeteer";
import _share from "./_share";

export default async function share(
	cookies: Array<Protocol.Network.Cookie>,
	url: string
) {
	// Luanch browser
	const browser = await launch({
		// executablePath: "/usr/bin/chromium-browser",
		slowMo: 100,
		args: [`--window-size=900,900`],
		headless: false,
	});
	const [page] = await browser.pages();

	// Set cookies
	await page.setCookie(...cookies);

	//Go to facebook page and start the game
	await page.goto(url);
	await _share(page);

	await browser.close();
}
