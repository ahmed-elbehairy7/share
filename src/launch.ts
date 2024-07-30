import { computeExecutablePath, launch as l } from "@puppeteer/browsers";
import puppeteer, { Protocol } from "puppeteer";
import share from "./share";

export default async function (
	cookies: Array<Protocol.Network.Cookie>,
	url: string,
	debuggingPort: number
) {
	const proc = l({
		executablePath: computeExecutablePath({
			browser: "chrome" as any,
			buildId: "115.0.5790.102",
			cacheDir: ".",
		}),
		// detached: true,
		dumpio: true,
		args: puppeteer.defaultArgs({
			headless: false,
			args: [
				"--no-sandbox",
				"--disabled-setupid-sandbox",
				"--remote-debugging-port=" + debuggingPort,
			],
		}),
	});

	proc.nodeProcess.stderr?.on("data", async (e) => {
		const text: string = e.toString().trim();
		if ((text.match(/DevTools listening on .+/)?.length as number) > 0) {
			await share(
				cookies,
				url,
				text.replace("DevTools listening on ", "")
			);
		}
	});
}
