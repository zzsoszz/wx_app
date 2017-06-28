Page({
  data: {
  },
  upper: function(e) {
    console.log(e)
  },
  onLoad: function(options) {
    var  url=getApp().data.serverurl+'/wxapp/rest/micclass/detail';
    console.log("request",url);
    var that = this; 
    wx.request({
      url: url,
      data:options.id,
      method:"POST",
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res.data.data);
        if(res.data.success){
          var datanew=res.data.data;
          datanew.videos=datanew.videos.map(function(obj){
               obj.videoLength=Math.floor(obj.videoLength/60);
               return obj;
          });
          //datanew.classLength=Math.floor(datanew.classLength/60);
          that.setData(datanew);
        };
      },
      fail: function(res) {
        console.log("fail",res);
      },
      complete: function(res) {
        console.log("complete",res);
      }
    });
    
    
  }
})