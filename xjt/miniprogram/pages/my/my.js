const app = getApp()
Page({

  data: {
    dialogShow: false,
    userInfo: undefined,
  },

  onLoad: function () {
    var that = this
    if (app.globalData.userInfo) {
      this.setData({
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
    this.setData({
      userInfo: e.detail.userInfo
    })
  },

  openConfirm: function () {
    this.setData({dialogShow: true})
  },


});