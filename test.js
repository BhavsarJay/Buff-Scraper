const controller = require("./pagePool");

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function add(n) {
  //   await delay(1000 * 10);
  controller.addToPool(n);
  // console.log(`page added: ${n}`);
}

let pageNo = 0;
async function start() {
  for (i in Array.from(Array(5).keys())) {
    add(i);
  }

  await delay(1000 * 2);
  controller.getFromPool().then((result) => {
    console.log(result);
  });
}
start();
