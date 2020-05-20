// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  let page = event.page, limit = event.limit
  page = parseInt(page, 10)
  limit = parseInt(limit, 10)
  if (!page) page = 1
  if (!limit) limit = 10
  skip = (page - 1) * limit
  const list = await cloud.database().collection('ljy_resume').skip(skip).limit(limit).orderBy('subtime', 'desc').get()////
  const count = await cloud.database().collection('ljy_resume').count()////
  let res={data:list.data,total:count.total}///
  return res;
  //return await cloud.database().collection('zp_list').skip(skip).limit(limit).orderBy('subtime', 'desc').get();
}