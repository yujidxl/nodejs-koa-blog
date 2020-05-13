const superAgent = require('superagent');
const cheerio = require('cheerio');
const Novel = require('../models/novel');

(async () =>{
  try {
    const end = await superAgent.get('https://m.qidian.com/');
    storeBooks(end);
  } catch (err) {
    console.log(err);
  }
})()

function storeBooks(res){
  const $ = cheerio.load(res.text);
  const list = $('.module-slide-ol>li>a');
  let maps = []
  list.each( (index, el) => {
    const href = $(el).attr('href');
    const img = $(el).children('img').attr('src');
    const book_name = $(el).children('figcaption').text();
    const book_author = $(el).children('p').children('.gray').text();
    Novel.create({
      href,
      img,
      book_name,
      book_author
    });
    maps.push({href, img, book_name ,book_author});
  })
}