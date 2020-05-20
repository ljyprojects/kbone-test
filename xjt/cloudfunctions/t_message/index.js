// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try {
    const result = await cloud.openapi.subscribeMessage.send({
      touser: wxContext.OPENID,
      page: 'index',
      lang: 'zh_CN',
      data: {
        number01: {
          value: '339208499'
        },
        date01: {
          value: '2015年01月05日'
        },
        site01: {
          value: 'TIT创意园'
        },
        site02: {
          value: '广州市新港中路397号'
        }
      },
      templateId: 'SP7Jhy0T_oLMrjT-kT0cJnENXH6OXn0yXx3hF1sRCmQ',
      miniprogramState: 'developer'
    })
    console.log(result)
    return result
  } catch (err) {
    console.log(err)
    return err
  }
}