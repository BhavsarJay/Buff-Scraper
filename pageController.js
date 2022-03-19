const pageScraper = require("./pageScraper");
const pagePool = require("./pagePool");

async function pageController(browserInstance) {
  let browser;
  let pageNo = 840;
  const url =
    "https://buff.163.com/market/dota2#tab=selling&min_price=0&max_price=10&page_num=";

  try {
    browser = await browserInstance;
  } catch (err) {
    console.log("Could not resolve the browser instance => ", err);
  }

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  // await delay(1000 * 1);
  // log into steam
  await steam_login(browser);

  // Open n pages
  for (let i = 0; i < 10; i++) {
    let page = await browser.newPage();

    // Disable Css and images
    await page.setRequestInterception(true);
    page.on("request", (req) => {
      if (
        req.resourceType() == "stylesheet" ||
        req.resourceType() == "font" ||
        req.resourceType() == "image"
      ) {
        req.abort();
      } else {
        req.continue();
      }
    });

    pagePool.addToPool(page);
  }

  // Start Scraping pages
  while (pageNo <= 1700) {
    var page = null;
    while (page == null) {
      await delay(200);
      pagePool.getFromPool().then((result) => {
        page = result;
      });
      // if(page != null)
    }
    pageScraper(page, url + pageNo);

    pageNo++;
  }
}

async function steam_login(browser) {
  console.log("Logging into steam");
  let page = await browser.newPage();
  try {
    await page.goto(
      "https://steamcommunity.com/openid/login?openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.realm=https%3A%2F%2Fbuff.163.com%2F&openid.sreg.required=nickname%2Cemail%2Cfullname&openid.assoc_handle=None&openid.return_to=https%3A%2F%2Fbuff.163.com%2Faccount%2Flogin%2Fsteam%2Fverification%3Fback_url%3D%252Faccount%252Fsteam_bind%252Ffinish&openid.ns.sreg=http%3A%2F%2Fopenid.net%2Fextensions%2Fsreg%2F1.1&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select"
    );
  } catch (e) {
    await page.close();
  }
  await page.click("#imageLogin");
  await page.waitForTimeout(1000 * 3);
  await page.close();
}

module.exports = {
  pageController: function (browserInstance) {
    pageController(browserInstance);
  },
};
