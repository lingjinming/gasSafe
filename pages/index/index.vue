<template>
	<view class="container" :style="{ 'background-image': `url(${urlConfig}/gas/mini/getLocalFile/bg)` }">
		<popup-layer v-show="boolShow" ref="popupRef" :direction="'top'">
			<button plain @getuserinfo="getuserinfo" class="btn_getuserinfo" open-type="getUserInfo">请授权获取用户信息</button>
		</popup-layer>
		<view class="header">
			<view class="title flex_center_row">燃气安全监测</view>
			<view class="flex_between_row">
				<view class="tab_box flex_between_row">
					<view class="act" v-for="item in btns" :key="item.id" :class="{ cur: curType == item.type }" @click="changeType(item.type)">
						{{ item.type }}
						<text v-if="item.num">{{ item.num }}</text>
					</view>
				</view>
				<image src="../../static/img/map.png" mode="aspectFit" @click="enterMap"></image>
			</view>
		</view>
		<view class="filter_box box_shadow">
			<template v-if="curType == '报警列表'">
				<type-tab :title="'报警类型'" :tabs.sync="alarmTypes"></type-tab>
				<type-tab :title="'报警状态'" :tabs.sync="alarmStatus"></type-tab>
			</template>
			<template v-else>
				<type-tab :title="'是否安装'" :tabs.sync="installStatus"></type-tab>
				<type-tab :title="'运行状态'" :tabs.sync="runStatus"></type-tab>
			</template>
		</view>
		<view class="search_box flex_between_row">
			<view>
				共
				<text>{{ recordsNum }}</text>
				{{ curType == '报警列表' ? '起报警' : '台设备' }}
			</view>
		<!-- 	<view @click="requestSubscribeMessageFn" class="subscribe_btn">
				报警推送
				<switch :checked="isSubscribed" disabled="true" />
			</view> -->
			<!-- 暂时隐藏搜索功能 -->
			<!-- <view @click="enterSearch">
			<image src="../../static/img/search.png" mode=""></image>
		  </view> -->
		</view>
		<scroll-view scroll-y="true" :style="{ height: curType == '报警列表' ? 'calc(100% - 690rpx)' : 'calc(100% - 690rpx)' }">
			<image class="no_alarm" :src="`${urlConfig}/gas/mini/getLocalFile/no_alarm`" v-if="!recordsNum"></image>
			<template v-if="curType == '报警列表'">
				<monitor-item v-for="item in monitorData" :monitorData.sync="item" :key="item.alarmId"></monitor-item>
			</template>
			<template v-else>
				<realtime-monitor-item v-for="item in equipMonitorData" :realtimeMonitorData.sync="item" :key="item.alarmId"></realtime-monitor-item>
			</template>
		</scroll-view>
	</view>
</template>

