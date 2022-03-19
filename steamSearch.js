// const market = require("steam-market-search").market;
// async function getPrice(names) {
//   // let prices = [];
//   // console.log(names);
//   for (let index = 0; index < names.length; index++) {
//     const name = names[index];
//     // let price;
//     let searchObj = {
//       query: name,
//       //   count: 5,
//       //   sort_column: "price",
//       //   sort_dir: "asc",
//     };

//     await market.search(570, searchObj).then((results) => {
//       results.forEach((element) => {
//         if (element.asset_description.market_hash_name === name) {
//           // prices.push(element.sale_price_text);
//           console.log(element.sale_price_text);
//         }
//       });
//     });
//     // console.log(price);
//   }
//   // console.log(prices);
// }

// async function sequence() {
//   let promise = new Promise((res, rej) => {
//     setTimeout(() => res("Now it's done!"), 1000);
//   });

//   let result = await promise;
//   console.log(result);
// }
// // console.log(sequence());

// getPrice([
//   "Crown of Tears",
//   "Mandate of the Stormborn",
//   "Pyrexaec Flux",
//   "Inscribed Atomic Ray Thrusters",
//   "Offhand Basher of Mage Skulls",
// ]);

// module.exports = (item_name) => getPrice(item_name);
