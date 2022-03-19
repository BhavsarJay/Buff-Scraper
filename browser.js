const puppeteer = require("puppeteer");

async function startBrowser() {
  let browser;
  const vpnPath = String.raw`C:\Users\HP\AppData\Local\BraveSoftware\Brave-Browser\User Data\Default\Extensions\majdfhpaihoncoakbjgbdhglocklcgno\2.5.0_0`;

  try {
    browser = await puppeteer.launch({
      executablePath:
        "C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe",
      headless: false,
      userDataDir:
        "C:\\Users\\HP\\AppData\\Local\\BraveSoftware\\Brave-Browser\\User Data",
      defaultViewport: null,
      ignoreDefaultArgs: ["--disable-extensions"],
      // args: [`--load-extension=${vpnPath}`],
    });
  } catch (err) {
    console.log("Could not create a browser instance => : ", err);
  }

  return browser;
}

module.exports = {
  startBrowser,
};
