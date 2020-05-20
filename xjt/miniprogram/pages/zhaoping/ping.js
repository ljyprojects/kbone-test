// pages/zhaoping/ping
var t = getApp(), e = t.requirejs("core"), a = t.requirejs("foxui"), n = t.requirejs("jquery"), i = t.requirejs("biz/diyform");

Page({

  data: {
    jobs:[],
    jobIndex:0,
    education:[],
    educationIndex:0,
    worktime:[],
    worktimeIndex:0,
    phoneNumber:'',
    btnLoading: false,
    btnDisabled: false,
    ifUpload: false,
    ifSubmit: false,
    resumeName: '',
    resumeno: '',
    date: '1995-09-01',
    houseItems: [
      { name: '否', value: '0', checked: true  },
      { name: '是', value: '1'}
    ],
    radioItems: [
      { name: '男', value: '0', checked: true },
      { name: '女', value: '1' }
    ],
    postData: {},
    region: ['广东省', '深圳市', '福田区'],
    address: ['广东省', '深圳市', '龙岗区'],
  },

  onLoad: function (options) {
    this.init()
    wx.showShareMenu({
      //设为true，获取ShareTicket
      withShareTicket: true
    })
  },

  async init (){
    await this.initLog()
    await this.initStr()
  },

  initStr: function(){
    return new Promise((reslove, reject) => {
      let that = this;
      wx.cloud.callFunction({
        name: "get_setting"
      }).then((res) => {
        let data = res.result.data[0]
        console.log("读取成功", data)//////////////////
        that.setData({
          education:data.education,
          jobs:data.jobs,
          worktime:data.worktime
        })
        reslove
      }).catch((err)=>{
        console.error(err)
        reject(err)
      })
      reslove()
    })
  },

  initLog: function () {
    return new Promise((reslove, reject) => {
      let that = this;
      wx.cloud.callFunction({
        name: "get_iflog"
      }).then((res) => {
        console.log("initLog读取成功", res.result.data)//////////////////
        if (res.result.data.length > 0) {
          that.setData({ifSubmit:true,resumeno:res.result.data[0].resumeno})
        }
        reslove
      }).catch((err) => {
        console.error(err)
        reject(err)
      })
      reslove()
    })
  },

  onShow: function () {
    this.setData({ btnDisabled: false, btnLoading: false })
  },


  onChange: function (t) {///////////input
    console.log(t);
    var a = t.detail.value, i = e.pdata(t).type, r = this.data.postData;
    r[i] = n.trim(a), this.setData({
      postData: r
    });
    console.log(this.data.postData);
  },

  bindEducationChange: function (e) {///////////picker最高学历
    this.setData({
      educationIndex: e.detail.value
    })
    console.log('picker account', e);
    console.log('picker account 发生选择改变，携带值为', e.target.dataset.type);

    var a = this.data.education[this.data.educationIndex], i = e.target.dataset.type, r = this.data.postData;
    r[i] = n.trim(a), this.setData({
      postData: r
    });
    console.log(this.data.postData);
  },

  bindJobnameChange: function (e) {///////////picker应聘岗位
    this.setData({
      jobIndex: e.detail.value
    })
    console.log('picker account', e);
    console.log('picker account 发生选择改变，携带值为', e.target.dataset.type);

    var a = this.data.jobs[this.data.jobIndex], i = e.target.dataset.type, r = this.data.postData;
    r[i] = n.trim(a), this.setData({
      postData: r
    });
    console.log(this.data.postData);
  },

  bindDateChange: function (e) {/////////////picker生日
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var r=this.data.postData;
    r['birthday'] = e.detail.value
    this.setData({
      date: e.detail.value,
      postData:r
    })
  },

  bindRegionChange: function (e) {/////////////picker籍贯
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var r = this.data.postData;
    r['province'] = e.detail.value
    this.setData({
      region: e.detail.value,
      postData: r
    })
  },

  bindAddressChange: function (e) {/////////////picker现在住址
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var r = this.data.postData;
    r['address'] = e.detail.value
    this.setData({
      address: e.detail.value,
      postData: r
    })
  },

  bindJoinChange: function (e) {///////////picker到岗时间
    this.setData({
      worktimeIndex: e.detail.value
    })
    console.log('picker account', e);
    console.log('picker account 发生选择改变，携带值为', e.target.dataset.type);

    var a = this.data.worktime[this.data.worktimeIndex], i = e.target.dataset.type, r = this.data.postData;
    r[i] = n.trim(a), this.setData({
      postData: r
    });
    console.log(this.data.postData);
  },


  radioChange: function (e) {////////////radio性别
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].name == e.detail.value;
    }

    this.setData({
      radioItems: radioItems
    });

    var a = e.detail.value, i = e.target.dataset.type, r = this.data.postData;
    r[i] = n.trim(a), this.setData({
      postData: r
    });
    console.log(this.data.postData);
  },

  houseChange: function (e) {////////////radio住宿
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var houseItems = this.data.houseItems;
    for (var i = 0, len = houseItems.length; i < len; ++i) {
      houseItems[i].checked = houseItems[i].name == e.detail.value;
    }

    this.setData({
      houseItems: houseItems
    });

    var a = e.detail.value, i = e.target.dataset.type, r = this.data.postData;
    r[i] = n.trim(a), this.setData({
      postData: r
    });
    console.log(this.data.postData);
  },

