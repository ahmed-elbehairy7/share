import { Protocol } from "puppeteer";
import { cookiesError, urlError } from "./exceptions";
import launch from "./launch";

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event: any) => {
	let response;
	try {
		// const body: validEvent = JSON.parse(event.body);
		const body = event.body;
		await launch(body.cookies, body.url, 2122);
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
