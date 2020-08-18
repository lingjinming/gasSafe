//本地存储的key
const USER_KEY = 'userinfo';

const state = {
  //初始化数据，优先从本地存储获取
    userInfo : uni.getStorageSync(USER_KEY) || {},
}

//actions可以支持异步操作，这里使用异步存储，存储成功后再commit
const actions = {
    setUserInfo({commit},payload) {
        uni.setStorage({
            key:USER_KEY,
            data:payload,
            success: () => {
                commit("setUserInfo",payload);
            }
        })
    },
};
//真正的缓存数据改变的地方
const mutations={
    setUserInfo(state,data){
        state.userInfo = Object.assign(state.userInfo,state.userInfo,data);
		console.log(state.userInfo)
    },
}
//导出
export  default {
    state,
    actions,
    mutations
}