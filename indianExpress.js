// const rp 		= require('request-promise');
// const otcsv 	= require('objects-to-csv');
// const cheerio 	= require('cheerio').default;

// const baseURL 	= 'https://www.yellowpages.com';
// const searchURL = '/search?search_terms=printing&geo_location_terms=New+York%2C+NY';



// const getCompanies = async () => {
// 	console.log('000000000000 ');
//   	const html 			= await rp(baseURL + searchURL);
//   	console.log('111111111111 ', html, '111111111111');
//   	const businessMap 	= cheerio('a.business-name', html).map(async (i, e) => {
// 	    // console.log('222222222222 ');
// 	    const link 			= baseURL + e.attribs.href;
// 	    // console.log('333333333333 ');
// 	    const innerHtml 	= await rp(link);
// 	    // console.log('444444444444 ');
// 	    const emailAddress 	= cheerio('a.email-business', innerHtml).prop('href');
// 	    // console.log('555555555555 ');
// 	    const name 			= e.children[0].data;
// 	    // console.log('666666666666 ');
// 	    const phone 		= cheerio('p.phone', innerHtml).text();

// 	    return {
// 	    	emailAddress,
// 	      	link,
// 	      	name,
// 	      	phone,
// 	    }
// 	}).get();
//   	return Promise.all(businessMap);
// };


// const init = async () => {
// 	let companiesData = await getCompanies();
// 	//console.log('Finallllllllll ', companiesData, ' Finallllllllll');
// }

// init();






// const rp 		= require('request-promise');
// const otcsv 	= require('objects-to-csv');
// const cheerio 	= require('cheerio').default;
// const axios 	= require('axios');

// const getMovies = async () => {
// 	const searchURL = 'https://www.imdb.com/chart/top/';
// 	return axios.get(searchURL)
// 		.then((response) => {
// 			console.log('111111111111111 ', response, '1111111111111111')

// 			let $ = cheerio.load(response.data);
// 			let allMovies = [];
// 			$('.lister-list tr').each(function(e1, indexe){
// 				console.log("222222222222", $(this).text())
// 				console.log("333333333333", $(this).find('td.titleColumn a').text());
// 				console.log("444444444444", $(this).find('td.titleColumn a').attr('href'));
// 				console.log("555555555555", $(this).find('td.imdbRating').text());

// 				const obj = {
// 					movieName: $(this).find('td.titleColumn a').text(),
// 					url: $(this).find('td.titleColumn a').attr('href'),
// 					rating: $(this).find('td.imdbRating').text()
// 				}
// 				allMovies.push(obj);
// 				return false;
// 			})

// 			console.log('6666666666666 ', allMovies, '6666666666666')
// 			return allMovies;
// 		}).catch((error) => {
// 			console.log('999999999999999 ', error, '9999999999999999')
// 		});
// }

// getMovies()




// const getTop100TimeOfIndiaNews = () => {
// 	const searchURL = 'https://timesofindia.indiatimes.com/topic/top-100/news';
// 	return axios.get(searchURL)
// 		.then((response) => {
// 			console.log('111111111111111 ', response, '1111111111111111')

// 			let $ = cheerio.load(response.data);
// 			let topNews = [];
// 			$('.tabs_common div').each(function(e1, indexe){
// 				console.log("222222222222", $(this).text())
// 				console.log("333333333333", $(this).find('div.fHv_i span').text())
// 				// console.log("222222222222", $(this).text())
// 				return false
// 			});

// 		}).catch((error) => {

// 		});
// }



// getTop100TimeOfIndiaNews();



// const axios = require('axios');
// const cheerio = require('cheerio');

// async function scrapeNews() {
//   try {
//     const response = await axios.get('https://indianexpress.com/');
//     console.log('11111111111111 ', response)
//     const $ = cheerio.load(response.data);

//     // Find and extract the news headlines and URLs
//     const newsHeadlines = $('.home-top-story h2.title a, .nation-news h2.title a')
//       .map((i, el) => $(el).text())
//       .get();
//     const newsUrls = $('.home-top-story h2.title a, .nation-news h2.title a')
//       .map((i, el) => $(el).attr('href'))
//       .get();

//     // Log the news headlines and URLs to the console
//     console.log('Latest News Headlines: ', newsHeadlines);
//     newsHeadlines.forEach((headline, i) => {
//       console.log(`${i + 1}. ${headline}`);
//       console.log(`   URL: ${newsUrls[i]}`);
//     });
//   } catch (error) {
//     console.error(error);
//   }
// }

// scrapeNews();



// 			$('.lister-list tr').each(function(e1, indexe){
// 				console.log("222222222222", $(this).text())
// 				console.log("333333333333", $(this).find('td.titleColumn a').text());
// 				console.log("444444444444", $(this).find('td.titleColumn a').attr('href'));
// 				console.log("555555555555", $(this).find('td.imdbRating').text());

// 				const obj = {
// 					movieName: $(this).find('td.titleColumn a').text(),
// 					url: $(this).find('td.titleColumn a').attr('href'),
// 					rating: $(this).find('td.imdbRating').text()
// 				}
// 				allMovies.push(obj);
// 				return false;
// 			})



const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs'); 


const getFirstNewsUrl = async (response) => {
  try {
    const $ = cheerio.load(response.data);

    let newsUrls = [];
	  $('.ie-first-story h2').each( async function(e1, indexe){
      try{
  		  let firstNewsUrl = $(this).find('h2.content_wall a').attr('href');
        newsUrls.push(firstNewsUrl);
      } catch(error) {
        console.log('getFirstNewsUrl error ', error);
      }
	})

  return Promise.resolve(newsUrls);

  } catch (error) {
    console.error(error);
  }
}


