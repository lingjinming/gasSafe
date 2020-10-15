import {
	mapState,
	mapMutations,
	mapActions
} from 'vuex'
let vm;
export const mixin = {
	data() {
		return {
			isAccepted: true, //是否订阅了消息
			mainSwitch: true, //订阅总开关,
			tmplIds : ['uoNcYWBSUvI6O2cu3Zr4qK5g_Q4N9cDR1uxkrimSqa4','C8CpfXuRYqaZ1T8SYPISLjV7m6D5lc86RGbyfKCJWNc'],
		}
	},
	created() {
		vm = this
		vm.setSubscribeStatus()
	},
	onShow(){
		// vm.getMainSwitch()//判断是否打开了订阅总开关
	},
	mounted() {
		// uni.$on('relieveAlarmSuccess', () => {
		// 	this.requestSubscribeMessageFn(true)
		// })
	},
	beforeDestroy() {
		// uni.$off('relieveAlarmSuccess')
	},
	computed: {
		...mapState({
			userInfo: ({
				user
			}) => user.userInfo,
		})
	},
	methods: {
		...mapMutations('tmplate', ['setSubscribed']),
		...mapActions('tmplate', ['setSubscribeStatus']),
		saveUserOpenIdFn(openId) { //订阅信息的时候给后台发送用户的openId
			this.$api.saveUserOpenId({
				userName: vm.userInfo.nickName,
				openId
			}).then(res => {
				if (res) {
					//打开订阅按钮
					vm.$store.commit('tmplate/setSubscribed', true)
					uni.showToast({
						icon: "success",
						title: '订阅成功'
					})
				}
			}).catch(err => {
				//关闭订阅按钮
				vm.$store.commit('tmplate/setSubscribed', false)
				uni.showToast({
					icon: 'none',
					title: '订阅失败'
				})
			})

		},
		requestSubscribeMessageFn(back = false) {
			vm.getMainSwitch().then(res => {
				if (!res) {
					vm.openConfirm('检测到您没打开信息推送，是否去设置打开？')
				} else {
					uni.requestSubscribeMessage({
						tmplIds: vm.tmplIds,
						success(res) {
							vm.isAccepted = vm.tmplIds.some(item => { //只要有一个信息模板订阅了则表示已订阅
								// console.log('res[item]->', res[item])
								return res[item] == 'accept'
							})
							// console.log('vm.isAccepted->',vm.isAccepted)
							if (!vm.isAccepted) { //用户选择了取消订阅，给后台发送取消订阅
								vm.$api.deteleUserOpenId({
										userName: vm.userInfo.nickName
									})
									.then(res => {
										if (res) {
											uni.showToast({
												icon: 'none',
												title: '您将不再收到报警信息推送！'
											})
											vm.$store.commit('tmplate/setSubscribed', false)
										}
									})
							}else{
								uni.getStorage({
									key: 'openid',
									success(res) {
										if (back) {
											uni.navigateBack()
										}
										vm.saveUserOpenIdFn(res.data)
									}
								})
							}
						}
					})
				}
			})
			
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
								vm.mainSwitch = true
							},
							fail: (error) => {
								vm.mainSwitch = false
							}
						})
					} else {
						uni.showToast({
							icon: 'none',
							title: '您将不再收到报警信息推送！'
						})
						vm.mainSwitch = false
						vm.$store.commit('tmplate/setSubscribed', false)
					}
				}
			});
		},
		/**
		 * 将传入的数组根据条件筛选并转为字符串
		 * @param {Array} arr - 待拼接的数组
		 * @param {string} str - data中的实际字符串
		 **/
		transformArrToStr(arr, str) {
			let temparr = []
			if (arr.length) {
				arr.forEach(item => {
					if (item.checked) {
						temparr.push(item.id)
					}
				})
			}
			this[str] = temparr.join(',')
		},
		async getMainSwitch() {
			await uni.getSetting({
				withSubscriptions: true,
				success(res) {
					vm.mainSwitch = res.subscriptionsSetting.mainSwitch
				}
			})
			return vm.mainSwitch
		}
	}
};
