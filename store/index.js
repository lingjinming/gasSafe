import Vue from 'vue'
import Vuex from 'vuex'
//导入模块
import user from './user.js'
import tmplIds from './tmplIds.js'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
    },
    modules:{
        //注册模块
        user,
		tmplIds
    }
})

export default store
