const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;
app.listen(port, function(){
	console.log('listening');
});

app.use(express.static('public'));

const cheerio = require('cheerio'),
      axios = require('axios'),
      url = `https://ai.googleblog.com/`;
const htmlparser2 = require('htmlparser2');

      
axios.get(url)
    .then((response) => {
    	let string;
    	const dom = htmlparser2.parseDOM(response.data);
        let $ = cheerio.load(dom);
         $('.post-content').each(function (i, e) {
           let text = $('.post-content').text();      
           string+=text;
       })
         fs.writeFile(__dirname +'/public/blog.txt', string, (err) => { if (err) throw err})
    }).catch(function (e) {
    console.log(e);
});