<script>
import urlConfig from '../../common/config.js';
import { mapActions, mapState } from 'vuex';
import { mixin } from '../../common/mixins.js';
let vm;
export default {
	data() {
		return {
			urlConfig,
			curType: '报警列表',
			// btns: [
			// 	{
			// 		id: 0,
			// 		type: '报警列表',
			// 		num: 1
			// 	},
			// 	{
			// 		id: 1,
			// 		type: '实时监测',
			// 		num: 2
			// 	}
			// ],
			alarmTypes: [
				{
					id: 1,
					value: '一级报警',
					checked: true
				},
				{
					id: 2,
					value: '二级报警',
					checked: true
				},
				{
					id: 3,
					value: '三级报警',
					checked: true
				}
			],
			alarmStatus: [
				{
					id: 0,
					value: '未解除',
					checked: true
				},
				{
					id: 1,
					value: '已解除',
					checked: false
				}
			],
			installStatus: [
				{
					id: 0,
					value: '未安装',
					checked: true
				},
				{
					id: 1,
					value: '已安装',
					checked: true
				}
			],
			runStatus: [
				{
					id: 0,
					value: '设备异常',
					checked: true
				},
				{
					id: 1,
					value: '正常运行',
					checked: true
				}
			],
			level: '1,2,3',
			ravelflag: '0',
			install: '0,1',
			status: '0,1',
			recordsNum: 0,
			monitorData: [],
			equipMonitorData: [],
			monitorDataNotReadLen:0,
			realDataNotReadLen:0,
		};
	},
	mixins: [mixin],
	onShow() {
		vm = this;
		// vm.getMainSwitch()//判断是否打开了订阅总开关
		if (!vm.userInfo || !vm.userInfo.nickName) {
			vm.boolShow = true;
			vm.$refs.popupRef.show(); // 或者 boolShow = rue
			vm.getuserinfo();
		} else {
			// vm.changeType(vm.curType);
			this.getAlarmInfoFn();
			this.getEquipMonitorFn();
			
			vm.boolShow = false;
			vm.$refs.popupRef.close();
		}
	},
	mounted() {
		// 监听 报警解除成功事件
		uni.$on('relieveAlarmSuccess', () => {
			vm.changeType(this.curType);
		});
	},
	computed: {
		...mapState({
			userInfo: ({ user }) => user.userInfo,
			// tmplIds: ({ tmplate }) => tmplate.tmplIds,
			isSubscribed: ({ tmplate }) => tmplate.isSubscribed
		}),
		btns(){
			return [
				{
					id: 0,
					type: '报警列表',
					num: this.monitorDataNotReadLen
				},
				{
					id: 1,
					type: '实时监测',
					// num: this.realDataNotReadLen
				}
			]
		},
		// totalNotRead(){
		// 	return this.monitorDataNotReadLen + this.realDataNotReadLen
		// }
	},
	watch: {
		alarmTypes: {
			handler(newVal) {
				this.transformArrToStr(newVal, 'level');
				this.getAlarmInfoFn();
			},
			deep: true
		},
		alarmStatus: {
			handler(newVal) {
				this.transformArrToStr(newVal, 'ravelflag');
				this.getAlarmInfoFn();
			},
			deep: true
		},
		installStatus: {
			handler(newVal) {
				this.transformArrToStr(newVal, 'install');
				this.getEquipMonitorFn();
			},
			deep: true
		},
		runStatus: {
			handler(newVal) {
				this.transformArrToStr(newVal, 'status');
				this.getEquipMonitorFn();
			},
			deep: true
		},
		// totalNotRead(newVal){
		// 	uni.setTabBarBadge({
		// 	  index: 0,
		// 	  text: `${newVal}`
		// 	})
		// }
	},
	methods: {
		...mapActions('user', ['setUserInfo']),
		getuserinfo() {
			// 小程序获取用户昵称头像等信息
			uni.getUserInfo({
				success: res => {
					vm.setUserInfo(res.userInfo);
					vm.getUserInfoFn(res.userInfo.nickName);
				}
			});
		},
		getUserInfoFn(userName) {
			// 接口获取用户信息
			vm.$api
				.getUserInfo({
					userName
				})
				.then(res => {
					uni.setStorage({
						key: 'userInfoByApi',
						data: res.data,
						success() {
							vm.changeType(vm.curType);
						}
					});
					vm.boolShow = false;
					vm.$refs.popupRef.close();
				});
		},
		reset() {
			this.recordsNum = 0;
			this.monitorData = [];
			this.equipMonitorData = [];
		},
		enterMap() {
			uni.navigateTo({
				url: '../views/map'
			});
		},
		enterSearch() {
			uni.navigateTo({
				url: '../views/map'
			});
		},
		changeType(type) {
			// 判断当前是属于 报警列表还是实时监测
			this.curType = type;
			this.reset();
			if (this.curType == '报警列表') {
				this.getAlarmInfoFn();
			} else {
				this.getEquipMonitorFn();
			}
		},
		getAlarmInfoFn() {
			// 接口获取报警列表信息
			this.$api
				.getAlarmInfo({
					level: this.level,
					ravelflag: this.ravelflag,
					userName: vm.userInfo.nickName
				})
				.then(res => {
					this.monitorData = res.data.data;
					let monitorDataNotRead = this.monitorData.filter(item => !item.isRead)
					this.monitorDataNotReadLen = monitorDataNotRead.length
					if (this.curType == '报警列表') {
						this.recordsNum = this.monitorData.length;
					}
				});
		},
		getEquipMonitorFn() {
			// 接口获取设备列表信息
			this.$api
				.getEquipMonitor({
					install: this.install,
					userName: vm.userInfo.nickName,
					runStatus: this.status
				})
				.then(res => {
					this.equipMonitorData = res.data;
					let realDataNotRead = this.equipMonitorData.filter(item => !item.isRead)
					this.realDataNotReadLen = realDataNotRead.length
					if (this.curType == '实时监测') {
						this.recordsNum = this.equipMonitorData.length;
					}
				});
		}
	}
};
</script>

<style lang="scss" scoped>

.container {
	background-size: 100% 400rpx;
	background-position: top center;
	background-repeat: no-repeat;
}
.header {
	position: relative;
	color: #fff;
	margin: 0 30rpx 20rpx;
	.flex_between_row {
		height: 70rpx;
	}
	.title {
		position: relative;
		height: 50px;
		font-size: 20px;
		margin-top: 60rpx;
		// margin-bottom: 40rpx;
	}
	.tab_box {
		width: 280rpx;
		.cur {
			position: relative;
			font-size: 32rpx;
			font-weight: 600;
			&::after {
				position: absolute;
				content: '';
				width: 40rpx;
				height: 4rpx;
				background: #ffffff;
				border-radius: 4rpx;
				left: 50%;
				bottom: -8rpx;
				transform: translateX(-50%);
			}
		}
		view {
			position: relative;
		}
		text {
			position: absolute;
			right: -24rpx;
			top: -10rpx;
			background: red;
			color: #fff;
			width: 30rpx;
			height: 30rpx;
			line-height: 30rpx;
			border-radius: 50%;
			text-align: center;
			font-size: 24rpx;
		}
	}
	image {
		width: 50rpx;
		height: 50rpx;
	}
}
.filter_box {
	margin: 0 30rpx;
	// height: 340rpx;
	padding: 20rpx 30rpx 10rpx;
	border-radius: 10rpx;
	background: #ffffff;
	box-sizing: border-box;
	display: flex;
	flex-wrap: wrap;
	// align-items: center;
}
type-tab {
	margin-bottom: 30rpx;
}
.search_box {
	position: relative;
	margin: 0 30rpx;
	height: 80rpx;
	flex-shrink: 0;
	view:first-child {
		color: #666;
		font-size: 24rpx;
	}
	view:last-child {
		color: $uni-color-primary;
		color: #666;
		display: flex;
		align-items: center;
	}
	text {
		font-size: 32rpx;
		color: $uni-color-primary;
		margin: 0 6rpx;
	}
	image {
		width: 30rpx;
		height: 30rpx;
		margin: 0 10rpx;
	}
	.subscribe_btn {
		// position: relative;
		// right: -20rpx;
		// border-radius: 10rpx;
		// height: 40rpx;
		// line-height: 40rpx;
		// font-size: 24rpx;
		// color: #fff !important;
	}
}
scroll-view {
	.no_alarm {
		width: 64%;
		height: 330rpx;
		margin-left: 14%;
		margin-top: 100rpx;
	}
}
.btn_getuserinfo {
	height: 100rpx;
	line-height: 100rpx;
}
</style>
