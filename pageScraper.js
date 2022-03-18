async function scraper(browser, url) {
  // Goto buff page
  let page = await browser.newPage();
  console.log(`Navigating to ${url}...`);
  await page.goto(url);
  // await page.setViewport({
  //   width: 1500,
  //   height: 700,
  //   devicePixelRatio: 1.25,
  // });

  // Wait for the required DOM to be rendered
  await page.waitForSelector("#j_list_card");

  let items = await page.$$eval("ul.card_dota2 > li", (items) => {
    // Extract the links from the data
    return items.map((item) => {
      const obj = new Object();
      obj.name = item.querySelector("h3 > a").innerHTML;
      obj.price = item.querySelector("p > strong").innerText;
      return JSON.stringify(obj);
    });
  });

  nextPageLink = await page.$eval(
    "#j_market_card > .pager > ul > li:last-child a",
    (el) => el.href
  );

  console.log(items);
  console.log(items.length + " items on this page");

  page.close();
}

module.exports = (browser, url) => scraper(browser, url);
