const share = require("./index").handler;

async function main() {
	await share(e);
}

const multi =
	"https://www.facebook.com/thegreencity.shop/posts/pfbid0ZmS6VwoDpuh8BK75YHGpM1oEZo4pkBF4FComtZ4KBRPUyi5Jz3Aunv6WPQU6nBGMl";

const video = "https://fb.watch/tuhjIZjC-C/";

const e = {
	body: JSON.stringify({
		url: multi,
		cookies: [
			{
				name: "usida",
				value: "eyJ2ZXIiOjEsImlkIjoiQXM4am01OGp6bjhuMCIsInRpbWUiOjE3MDc0MDU0NTN9",
				domain: ".facebook.com",
				path: "/",
				expires: -1,
				size: 69,
				httpOnly: false,
				secure: true,
				session: true,
				sameSite: "None",
				sameParty: false,
				sourceScheme: "Secure",
				sourcePort: 443,
			},
			{
				name: "fr",
				value: "0Lh7aEebLMDc8ntE5.AWXGLLpShikE_o_vzk_rEbxJhJ4.Blu_40.L3.AAA.0.0.Blu_6T.AWXI1Y2t7N0",
				domain: ".facebook.com",
				path: "/",
				expires: 1714595218.563214,
				size: 84,
				httpOnly: true,
				secure: true,
				session: false,
				sameSite: "None",
				sameParty: false,
				sourceScheme: "Secure",
				sourcePort: 443,
			},
			{
				name: "ps_l",
				value: "0",
				domain: ".facebook.com",
				path: "/",
				expires: 1741379186.563988,
				size: 5,
				httpOnly: true,
				secure: true,
				session: false,
				sameSite: "Lax",
				sameParty: false,
				sourceScheme: "Secure",
				sourcePort: 443,
			},
			{
				name: "xs",
				value: "34%3Atj-Rdsj_ytcr6A%3A2%3A1706819216%3A-1%3A6546",
				domain: ".facebook.com",
				path: "/",
				expires: 1738355218.264674,
				size: 50,
				httpOnly: true,
				secure: true,
				session: false,
				sameSite: "None",
				sameParty: false,
				sourceScheme: "Secure",
				sourcePort: 443,
			},
			{
				name: "ps_n",
				value: "0",
				domain: ".facebook.com",
				path: "/",
				expires: 1741379186.56378,
				size: 5,
				httpOnly: true,
				secure: true,
				session: false,
				sameSite: "None",
				sameParty: false,
				sourceScheme: "Secure",
				sourcePort: 443,
			},
			{
				name: "c_user",
				value: "100087224834920",
				domain: ".facebook.com",
				path: "/",
				expires: 1738355218.264624,
				size: 21,
				httpOnly: false,
				secure: true,
				session: false,
				sameSite: "None",
				sameParty: false,
				sourceScheme: "Secure",
				sourcePort: 443,
			},
			{
				name: "locale",
				value: "en_GB",
				domain: ".facebook.com",
				path: "/",
				expires: 1707423972.919999,
				size: 11,
				httpOnly: false,
				secure: true,
				session: false,
				sameSite: "None",
				sameParty: false,
				sourceScheme: "Secure",
				sourcePort: 443,
			},
			{
				name: "wd",
				value: "800x600",
				domain: ".facebook.com",
				path: "/",
				expires: 1708010253,
				size: 9,
				httpOnly: false,
				secure: true,
				session: false,
				sameSite: "Lax",
				sameParty: false,
				sourceScheme: "Secure",
				sourcePort: 443,
			},
			{
				name: "dpr",
				value: "1",
				domain: ".facebook.com",
				path: "/",
				expires: 1708009826,
				size: 4,
				httpOnly: false,
				secure: true,
				session: false,
				sameSite: "None",
				sameParty: false,
				sourceScheme: "Secure",
				sourcePort: 443,
			},
			{
				name: "datr",
				value: "NP67ZbzyzmQ3JjhWmIHNGYls",
				domain: ".facebook.com",
				path: "/",
				expires: 1741379124.76583,
				size: 28,
				httpOnly: true,
				secure: true,
				session: false,
				sameSite: "None",
				sameParty: false,
				sourceScheme: "Secure",
				sourcePort: 443,
			},
			{
				name: "sb",
				value: "NP67ZecZ0mpLt99KO7d-uvt_",
				domain: ".facebook.com",
				path: "/",
				expires: 1741379218.264539,
				size: 26,
				httpOnly: true,
				secure: true,
				session: false,
				sameSite: "None",
				sameParty: false,
				sourceScheme: "Secure",
				sourcePort: 443,
			},
			{
				name: "i_user",
				value: "100087027953542",
				domain: ".facebook.com",
				path: "/",
				expires: 1738941025.163455,
				size: 21,
				httpOnly: false,
				secure: true,
				session: false,
				sameSite: "None",
				sameParty: false,
				sourceScheme: "Secure",
				sourcePort: 443,
			},
		],
	}),
};

main();
