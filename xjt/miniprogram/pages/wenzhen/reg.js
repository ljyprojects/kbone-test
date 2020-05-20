// pages/reg.js
const app = getApp()
var e = app.requirejs("core"), a = app.requirejs("foxui"), n = app.requirejs("jquery"), i = app.requirejs("biz/diyform");
Page({

  data: {
    showPage:false,
    jibing: [],
    jbIndex: 0,
    keshi: [],
    ksIndex: 0,
    dialogShow: false,
    userInfo: undefined,
    jibing: ["鼻炎", "口臭", "脱发"],
    jbIndex: 0,
    keshi: ["感染内科", "皮肤科", "妇科"],
    ksIndex: 0,
    isAgree: false,
    tmpAvatarUrl:'',
    postData:{}
  },

  onLoad: function () {
    console.log(this.data.userInfo)
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

  chgAvatar:function(){
    let that=this
    wx.chooseImage({
      success: function(res) {
        console.log(res)
        that.setData({ tmpAvatarUrl: res.tempFilePaths[0]})
        console.log(that.data.tmpAvatarUrl)
      },
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

  bindJbChange: function (e) {///////////picker应聘岗位
    this.setData({
      jbIndex: e.detail.value
    })
    console.log('picker account', e);
    console.log('picker account 发生选择改变，携带值为', e.target.dataset.type);

    var a = this.data.jibing[this.data.jbIndex], i = e.target.dataset.type, r = this.data.postData;
    r[i] = n.trim(a), this.setData({
      postData: r
    });
    console.log(this.data.postData);
  },

  bindKsChange: function (e) {///////////picker应聘岗位
    this.setData({
      ksIndex: e.detail.value
    })
    console.log('picker account', e);
    console.log('picker account 发生选择改变，携带值为', e.target.dataset.type);

    var a = this.data.keshi[this.data.ksIndex], i = e.target.dataset.type, r = this.data.postData;
    r[i] = n.trim(a), this.setData({
      postData: r
    });
    console.log(this.data.postData);
  },

  chkSub:function(){
    var r = this.data.postData

    if (this.data.tmpAvatarUrl == '') {
      wx.showToast({
        title: '请上传您的头像！',
      })
      return
    }

    if(r.name==''||!r.name){
      wx.showToast({
        title: '请输入您的姓名！',
      })
      return
    }

    if (r.phone == '' || !r.phone) {
      wx.showToast({
        title: '请输入您的姓名！',
      })
      return
    }

    if (r.job == '' || !r.job) {
      wx.showToast({
        title: '请输入您的姓名！',
      })
      return
    }

    if (r.company == '' || !r.company) {
      wx.showToast({
        title: '请输入您的姓名！',
      })
      return
    }

    if (r.like == '' || !r.like) {
      wx.showToast({
        title: '请输入您的姓名！',
      })
      return
    }

    if (r.study == '' || !r.study) {
      wx.showToast({
        title: '请输入您的姓名！',
      })
      return
    }

    if (r.jibing == '' || !r.jibing) {////应聘岗位
      r['jibing'] = this.data.jibing[0], this.setData({ postData: r });
    }

    if (r.keshi == '' || !r.keshi) {////应聘岗位
      r['keshi'] = this.data.keshi[0], this.setData({ postData: r });
    }
    
    this.uploadAvatar()
  },

  uploadAvatar: function () {
    var that = this
    const filePath = that.data.tmpAvatarUrl
    var rn = Math.floor(Math.random() * 10000 + 1) //随机数
    var name = Date.parse(new Date()) / 1000
    const cloudPath = 'specialist/' + that.data.userInfo.nickName + "/" + rn + name + filePath.match(/\.[^.]+?$/)[0]
    wx.cloud.uploadFile({
      cloudPath: cloudPath,
      filePath:that.data.tmpAvatarUrl,
      success:res=>{
        console.log(res.fileID)
        let postData=that.data.postData
        postData['avatarUrl']=res.fileID
        that.setData({postData:postData})
        that.saveData()  
      },
      fail:err=>{
        console.log(err)
      }
    })
  },

  saveData:function(){
    wx.cloud.callFunction({
      name: 'xj_addSpecialist',
      data: {
        postData: this.data.postData
      },
      success: res => {
        console.log(res)
        wx.navigateTo({
          url: './nurse?id='+res.result._id,
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
    console.log('getUserInfo--->',e)
  },

  openConfirm: function () {
    this.setData({ dialogShow: true })
  },

  subData: function(){
    this.chkSub()
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