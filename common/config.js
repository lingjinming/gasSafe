let url_config = ""

if(process.env.NODE_ENV === 'development'){
    // 开发环境
    // url_config = 'http://10.5.4.136:8080'
    url_config = 'http://60.174.207.210:8899'
    // url_config = 'https://gas.citysafety.com:8898'
}else{
    // 生产环境
    url_config = 'http://60.174.207.210:8899'
	// url_config = 'https://gas.citysafety.com:8898/'
}

export default url_config