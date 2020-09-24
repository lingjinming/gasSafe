import context from '../main.js'
const state = {
	isSubscribed:true,//默认未订阅消息
    tmplIds : ['C8CpfXuRYqaZ1T8SYPISLoa3spdSNx89RD1YEpoBjSE','rId4AN9JbtRHydN09h-OP7C3M4k2Dfseo3xoUzETDgw'],
}
const mutations = {
    setSubscribed(state,data){
        state.isSubscribed = data;
		console.log('state.isSubscribed->',state.isSubscribed)
    },
}
const actions = {
    setSubscribeStatus({commit},payload) {
		// console.log(context.$store)
		context.$api.getUserIsSub({
			userName:context.$store.state.user.userInfo.nickName
		}).then(res => {
			commit("setSubscribed",res.data.code);
		})
        
    },
};
export  default {
	namespaced: true,
    state,
	mutations,
	actions
}