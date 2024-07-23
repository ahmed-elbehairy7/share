import { launch, Protocol } from "puppeteer";
import _share from "./_share";

export default async function main(
	cookies: Array<Protocol.Network.Cookie>,
	url: string
) {
	try {
		await share(cookies, url);
		return { status: "done successfully" };
	} catch (error) {
		if (error instanceof urlError || error instanceof cookiesError) {
			return { error: error.message };
		}
		return {
			error: "An unkown error occured while sharing your post, please consider trying again",
		};
	}
}

async function share(cookies: Array<Protocol.Network.Cookie>, url: string) {
	// Luanch browser
	const browser = await launch({
		// executablePath: "/usr/bin/chromium-browser",
		slowMo: 100,
		args: [`--window-size=1200,800`],
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
