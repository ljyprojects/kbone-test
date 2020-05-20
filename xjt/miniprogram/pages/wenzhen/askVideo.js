// pages/realVideo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nurse: {},
    dialogShow: false,
    buttons: [{ text: '暂不视频' }, { text: '立即视频' }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ nurse: JSON.parse(options.nurse) })
    console.log("askVideo--options--->", this.data.nurse)

  },

  toVideo: function () {
    this.setData({ dialogShow: true })
  },

  getVideo: function (e) {
    this.setData({
      dialogShow: false
    })
    if (e.detail.index == 1) {
      const roomID = Math.random().toFixed(6).slice(-6)
      const url = `../room/room?template=1v1&roomID=${roomID}`
      wx.cloud.callFunction({
        name: "video_sendMassage",
        data: {
          roomID: roomID,
          name: this.data.nurse.name,
          openid: this.data.nurse.openid
          // name: '王立群',
          // openid: 'oDXIC5YeBU7t9ZRUQoM-BNHBREXw'
        },
        success(res) {
          console.log('videocall---', res)//////////
          wx.navigateTo({
            url: url,
          })
        },
        fail(res) {
          console.log("读取失败", res)
        }
      })
    }
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