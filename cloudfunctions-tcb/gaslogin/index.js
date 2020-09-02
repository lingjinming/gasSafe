// 以下代码在云函数 loginWithWechat/index.js 中
exports.main = async (event, context) => {
   // 获取openid 请求地址
    const apiUrl = 'https://api.weixin.qq.com/sns/jscode2session';
  // uniCloud.httpclient 发起请求
    const res = await uniCloud.httpclient.request(apiUrl,
    {
        method: 'GET',
        dataType:"json",
        data: {
            'grant_type' : 'authorization_code',
            'appid': 'wx22b1298d276d08ab', //你自己小程序的appid
            'secret': '312086e4a8b4f70ad04fea332e73b073', // 在小程序管理平台 -> 开发 -> 开发设置中
            'js_code': event.code // wx.login 拿到的code
        }
    });
    //返回数据给客户端
	console.log(res)
    return res
};