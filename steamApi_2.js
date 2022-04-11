const fs = require("fs");
const axios = require("axios");
const { count } = require("console");

async function get_data(market_hash_name) {
  url = `https://steamcommunity.com/market/priceoverview/?appid=570&currency=0&market_hash_name=${market_hash_name}`;
  let item = {};
  let success = false;
  // console.log("Making Request...");
  await axios
    .get(url)
    .then((res) => {
      if (res.data.success === true) {
        item = res.data;
        delete item.success;
        success = true;
      }
    })
    .catch((error) => {
      console.log("*********** Rate Limited ***********");
    });

  return [item, success];
}

function append_to_json(item) {
  // console.log("Saving Data...");
  var data = fs.readFileSync("./data/steam-median-prices.json");
  var objArray = JSON.parse(data);

  objArray.push(item);

  let new_Data = JSON.stringify(objArray);
  fs.writeFileSync("./data/steam-median-prices.json", new_Data);
  return true;
}

function get_last_item_saved(){
  var buffer = fs.readFileSync("./data/item_count.txt");
  data = buffer.toString();
  return parseInt(data);
}

function update_last_item(i){
  fs.writeFile("./data/item_count.txt", i.toString(), function(err) {
    if(err) {
        return console.log(err);
    }
  }); 
}

//Total dota2 items = 34302
// pages = 34300/100 = 343
// 30 requests at a time = 3000 items = 30 pages
async function readJson() {
  var data = fs.readFileSync("./data/buff_data.json");
  var objArray = JSON.parse(data);
  return objArray;
}

function formatName(name) {
  let _name = name.toString();
  _name = _name.trim();
  _name = _name.replace(" ", "%20");
  return _name;
}

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function start() {
  console.log(
    "-------------------------------------Starting-------------------------------------"
  );
  let items_saved = await readJson();
  let i = get_last_item_saved();
  i++;
  // let i = 303;
  while (i < items_saved.length) {
    //Fetch Data
    let item = items_saved[i];
    let data = await get_data(formatName(item.name));
    if (data[1] === false) {
      await delay(1000 * 60);
    } else {
      data[0].name = item.name;
      append_to_json(data[0]);
      update_last_item(i);
      console.log(`Item No.: \t${i}} Remaining: ${items_saved.length - i}`);
      await delay(1000 * 3);
      i = i + 1;
    }
  }
}
start();
