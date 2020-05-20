// pages/payConfirm.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nurse:{},
    btnSel: {},
    userInfo: undefined
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({ nurse: JSON.parse(options.nurse), btnSel: JSON.parse(options.btnSel)})
    console.log('payConfirm--options--->', that.data.nurse.openid)
    if (app.globalData.userInfo) {
      that.setData({
        userInfo: app.globalData.userInfo
      })
    } else {
      // 查看是否授权
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success(res) {
                that.setData({
                  userInfo: res.userInfo
                })
              }
            })
          }
        }
      })
    }
  },
  
  getUserInfo: function (e) {
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
    })
  },

  toPay: function () {
    let that = this;
    console.log('toPay--->',that.data.userInfo)
    if(!that.data.userInfo){
      that.setData({ dialogShow: true })
      console.log('toPay1--->', that.data.userInfo)
    }
    let money = that.data.btnSel.price
    let gname = that.data.nurse.name+'-'+that.data.btnSel.item
    console.log('gname为：', gname)
    wx.cloud.callFunction({
      name: "yunPay",
      data: {
        orderid: "XJT" + new Date().getTime(),
        //money: money,
        money: 0.01,
        gname: gname,
      },
      success(res) {
        console.log("提交成功", res.result)
        that.pay(res.result.result,res.result.openid)
      },
      fail(res) {
        console.log("提交失败", res)
      }
    })
  },

  //实现小程序支付
  pay(payData,userOpenid) {
    let that=this
    //官方标准的支付方法
    wx.requestPayment({
      timeStamp: payData.timeStamp,
      nonceStr: payData.nonceStr,
      package: payData.package, //统一下单接口返回的 prepay_id 格式如：prepay_id=***
      signType: 'MD5',
      paySign: payData.paySign, //签名
      success(res) {
        console.log("支付成功", res)
        if (that.data.btnSel.item == '视频咨询') {
          const roomID = Math.random().toFixed(6).slice(-6)
          let url = `pages/room/room?template=1v1&roomID=${roomID}`
          console.log('url--->', url)
          that.getVideo(url)
          that.sendSms(that.data.btnSel.item)
          wx.reLaunch({
            url: '/'+url,
          })
        } else if (that.data.btnSel.item == '在线咨询') {
          let url = 'pages/im/room/room?chatRoomGroupId=' + that.data.nurse.openid + '-' + userOpenid
          console.log('url--->', url)
          that.sendMassage(url)
          that.sendSms(that.data.btnSel.item)
          wx.navigateTo({
            url: '/' +url,
          })
        } else {
          wx.navigateTo({
            url: './askImage?nurse=' + JSON.stringify(that.data.nurse),
          })
        }
      },
      fail(res) {
        console.log("支付失败", res)
      },
      complete(res) {
        console.log("支付完成", res)
      }
    })
  },

  sendMassage: function (url) {
    wx.cloud.callFunction({
      name: "online_sendMassage",
      data: {
        url: url,
        name: this.data.nurse.name,
        openid: this.data.nurse.openid
      },
      success(res) {
        console.log('online_sendMassage--->', res)//////////
      },
      fail(res) {
        console.log("读取失败", res)
      }
    })
  },

  getVideo: function (url) {
      wx.cloud.callFunction({
        name: "video_sendMassage",
        data: {
          url: url,
          name: this.data.nurse.name,
          openid: this.data.nurse.openid
        },
        success(res) {
          console.log('videocall---', res)//////////
        },
        fail(res) {
          console.log("读取失败", res)
        }
      })
  },

  sendSms: function (item) {
    console.log(this.data.nurse.phone)
    let code = []
    code[0] = this.data.nurse.name
    code[1] = item
    let phone = this.data.nurse.phone
    wx.cloud.callFunction({
      name: "sndSms",
      data: {
        phone: phone,
        code: code,
        templateid: '555068'
      },
      success(res) {
        console.log('sndSms--->', res)//////////
      },
      fail(res) {
        console.log("读取失败", res)
      }
    })
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