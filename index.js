const browserObject = require("./browser");
const controller = require("./pageController");

// Start the browser and create a browser instance
let browserInstance = browserObject.startBrowser();

//Pass the browser instance to the page controller
controller.pageController(browserInstance);
