<template>
	<view class="container">
		<view class="formItem">
			<view>操作人员</view>
			<view>
				<input class="uni-input" v-model="operator" />
			</view>
		</view>
		<view class="formItem">
			<view>解除时间</view>
			<view>
				<e-picker-plus ref='picker' @confirm="getDate" mode='YMDhms'>{{relieveTime}}</e-picker-plus>
			</view>
		</view>
		
		<button class="confirm_btn" type="primary" @click="relieveAlarmFn">保存</button>

	</view>
</template>

<script>
	import {mapActions, mapState} from 'vuex'
export default {
	data() {
		return {
			alarmId:'',
			relieveTime:''
		};
	},
	computed: {
		...mapState({
			//这里可以通过这种方式引用相应模块的state数据，其中user是模块名。在代码的其他部分可以使用this.userInfo访问数据
			userInfo: ({user}) => user.userInfo,
		}),
		operator(){
			return this.userInfo.nickName
		}
	},
	onLoad(option) {
		this.alarmId = option.id
		this.$refs.picker._setValue()
		this.relieveTime = this.$refs.picker.showDateTime
	},
	methods: {
		relieveAlarmFn(){
			this.$api.relieveAlarm({
				relieveTime:this.relieveTime,
				alarmId:this.alarmId,
				operator:this.operator
			}).then(res => {
				uni.navigateBack()
			})
		},
		getDate(e) {
			this.relieveTime = e.result
		}
	}
};
</script>

<style lang="scss" scoped>
.container{
	background: #fff;
}
.formItem{
	margin: 60rpx 60rpx 0;
	border-bottom: 2rpx solid #c5c5c5;
	&>view{
		height: 40rpx;
		line-height: 40rpx;
		margin-bottom: 30rpx;
		font-size: 32rpx;
	}
}
.confirm_btn{
	position: absolute;
	left: 50rpx;
	right: 50rpx;
	bottom: 60rpx;
	background: #428ee4;
	height: 90rpx;
	line-height: 90rpx;
	font-size: 32rpx;
	width: calc(100% - 100rpx);
}
</style>
