import request from '@/common/request.js'
import { formatGetUri } from '@/common/util.js'
const api = {
	// GET /mini/getUserInfo用户信息
	getUserInfo:(params) => request.globalRequest(`/gas/mini/getUserInfo.mvc${formatGetUri(params)}`, 'GET',{}, 1),
	
	// GET /mini/getAlarmMapView地图分布
	getAlarmMapView:(params) => request.globalRequest(`/gas/mini/getAlarmMapView.mvc${formatGetUri(params)}`, 'GET',{}, 1),
	
	// 报警信息 request.globalRequest(`/gas/mini/getAlarmInfo`, 'GET',{}, 1)
	getAlarmInfo:(params) => request.globalRequest(`/gas/mini/getAlarmInfo.mvc${formatGetUri(params)}`, 'GET',{}, 1),
	
	// 报警信息详情 request.globalRequest(`/gas/mini/alarmDetailInfo`, 'GET',{}, 1)
	alarmDetailInfo:(params) => request.globalRequest(`/gas/mini/alarmDetailInfo.mvc${formatGetUri(params)}`, 'GET',{}, 1),
	
	// POST /gas/mini/saveAlarmRead保存已读状态
	saveAlarmRead:(params) => request.globalRequest(`/gas/mini/saveAlarmRead.mvc${formatGetUri(params)}`, 'POST', {}, 1),
	
	// /gas/mini/relieveAlarm解除报警
	relieveAlarm: (params) => request.globalRequest(`/gas/mini/relieveAlarm.mvc${formatGetUri(params)}`, 'GET',{}, 1),
	
	// GET /gas/mini/getEquipMonitor设备实时监测
	getEquipMonitor:(params) => request.globalRequest(`/gas/mini/getEquipMonitor.mvc${formatGetUri(params)}`, 'GET',{}, 1),
	
	// GET /gas/mini/equipMonitorIndex.mvc设备运行指标
	equipMonitorIndex:(params) => request.globalRequest(`/gas/mini/equipMonitorIndex.mvc${formatGetUri(params)}`, 'GET',{}, 1),
	
	// GET /gas/mini/getEquipDetailInfo.mvc设备监测详情
	getEquipDetailInfo:(params) => request.globalRequest(`/gas/mini/getEquipDetailInfo.mvc${formatGetUri(params)}`, 'GET',{}, 1),
	
	//GET /mini/equipCurveData设备监测曲线 pipepointid
	equipCurveData:(params) => request.globalRequest(`/gas/mini/equipCurveData.mvc${formatGetUri(params)}`, 'GET',{}, 1),
	
	//GET /mini/getGlobalSearchInfo 全局搜索
	getGlobalSearchInfo:(params) => request.globalRequest(`/gas/mini/getGlobalSearchInfo.mvc${formatGetUri(params)}`, 'GET',{}, 1),
	
	//PUT http://172.19.0.46:8086/gas/mini/saveUserOpenId.mvc?userName=as&openId=as 
	saveUserOpenId:(params) => request.globalRequest(`/gas/mini/saveUserOpenId.mvc${formatGetUri(params)}`, 'PUT',{}, 1),
	
	//DELETE http://10.5.4.136:8080/gas/mini/deteleUserOpenId.mvc?userName=as
	deteleUserOpenId:(params) => request.globalRequest(`/gas/mini/deteleUserOpenId.mvc${formatGetUri(params)}`, 'DELETE',{}, 1),
}



export default api