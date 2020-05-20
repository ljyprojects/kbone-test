Page({
  onLoad: function () {
  },

  toPing: function(){
    wx.switchTab({
      url: './ping',
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