const debug = process.env.NODE_ENV === 'production' ? false : true
const URL_Base = debug ? '/api':'http://webapi.rightpsy.com/api'
//文章
const URL_WebArticle = '/WebArticle'
const URL_WebArticle_CateList = '/GetWebArticleCateList'
const URL_WebArticle_List = '/GetWebArticleList'
const URL_WebArticle_Info = '/GetWebArticleInfo'
const URL_Article = '/Article'
const URL_Article_List = '/GetArticleList'
const URL_Article_Info = '/GetArticleInfo'
const URL_Article_CommentList = '/GetArticleCommonetList'
const URL_Article_Praise = '/DoArticlePraise'
const URL_Article_Comment = '/DoArticleCommentReply'
//用户
const URL_User = '/User'
const URL_User_Register = '/Register'
const URL_User_Login = '/Login'
const URL_User_LoginByCode = '/LoginBySmsCode'
const URL_User_Info = '/GetUserInfo'
const URL_User_NickName = '/ModifyNickName'
const URL_User_Sex = '/ModifyUserSex'
const URL_User_Birthday = '/ModifyUserBirthday'
const URL_User_PostActive = '/SetPostActive'
const URL_User_ForgetPwd = '/ForgetPwd'
const URL_User_ModifyPassword = '/ModifyPassword'
const URL_User_ModifyUserCompanyID = '/ModifyUserCompanyID'
//消息
const URL_Message = '/Message'
const URL_Message_GetMessageList = '/GetMessageList'
//工具
const URL_Utils = '/Utils'
const URL_Utils_ConsultTypeList = '/GetConsultTypeList'
const URL_Utils_ConsultFeeList = '/GetConsultFeeList'
const URL_Utils_ConsultPsyAndTitleList = '/GetUserPsyAndTitleList'
const URL_Utils_SendShortMsgByTypeID = '/SendShortMsgByTypeID'
const URL_Utils_CheckShortMsg = '/CheckShortMsgCode'
const URL_Utils_UploadPhoto = '/UploadPhoto'
const URL_Utils_GetCompanyList = '/GetCompanyList'
//预约
const URL_Consult = '/Consult'
const URL_Region  = '/Region'
const URL_Consult_Letter = '/AddUserLetter'
const URL_Consult_GetUserLetterList = '/GetUserLetterList'
const URL_Consult_DoctorList = '/GetConsultDoctorList'
const URL_Consult_DoctorFullInfo = '/GetConsultDoctorFullInfo'
const URL_Consult_DoConsultAppointment = '/DoConsultAppointment'
const URL_Consult_GetTencentParams = '/GetTencentParams'
const URL_Consult_GetAliPayParams = '/GetAliPayParamsV2'
const URL_Consult_CheckAliParamsState = '/CheckAliParamsState'
const URL_Consult_ConsultList = '/GetMyConsultList'
const URL_Consult_OrderInfo = '/GetConsultOrderInfo'
const URL_Consult_CancelConsultOrder = '/DoCancelConsultOrder'
const URL_Consult_BackConsultOrder = '/DoBackConsultOrder'
//咨询师
const URL_DoctorSet = '/DoctorSet'
const URL_DoctorSet_DayConsultInfo = '/GetDayConsultInfo'
const URL_DoctorSet_SetDoctorConsultDate = '/DoSetDoctorConsultDate'
const URL_RegionLIst = '/GetBusinessRegion'
const URL_GetConsultDoctorInfo = '/GetConsultDoctorInfo'
//活动
const URL_Active = '/Active'
const URL_Active_List = '/GetActiveList'
const URL_ActiveListByType = '/GetActiveListByTypeID'
const URL_Artive_Info = '/GetActiveInfo'

