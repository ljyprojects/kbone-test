// 云函数入口文件
const cloud = require('wx-server-sdk')
const app = require('tcb-admin-node');

cloud.init()
app.init({
  secretId: '',
  secretKey: '',
  env: 'cqj-04kwq'
});

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
let db=app.database()
return await db.collection('todos').get()
}