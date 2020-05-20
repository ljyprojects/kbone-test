// 云函数入口文件
const cloud = require('wx-server-sdk')
const request = require('request')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  return await cloud.callFunction({
    name:'getAccessToken'
  }).then(function(res){
    let url = 'http://api.weixin.qq.com/wxa/business/getliveinfo?access_token=' + res.result
    // return url
    const rp = options =>
      new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
          if (error) {
            reject(error);
          }
          resolve(response);
        });
      });
    const result = await rp({
      url: url,
      method: 'POST',
      body: {
        "start": 0,
        "limit": 10
      },
      json: true
    })
    //  return rp;
    // // return (typeof result.body === 'object') ? result.body : JSON.parse(result.body);
  }).catch(function(err){
    return err
  })

  // let access_token = '31_7_x2I6Tn7rI-vRpLA4gxmh_pagNgWXUyH3lOLBFsCsotmbAWHUSNpdPfgLHfzUm43RNVa16aZYzxXNr9raIbbjHxPB0vKIVa_cTnQXXpg4C9ZuUrj4R_93OtERcPfBwzxfnvubPpaACbtRDrNIJgAHABWX'
  // let url = 'http://api.weixin.qq.com/wxa/business/getliveinfo?access_token='+access_token
  // let options={
  //   url:url,
  //   method:'POST',
  //   body:{
  //     "start":0,
  //     "limit":10
  //   },
  //   json:true
  // }
  // return await request(options,(err,response,body)=>{
  //   if(err){
  //     return err
  //   } else {
  //     return response
  //   }
    
  // })

}