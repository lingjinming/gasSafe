import urlConfig from './config.js'

const request = {}
const headers = {}
// const PORT1 = '/baseinfo'
    
request.globalRequest = (url, method, data, power) => {
/*     权限判断 因为有的接口请求头可能需要添加的参数不一样，所以这里做了区分
    1 == 不通过access_token校验的接口
    2 == 文件下载接口列表
    3 == 验证码登录 */
	// uni.showLoading({
	// 	title:'加载中'
	// })
    switch (power){
        case 1:
            headers['Authorization'] = 'Basic a3N1ZGk6a3N1ZGk='
            break;
        case 2:
            headers['Authorization'] = 'Basic a3N1ZGlfcGM6a3N1ZGlfcGM='
            break;
        case 3:
            responseType = 'blob'
            break;
        default:
            headers['Authorization'] = `Bearer ${
                this.$store.getters.userInfo
            }`
            headers['TENANT-ID'] = this.$store.getters.userInfo.tenant_id
            break;
    }
            
    return uni.request({
        url: urlConfig + url,
        method:method || 'GET',
        data: data,
        dataType: 'json',
        header: headers
    }).then(res => {
		uni.hideLoading()
		// debugger
        if (res[1].statusCode ==200|| res[1].data.status =="success" || res[1].data.code == 200) {
            return res[1]
        } else {
            console.log(res[1].data) 
        }
		
    }).catch(parmas => {
		// uni.hideLoading()
		console.log(parmas.message)
　　　　　　switch (parmas.code) {
　　　　　　　　case 401:
　　　　　　　　　　uni.clearStorageSync()
　　　　　　　　　　break
　　　　　　　　default:
　　　　　　　　　　uni.showToast({
　　　　　　　　　　　　title: '请求出错，请退出重试',
　　　　　　　　　　　　icon: 'none'
　　　　　　　　　　})
　　　　　　　　　　return Promise.reject()
　　　　　　　　　　break
　　　　　　}
　　}) 
} 
export default request