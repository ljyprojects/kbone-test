// pages/nurse.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    nurse:{},
    btnSel: [
      { selected: true, 
        item: '图文咨询', 
        price: 50,
        times: 10,
        long: 48,
        tip:'通过文字、图片、语音进行咨询',
        content:'可以通过文字、图片、语音的形式和专家沟通;\n一次咨询的时效为48小时，在48小时内随时和医生沟通（对话上限为10次）;\n专家未回复问题可退款;' 
      }, 
      { selected: false, 
        item: '在线咨询', 
        price: 100,
        times: 50,
        long: 48,
        tip: '与医生进行选定时长的电话咨询',
        content: '以电话的形式和医生沟通，时间和时长可自主选择;\n电话未接通可退款；'  
      }, 
      { selected: false, 
        item: '视频咨询', 
        price: 200,
        times: 5,
        long: 48,
        tip: '与医生进行选定时长的视频咨询',
        content: '以视频的形式和医生沟通，时间和时长可自主选择;\n视频未接通可退款；' 
      }
    ],
    selIndex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    this.setData({id:options.id})
    this.loadData(options.id)
  },

  loadData:function(id){
    let that=this
    wx.cloud.callFunction({
      name:"xj_getNurse",
      data:{
        type:'byId',
        data:{id:id}
      },
      success:res=>{
        console.log('res--->',res)
        that.setData({ nurse: res.result.data[0] })
        console.log('nurse--->', that.data.nurse)
      },
      fail:err=>{
        console.log('err-->',err)
      }
    })
  },

  selectBtn:function(e){
    let that=this
    let selIndex = e.currentTarget.dataset.index
    let btnSel=that.data.btnSel
    for(var i=0;i<that.data.btnSel.length;i++){
      if(i==selIndex){
        btnSel[i].selected=true
        that.setData({btnSel:btnSel,selIndex:i})
      } else {
        btnSel[i].selected = false
        that.setData({ btnSel: btnSel })
      }
    }
  },

  toHome:function(){
    wx.navigateTo({
      url: './index',
    })
  },

  toPay:function(){
    wx.navigateTo({
      url: './payConfirm?nurse=' + JSON.stringify(this.data.nurse) + '&btnSel=' + JSON.stringify(this.data.btnSel[this.data.selIndex]),
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