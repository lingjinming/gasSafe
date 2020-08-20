<template>
	<view class="item_box box_shadow">
	  	<view class="info" @click="enterEquipDetailInfo(realtimeMonitorData)">
			<view class="tit flex_between_row">
				<view class="alarm_level">{{realtimeMonitorData.alarmPoint}}</view>
				<view class="alarm_type">{{realtimeMonitorData.monitorValue}}</view>
			</view>
			<view class="info_box">
				<view class="label">数据时间</view>
				<view class="value">{{realtimeMonitorData.monitorTime}}</view>
			</view>
			<view class="info_box">
				<view class="label">具体位置</view>
				<view class="value">{{realtimeMonitorData.installPos}}</view>
			</view>
			<view class="info_box">
				<view class="label">安装位置</view>
				<view class="value">{{realtimeMonitorData.installDesc}}</view>
			</view>
		</view>
		<view @click="enterMonitorData(realtimeMonitorData.alarmPoint)" class="btn_box" >
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
				alarmPoint: "TQ0906220005",
				alarmTypeCode: "燃气",
				alarmId: "8ae4deb8668bde470166a43f33d50827",
				equipId: "8ae4deb8668bde470166a43f33d50827",
				equipmentCode: "NDIR001803101561",
				installDesc: "燃气井TQ0906220005|井壁",
				installPos: "珠江路与宿松路交叉口西南角，沿宿松路向南880米，绿化带里",
				monitorTime: "2020-08-11 20:37:33",
				monitorValue: "0.00%VOL",
				senorCode: "0_0"
			},
		},
	},
	onLoad() {
		let vm = this;
	},
	methods: {
		enterMonitorData(alarmPoint){
			uni.navigateTo({
				url:`/pages/views/monitorCurve/monitorCurve?alarmPoint=${alarmPoint}`,
				// complete(data) {
				// 	console.log(data)
				// }
			})
		},
		enterEquipDetailInfo(data){
			uni.setStorage({
				key:'realtimeMonitorDetail',
				data,
				success() {
					uni.navigateTo({
						url:`/pages/views/map?realtimeMonitorDetail=true`
					})
				}
			})
		},
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
				background: $uni-color-primary;
				left: -20rpx;
				top: 6rpx;
			}
		}
		.alarm_type{
			color: $uni-color-warning;
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
		color: $uni-color-primary;
		border-top: 2rpx solid #dde0e4;
	}
}

</style>