const getLeftUrls = (response) => {
  try {
    const $ = cheerio.load(response.data);

    let leftUrls = [];
    $('.other-article h3').each( async function(e1, indexe){
      try{
        let url = $(this).find('h3 a').attr('href');
        leftUrls.push(url);
      } catch(error) {
        console.log('getLeftUrls error ', error);
      }
  })

  return Promise.resolve(leftUrls);

  } catch (error) {
    console.error(error);
  } 
}

const getTopNewsUrls = (response) => {
  try {
    const $ = cheerio.load(response.data);

    let topNewsUrls = [];
    $('.top-news li').each( async function(e1, indexe){
      try{
        let url = $(this).find('h3 a').attr('href');
        topNewsUrls.push(url);
      } catch(error) {
        console.log('getLatestNewsUrls error ', error);
      }
  })

  return Promise.resolve(topNewsUrls);

  } catch (error) {
    console.error(error);
  } 
}

const scrapHeadingBarNews = (response) => {

  const getAllHeadings = () => {
    try {
      const $ = cheerio.load(response.data);

      let headingBars = [];
      $('.mainnav li').each( async function(e1, indexe){
        try{
          let url = $(this).find('li a').attr('href');
          let title = $(this).find('li a').text();
          headingBars.push({title, url});
        } catch(error) {
          console.log('scrapHeadingBarNews error ', error);
        }
      })

      return Promise.resolve(headingBars);

    } catch (error) {
      console.error(error);
    }
  }

  const processSingleHeading = async (heading) => {
    let splitedUrl = heading.url.split(':');
    //adding domain name if missing
    if(['http', 'https'].includes(splitedUrl[0]) === false) {
      heading.url = 'https://indianexpress.com' + heading.url; 
    }

    //Skipping for not required news    
    if(['Home', 'Videos', 'Opinion'].includes(heading.title) === false) {
      let allUrls   = []
      const response= await axios.get(heading.url);
      const $       = cheerio.load(response.data);

      $('.north-east-grid li').each( async function(e1, indexe){
        try{
          let url = $(this).find('li a').attr('href');
          url && allUrls.push({url, title: heading.title });
        } catch(error) {
          console.log('scrapHeadingBarNews error ', error);
        }
      })

      if(allUrls.length === 0) {
        $('.nation h2').each( async function(e1, indexe){
          try{
            let url = $(this).find('h2 a').attr('href');
            url && allUrls.push({url, title: heading.title });
          } catch(error) {
            console.log('scrapHeadingBarNews error ', error);
          }
        })        
      }

      if(allUrls.length === 0) {
        $('.nation div').each( async function(e1, indexe){
          try{
            let url = $(this).find('div.title a').attr('href');
            url && allUrls.push({url, title: heading.title });
          } catch(error) {
            console.log('scrapHeadingBarNews error ', error);
          }
        })        
      }

      if(allUrls.length === 0) {
        $('.top-article li').each( async function(e1, indexe){
          try{
            let url = $(this).find('li a').attr('href');
            url && allUrls.push({url, title: heading.title });
          } catch(error) {
            console.log('scrapHeadingBarNews error ', error);
          }
        })        
      }

      return Promise.resolve(allUrls);

    } else {
      return true;
    }
  }

  const processAllHeadings = async (headings) => {
    let allHeadingUrls = [];
    for(index in headings){
      let urls = await processSingleHeading(headings[index]);
      allHeadingUrls = allHeadingUrls.concat(urls);
    }

    console.log('allHeadingUrls ', allHeadingUrls, 'allHeadingUrls')
    return Promise.resolve(allHeadingUrls);
  } 

  return getAllHeadings()
    .then(processAllHeadings)
    .then((result) => {
      return Promise.resolve(result);
    }).catch((err) => {
      console.log('errorrrrrrrrr ', err);
      return Promise.resolve({});
    })


}

const getHeadingSubHeading = async (urls) => {
  let content = []
  for(index in urls){
    let url       = urls[index]
    const response= await axios.get(url);
    const $       = cheerio.load(response.data);

    content.push({
      heading     : $('.heading-part h1').text(),
      fullDetails : $('.full-details p').text(),
      url
    })
  }

  return Promise.resolve(content);
}


exports.initIndianexpressScraping = async function (req, res, next) {
  let finalUrls     = [];
	let response      = await axios.get('https://indianexpress.com/');
	
  let firstNewsUrls = await getFirstNewsUrl(response);
  finalUrls         = finalUrls.concat(firstNewsUrls);

  let leftUrls      = await getLeftUrls(response);
  finalUrls         = finalUrls.concat(leftUrls);

  let topNewsUrls   = await getTopNewsUrls(response);
  finalUrls         = finalUrls.concat(topNewsUrls);

  let homeTechNewsUrls = await scrapHeadingBarNews(response);
  // finalUrls         = finalUrls.concat(topNewsUrls);


  let content       = await getHeadingSubHeading(finalUrls);

  for(index in content) {
    let data  = '';
    data      = "Heading: " + content[index].heading;
    data      = data + '\n\n';
    data      = data + "Story: " + content[index].fullDetails;

    // fs.writeFileSync(`./asset/${content[index].heading}.txt`, data, (err) => {
    fs.writeFileSync(`./asset/file_indianexpress_${index}.txt`, data, (err) => { 
      if(err) { 
        throw err; 
        console.log("Data has been written to file successfully."); 
      }
    }); 
  }

}