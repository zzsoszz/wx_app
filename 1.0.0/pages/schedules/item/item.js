var order = ['red', 'yellow', 'blue', 'green', 'red'];
var WxParse = require('../../../wxParse/wxParse.js');
Page({
  data: {
    content: 'red'
  },
  upper: function(e) {
    console.log(e)
  },
  onLoad: function(options) {
    var that = this; 
    wx.request({
      url: getApp().data.serverurl+'/wxapp/rest/micclass/detail',
      data:options.id,
      method:"POST",
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res.data.data);
        if(res.data.success){
          that.setData({content:res.data.data.richHtml.content});
          WxParse.wxParse('article', 'html', res.data.data.richHtml.content, that,5);
        };
      },
      fail: function(res) {
        console.log(res.data);
      },
      complete: function(res) {
        console.log(res.data);
      }
    });

  }
})