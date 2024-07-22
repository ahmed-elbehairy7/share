#!/home/elbehairy/.nvm/versions/node/v18.17.0/bin/node

const pup = require("puppeteer");
const fs = require("fs");
const argparse = require("argparse");
const http = require("http")
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

const parser = new argparse.ArgumentParser({
    description : "Login application",
    exit_on_error : true
})

parser.add_argument("cookies_path", {help : "The path of the cookies file"})
parser.add_argument("email", {help : "The facebook email for logging"})
parser.add_argument("password", {help : "The facebook password for logging"})
parser.add_argument("--headless", {help : "Headless?", action : "store_true"})

const args = parser.parse_args()


async function main() {
    console.log("Logging in...")


    const browser = await pup.launch({headless : args.headless, executablePath : "/usr/bin/chromium-browser"});
    const page = await browser.newPage();


    if (await logined(page)){
        await sleep(1000)
        console.log("Already logged in!")
    }
    else {
        await login(page)
    }

    await browser.close();
    return

}


async function logined(page) {

    await page.goto("http://facebook.com/");

    const title = await page.evaluate(()=> document.title)
    console.log(title)
    if (title == "فيسبوك - تسجيل الدخول أو الاشتراك" || title =="Facebook – log in or sign up") {
        return false
    }
    return true

    
}

async function login(page) {

    if (await page.evaluate(()=> document.URL) != "http://facebook.com/") {
        await page.goto("http://facebook.com/");
    } 

    await page.type('#email', args.email);
    await page.type('#pass', args.password);
    await page.click('[type=submit]');
    await page.waitForNavigation();
    await page.waitForTimeout(10000);
    

    fs.writeFileSync(args.cookies_path,
        JSON.stringify((await page.cookies()), null, 2))

    console.log("Cookies saved!")
        
    }

    



module.exports.sleep = sleep

main();
