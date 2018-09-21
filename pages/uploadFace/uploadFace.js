// pages/uploadFace/uploadFace.js

var Util = require('../../utils/util.js');
const ctx = wx.createCanvasContext('exampleImageCanvas');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    exampleImagePath:"../../exampleImage/0.jpg",
    drawSize:{},

    beauty: {
      female_score: 60,
      male_score: 60
    },
    gender: "未知",
    emotion: "未知",
    age:18,
    skinstatus: {
      dark_circle: 0,
      stain: 0,
      acne: 0,
      health: 0
    },
    blurness:0,
    smile:0,
    glass:"",
    quality:100,
    ethnicity:"未知",

    face_rectangle: {
      width: 0,
      top: 0,
      left: 0,
      height: 0
    },

    aSumUp:"更受异性欢迎的,微笑着的,戴墨镜的,亚洲,美女"

  },
  onPullDownRefresh: function(){
    this.onReady()
  },

  onReady: function () {
    // var exmpImageIndex = this.getRandomNum();
    var exmpImageIndex = "1";
    var exmpImagePath = "exampleImage/" + exmpImageIndex + ".jpg";
    this.drawFaceImage(ctx, "../../"+exmpImagePath);
   
    Util.post2FacePlusPlusDetect(""+exmpImagePath)
      .then((data) => this.showFaceData(data)).catch((message)=>{console.log("error message:"+message)})

  },
  post2FacePlusPlusDetect: function(imagePath) {

  },
  showFaceData: function(data){
    var faceDataJson = JSON.parse(data)["faces"][0];
    console.log("faceDataJson:" + faceDataJson)
    this.drawRectangle(faceDataJson);
  },

  drawRectangle: function (faceDataJson) {
    var face_rectangle = faceDataJson["face_rectangle"];
    Util.resizeRectangle(face_rectangle, this.data.drawSize).then((newRectancle)=>{
      console.log("newRectancle:"+newRectancle)
      ctx.setStrokeStyle('red')
      ctx.strokeRect(newRectancle["left"], newRectancle["top"], newRectancle["width"], newRectancle["height"])
      ctx.draw()
    })
  },

  drawFaceImage: function(canvCtx, imagePath){
    var drawSize = Util.getDrawSize(canvCtx,imagePath, this.callBackDrawImage);
  },

  callBackDrawImage: function (canvCtx, imagePath, drawSize){
    this.setData({
      drawSize: drawSize
    })
    canvCtx.drawImage(imagePath, drawSize.startX, drawSize.startY, drawSize.width, drawSize.height, 0, 0, drawSize.canvasWidth, drawSize.canvasHeight);
    // canvCtx.draw()
  },


  getRandomNum: function(){
    var timestamp = (new Date()).valueOf();
    var randomNum = timestamp % 10;
    return randomNum;
  },

  uploadBtnTap: function() {
    var that=this
    wx.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      success: function (res) {
        console.log(res)
        var tempFilePaths = res.tempFilePaths
        // var xxxPath ="exampleImage/2.jpg"
        // var arrayBuffImage=that.urlToArrayBuff(tempFilePaths[0])
        // console.log("arrayBuffImage:" + arrayBuffImage)
        wx.uploadFile({
          url: 'https://api-cn.faceplusplus.com/facepp/v3/detect', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          // filePath: xxxPath,
          // image_file: arrayBuffImage,
          name: 'image_file',
          formData: {
            'api_key': 'kceP8s2Sl7q3yjju9JBblxwzrnWrM0cz',
            'api_secret': 'ErW_B1EQg4dUCs5oqhKAZOUqGNDU-7qK',
            'return_attributes': 'gender,age,smiling,headpose,facequality,blur,eyestatus,emotion,ethnicity,beauty,mouthstatus,eyegaze,skinstatus',

          },
          success: function (res) {
            var data = res.data
            console.log(data)
          }
        })
      },
    })
  },

  urlToArrayBuff: function(url) {
    Util.imageUrlToArrayBuff(url)
    var returnArrayBuff={}
    wx.request({
      url: url,
      responseType: 'arraybuffer', //最关键的参数，设置返回的数据格式为arraybuffer
      success: res => {
        console.log(res.data)
        returnArrayBuff=res.data
      }
    })
    return returnArrayBuff
  }
})