import { Page } from "puppeteer";
import getElementByText from "./getElementByText";

const timeout = 500;

export default async function CheckPosted(page: Page, index: number) {
	while (true) {
		try {
			await getElementByText(page, "Posting", (e) => e, timeout * 2);
		} catch {
			break;
		}
	}
	for (let i = 0; i < 10; i++) {
		try {
			await getElementByText(
				page,
				"Shared to your group.",
				(e) => e,
				timeout
			);
			break;
		} catch {}
		try {
			await getElementByText(
				page,
				"Thanks for your post! It's been submitted to the group admins for approval.",
				(e) => e,
				timeout
			);
			break;
		} catch {}
	}

	return;
}
