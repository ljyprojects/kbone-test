// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: "ljyhr-0y7bz"
})

exports.main = async (event, context) => {
  
  try {
    const result = await cloud.openapi.uniformMessage.send({
      touser: event.openid,
      mpTemplateMsg: {
        appid: 'wx60dad94eeaa4d5c1',//乐健园服务号APPID
        url: 'http://weixin.qq.com/download',
        miniprogram: {
          appid: 'wx34f51e38036e8edf',//乐健园小程序
          pagepath: event.url
        },
        data: {
          first: {
            value: '您有新的服务请求受理！',
            color: '#173177'
          },
          keyword1: {
            value: event.name,
            color: '#173177'
          },
          keyword2: {
            value: dateFormat("YYYY-mm-dd HH:MM", new Date(Date.now()+ (8 * 60 * 60 * 1000))),
            color: '#173177'
          },
          keyword3: {
            value: '在线消息请求',
            color: '#173177'
          },
          remark: {
            value: '请您马上进行回复！',
            color: '#173177'
          }
        },
        templateId: 'LIWUbmTkiGNmSrtoT5ZNt3Quk4e8nmZq1GtHR4Og_1Q'
      }
    })
    return result
    //return event
  } catch (err) {
    console.log(err)
    return err
  }
}

function dateFormat(fmt, date) {
  let ret;
  const opt = {
    "Y+": date.getFullYear().toString(),        // 年
    "m+": (date.getMonth() + 1).toString(),     // 月
    "d+": date.getDate().toString(),            // 日
    "H+": date.getHours().toString(),           // 时
    "M+": date.getMinutes().toString(),         // 分
    "S+": date.getSeconds().toString()          // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
    };
  };
  return fmt;
}