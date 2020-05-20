Page({
  onLoad: function (options) {
    wx.showLoading({
      title: '正在加载...',
      mask: true,
    })
    let that = this;
    //读取users表数据
    wx.cloud.callFunction({
      name: "get_zhao",
      success(res) {
        console.log("读取成功", res.result.data)
        that.savaExcel(res.result.data)
      },
      fail(res) {
        console.log("读取失败", res)
      }
    })
  },

  //把数据保存到excel里，并把excel保存到云存储
  savaExcel(userdata) {
    let that = this
    wx.cloud.callFunction({
      name: "get_excel",
      data: {
        userdata: userdata
      },
      success(res) {
        console.log("保存成功", res)
        that.getFileUrl(res.result.fileID)
      },
      fail(res) {
        console.log("保存失败", res)
      }
    })
  },

  //获取云存储文件下载地址，这个地址有效期一天
  getFileUrl(fileID) {
    let that = this;
    wx.cloud.getTempFileURL({
      fileList: [fileID],
      success: res => {
        // get temp file URL
        console.log("文件下载链接", res.fileList[0].tempFileURL)
        that.setData({
          fileUrl: res.fileList[0].tempFileURL
        })
        wx.hideLoading()
      },
      fail: err => {
        // handle error
      }
    })
  },
  //打开Excel
  toOpen: function () {
    let that=this;
    wx.downloadFile({
      // 示例 url，并非真实存在
      url: that.data.fileUrl,
      success: function (res) {
        const filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log(res)
          },
          fail: function (err) {
            console.log(err)
          }
        })
      }
    })
  },
  //复制excel文件下载链接
  copyFileUrl() {
    let that = this
    wx.setClipboardData({
      data: that.data.fileUrl,
      success(res) {
        wx.getClipboardData({
          success(res) {
            console.log("复制成功", res.data) // data
          }
        })
      }
    })
  }
})