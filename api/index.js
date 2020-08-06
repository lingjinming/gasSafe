import request from '@/common/request.js'
import { formatGetUri } from '@/common/util.js'

const api = {}

// POST请求方式
// api.register1 = params => request.globalRequest(`/mobile/signUp`, 'POST', params, 1)

// GET请求方式
// api.register2 = params => request.globalRequest(`/mobile/signUp${formatGetUri(params)}`, 'GET',{}, 1)


export default api