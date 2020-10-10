let url_config = ""

if(process.env.NODE_ENV === 'development'){
    // 开发环境
    // url_config = 'http://10.5.4.136:8080'
    url_config = 'http://60.174.207.210:8899'
}else{
    // 生产环境
    url_config = 'http://60.174.207.210:8899'
}

export default url_config