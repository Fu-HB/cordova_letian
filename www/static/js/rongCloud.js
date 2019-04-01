import {hasKey} from './handler'

var rongcloudMixin = {
  data() {
    return {
      doctorId: ''
    }
  },
  computed: {
    loginResult() {
      return this.$store.state.loginResult
    },
    currentLoginUserId() {
      return this.$store.getters.currentLoginUserId
    }
  },
  watch: {
    // 当重新登录后需要重新连接融云
    'loginResult'(newVal, oldVal) {
      if (Object.keys(newVal).length) {
        this.rongCloudConnect()
      }
    },
    '$route'(newVal, oldVal) {
      if (newVal.name == 'Chat') {
        //console.log(newVal)
        this.doctorId = newVal.params.targetId
      } else {
        this.doctorId = ''
      }
    }
  },
  methods: {
    // 融云连接和消息监听
    rongCloudConnect() {
      let that = this
      var rongCloudToken = that.$store.state.loginResult.rongCloudToken || ''
      if (rongCloudToken) {
        // 设置连接监听状态 （ status 标识当前连接状态）
        // 连接状态监听器
        RongIMClient.setConnectionStatusListener({
          onChanged: function (status) {
            switch (status) {
              //链接成功
              case RongIMLib.ConnectionStatus.CONNECTED:
                console.log('链接成功');
                break;
              //正在链接
              case RongIMLib.ConnectionStatus.CONNECTING:
                console.log('正在链接');
                break;
              //重新链接
              case RongIMLib.ConnectionStatus.DISCONNECTED:
                console.log('断开连接');
                break;
              //其他设备登陆
              case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
                console.log('其他设备登陆');
                break;
              //网络不可用
              case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
                console.log('网络不可用');
                break;
            }
          }
        });
        // 消息监听器
        RongIMClient.setOnReceiveMessageListener({
          // 接收到的消息
          onReceived: function (message) {
            // 判断消息类型
            switch (message.messageType) {
              case RongIMClient.MessageType.TextMessage:
                //发送的消息内容将会被打印
                if (message.senderUserId != that.currentLoginUserId) {
                  that.getMsgHandler(message)
                }
                break;
              case RongIMClient.MessageType.ImageMessage:
                // do something...
                break;
              case RongIMClient.MessageType.DiscussionNotificationMessage:
                // do something...
                break;
              case RongIMClient.MessageType.LocationMessage:
                // do something...
                break;
              case RongIMClient.MessageType.RichContentMessage:
                // do something...
                break;
              case RongIMClient.MessageType.DiscussionNotificationMessage:
                // do something...
                break;
              case RongIMClient.MessageType.InformationNotificationMessage:
                // do something...
                break;
              case RongIMClient.MessageType.ContactNotificationMessage:
                // do something...
                break;
              case RongIMClient.MessageType.ProfileNotificationMessage:
                // do something...
                break;
              case RongIMClient.MessageType.CommandNotificationMessage:
                // do something...
                break;
              case RongIMClient.MessageType.CommandMessage:
                // do something...
                break;
              case RongIMClient.MessageType.UnknownMessage:
                // do something...
                break;
              default:
              // 自定义消息
              // do something...
            }
          }
        })
        //链接融云的服务器
        RongIMClient.connect(rongCloudToken, {
          onSuccess: function (userId) {
            //console.log("Login successfully." + userId);
          },
          onTokenIncorrect: function () {
            //console.log('token无效');
          },
          onError: function (errorCode) {
            var info = '';
            switch (errorCode) {
              case RongIMLib.ErrorCode.TIMEOUT:
                info = '超时';
                break;
              case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                info = '未知错误';
                break;
              case RongIMLib.ErrorCode.UNACCEPTABLE_PaROTOCOL_VERSION:
                info = '不可接受的协议版本';
                break;
              case RongIMLib.ErrorCode.IDENTIFIER_REJECTED:
                info = 'appkey不正确';
                break;
              case RongIMLib.ErrorCode.SERVER_UNAVAILABLE:
                info = '服务器不可用';
                break;
            }
            //console.log(errorCode);
          }
        });
        //重新连接
        var callback = {
          onSuccess: function (userId) {
            console.log("Reconnect successfully." + userId);
          },
          onTokenIncorrect: function () {
            console.log('token无效');
          },
          onError: function (errorCode) {
            console.log(errorcode);
          }
        };
        var config = {
          // 默认 false, true 启用自动重连，启用则为必选参数
          auto: true,
          // 重试频率 [100, 1000, 3000, 6000, 10000, 18000] 单位为毫秒，可选
          url: 'http://cdn.ronghub.com/RongIMLib-2.3.0.min.js',
          // 网络嗅探地址 [http(s)://]cdn.ronghub.com/RongIMLib-2.2.6.min.js 可选
          rate: [100, 1000, 3000, 6000, 10000]
        };
        RongIMClient.reconnect(callback, config);
      }
    },
    // 消息处理
    getMsgHandler(message) {
      //console.log(message)
      let senderUserId = message.senderUserId
      //接收消息，当第一次接收到某人的消息时，需要新增消息项
      let msgHistory = this.$store.state.msgHistory
      let currentLoginMsg = msgHistory[this.currentLoginUserId]
      if (!hasKey(senderUserId, currentLoginMsg)) {
        currentLoginMsg[senderUserId] = []
      }
      //相隔一分钟收到消息显示时间
      let showSendTime = false
      let targetItem = currentLoginMsg[senderUserId]
      if (targetItem.length) {
        //console.log(message.sentTime  - targetItem[targetItem.length - 1].sentTime)
        if (message.sentTime - targetItem[targetItem.length - 1].sentTime >= 60000) {
          showSendTime = true
        } else {
          showSendTime = false
        }
      }
      //对某聊天对象添加消息
      currentLoginMsg[senderUserId].push({
        messageType: message.messageType,//消息的类型
        content: RongIMLib.RongIMEmoji.emojiToHTML(message.content.content),//消息的内容
        targetId: senderUserId,//发送者的ID
        sentTime: message.sentTime,//发送的时间
        showSendTime: showSendTime,//是否显示发送时间
        position: 'left',//消息显示位置
        hadRead: senderUserId == this.doctorId ? true : false //判断改消息是否已读
      })
      msgHistory[this.currentLoginUserId] = currentLoginMsg
      this.$store.dispatch('set_msgHistory', msgHistory)
    }
  },
  created() {
    this.rongCloudConnect()
  }
}
export {rongcloudMixin}
