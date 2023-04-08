const { initIndianexpressScraping } = require('./indianExpress');
const { initBBCScraping } = require('./bbcNews');



const initScrping = async() => {
  // await initIndianexpressScraping();
  initBBCScraping()
}


initScrping()