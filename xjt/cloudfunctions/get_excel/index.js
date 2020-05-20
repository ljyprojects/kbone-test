// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
//操作excel用的类库
const xlsx = require('node-xlsx');

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    let { userdata } = event

    //1,定义excel表格名
    let dataCVS = 'zhaopin.xlsx'
    //2，定义存储数据的
    let alldata = [];
    let row = ['面试码', '姓名', '性别', '应聘职位', '联系电话', '邮箱', '籍贯', '现住地址', '是否住宿', '出生年月', '到岗时间', '期望待遇', '最高学历', '技能证书', '工作经验', '提交时间', '简历附件']; //表属性
    alldata.push(row);

    for (let key in userdata) {
      let arr = [];
      arr.push(userdata[key].resumeno);
      arr.push(userdata[key].realname);
      arr.push(userdata[key].sex);
      arr.push(userdata[key].jobname);
      arr.push(userdata[key].phone);
      arr.push(userdata[key].email);
      arr.push(userdata[key].province);
      arr.push(userdata[key].address);
      arr.push(userdata[key].house);
      arr.push(userdata[key].birthday);
      arr.push(userdata[key].jiontime);
      arr.push(userdata[key].walfare);
      arr.push(userdata[key].education);
      arr.push(userdata[key].certifite);
      arr.push(userdata[key].experion);
      arr.push(userdata[key].subtime);
      arr.push(userdata[key].resume);
      alldata.push(arr)
    }
    //3，把数据保存到excel里
    var buffer = await xlsx.build([{
      name: "mySheetName",
      data: alldata
    }]);
    //4，把excel文件保存到云存储里
    return await cloud.uploadFile({
      cloudPath: dataCVS,
      fileContent: buffer, //excel二进制文件
    })

  } catch (e) {
    console.error(e)
    return e
  }
}