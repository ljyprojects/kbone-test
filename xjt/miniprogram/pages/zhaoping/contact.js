Page({
  data:{
    phoneList:[],
    callList: ['杨小姐'],
    dialogShow: false,
    buttons: [{ text: '暂不视频' }, { text: '立即视频' }]
  },

  onLoad: function () {
    this.init();
  },

  init: function () {
    return new Promise((reslove, reject) => {
      let that = this;
      wx.cloud.callFunction({
        name: "get_setting"
      }).then((res) => {
        let phoneList = res.result.data[0].contacters
        let videoserver = res.result.data[0].videoserver[0]
        console.log("phoneList读取成功", videoserver)//////////////////
        if (res.result.data.length > 0) {
          that.setData({ phoneList: phoneList,videoserver:videoserver })
        }
        reslove
      }).catch((err) => {
        console.error(err)
        reject(err)
      })
      reslove()
    })
  },

  getCall: function (e) {
    let phone = e.currentTarget.dataset.phone
    console.log('getCall-->', phone)/////////////
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  },

  toVideo: function () {
    this.setData({ dialogShow: true})
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
          name: this.data.videoserver.name,
          openid: this.data.videoserver.openid
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

  getWechat: function () {
    wx.previewImage({
      current: '', // 当前显示图片的http链接
      urls: ['cloud://ljyhr-0y7bz.6c6a-ljyhr-0y7bz-1301345086/微信图片_20200221223620.jpg'] // 需要预览的图片http链接列表
    })
  },

  onShareAppMessage() {
    return {
      title: '欢迎加入慧泰健康',
      path: 'pages/zhaoping/ping',
      imageUrl: 'cloud://ljyhr-0y7bz.6c6a-ljyhr-0y7bz-1301345086/ljylogo.jpg',
    }
  },
});