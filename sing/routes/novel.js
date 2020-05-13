const router = require('koa-router')();
const Novel = require('../models/novel');

router.prefix('/api/v1');

router.get('/novel', async (ctx, next) => {
  try {
    const end = await Novel.findAll();
    ctx.body = {
      code: 0,
      msg: '查询成功',
      data: end
    }
  } catch (err) {
    ctx.body = {
      code: -1,
      msg: '查询失败',
      result: err
    }
  }
})

module.exports = router;