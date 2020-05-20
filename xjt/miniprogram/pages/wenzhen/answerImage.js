// pages/tuwen.js
const app = getApp()
var e = app.requirejs("core"), a = app.requirejs("foxui"), n = app.requirejs("jquery"), i = app.requirejs("biz/diyform");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postData: {},
    dialogShow: false,
    files:[],
    userInfo:undefined,
    wen:{},
    user:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    if (options.wid) {
      that.getData(options.wid)
    }else{
      wx.navigateTo({
        url: './index',
      })
    }
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    } else {
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

  getData: function (wid) {
    wx.cloud.callFunction({
      data:{type:'wenId',wid:wid},
      name: 'xj_getWen',
      success: res => {
        console.log(res)
        this.setData({wen:res.result.data[0]})
      },
      fail: err => {
        console.log(err)
      }
    })
  },

  inputChange: function (t) {///////////input
    console.log(t);
    var a = t.detail.value, i = e.pdata(t).type, r = this.data.postData;
    r[i] = n.trim(a), this.setData({
      postData: r
    });
    console.log(this.data.postData);
  },

  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.wen.img // 需要预览的图片http链接列表
    })
  },

  chkSub: function () {
    var r = this.data.postData

    if (!this.data.userInfo) {
      this.setData({ dialogShow: true })
      return
    }

    if (r.answer == '' || !r.answer) {
      wx.showToast({
        title: '请输入您的答复！',
      })
      return
    }

    this.saveData()
  },

  saveData: function () {
    let r = this.data.postData
    r['wen'] = this.data.wen
    wx.cloud.callFunction({
      name: 'xj_addAnswer',
      data: {
        postData: r
      },
      success: res => {
        console.log('xj_addAnswer--->',res)
        wx.reLaunch({
          url: './answer',
        })
      },
      fail: err => {
        console.log(err)
      }
    })
  },

  getUserInfo: function (e) {
    this.setData({
      userInfo: e.detail.userInfo
    })
    console.log('getUserInfo--->', e)
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