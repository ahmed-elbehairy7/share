import { Protocol } from "puppeteer-core";
import share from "./share";
import { cookiesError, urlError } from "./exceptions";

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event: any) => {
	let response;
	try {
		// const body: validEvent = JSON.parse(event.body);
		const body = event.body;
		await share(body.cookies, body.url);
		response = {
			statusCode: 200,
			body: { status: "done successfully" },
		};
	} catch (err: any) {
		let statusCode = 500;
		if (err instanceof urlError || err instanceof cookiesError) {
			statusCode = 400;
		}
		response = { statusCode, error: err.toString() };
	}
	return response;
};

type validEvent = {
	url: string;
	cookies: Array<Protocol.Network.Cookie>;
};
