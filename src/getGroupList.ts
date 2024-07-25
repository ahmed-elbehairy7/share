import { Page } from "puppeteer-core";

export default async function getGroupsList(page: Page, listIndex: number) {
	while (true) {
		try {
			// Get groups list
			const listElement = (await page.$$("div[role='list']"))[listIndex];
			const groupsList = await listElement.$$("div[role='listitem']");
			if (groupsList.length < 0) {
				throw new Error("user don't have any groups");
			}
			return groupsList;
		} catch (err) {
			continue;
		}
	}
}
