// pages/index/index.js
Page({
  data:{
    items: []
  },
  onLoad:function(options){
    var that = this; 
    wx.request({
      url: getApp().data.serverurl+'/wxapp/rest/micclass',
      data:options.id,
      method:"POST",
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res.data.data);
        if(res.data.success){
          var datanew=res.data.data.map(function(obj){
               var minutes=Math.floor(obj.classLength/60);
               var second=Math.floor(obj.classLength%60);
               obj.classLength=minutes+":"+second;
               return obj;
          });
          that.setData({items:datanew});
        };
      },
      fail: function(res) {
        console.log(res.data);
      },
      complete: function(res) {
        console.log(res.data);
      }
    });
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})