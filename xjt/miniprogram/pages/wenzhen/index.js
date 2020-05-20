// pages/index.js
const MD5=require('../../md5')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recNurses:{},
    liveList:[],
    keshis: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let params = {
      "com": "shentong",
      "num": "773031266065195",
      "from": "",
      "phone": "",
      "to": "",
      "resultv2": 0,
      "show": "0",
      "order": "desc"
    }
    let sign = JSON.stringify(params) + 'GFMAoKCF4891' + '4E6E9EECE709CC70223C219FCEEA9113'
    sign = MD5.md5(sign)
    sign = sign.toLocaleUpperCase()
    console.log('sign==>',sign)
    wx.request({
      url: 'https://poll.kuaidi100.com/poll/query.do',
      data:{
        sign:sign,
        param:params,
        customer:'4E6E9EECE709CC70223C219FCEEA9113'
      },
      success:res=>{
        console.log('结果=>',res)
      }
    })
    // wx.cloud.callFunction({
    //   name:'getLiveList'
    // }).then(res=>{
    //   console.log('jieguo=>',res)
    // })
    // wx.cloud.callFunction({
    //   name:"getAccessToken"
    // }).then(res=>{
    //   console.log('res=>',res.result)
    //   wx.request({
    //     url: 'https://poll.kuaidi100.com/poll/query.do',
    //     data:{
    //       access_token:res.result,
    //       params,
    //       sign,
    //       customer:'4E6E9EECE709CC70223C219FCEEA9113'
    //     }
    //   })
    // })
   
    this.loadData()
    
  },

  loadData: function (id) {
    let that = this
    wx.cloud.callFunction({
      name: "xj_getNurse",
      data: {
        type: 'byRec'
      },
      success: res => {
        that.setData({ recNurses: res.result.data })
        console.log('recNurses--->', that.data.recNurses)
      },
      fail: err => {
        console.log('err-->', err)
      }
    })
    wx.cloud.callFunction({
      name: "get_setting",
      success: res => {
        that.setData({ keshis: res.result.data[0].keshis })
        console.log('keshis--->', that.data.keshis)
      },
      fail: err => {
        console.log('err-->', err)
      }
    })
    wx.cloud.callFunction({
      name: 'getLiveList',
    })
      .then(res => {
        console.log(res)
        return
        let liveList = res.result.room_info
        for(let i=0;i<liveList.length;i++){
          liveList[i].start_time = dateFormat("YYYY-mm-dd HH:MM", new Date(liveList[i].start_time*1000))
        }
        that.setData({ liveList: liveList })
        console.log('liveList', that.data.liveList)
      })
      .catch(console.error)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})


function dateFormat(fmt, date) {
  let ret;
  const opt = {
    "Y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "H+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "S+": date.getSeconds().toString() // 秒
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