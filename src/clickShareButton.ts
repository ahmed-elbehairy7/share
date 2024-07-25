import { Page } from "puppeteer-core";
import getElementByText from "./getElementByText";

export default async function clickShareButton(page: Page, listIndex = 0) {
	try {
		// Click the more options button if it exists
		await getElementByText(page, "More options", (e) => e.click(), 1000);

		listIndex = 1;
	} catch (err) {}
	try {
		await getElementByText(
			page,
			"Share to a group",
			(e) => e.click(),
			1000
		);

		return listIndex;
	} catch (err) {
		return await clickShareButton(page, listIndex);
	}
}
