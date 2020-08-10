<template>
	<view class="item_box box_shadow">
	  	<view class="info">
			<view class="tit flex_between_row">
				<view class="alarm_level">{{realtimeMonitorData.alarmLevel}}</view>
				<view class="alarm_type">{{realtimeMonitorData.alarmData}}</view>
			</view>
			<view class="info_box">
				<view class="label">数据时间</view>
				<view class="value">{{realtimeMonitorData.monitorTimeStr}}</view>
			</view>
			<view class="info_box">
				<view class="label">具体位置</view>
				<view class="value">{{realtimeMonitorData.alarmDesc}}</view>
			</view>
			<view class="info_box">
				<view class="label">安装位置</view>
				<view class="value">{{realtimeMonitorData.alarmDesc}}</view>
			</view>
		</view>
		<view @click="enterMonitorData(realtimeMonitorData.alarmId)" class="btn_box" >
		监测曲线
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
		};
	},
	props:{
		realtimeMonitorData:{
			type:Object,
			default:{
				alarmId:'11',
				alarmLevel:'11',
				alarmDesc:'11',
				monitorTimeStr:'11',
				alarmDesc:'11',
				alarmData:'0.72%VOL'
			},
		},
	},
	onLoad() {
		let vm = this;
	},
	methods: {
		enterMonitorData(id){
			uni.navigateTo({
				url:`/pages/views/removeAlarm/removeAlarm?id=${id}`,
				// complete(data) {
				// 	console.log(data)
				// }
			})
		}
	}
};
</script>

<style lang="less" scoped>
.item_box{
	border-radius: 10rpx;
	// box-shadow:  0 0 10rpx 10rpx rgba(0,0,0,.6);
	padding: 20rpx 20rpx 0;
	margin:0 30rpx 30rpx;
	background: #FFFFFF;
	.tit{
		position: relative;
		height: 50rpx;
		margin-bottom: 20rpx;
		.alarm_level{
			position: relative;
			margin-right: 16rpx;
			border-radius: 6rpx;
			text-align: center;
			height: 40rpx;
			line-height: 40rpx;
			color: #000;
			font-size: 32rpx;
			&::before{
				content: '';
				position: absolute;
				width: 4rpx;
				height: 30rpx;
				background: #428ee4;
				left: -20rpx;
				top: 6rpx;
			}
		}
		.alarm_type{
			color: #ed9000;
			background: #fbede1;
			padding: 0 20rpx;
			height: 40rpx;
			line-height: 40rpx;
			border-top-left-radius: 40rpx;
			border-top-right-radius: 40rpx;
			border-bottom-right-radius: 40rpx;
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
			color: #666;
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
		color: #428ee4;
		border-top: 2rpx solid #dde0e4;
	}
}

</style>
