//日期转换为年月日格式
//type=1 2017-09-05 15:09:05
//type=2 2017-09-05
//type=3 15:09
function dateForm(v,type){
    var myDate = new Date(v)
    var year = myDate.getFullYear()
    var month = (myDate.getMonth() + 1) > 9 ? (myDate.getMonth() + 1) : '0' + (myDate.getMonth() + 1)
    var date = myDate.getDate() > 9 ? myDate.getDate() : '0' + myDate.getDate()
    var hour = myDate.getHours() > 9 ? myDate.getHours() : '0' + myDate.getHours()
    var minute = myDate.getMinutes() > 9 ? myDate.getMinutes() : '0' + myDate.getMinutes()
    var second = myDate.getSeconds() > 9 ? myDate.getSeconds() : '0' + myDate.getSeconds()
	if(type == 1){
		 return year + '-' + month + '-' + date + ' ' + hour  + ':' + minute + ':' + second
	}else if(type == 2){
		return year + '-' + month + '-' + date
	}else if(type == 3){
		return hour + ':' + minute + ':' + second
	}else if(type == 4){
	  return minute + ':' + second
  }
}
function getTimeStamp(date) {
  var myDate
  if(date){
    myDate = new Date(date)
  }else{
    myDate = new Date()
  }
  var year = myDate.getFullYear()
  var month = myDate.getMonth()
  var day = myDate.getDate()
  return  new Date(year, month, day, 0, 0, 0).getTime()
}
function consultTypeHandler(key,val){
	var consultType = {
		'FaceToFace':1,
		'Chat':11,
		'PhoneTalk':21
	}
	if(key && val == null){
		return consultType[key]
	}else if(key == null){
		for(var i in consultType){
			if(val == consultType[i]){
				return i
			}
		}
	}
}
/**
 * 判断一个对象中是否存在某个值
 * */
function hasKey(key,item){
  var flag = false
  for(var i in item){
    if(key == i){
      flag = true
      break
    }
  }
  return flag
}
function payInfo (item){
  return {
    app_id:'2017031406210593',
    charset:'utf-8',
    method:'alipay.trade.app.pay',
    sign_type:'RSA2',
    timestamp:dateForm(new Date(),1),
    version:'1.0',
    notify_url:'http://webapi.rightpsy.com/PayCallBack/AliPayNoticefy',
    biz_content:item
  }
}
function dataURItoBlob(base64Data) {
  var byteString;
  if (base64Data.split(',')[0].indexOf('base64') >= 0)
    byteString = atob(base64Data.split(',')[1]);
  else
    byteString = unescape(base64Data.split(',')[1]);
  var mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ia], {type:mimeString});
}

export {
	dateForm,
	consultTypeHandler,
  getTimeStamp,
  payInfo,
  dataURItoBlob,
  hasKey
}
