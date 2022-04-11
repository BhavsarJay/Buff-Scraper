// Import csv-writer
const csvwriter = require("csv-writer");
var fs = require("fs");

async function writeToCSV(jsonArr, append) {
  var createCsvWriter = csvwriter.createObjectCsvWriter;
  // Passing the column names intp the module

  const csvWriter = createCsvWriter({
    // Output csv file name is geek_data
    path: "./data/buff_data.csv",
    header: [
      // Title of the columns (column_names)
      { id: "name", title: "NAME" },
      { id: "price", title: "PRICE" },
      { id: "buff_listings", title: "LISTINGS" },
    ],
    append: append,
  });

  // Writerecords function to add records
  csvWriter.writeRecords(jsonArr);
  // .then(() => console.log("Data uploaded into csv successfully"));
}

module.exports = (arr, append) => writeToCSV(arr, append);
