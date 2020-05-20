Page({

  data:{
    ifManage:false
  },

  onLoad: function () {
    this.init()
    //wx.cloud.callFunction({
      //name:"sndSms",
      //success: res=>{
        //console.log(res)
      //},
      //fail:err=>{
        //console.log(err)
      //}
    //})
  },

  toPing: function(){
    wx.switchTab({
      url: './ping',
    })
  },

  init: function () {
    return new Promise((reslove, reject) => {
      let that = this;
      wx.cloud.callFunction({
        name: "zp_ifManage"
      }).then((res) => {
        console.log("读取成功", res)//////////////////
        if (res.result.data.length >0) {
          that.setData({ifManage:true})
        }
        reslove
      }).catch((err) => {
        console.error(err)
        reject(err)
      })
      reslove()
    })
  },

});