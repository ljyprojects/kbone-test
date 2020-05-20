// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
// 云函数网络请求
exports.main = async (event, context) => {
  let url = 'url'
   let params = {
      "com": "shentong",
      "num": "773031266065195",
      "from": "",
      "phone": "",
      "to": "",
      "resultv2": 0,
      "show": "0",
      "order": "desc"
    }
  let data = {
    c:'i'
  }
  const request = require('request')
  return new Promise((resolve, reject) => {
    try {
      request('https://v1.hitokoto.cn?c=i',(err, resp, body) => {
        if (err) {
          return reject(err)
        }
        return resolve(JSON.parse(body))
      })
    } catch (e) {
      return reject(err)
    }
  })
}