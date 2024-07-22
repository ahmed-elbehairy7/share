import { Page } from "puppeteer";
import getElementByText from "./getElementByText";

export default async function clickShareButton(page: Page, listIndex: number) {
	try {
		// Click the more options button if it exists
		await getElementByText(page, "More options", (e) => e.click(), 1000);
		console.log("pressed More options button");
		return 1;
	} catch (err) {}
	try {
		await getElementByText(page, "Share to a group", (e) => e.click());
		console.log("Pressed share to a group button");
		return 0;
	} catch (err) {
		return await clickShareButton(page, listIndex);
	}
}
