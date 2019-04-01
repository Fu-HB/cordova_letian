 function wechatShare(config,type) {
  //console.log(config,type)
  var message = {
    title: config.ArticleName,
    description: '',
    thumb: config.ArticleImg,
    media: {
      type:Wechat.Type.WEBPAGE,
      webpageUrl:config.ArticleUrl}
  }
  if(type == 'TIMELINE') {
    Wechat.share({
      message: message,
      scene: Wechat.Scene.TIMELINE   // share to Timeline
    }, function () {
      // alert("Success");
    }, function (reason) {
      // alert("Failed: " + reason);
    });
  }else{
    Wechat.share({
      message: message,
      scene: Wechat.Scene.SESSION   // share to Timeline
    }, function () {
      // alert("Success");
    }, function (reason) {
      // alert("Failed: " + reason)
    })
  }
}

function QQshare(config,type){
  var args = {}
  args.client = QQSDK.ClientType.QQ;//QQSDK.ClientType.QQ,QQSDK.ClientType.TIM;
  args.url = config.ArticleUrl;
  args.title = config.ArticleName;
  args.description = config.CreatedByString;
  args.image = config.ArticleImg;
  if(type == 'QQZone') {
    args.scene = QQSDK.Scene.QQZone;//QQSDK.Scene.QQZone,QQSDK.Scene.Favorite
  }else{
    args.scene = QQSDK.Scene.Favorite;
  }

  QQSDK.shareNews(function () {
    alert('shareNews success');
  }, function (failReason) {
    alert(failReason);
  }, args);

}

function weiboShare(config,type){
    var args = {};
    args.url = config.ArticleUrl;
    args.title = config.ArticleName;
    args.description = config.CreatedByString;
    args.image = config.ArticleImg;

    WeiboSDK.shareToWeibo(function () {
      alert('share success')
    }, function (failReason) {
      alert(failReason)
    }, args)
}
export {
  wechatShare,
  QQshare,
  weiboShare
}
