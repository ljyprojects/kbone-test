// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()


// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  let postData = event.postData
  postData['openid'] = wxContext.OPENID
  postData['createTime'] = db.serverDate()
  return await db.collection('xj_wen').add({
    data: postData,
  })////
}