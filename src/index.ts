import share from "./share";

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event: any) => {
	const cookies = event.queryStringParameters.cookies;
	const url = event.queryStringParameters.url;

	return {
		statusCode: 200,
		body: await share(cookies, url),
	};
};
