<template>
	<view class="item_box box_shadow">
	  	<view class="info" @click="enterMap(monitorData)">
			<view class="tit">
				<view class="alarm_level" :class="{'not_readed':!monitorData.isRead}">{{monitorData.alarmLevel}}</view>
				<view class="alarm_type">{{monitorData.alarmDesc}}</view>
			</view>
			<view class="info_box">
				<view class="label">最新报警时间</view>
				<view class="value">{{monitorData.monitorTimeStr}}</view>
			</view>
			<view class="info_box">
				<view class="label">具体位置</view>
				<view class="value">{{monitorData.alarmRoad}}</view>
			</view>
		</view>
		<button plain :style="{'color':monitorData.ravelFlag?'#999':'#428ee4'}" class="btn_box"  
		@click="removeAlarm(monitorData.alarmId)" open-type="getUserInfo" >
			{{monitorData.ravelFlag?'报警已解除':'报警解除'}}
		</button>
	</view>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
	data() {
		return {
		};
	},
	props:{
		monitorData:{
			type:Object,
			default:{
				alarmId:'alarmId',
				alarmLevel:'alarmLevel',
				alarmDesc:'alarmDesc',
				monitorTimeStr:'monitorTimeStr',
				alarmDesc:'alarmDesc',
				ravelFlag:0, //1表示已解除 0表示未解除
				isRead:0 //1表示已读 0表示未读
			},
		},
	},
	computed:{
		...mapState({
			userInfo: ({ user }) => user.userInfo,
		}),
	},
	methods: {
		...mapActions('user',['setUserInfo']),
		removeAlarm(id){
			let vm = this
			if(this.monitorData.ravelFlag){
				return false
			}
			uni.getUserInfo({
			    success: (res) => {
					vm.setUserInfo(res.userInfo)
					uni.navigateTo({
						url:`/pages/views/removeAlarm/removeAlarm?id=${id}`
					})
			    }
			})

		},
		enterMap(data){
			if(!data.isRead){
				this.$api.saveAlarmRead({
					userName: this.userInfo.nickName,
					infoId:data.alarmId
				})
			}
			uni.setStorage({
				key:'monitorDetail',
				data,
				success() {
					uni.navigateTo({
						url:`/pages/views/map?monitorDetail=true`
					})
				}
			})

		}
	}
};
</script>

<style lang="scss" scoped>
.item_box{
	border-radius: 10rpx;
	// box-shadow:  0 0 10rpx 10rpx rgba(0,0,0,.6);
	padding: 20rpx 20rpx 0;
	margin:0 30rpx 30rpx;
	background: #FFFFFF;
	.tit{
		position: relative;
		display: flex;
		align-items: center;
		height: 50rpx;
		margin-bottom: 20rpx;
		.alarm_level{
			position: relative;
			margin-right: 16rpx;
			border-radius: 6rpx;
			background: #d8605f;
			width: 80rpx;
			text-align: center;
			height: 40rpx;
			line-height: 40rpx;
			color: #fff;
			font-size: 24rpx;
		}
		.alarm_type{
			color: #333;
			white-space: nowrap;
			overflow: hidden;
			text-overflow:ellipsis;
		}
		.not_readed{
			&::before{
				content: '';
				position: absolute;
				width: 10rpx;
				height: 10rpx;
				border-radius: 50%;
				background: #d8605f;
				border: 4rpx solid #fff;
				right: -6rpx;
				top: -6rpx;
			}
		}
		
	}
	.info_box{
		display: flex;
		align-items: center;
		height: 50rpx;
		margin-bottom: 20rpx;
		.label{
			width: 200rpx;
			color: #666;
		}
		.value{
			color: #333;
			flex: 1;
			flex-shrink: 0;
			display: flex;
			flex-wrap: wrap;
			align-items: center;
		}
	}
	.btn_box{
		height: 88rpx;
		line-height: 88rpx;
		text-align: center;
		color: $uni-color-primary;
		background: transparent;
		border: none;
		border-top: 2rpx solid #dde0e4;
		outline: none;
		border-radius: 0;
	}
}
</style>
