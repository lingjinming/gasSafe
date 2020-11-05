import context from '../main.js'
const state = {
	isSubscribed:true,//默认未订阅消息
    tmplIds : ['uoNcYWBSUvI6O2cu3Zr4qK5g_Q4N9cDR1uxkrimSqa4','C8CpfXuRYqaZ1T8SYPISLjV7m6D5lc86RGbyfKCJWNc'],
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