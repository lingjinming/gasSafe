let url_config = ""

if(process.env.NODE_ENV === 'development'){
    // 开发环境
    url_config = 'http://172.19.0.46:8086'
}else{
    // 生产环境
    url_config = 'https://*****.com/'
}

export default url_config