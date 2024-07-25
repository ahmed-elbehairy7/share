import { Page } from "puppeteer-core";
import getElementByText from "./getElementByText";
import CheckPosted from "./checkPosted";
import clickShareButton from "./clickShareButton";
import getGroupsList from "./getGroupList";

export default async function _share(page: Page, index = 0) {
	//CLick the share button
	await getElementByText(page, "Share");

	//Get Groups list
	const listIndex = await clickShareButton(page);

	let groupsList = await getGroupsList(page, listIndex);

	// Get the group from the group list and click on it
	const group = groupsList[index];
	try {
		group.scrollIntoView();
	} catch (err) {
		if (err instanceof TypeError) {
			return;
		}
		console.error(err);
		throw err;
	}
	group.click();

	// Share to the group
	await getElementByText(page, "Post");

	// Check if shared successfully
	await CheckPosted(page, index);

	await _share(page, index + 1);
}
