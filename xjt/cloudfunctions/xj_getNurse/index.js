// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  const db=cloud.database()
  const {
    type,
    data
  }= event;

  switch (type) {
    case "byAll":
      return await db.collection('xj_specialist').get();
    case "byId":
      return await db.collection('xj_specialist').where({ _id: data.id }).get();
    case "byRec":
      return await db.collection('xj_specialist').where({ ifRec: true }).orderBy('recId','asc').get();
  }
}