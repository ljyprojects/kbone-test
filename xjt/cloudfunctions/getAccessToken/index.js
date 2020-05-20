// 云函数入口文件
const cloud = require('wx-server-sdk');
const request = require('request');
const access_token = require('AccessToken');

cloud.init()

let appid = 'wx34f51e38036e8edf';//微信公众号开发者id
let secret = '8cbfd5f71b6664975fb21cd80ab78a47';//微信公众号开发者secret_key

// 云函数入口函数
exports.main = async (event, context) => {
  let at = new access_token({
    appid,
    secret
  });
  return at.getCachedWechatAccessToken();
}