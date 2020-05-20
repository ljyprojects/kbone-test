Page({
  data:{
    page:1,
    limit:20,
    total:20,
    list:[],
    loading: false,
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '数据加载中',
    })
    this.init()
  },

  init: async function(){
    await this.getList()
  },

  getList: function(){
    return new Promise((resolve, reject) => {
      let that = this;
      that.setData({loading:true})
      let page = that.data.page;
      //读取users表数据
      wx.cloud.callFunction({
        name: "get_zhao",
        data: {
          page: page,
          limit: that.data.limit
        }
      })
      .then(res=>{
        console.log('--->',res)
        if (res.result.data.length > 0) {
          if (res.result.total < that.data.limit) {
            that.setData({ loading: false, nomore: true })
          }
          wx.hideLoading()
          that.data.page++
          let list = that.data.list;
          console.log("读取成功", list)
          for (let i = 0; i < res.result.data.length; i++) {
            list.push(res.result.data[i])
          }
          that.setData({ list: list, total: res.result.total})
        } else {
          wx.hideLoading()
          that.setData({loading:false,nomore:true})
        }

      })
    })
  },

  toNav: function () {
    wx.navigateTo({
      url: 'getExcel',
    })
  },

  showDetail: function (e) {
    let that = this;
    let list = that.data.list;
    let id = e.currentTarget.dataset.index;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (i == id) {
        list[i].isShow = !list[i].isShow
      } else {
        list[i].isShow = false
      }
    }
    that.setData({
      list: list
    });
  },

  hideDetail: function (e) {
    let that = this;
    let quanArray = that.data.list;
    let arrayIndex = e.currentTarget.dataset.index;
    quanArray[arrayIndex].isShow = false;
    that.setData({
      list: quanArray
    });
  },

  onReachBottom: function () {
    this.getList()
  },


})