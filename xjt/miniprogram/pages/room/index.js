//index.js
const app = getApp()

Page({
  data: {
  },

  onLoad: function() {

  },

  videoCall: function(){
    const roomID = '154433', template = '1v1', cloudenv= "PRO", debugMode= false
    const url = `../room/room?roomID=${roomID}&template=${template}`
    const urll = `pages/room/room?roomID=${roomID}&template=${template}`
    let that = this;

    console.log(url)
    wx.navigateTo({
      url: url,
    })
  }



})
