const writer = require("./convertor");
const pagePool = require("./pagePool");

async function scraper(page, url) {
  // Goto buff page
  console.log(`Navigating to \t \t ${url.slice(71)}`);

  try {
    await page.goto(url);
    await page.reload({ waitUntil: ["domcontentloaded"] });
    await page.waitForSelector("#j_list_card");
  } catch (error) {
    console.log("Couldnt load page");
    pagePool.addToPool(page);
    return;
  }
  // Wait for the required DOM to be rendered

  let items = await page.$$eval("ul.card_dota2 > li", (items) => {
    // Extract the data from page
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

  console.log(`Data Saved for \t \t ${url.slice(71)}`);
  writer(items, true);

  // Add page to pool
  pagePool.addToPool(page);
}

module.exports = (page, url) => scraper(page, url);
