'use strict';
exports.main = async (event, context) => {
	//1 - 服务端获取accessToken 
	const accessTokenUrl = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx22b1298d276d08ab&secret=312086e4a8b4f70ad04fea332e73b073'
	const tokenRes = await uniCloud.httpclient.request(accessTokenUrl,{
		method:"GET",
		contentType: 'json',
		dataType:"json"
	})
	const token = tokenRes.data.access_token
	//2 - 根据accessToken 进行发送信息 ，这里touser需要传用户的openid
	const url = `https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=${token}`;
	uniCloud.httpclient.request(url,{
		method:"POST",
		contentType: 'json',
		dataType:"json",
		data:{
			touser: event.openid,
			page: 'pages/index/index',
			lang: 'zh_CN',
	        data: {
	          thing1: {
	            value: '厨房报警器'
	          },
	          character_string8: {
	            value: '869078030077140'
	          },
	          thing12: {
	            value: '设备已超出安全区域'
	          },
	          date4: {
	            value: '2019-10-10 18:30:20'
	          },
	          thing5: {
	            value: '苏州工业园区唯新路60号'
	          }
	        },
			template_id:'C8CpfXuRYqaZ1T8SYPISLoa3spdSNx89RD1YEpoBjSE',
			miniprogramState:'trial' // 
		}
	})
	
	uniCloud.httpclient.request(url,{
		method:"POST",
		contentType: 'json',
		dataType:"json",
		data:{
			touser: event.openid,
			page: 'pages/index/index',
			lang: 'zh_CN',
	        data: {
	          phrase2: {
	            value: '在线'
	          },
	          number1: {
	            value: '869078030077140'
	          }
	        },
			template_id:'rId4AN9JbtRHydN09h-OP7C3M4k2Dfseo3xoUzETDgw',
			miniprogramState:'trial' // 
		}
	})

};
