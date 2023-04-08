const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs'); 
const baseUrl = 'https://www.bbc.com';


const scrapHeadingBarNews = (response) => {

	const saveContentInFile = async (content, index) => {;
	    let data  = '';
	    data      = "Heading: " + content.heading;
	    data      = data + '\n\n';
	    data      = data + "Story: " + content.fullDetails;

	    // fs.writeFileSync(`./asset/${content[index].heading}.txt`, data, (err) => {
	    fs.writeFileSync(`./asset/file_bbc_${index}.txt`, data, (err) => { 
	      if(err) { 
	      	console.log("Something went wrong while writing data into file.");
	      	return false 
	      }
	      console.log("Data has been written to file successfully.");
	      return true;
	    });
	}

	const getHeadingAndStories = async (urls) => {
		let content = []
	  	for(index in urls){
	  		try {
	  			let url       = urls[index]
			    const response= await axios.get(url);
			    const $       = cheerio.load(response.data);

			    let heading   = $('#main-content h1').text();
			    let fullDetails=$('#main-content p').text()

			    heading && fullDetails && content.push({
			      heading     : $('#main-content h1').text(),
			      fullDetails : $('#main-content p').text(),
			      url
			    })
	  		} catch (err) {
	  			console.log('getHeadingAndStories Error ', urls[index], err.message);
	  		}
		}

	  	return Promise.resolve(content);
	}

	const getAllHeadings = () => {
	    try {
	      const $ = cheerio.load(response.data);

	      let headingBars = [];
	      $('.nw-c-nav__wide-sections li').each( async function(e1, indexe){
	        try{
	          let url = $(this).find('li a').attr('href');
	          let title = $(this).find('li a').text();
	          if(url && title && title !== 'HomeHome selected') {
	          	headingBars.push({title, url: baseUrl + url})
	          }
	        } catch(error) {
	          console.log('getAllHeadings error ', error);
	        }
	      })

	      return Promise.resolve(headingBars);

	    } catch (error) {
	      console.error(error);
	    }
	 }

	 const openHeadingUrls = async(heading) => {
	 	let allUrls   = []
	    const response= await axios.get(heading.url);
	    const $       = cheerio.load(response.data);

	    $('.advert-page div').each( async function(e1, indexe){
	    	try{
	          let url = $(this).find('div a').attr('href');

	          let splitedUrl = url && url.split(':') || [];
	          if(url && ['http', 'https'].includes(splitedUrl[0]) === false) {
	          	url = baseUrl + url;
			  }

	          if(url && allUrls.includes(url) === false) {
	          	allUrls.push(url);
	          }
	        } catch(error) {
	          console.log('scrapHeadingBarNews error ', error);
	        }
	     })
	    return Promise.resolve(allUrls);
	 }

	 const processAllHeadings = async (headings) => {
	 	let allHeadingUrls = [];
	 	for(index in headings){
	 	  console.log(`Processing ${headings[index].title}`)
	      let urls = await openHeadingUrls(headings[index]);
	      allHeadingUrls = allHeadingUrls.concat(urls);
	    }

	    let newsContent = await getHeadingAndStories(allHeadingUrls);
	    for (index in newsContent) {
	    	saveContentInFile(newsContent[index], index)
	    }

	    return Promise.resolve(allHeadingUrls);
	 }

	 return getAllHeadings()
	 	.then(processAllHeadings)
}

exports.initBBCScraping = async function (req, res, next) {
	console.log('----------------------BBC News Scraping started----------------------')
	let response      = await axios.get('https://www.bbc.com/news');
	let headingBarResp= await scrapHeadingBarNews(response);

	console.log('----------------------BBC News Scraping Completed----------------------')
}