//文章列表
const WebArticleList = URL_Base + URL_WebArticle + URL_WebArticle_List
const WebArticleCateList = URL_Base + URL_WebArticle + URL_WebArticle_CateList
const WebArticleInfo = URL_Base + URL_WebArticle + URL_WebArticle_Info
const ActiveListByType = URL_Base + URL_Active + URL_ActiveListByType
const ActiveInfo = URL_Base + URL_Active + URL_Artive_Info
const ArticleList = URL_Base + URL_Article + URL_Article_List
const ArticleInfo = URL_Base + URL_Article + URL_Article_Info
const ArticleCommentList = URL_Base + URL_Article + URL_Article_CommentList
const ArticleDoPraise = URL_Base + URL_Article + URL_Article_Praise
const ArticleDoComment = URL_Base + URL_Article + URL_Article_Comment
//咨询
const ConsultFeeList = URL_Base + URL_Utils + URL_Utils_ConsultFeeList
const ConsultPsyAndTitleList = URL_Base + URL_Utils + URL_Utils_ConsultPsyAndTitleList
const ConsultRegionLIst = URL_Base + URL_Region + URL_RegionLIst
const ConsultDoctorList = URL_Base + URL_Consult + URL_Consult_DoctorList
const ConsultDoctorFullInfo = URL_Base + URL_Consult + URL_Consult_DoctorFullInfo
const ConsultDoctorInfo = URL_Base + URL_Consult + URL_GetConsultDoctorInfo
const ConsultDoctorDayConsultInfo = URL_Base + URL_DoctorSet + URL_DoctorSet_DayConsultInfo
const ConsultDoctorAppointment = URL_Base + URL_Consult + URL_Consult_DoConsultAppointment
const LetterUrl = URL_Base + URL_Consult + URL_Consult_Letter
const UserLetterList = URL_Base + URL_Consult + URL_Consult_GetUserLetterList

//订单
const ConsultOrderList = URL_Base + URL_Consult + URL_Consult_ConsultList
const ConsultOrderInfo = URL_Base + URL_Consult + URL_Consult_OrderInfo
const CancelConsultOrder = URL_Base + URL_Consult + URL_Consult_CancelConsultOrder
const BackConsultOrder = URL_Base + URL_Consult + URL_Consult_BackConsultOrder
const SetDoctorConsultDate = URL_Base + URL_DoctorSet + URL_DoctorSet_SetDoctorConsultDate
//用户信息
const UserInfo = URL_Base + URL_User + URL_User_Info
const UserNickName = URL_Base + URL_User + URL_User_NickName
const UserSex = URL_Base + URL_User + URL_User_Sex
const UserBirthday = URL_Base + URL_User + URL_User_Birthday
const UserForgetPwd = URL_Base + URL_User + URL_User_ForgetPwd
const UserModifyPassword = URL_Base + URL_User + URL_User_ModifyPassword
const UserPostActive = URL_Base + URL_User + URL_User_PostActive
const UserCompanyList = URL_Base + URL_Utils + URL_Utils_GetCompanyList
const UserModifyUserCompanyID = URL_Base + URL_User + URL_User_ModifyUserCompanyID
//微信支付配置
const TencentParams = URL_Base + URL_Consult + URL_Consult_GetTencentParams
const CheckAliParams = URL_Base + URL_Consult + URL_Consult_CheckAliParamsState
//支付宝预支付
const AlipaySign = URL_Base + URL_Consult + URL_Consult_GetAliPayParams
//短信
const SendShortMsgByTypeID = URL_Base + URL_Utils + URL_Utils_SendShortMsgByTypeID
const CheckShortMsg = URL_Base + URL_Utils + URL_Utils_CheckShortMsg
const Login = URL_Base + URL_User + URL_User_Login
const QuickLogin = URL_Base + URL_User + URL_User_LoginByCode
const Register = URL_Base + URL_User + URL_User_Register
//消息
const MessageList = URL_Base + URL_Message + URL_Message_GetMessageList
//头像上传
const UploadPhoto = 'http://image.rightpsy.com/api' + URL_Utils + URL_Utils_UploadPhoto
export {
  ActiveInfo,
	ActiveListByType,
	WebArticleList,
	WebArticleCateList,
	WebArticleInfo,
  ArticleList,
  ArticleInfo,
  ArticleCommentList,
  ArticleDoPraise,
  ArticleDoComment,
  UserLetterList,
  ConsultDoctorDayConsultInfo,
  ConsultDoctorAppointment,
	ConsultFeeList,
  ConsultDoctorInfo,
  LetterUrl,
  SetDoctorConsultDate,
	ConsultPsyAndTitleList,
  ConsultRegionLIst,
	ConsultDoctorList,
  ConsultDoctorFullInfo,
  ConsultOrderList,
  ConsultOrderInfo,
  CancelConsultOrder,
  BackConsultOrder,
  UserInfo,
  UserNickName,
  UserSex,
  UserBirthday,
  UserPostActive,
  UserForgetPwd,
  UserModifyPassword,
  UserCompanyList,
  UserModifyUserCompanyID,
	SendShortMsgByTypeID,
  CheckShortMsg,
  CheckAliParams,
  TencentParams,
  AlipaySign,
	Login,
  QuickLogin,
	Register,
  UploadPhoto,
  MessageList
}
