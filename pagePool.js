var pool = [];

async function addPool(page) {
  pool.push(page);
}
async function getPool() {
  if (pool.length != 0) {
    let page = pool.pop();
    // console.log(pool);
    return page;
  } else {
    console.log("All tabs are busy");
    return null;
  }
}
module.exports = {
  addToPool: function (page) {
    addPool(page);
  },
  getFromPool: function () {
    return getPool();
  },
};
