import { Page } from "puppeteer";
import getElementByText from "./getElementByText";
import CheckPosted from "./checkPosted";
import clickShareButton from "./clickShareButton";
import getGroupsList from "./getGroupList";

export default async function _share(page: Page, index = 0) {
	//CLick the share button
	await getElementByText(page, "Share");
	console.log("preseed the share button");

	//Get Groups list
	const listIndex = await clickShareButton(page, 0);

	let groupsList = await getGroupsList(page, listIndex as number);

	// Get the group from the group list and click on it
	const group = groupsList[index];
	group.scrollIntoView();
	group.click();

	// Share to the group
	await getElementByText(page, "Post");

	// Check if shared successfully
	await CheckPosted(page, index);
	share(index + 1);
}
