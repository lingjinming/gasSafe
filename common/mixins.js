import {mapState,mapMutations} from 'vuex'
let vm;
export const mixin = {
	data(){
		return {
			isAccepted:false
		}
	},
	created(){
		vm = this
		console.log('from mixins..')
	},
	mounted() {
		uni.$on('relieveAlarmSuccess',()=>{
			this.requestSubscribeMessageFn(true)
		})
	},
	beforeDestroy(){
		uni.$off('relieveAlarmSuccess')
	},
	computed: {
		...mapState({
			tmplIds: ({tmplate}) => tmplate.tmplIds,
			userInfo: ({user}) => user.userInfo,
		})
	},
    methods: {
		...mapMutations('tmplate',['setSubscribed']),
		saveUserOpenIdFn(openId){//订阅信息的时候给后台发送用户的openId
			this.$api.saveUserOpenId({
				userName:vm.userInfo.nickName,
				openId
			}).then(res => {
				if(res){
					vm.$store.commit('tmplate/setSubscribed',true)
					uni.showToast({
						icon:"success",
						title:'订阅成功'
					})
				}
			}).catch(err => {
				vm.$store.commit('tmplate/setSubscribed',false)
				uni.showToast({
					icon:'none',
					title:'订阅失败'
				})
			})

		},
		requestSubscribeMessageFn(back=false){
				
				uni.getSetting({
				  withSubscriptions: true,
				  success (res) {
				    console.log('subscriptionsSetting-->',res.subscriptionsSetting)
					if(!res.subscriptionsSetting.mainSwitch){
						vm.openConfirm('检测到您没打开信息推送，是否去设置打开？')
					}
				  }
				})
			
			// if(vm.isAccepted){
				// uni.showToast({
				// 	icon:'none',
				// 	title:'当前已订阅，请勿重复订阅'
				// })
				uni.requestSubscribeMessage({
				  tmplIds: vm.tmplIds,
				  success (res) {
					  let isAccepted = res[vm.tmplIds[0]] == 'accept' || res[vm.tmplIds[1]] == 'accept'
						// let isAccepted = vm.tmplIds.some(item => {//只要有一个信息模板订阅了则表示已订阅
						// 	if(res[item]){
						// 		console.log('res[item]->',res[item])
						// 		res[item] == 'accept'
						// 	}
						// }) //用户选择了
						console.log('isAccepted-->',isAccepted)
						if(!isAccepted){ //用户选择了取消订阅
							// vm.openConfirm('检测到您没打开信息推送，是否去设置打开？')
							vm.$api.deteleUserOpenId({
								userName:vm.userInfo.nickName
							})
							.then(res => {
								debugger
								if(res){
									vm.$store.commit('tmplate/setSubscribed',false)
								}
							})
							return
						}
						  uni.getStorage({
							key:'openid',
							success(res){
								if(back){
									uni.navigateBack()
								}
								vm.saveUserOpenIdFn(res.data)
							}
						  }) 
				  }
				})
			// }else{
			// 	vm.openConfirm('检测到您没打开推送权限，是否去设置打开？')
			// }

		},
		isAcceptedFn(){
			// uni.getSetting({
			//   withSubscriptions: true,
			//   success (res) {
			//     console.log('subscriptionsSetting-->',res.subscriptionsSetting)
			// 	// vm.isAccepted = vm.tmplIds.some(item => {//只有有一个信息模板订阅了则表示已订阅
			// 	// 	res[item] == 'accept'
			// 	// })
			// 	// console.log('isAccepted->',vm.isAccepted)
			// 	// if(res.subscriptionsSetting.mainSwitch && vm.isAccepted){ //订阅打开并且每个模板信息状态都是 ‘accept’ 的时候
			// 	if(res.subscriptionsSetting.mainSwitch){
			// 		vm.isAccepted = true
			// 		vm.$store.commit('tmplate/setSubscribed',true)
			// 	}else{ //订阅关闭的时候
			// 		vm.isAccepted = false
			// 		vm.$store.commit('tmplate/setSubscribed',false)
			// 	}
			//   },
			// })
		},
		//打开设置
		openConfirm(message) {
			uni.showModal({
				content: message,
				confirmText: "确认",
				cancelText: "取消",
				success: (res) => {
					//点击“确认”时打开设置页面
					if (res.confirm) {
						uni.openSetting({
							success: (res) => {
								console.log(res.authSetting)
							},
							fail: (error) => {
								console.log(error)
							}
						})
					} else {
						console.log('用户点击取消')
					}
				}
			});
		},
		/**
		 * 将传入的数组根据条件筛选并转为字符串
		 * @param {Array} arr - 待拼接的数组
		 * @param {string} str - data中的实际字符串
		 **/
		transformArrToStr(arr,str){
			let temparr = []
			 if(arr.length){
				 arr.forEach(item => {
					 if (item.checked) {
						temparr.push(item.id)
					 }
				 })
			}
			this[str] = temparr.join(',')
		}
    }
};