Page({
  data:{
    items:[]
  },
  onLoad:function()
  {
        console.log("aaaaa",getApp().data.serverurl+'/wxapp/rest/schedules');
        var that=this;
        wx.request({
          url: getApp().data.serverurl+'/wxapp/rest/schedules',
          method:"POST",
          header: {
              'content-type': 'application/json'
          },
          success: function(res) {
            console.log(res.data);
            that.setData({items:res.data.data});
          },
          fail: function(res) {
            console.log("fail",res)
          },
          complete: function(res) {
            console.log("complete",res)
          }
        });
  }
})