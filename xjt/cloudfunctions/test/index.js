// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 初始化示例
const app = require('tcb-admin-node');

// 初始化资源
// 云函数下不需要secretId和secretKey。
// env如果不指定将使用默认环境
app.init({
  secretId: 'AKID4vVs9piPU7TZOtKDygn47tVsymSip3dT',
  secretKey: 'oLbiLktkSu5zmcCVWPEn567E6hFl10hE',
  env: 'apppgy-72vrx'
});

// 云函数入口函数
exports.main = async (event, context) => {
  const db = app.database();
  return await db.collection('goods').limit(10).get()
}