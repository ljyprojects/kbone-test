//index.js
const app = getApp()
const TxvContext = requirePlugin("tencentvideo");

Page({
  data: {
    danmuList: [{
      text: '第 1s 出现的弹幕',
      color: '#ff0000',
      time: 1
    }, {
      text: '第 3s 出现的弹幕',
      color: '#ff00ff',
      time: 3
    }, {
      text: '第 3s 出现的弹幕2',
      color: '#ff00ff',
      time: 3
    }, {
      text: '第 30s 出现的弹幕',
      color: '#ff00ff',
      time: 30
    }],
  },
  play(){
    
    let txvContext = TxvContext.getTxvContext('txv1')
   console.log(txvContext)
   txvContext.play()
  },
  pause(){
   
    let txvContext = TxvContext.getTxvContext('txv1')
   console.log(txvContext)
   txvContext.pause()
  },
  onLoad: function() {
    
  },

})
