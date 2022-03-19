const fs = require("fs");
const axios = require("axios");
const { count } = require("console");

async function get_data(start, count) {
  url = `https://steamcommunity.com/market/search/render/?search_descriptions=0&sort_column=name&sort_dir=asc&appid=570&norender=1&count=${count}&start=${start}`;
  let items = [];
  console.log("Making Request...");
  await axios
    .get(url)
    .then((res) => {
      // console.log(`statusCode: ${res.status}`);
      let results = res.data.results;
      //   data_filter = {
      //     name: data_filter.name,
      //     lowest_listing: data_filter.sale_price_text,
      //     highest_buyorder: data_filter.sell_price_text,
      //   };
      results.forEach((item) => {
        dota2_item = {};
        dota2_item.name = item.name;
        dota2_item.sell_price = item.sell_price_text;
        dota2_item.sell_listings = item.sell_listings;

        items.push(dota2_item);
      });
    })
    .catch((error) => {
      console.error(
        "***********************Rate Limited**********************"
      );
    });

  return items;
}

function append_to_json(arr) {
  console.log("Saving Data...");
  var data = fs.readFileSync("./data/steam-prices.json");
  var objArray = JSON.parse(data);
  arr.forEach((obj) => {
    objArray.push(obj);
  });
  let new_Data = JSON.stringify(objArray);
  fs.writeFileSync("./data/steam-prices.json", new_Data);
  return true;
}

//Total dota2 items = 34302
// pages = 34300/100 = 343
// 30 requests at a time = 3000 items = 30 pages
async function readJson() {
  var data = fs.readFileSync("./data/steam-prices.json");
  var objArray = JSON.parse(data);
  return objArray.length;
}

// 0 - 100
// 100 - 200
// 200 - 300
// ...
// 2900 - 3000

// 3000 - 3100
// 3200 - 3300
// ...
// 5900 - 6000

async function start() {
  console.log(
    "-------------------------------------Starting-------------------------------------"
  );
  let items_saved = await readJson();
  let pages_saved = (await readJson()) / 100;
  let i = pages_saved;
  while (i < pages_saved + 30) {
    //Fetch Data
    const data = await get_data(i * 100, 100);
    if (data.length === 0) return;
    append_to_json(data);
    // console.log("Data length:" + data.length);
    items_saved += data.length;
    console.log(
      `Page No.: ${i} \t Items saved:${i * 100} - ${
        (i + 1) * 100
      } \t Total Items: ${items_saved}`
    );
    i++;
  }
  return 0;
}

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
async function repeat() {
  let i = 0;
  while (i < 100) {
    await start();
    await delay(1000 * 60);
    i++;
  }
}
repeat();
