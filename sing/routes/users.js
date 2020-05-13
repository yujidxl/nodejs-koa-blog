const router = require('koa-router')();
const { Book } = require('../models/book');
const { getRedis, setRedis } = require('../redis');

router.prefix('/users');

router.get('/book-details', async function (ctx, next) {
  const { book_name, book_author, book_details, book_color } = ctx.query;
  const key = `Redis_books_name_${(book_name? book_name : '')}_author${
    (book_author? book_author: '')}_details_${(book_details? book_details: '')
  }_color_${(book_color? book_color: '')}`;
  const cacheData = await getRedis(key);
  if(cacheData) {
    ctx.body = {
      code: 2,
      data: cacheData,
      length: cacheData.length,
      key
    }
  }else{
    let searchSom = {};
    book_author && (searchSom = {book_author});
    book_color && (searchSom = {...searchSom, book_color});
    book_details && (searchSom = {...searchSom, book_details});
    book_name && (searchSom = {...searchSom, book_name});
    const data = await Book.findAll({ where: searchSom});
    setRedis(key, data, 60);
    ctx.body = {
      code: 0,
      data,
      total: data.length,
      key
    }
  }
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.post('/book-details', async function (ctx, next) {
  const { book_name, book_color, book_details, book_author } = ctx.request.body;
  if(!book_name || !book_color || !book_details || !book_author){
    let name = '';
    !book_details && (name = '书本的详情');
    !book_color && (name = '书本的颜色');
    !book_author && (name = '书本的作者');
    !book_name && (name = '书本的名称');
    ctx.body = {
      code: -1,
      msg: `${name}必填`
    }
    return;
  }
  const end = await Book.findOne({where: {book_name}});
  if(end){
    ctx.body = {
      code: -2,
      msg: '当前书籍已存在'
    }
    return;
  }
  const end_success = await Book.create({
    book_name,
    book_author,
    book_color,
    book_details
  });
  ctx.body = {
    book_name,
    book_author,
    book_color,
    book_details
  }
})

module.exports = router
