// pages/tuwen.js
const app = getApp()
var e = app.requirejs("core"), a = app.requirejs("foxui"), n = app.requirejs("jquery"), i = app.requirejs("biz/diyform");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sex:['男','女'],
    sexIndex:0,
    postData: {},
    dialogShow: false,
    userInfo: undefined,
    files:[],
    nurse:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('askimage--onload--->',JSON.parse(options.nurse))
    let that=this
    that.setData({nurse: JSON.parse(options.nurse)})
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

  bindSexChange: function (e) {///////////picker应聘岗位
    this.setData({
      sexIndex: e.detail.value
    })
    console.log('picker account', e);
    console.log('picker account 发生选择改变，携带值为', e.target.dataset.type);

    var a = this.data.sex[this.data.sexIndex], i = e.target.dataset.type, r = this.data.postData;
    r[i] = n.trim(a), this.setData({
      postData: r
    });
    console.log(this.data.postData);
  },

  inputChange: function (t) {///////////input
    console.log(t);
    var a = t.detail.value, i = e.pdata(t).type, r = this.data.postData;
    r[i] = n.trim(a), this.setData({
      postData: r
    });
    console.log(this.data.postData);
  },

  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      count:9,
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: res.tempFilePaths
        });
      }
    })
  },

  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },

  deleteImg(e) {
    var that = this
    wx.vibrateShort()
    wx.showModal({
      title: '确认删除',
      content: '',
      cancelText: '取消',
      confirmText: '确认',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          var data = that.data.files
          data.splice(e.currentTarget.dataset.index, 1)
          that.setData({
            files: data
          })
        } else if (res.cancel) {

        }
      }
    })
  },

  chkSub: function () {
    var r = this.data.postData

    if (!this.data.userInfo) {
      this.setData({ dialogShow: true })
      return
    }

    if (r.age == '' || !r.age) {
      wx.showToast({
        title: '请输入您的年龄！',
      })
      return
    }

    if (r.detail == '' || !r.detail) {
      wx.showToast({
        title: '请输入您的病情描述！',
      })
      return
    }

    if (r.sex == '' || !r.sex) {////应聘岗位
      r['sex'] = this.data.sex[0], this.setData({ postData: r });
    }

    if (this.data.files.length > 0) {
      this.uploadImg()
    } else {
      this.saveData()
    }

  },

  uploadImg:function(){
    let that = this
    var num = 0
    var tempIds = [];
    for (var i = 0; i < that.data.files.length; i++) {
      const filePath = that.data.files[i]
      var rn = Math.floor(Math.random() * 10000 + 1) //随机数
      var name = Date.parse(new Date()) / 1000; //时间戳
      const cloudPath = 'tuwen/image/' + that.data.userInfo.nickName + "/" + rn + name + filePath.match(/\.[^.]+?$/)[0]
      wx.cloud.uploadFile({
        cloudPath: cloudPath,
        filePath: filePath,
        success: res => {
          console.log(res)
          tempIds.push(res.fileID)
          num = num + 1
          if (num === that.data.files.length) {
            let r = that.data.postData
            r['img']=tempIds
            that.setData({postData:r})
            that.saveData()
          }
        },
      })
    }
  },

  saveData: function () {
    let r = this.data.postData,that=this
    r['type'] = "图文"
    r['user'] = that.data.userInfo
    r['nurse'] = that.data.nurse
    wx.cloud.callFunction({
      name: 'xj_addWen',
      data: {
        postData: r
      },
      success: res => {
        console.log('xj_addWen--->',res)
        that.sendMassage(res.result._id)
        that.sendSms()
      },
      fail: err => {
        console.log(err)
      }
    })
  },

  sendMassage: function (wid) {
    wx.cloud.callFunction({
      name: "image_sendMassage",
      data: {
        wid: wid,
        name: this.data.nurse.name,
        openid: this.data.nurse.openid
      },
      success(res) {
        console.log('image_sendMassage--->', res)//////////
        wx.reLaunch({
          url: './wen',
        })
      },
      fail(res) {
        console.log("读取失败", res)
      }
    })
  },

  sendSms: function () {
    console.log(this.data.nurse.phone)
    let code=[]
    code[0]=this.data.nurse.name
    code[1] ='图文咨询'
    let phone=this.data.nurse.phone
    wx.cloud.callFunction({
      name: "sndSms",
      data: {
        phone: phone,
        code: code,
        templateid: '555068'
      },
      success(res) {
        console.log('sndSms--->', res)//////////
      },
      fail(res) {
        console.log("读取失败", res)
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