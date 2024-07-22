#!/home/elbehairy/.nvm/versions/node/v18.17.0/bin/node
const pup = require("puppeteer");
const argparse = require("argparse");
const fs = require("fs");
const { Puppeteer } = require("puppeteer");
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

const parser = new argparse.ArgumentParser({
	description: "The application for sharing posts on groups",
	exit_on_error: true,
});

parser.add_argument("cookies_path", { help: "The path for the cookies" });
parser.add_argument("post_id", {
	help: "The id for the post to share on groups",
});
parser.add_argument("-p", "--profile_route", {
	help: "The route for the profile",
});
parser.add_argument("-s", "--slow-mo", {
	help: "How much slow motion",
	default: 150,
	type: "int",
});
parser.add_argument("-v", "--verbose", {
	help: "Verbose mode",
	action: "store_true",
});
parser.add_argument("--headless", {
	help: "Headless mode",
	action: "store_true",
});
parser.add_argument("--window-size", {
	help: "the size of the window (default: 800,800)",
	default: "800,800",
});

args = parser.parse_args();

if (args.verbose) {
	function verprint(string) {
		console.log(`${string}...`);
	}
	verprint("Verbose mode is on");
} else {
	function verprint(string) {}
}

async function main() {
	const browser = await pup.launch({
		executablePath: "/usr/bin/chromium-browser",
		slowMo: args.slow_mo,
		args: [`--window-size=${args.window_size}`],
		headless: args.headless,
	});
	const [page] = await browser.pages();

	const cookiesJson = fs.readFileSync(args.cookies_path, "utf-8");
	const cookies = JSON.parse(cookiesJson);

	// Setting the cookies in the current page
	await page.setCookie(...cookies);

	if (args.profile_route) {
		await profileSwitch(page);
	}

	await page.goto(`http://www.facebook.com/${args.post_id}`);
	await sharePost(page);

	await browser.close();

	async function sharePost(page, num = 999) {
		//Click the share button
		await page
			.waitForXPath("//span[text()='Share']")
			.then((el) => el.click());
		verprint("Pressed the share button");

		// Click the more options button if it exists
		try {
			await page
				.waitForXPath("//span[text()='More options']")
				.then((el) => el.click());
			verprint("Pressed the more options button");
		} catch (error) {
			verprint("No More options button found");
		}

		//Click the "share to a group" button
		await page
			.waitForXPath("//span[text()='Share to a group']")
			.then((el) => el.click());
		verprint("Pressed the share to a group button");

		//Initialize a variable oldLength with value zero
		let oldLength = 0;

		while (true) {
			//Scroll to the last element, and return the length of the list
			let newLength = await page
				.$$("div[role='listitem']")
				.then((els) => {
					els[els.length - 1].scrollIntoView();
					return els.length;
				});
			verprint(`newLength: ${newLength}`);

			if (newLength > num) {
				verprint(`Got the ${num}th group available`);

				await page.$$("div[role='listitem']").then((els) => {
					els[num].scrollIntoView();
					els[num].click();
				});
				verprint(`Successfully clicked the ${num}th group`);

				await page
					.waitForXPath("//span[text()='Post']")
					.then((el) => el.click());

				if (num > 0) {
					await page.waitForXPath(
						"//span[text()='Shared to your group.']"
					);
					verprint("Going forward to the next group");
					return await sharePost(page, num - 1);
				}
				return;
			}

			//Wait a little until it loads
			// await sleep(10000)

			if (num !== 999) {
				continue;
			}

			if (newLength == oldLength) {
				verprint("Both lengths are equal");
				await page
					.$("div[aria-label='Close']")
					.then((el) => el.click());
				verprint("Closed the share to a group window");
				verprint("Going forward to the first share");
				return await sharePost(page, newLength);
			} else {
				verprint("newLength is greater than oldLength");
				oldLength = newLength;
			}
		}
	}
}

async function profileSwitch(page) {
	await page.goto(`https://facebook.com/${args.profile_route}`);

	await page.waitForFunction(() => {
		var aTags = document.getElementsByTagName("span");
		var searchText = "switch";
		var found;

		for (var i = 0; i < aTags.length; i++) {
			if (aTags[i].textContent.toLowerCase() == searchText) {
				found = aTags[i];
				break;
			}
		}

		found.click();

		var aTags = document.getElementsByTagName("span");

		for (var i = aTags.length - 1; i >= 0; i--) {
			if (aTags[i].textContent.toLowerCase() == searchText) {
				found = aTags[i];
				break;
			}
		}

		found.click();
		return true;
	});

	fs.writeFileSync(
		args.cookies_path,
		JSON.stringify(await page.cookies(), null, 2)
	);

	verprint("Cookies saved with profile switch!");
}

main();
