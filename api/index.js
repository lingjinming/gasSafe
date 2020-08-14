import request from '@/common/request.js'
import { formatGetUri } from '@/common/util.js'
// POST请求方式
// api.register1 = params => request.globalRequest(`/mobile/signUp`, 'POST', params, 1)
// GET请求方式
// api.register2 = params => request.globalRequest(`/mobile/signUp${formatGetUri(params)}`, 'GET',{}, 1)
const api = {
	// 报警信息 request.globalRequest(`/gas/mini/getAlarmInfo`, 'GET',{}, 1)
	getAlarmInfo:(params) => request.globalRequest(`/gas/mini/getAlarmInfo.mvc${formatGetUri(params)}`, 'GET',{}, 1),
	// 报警信息详情 request.globalRequest(`/gas/mini/alarmDetailInfo`, 'GET',{}, 1)
	alarmDetailInfo:(params) => request.globalRequest(`/gas/mini/alarmDetailInfo.mvc${formatGetUri(params)}`, 'GET',{}, 1),
	// POST /gas/mini/saveAlarmRead保存已读状态
	saveAlarmRead:(params) => request.globalRequest(`/gas/mini/saveAlarmRead.mvc${formatGetUri(params)}`, 'POST', {}, 1),
	// /gas/mini/relieveAlarm解除报警
	relieveAlarm: (params) => request.globalRequest(`/gas/mini/alarmDetailInfo.mvc${formatGetUri(params)}`, 'GET',{}, 1),
	// GET /gas/mini/getEquipMonitor设备实时监测
	getEquipMonitor:(params) => request.globalRequest(`/gas/mini/getEquipMonitor.mvc${formatGetUri(params)}`, 'GET',{}, 1),
	// GET /gas/mini/equipMonitorIndex.mvc设备运行指标
	equipMonitorIndex:(params) => request.globalRequest(`/gas/mini/equipMonitorIndex.mvc${formatGetUri(params)}`, 'GET',{}, 1),
	// GET /gas/mini/getEquipDetailInfo.mvc设备监测详情
	getEquipDetailInfo:(params) => request.globalRequest(`/gas/mini/getEquipDetailInfo.mvc${formatGetUri(params)}`, 'GET',{}, 1),
}



export default api