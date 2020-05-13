const redis = require('redis');

const redisClient = redis.createClient({
  host: '127.0.0.1',
  port: '6379'
})

redisClient.on('error', err=>{
  console.log('Redis error');
  console.log(err);
})

function setRedis(key, val, timeout = 60 * 60) {
  if (typeof val === 'object') {
    val = JSON.stringify(val);
  }
  redisClient.set(key, val);
  redisClient.expire(key, timeout);
}


function getRedis(key) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if(err){
        reject(err);
        return;
      }
      if(val === null) {
        resolve(null);
        return;
      }
      try{
        resolve(JSON.parse(val));
      }catch(ex){
        resolve(val);
      }
    })
  })
}

module.exports = {
  setRedis,
  getRedis
}