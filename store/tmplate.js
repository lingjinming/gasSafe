const state = {
	isSubscribed:false,//默认未订阅消息
    tmplIds : ['C8CpfXuRYqaZ1T8SYPISLoa3spdSNx89RD1YEpoBjSE','rId4AN9JbtRHydN09h-OP7C3M4k2Dfseo3xoUzETDgw'],
}
const mutations = {
    setSubscribed(state,data){
        state.isSubscribed = data;
		console.log(state.isSubscribed)
    },
}
export  default {
	namespaced: true,
    state,
	mutations
}