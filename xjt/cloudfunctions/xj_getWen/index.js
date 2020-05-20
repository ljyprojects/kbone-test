// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const type = event.type
  let res={}
  switch(type){
    case "wenId":
      return await db.collection('xj_wen').where({ _id: event.wid }).get();

    case "wenOpenid":
      res = await db.collection('xj_wen').orderBy('createTime', 'desc').where({ openid: wxContext.OPENID }).get();
      for (let i = 0; i < res.data.length; i++) {
        res.data[i].createTime = dateFormat("YYYY-mm-dd HH:MM", new Date(res.data[i].createTime.getTime() + (8 * 60 * 60 * 1000)))
        if (res.data[i].answers) {
          for (let j = 0; j < res.data[i].answers.length; j++) {
            res.data[i].answers[j].answer.createTime = dateFormat("YYYY-mm-dd HH:MM", new Date(res.data[i].answers[j].answer.createTime.getTime() + (8 * 60 * 60 * 1000)))
          }
        }
      }
      return res

    case "nurseOpenid":
      res = await db.collection('xj_wen').orderBy('createTime', 'desc').where({ 'nurse.openid': wxContext.OPENID }).get();
      for (let i = 0; i < res.data.length; i++) {
        res.data[i].createTime = dateFormat("YYYY-mm-dd HH:MM", new Date(res.data[i].createTime.getTime() + (8 * 60 * 60 * 1000)))
        if (res.data[i].answers) {
          for (let j = 0; j < res.data[i].answers.length; j++) {
            res.data[i].answers[j].answer.createTime = dateFormat("YYYY-mm-dd HH:MM", new Date(res.data[i].answers[j].answer.createTime.getTime() + (8 * 60 * 60 * 1000)))
          }
        }
      }
      return res

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