//本地存储的key
const USER_KEY = 'userinfo';

const state = {
  //初始化数据，优先从本地存储获取
    userInfo : uni.getStorageSync(USER_KEY) || {},
}

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
const mutations={
    setUserInfo(state,data){
        state.userInfo = data;
		console.log(state.userInfo)
    },
}
//导出
export  default {
    state,
    actions,
    mutations
}