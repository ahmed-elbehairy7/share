import { Page } from "puppeteer";
import getElementByText from "./getElementByText";

export default async function CheckPosted(page: Page, index: number) {
	while (true) {
		try {
			await getElementByText(
				page,
				"Shared to your group.",
				(e) => e,
				1000
			);
		} catch (err) {}

		console.log("Post shared successfully to group with index " + index);
	}
}
