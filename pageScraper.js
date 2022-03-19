const writer = require("./convertor");
const pagePool = require("./pagePool");

async function scraper(page, url) {
  // Goto buff page
  console.log(`Navigating to ${url}...`);

  try {
    await page.goto(url);
    await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
  } catch (e) {
    await page.close();
    return;
  }

  // Wait for the required DOM to be rendered
  await page.waitForSelector("#j_list_card");
  // await page.waitForNavigation({
  //   waitUntil: "networkidle0",
  // });

  let items = await page.$$eval("ul.card_dota2 > li", (items) => {
    // Extract the links from the data
    return items.map((item) => {
      const obj = new Object();
      obj.name = item.querySelector("h3 > a").innerHTML;
      obj.price = item.querySelector("p > strong").innerText;
      obj.buff_listings = item.querySelector("p > span").innerText;
      console.log(obj);
      return obj;
      // return JSON.stringify(obj);
    });
  });

  console.log(`Uploading Data for ${url.slice(71)}`);
  writer(items, true);

  // Add page to pool
  pagePool.addToPool(page);
}

module.exports = (page, url) => scraper(page, url);
