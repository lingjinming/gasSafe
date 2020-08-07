import request from '@/common/request.js'
import { formatGetUri } from '@/common/util.js'
// POST请求方式
// api.register1 = params => request.globalRequest(`/mobile/signUp`, 'POST', params, 1)
// GET请求方式
// api.register2 = params => request.globalRequest(`/mobile/signUp${formatGetUri(params)}`, 'GET',{}, 1)
const api = {
	// 报警信息 request.globalRequest(`/mini/getAlarmInfo`, 'GET',{}, 1)
	getAlarmInfo:(params) => request.globalRequest(`/gas/mini/getAlarmInfo.mvc${formatGetUri(params)}`, 'GET',{}, 1),
	// /mini/relieveAlarm解除报警
	relieveAlarm: (params) => request.globalRequest(`/gas/mini/alarmDetailInfo.mvc.mvc${formatGetUri(params)}`, 'GET',{}, 1),
}



export default api