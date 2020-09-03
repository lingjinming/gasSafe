import {mapState,mapMutations} from 'vuex'
let vm;
export const mixin = {
	created(){
		console.log('from mixins..')
	},
	mounted() {
		vm = this
		uni.$on('relieveAlarmSuccess',()=>{
			this.requestSubscribeMessageFn(true)
		})
	},
	computed: {
		...mapState({
			tmplIds: ({tmplate}) => tmplate.tmplIds
		})
	},
    methods: {
		...mapMutations('tmplate',['setSubscribed']),
		requestSubscribeMessageFn(back=false){
			// uni.getSetting({
			//   withSubscriptions: true,
			//   success (res) {
			//     console.log(res.authSetting)
			//     // res.authSetting = {
			//     //   "scope.userInfo": true,
			//     //   "scope.userLocation": true
			//     // }
			//     console.log(res.subscriptionsSetting)
			//     // res.subscriptionsSetting = {
			//     //   mainSwitch: true, // 订阅消息总开关
			//     //   itemSettings: {   // 每一项开关
			//     //     SYS_MSG_TYPE_INTERACTIVE: 'accept', // 小游戏系统订阅消息
			//     //     SYS_MSG_TYPE_RANK: 'accept'
			//     //     zun-LzcQyW-edafCVvzPkK4de2Rllr1fFpw2A_x0oXE: 'reject', // 普通一次性订阅消息
			//     //     ke_OZC_66gZxALLcsuI7ilCJSP2OJ2vWo2ooUPpkWrw: 'ban',
			//     //   }
			//     // }
			//   }
			// })
			uni.requestSubscribeMessage({
			  tmplIds: this.tmplIds,
			  success (res) {
				  uni.showToast({
				  	icon:"success",
				  	title:'订阅成功'
				  })
				  console.log(vm.$store)
				  // vm.setSubscribed(true)
				  vm.$store.commit('tmplate/setSubscribed',true)
				  uni.getStorage({
				  	key:'openid',
					success(res){
						uniCloud.callFunction({
							name:'gasnotice',
							data:{
								openid:res.data
							},
							success(res) {
								console.log('已调用发送订阅消息-->',res)
							},
							complete() {
								if(back){
									uni.navigateBack()
								}
							}
						})
					}
				  }) 
			  },
			})
		},
		
    }
};