//上传简历


  chooseFile: function () {
    let that = this, r = this.data.postData;
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFiles[0].path
        that.setData({ resumeName: res.tempFiles[0].name })
        console.log('tempFilePaths--->', tempFilePaths)///////////////
        wx.cloud.uploadFile({
          cloudPath: `resume/${Math.random()}_${Date.now()}.${tempFilePaths.match(/\.(\w+)$/)[1]}`,
          filePath: tempFilePaths,
          success: res => {
            //that.showToast('文件上传成功！');
            console.log('uploadFile-res--->', res);/////////////////
            r['resume'] = res.fileID, that.setData({ postData: r, ifUpload: true });
            console.log('this.data.postData--->', r); ///////////////           
          },
          fail: err => {
            console.log('文件上传失败！', res);/////////////////
            //that.showToast('文件上传失败！')
          }
        })

      }
    })
  },//////chooseFile()

  //电话授权
  getPhoneNumber(e) {
    //console.log(JSON.stringify(e));/////////////
    wx.cloud.callFunction({
      name: 'openapi',
      data: {
        action: 'getcellphone',
        id: e.detail.cloudID
      }
    }).then(res => {
      //console.log('res: ', res.result.res.list[0].data.phoneNumber)/////////
      var phone = res.result.res.list[0].data.phoneNumber,r = this.data.postData;
      r['phone'] = n.trim(phone), this.setData({
        postData: r
      });
    })  
  },

  submit: function () {
    this.chkSub()
  }, 

  dateFormat: function (fmt, date) {
    let ret;
    const opt = {
      "Y+": date.getFullYear().toString(),        // 年
      "m+": (date.getMonth() + 1).toString(),     // 月
      "d+": date.getDate().toString(),            // 日
      "H+": date.getHours().toString(),           // 时
      "M+": date.getMinutes().toString(),         // 分
      "S+": date.getSeconds().toString()          // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for(let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
        fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
      };
    };
    return fmt;
  },

  onShareAppMessage() {
    return {
      title: '欢迎加入慧泰健康',
      path: '',
      imageUrl: '/images/f02.jpg',
      success: res => {
        wx.showToast({
          title: '转发成功!',
        })
      }
    }
  },

  chkSub: function () {
    var r = this.data.postData;

    if (r.realname == '' || !r.realname) {
      wx.showToast({
        title: '请输入姓名!',
      })
      return
    }

    if (r.phone == '' || !r.phone) {
      wx.showToast({
        title: '请输入电话!',
      })
      return
    }

    if (r.sex == '' || !r.sex) {////性别
      r['sex'] = this.data.radioItems[0].name, this.setData({ postData: r });
    }
    if (r.jobname == '' || !r.jobname) {////应聘岗位
      r['jobname'] = this.data.jobs[0], this.setData({ postData: r });
    }
    if (r.province == '' || !r.province) {////籍贯
      r['province'] = '广东省，深圳市，福田区', this.setData({ postData: r });
    }
    if (r.address == '' || !r.address) {////住址
      r['address'] = '广东省，深圳市，福田区', this.setData({ postData: r });
    }
    if (r.birthday == '' || !r.birthday) {////生日
      r['birthday'] = this.data.date, this.setData({ postData: r });
    }
    if (r.education == '' || !r.education) {////学历
      r['education'] = this.data.education[0], this.setData({ postData: r });
    }
    if (r.jiontime == '' || !r.jiontime) {////到岗时间
      r['jiontime'] = this.data.worktime[0], this.setData({ postData: r });
    }
    if (r.house == '' || !r.house) {////性别
      r['house'] = this.data.houseItems[0].name, this.setData({ postData: r });
    }
    this.saveSub()
    //console.log("r---this.data.postData", r);////////////////////////

  },
  
  saveSub: function () {
    var resumeno = Math.floor(Math.random() * (89999)) + 10000;

    console.log("---this.data.postData", this.data.postData);////////////////////////

    this.setData({ btnDisabled: true, btnLoading: true })

    var date = new Date();
    date = this.dateFormat("YYYY-mm-dd HH:MM", date)

    const db = wx.cloud.database();
    var postData = this.data.postData;

      db.collection('ljy_resume').add({
        data: {
          realname: postData.realname,
          sex: postData.sex,
          jobname: postData.jobname,
          phone: postData.phone,
          email: postData.email,
          province: postData.province,
          address: postData.address,
          birthday: postData.birthday,
          walfare: postData.walfare,
          education: postData.education,
          jiontime: postData.jiontime,
          house: postData.house,
          certifite: postData.certifite,
          experion: postData.experion,
          resume: postData.resume,
          resumeno: resumeno,////面试编号
          subtime: date,////提交时间
        },
        success: res => {
          // 在返回结果中会包含新创建的记录的 _id
          wx.showToast({
            title: '提交成功！',
          })
          wx.reLaunch({
            url: './ping',
          })
          console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '提交失败'
          })
          this.setData({ btnDisabled: true, btnLoading: true })
          console.error('[数据库] [新增记录] 失败：', err)
        }
      })
    }

})

