Page({
  data: {
    markers1: [{
      id: 0,
      latitude: 22.713650,
      longitude: 114.252289,
      width: 50,
      height: 50
    }],
  },
  onLoad: function () {
    wx.showShareMenu({
      //设为true，获取ShareTicket
      withShareTicket: true
    })
  },

  routePlan1: function () {
    let plugin = requirePlugin('routePlan');
    let key = 'KQPBZ-KRBCO-Q4AW5-STD45-3NGIT-YUBT2';  //使用在腾讯位置服务申请的key
    let referer = 'wx34f51e38036e8edf';   //调用插件的app的名称
    let endPoint = JSON.stringify({  //终点
      'name': '慧泰健康',
      'latitude': 22.713650,
      'longitude': 114.252289
    });
    wx.navigateTo({
      url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
    });
  },
});