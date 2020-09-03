import Vue from 'vue'
import Vuex from 'vuex'
//导入模块
import user from './user.js'
import tmplate from './tmplate.js'
Vue.use(Vuex)

const store = new Vuex.Store({
	namespaced: true,
    state: {
    },
    modules:{
        //注册模块
        user,
		tmplate
    }
})

export default store
