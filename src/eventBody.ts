import { Protocol } from "puppeteer";

export type eventBody = {
	url: string;
	cookies: Array<Protocol.Network.Cookie>;
};
