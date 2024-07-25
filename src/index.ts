import { Protocol } from "puppeteer";
import share from "./share";

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
	} catch (err) {
		if (err instanceof urlError || err instanceof cookiesError) {
			response = { statusCode: 400, error: err.message };
		}
		response = { statusCode: 500, error: err };
	}
	return response;
};

type validEvent = {
	url: string;
	cookies: Array<Protocol.Network.Cookie>;
};
