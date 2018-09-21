const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function getDrawSize(canvasCtx, imagePath, callback) {
  console.log("getDrawSize:"+imagePath);
  var drawSize = wx.getSystemInfo({
    success: function (res) {
      var drawSize = {};
      var windowWidth = res.windowWidth;
      var windowHeight = res.windowHeight;
      wx.getImageInfo({
        src: imagePath,
        success: function (res) {
          // console.log("resWidth:" + res.width + "///" + "resHeight：" + res.height)
          // console.log("windowWidth:" + windowWidth + "///" + "windowHeight：" + windowHeight)
          var drawWidth = 0;
          var drawHeight = 0;
          var startX = 0;
          var startY = 0;
          if (res.width > res.height) {
            drawHeight = res.height;
            drawWidth = drawHeight * (windowWidth / (windowHeight * 0.6));
            startY = 0;
            startX = (res.width - drawWidth) / 2;
          } else {
            drawWidth = res.width;
            drawHeight = drawWidth * ((windowHeight * 0.6) / windowWidth);
            startX = 0;
            startY = (res.height - drawHeight) / 2;
          }

          drawSize.width = drawWidth;
          drawSize.height = drawHeight;
          drawSize.startX = startX;
          drawSize.startY = startY;
          drawSize.canvasWidth = windowWidth;
          drawSize.canvasHeight = windowHeight * 0.6;

          callback(canvasCtx, imagePath, drawSize);
        }
      })
    },
  });
}

function post2FacePlusPlusDetect(imagePath) {
  var promise = new Promise((resolve, reject)=>{
    console.log("post2FacePlusPlusDetect:"+imagePath)
    wx.uploadFile({
      url: 'https://api-cn.faceplusplus.com/facepp/v3/detect',
      filePath: imagePath,
      name: 'image_file',
      formData: {
        'api_key': 'kceP8s2Sl7q3yjju9JBblxwzrnWrM0cz',
        'api_secret': 'ErW_B1EQg4dUCs5oqhKAZOUqGNDU-7qK',
        'return_attributes': 'gender,age,smiling,headpose,facequality,blur,eyestatus,emotion,ethnicity,beauty,mouthstatus,eyegaze,skinstatus',
      },
      success: function (res) {
        if(res.statusCode == 200 ){
          var data = res.data;
          console.log(data);
          resolve(res.data);
        }else{
          console.log("statusCode:"+res.statusCode)
          reject(res.statusCode)
        }
      },
      fail: function(e){
        console.log(e)
        console.log("network error")
        reject('-1');//网络出错
      }
    })
  });
  return promise;
}

function resizeRectangle(oldRectangle, drawSize){
  return new Promise((resolve, reject) => {
    var newRectangle = {}
    newRectangle["left"] = (oldRectangle["left"] - drawSize.startX) * drawSize.canvasWidth / drawSize.width;
    newRectangle["top"] = (oldRectangle["top"] - drawSize.startY) * drawSize.canvasHeight / drawSize.height;
    newRectangle["width"] = oldRectangle["width"] * drawSize.canvasWidth / drawSize.width;
    newRectangle["height"] = oldRectangle["height"] * drawSize.canvasHeight / drawSize.height;

    resolve(newRectangle);
  })
}
module.exports = {
  formatTime: formatTime,
  getDrawSize: getDrawSize,
  post2FacePlusPlusDetect: post2FacePlusPlusDetect,
  resizeRectangle: resizeRectangle
}

