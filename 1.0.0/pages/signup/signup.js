//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    tip:"",
    username: '',
    phone: ""
  },
  makeCall:function(e){
    wx.makePhoneCall({
      phoneNumber: '4000288383' //仅为示例，并非真实的电话号码
    });
  },
  formBindsubmit:function(e){
    var self=this;
    if(e.detail.value.username.length==0||e.detail.value.phone.length==0){
        this.setData({
          tip:'提示：用户名和手机号不能为空！',
          username:'',
          phone:''
        });
    }else if(e.detail.value.username.length>6||e.detail.value.phone.length>11){
        this.setData({
          tip:'提示：用户名和手机号超过指定长度！',
          username:'',
          phone:''
        });
    }else{
        this.setData({
          tip:'',
          username:e.detail.value.username,
          phone:e.detail.value.phone
        });
        console.log(this.data);
        wx.request({
          url: getApp().data.serverurl+'/wxapp/rest/singUp',
          data:e.detail.value,
          method:"POST",
          header: {
              'content-type': 'application/json'
          },
          success: function(res) {
            console.log(res.data);
            if((res.data.success))
            {
              wx.showModal({
                showCancel:false,
                title: '提示',
                content: '提交成功!',
                success: function(res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                    self.setData({
                      tip:'提交成功！',
                      username:'',
                      phone:''
                    });
                  }
                }
              })
            }else{
              wx.showModal({
                showCancel:false,
                title: '提示',
                content: '提交失败!',
                success: function(res) {
                  if (res.confirm) {
                    self.setData({
                      tip:'提交成功！',
                      username:'',
                      phone:''
                    });
                  }
                }
              })
            }
          },
          fail: function(res) {
            console.log("fail",res);
          },
          complete: function(res) {
            console.log("complete",res);
          }
        });
    }
  },
  formReset:function(){
    this.setData({
      tip:'',
      username:'',
      phone:''
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
