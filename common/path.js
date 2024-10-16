// 项目域名
// export const BASE_URL = 'https://frdhwapi.zsyflive.com'

// export const BASE_URL = 'http://192.168.1.32:9103'
// export const BASE_IMG = 'http://192.168.1.32:9103'

export const BASE_URL = 'https://cgjava.zsyflive.com'
export const BASE_IMG = 'https://cgjava.zsyflive.com'
// 大会简介
const cguserlogin =BASE_URL + '/api/cguser/login'
const updateUserInfo =BASE_URL + '/api/cguser/updateUserInfo'
const uploadFile =BASE_URL + '/api/public/upload'
const updatePwd =BASE_URL + '/api/cguser/updatePwd'
const getCgEventType =BASE_URL + '/api/cg/getCgEventType'
// 获取城管大队里欸包
const getTeamList =BASE_URL + '/api/cguser/getTeamList'
// 获取用户列表 
const getTeampeoples =BASE_URL + '/api/cguser/getTeampeoples'
// 提交代办事件
const addcgTreatDoMat =BASE_URL + '/api/cg/addcgTreatDoMat'
// 提交好人好事
const addHrhs =BASE_URL + '/api/cg/addHrhs'
// 获取轮播图
const getbanners =BASE_URL + '/api/cg/getbanners'
const toUserDaka =BASE_URL + '/api/cguser/toUserDaka'
// 获取我的待办事项 
const getDaibanShiList =BASE_URL + '/api/cguser/getDaibanShiList'
const getDaibanShiInfo =BASE_URL + '/api/cguser/getDaibanShiInfo'
// 点击开始待办事件 
const updateShijian =BASE_URL + '/api/cguser/updateShijian'
const updateShijian2 =BASE_URL + '/api/cguser/updateShijian2'
// 获取我的好人好事
const getMyHaorenhaoshi =BASE_URL + '/api/cguser/getMyHrhs'
// 获取我上传的事件  
const myUpDbsj =BASE_URL + '/api/cguser/myUpDbsj'
// 获取个数
const getShiCount =BASE_URL + '/api/cguser/getShiCount'
// 获取我的正月得考勤
const myDakaHistoryByUid =BASE_URL + '/api/cguser/myDakaHistoryByUid'
const tonewUserKaoqin =BASE_URL + '/api/public/tonewUserKaoqin'
// 事实定位判断是否在边界内
const myisweilan =BASE_URL + '/api/cguser/myisweilan'
// 导出考勤
const exportKaoqin =BASE_URL + '/api/cguser/exportKaoqin'
//打卡 
const getDakaTImess =BASE_URL + '/api/cguser/getDakaTImess'
// 我的消息列表  
const getMyMsg =BASE_URL + '/api/cguser/getMyMsg'
// 获取是否需要更新
const getversion =BASE_URL + '/api/cg/getversion'

 export default {
	 getversion,
	 getMyMsg,
	 getDakaTImess,
	 exportKaoqin,
	 myisweilan,
	 tonewUserKaoqin,
	 myDakaHistoryByUid,
	 getShiCount,
	 myUpDbsj,
	 getMyHaorenhaoshi,
	 updateShijian,updateShijian2,
	 getDaibanShiInfo,
	 toUserDaka,getDaibanShiList,
	 addHrhs,getbanners,
	 addcgTreatDoMat,
	 getTeampeoples,
	 getTeamList,
	 getCgEventType,
	 updateUserInfo,
	 uploadFile,updatePwd,
	 BASE_IMG,
	 cguserlogin,
 }
 