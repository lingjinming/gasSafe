<template>
	<view class="item_box box_shadow">
	  	<view class="info" @click.stop="enterEquipDetailInfo(realtimeMonitorData)">
			<view class="tit flex_between_row">
				<view class="alarm_level">
					{{realtimeMonitorData.equipmentCode}}
					<!-- <text class="not_readed" v-if="!realtimeMonitorData.isRead"></text> -->
				</view>
				<view class="alarm_type" @click.stop="enterMonitorData(realtimeMonitorData.alarmInspect)" >
					<image src="../../static/img/chart.png" mode=""></image>
					<text>甲烷：{{realtimeMonitorData.monitorValue}}</text>
					<!-- <text>监测曲线</text> -->
				</view>
			</view>
				
			<view class="status_box">
				<view class="normal" v-if="!realtimeMonitorData.equipStatus">正常运行</view>
				<template v-else>
					<!-- <view>{{realtimeMonitorData.equipStatus}}</view> -->
					<view v-for="item in equipStatus" :key='item'>{{item}}</view>
					<!-- <view v-if="realtimeMonitorDetailInfo.guard == '是'" >移动</view>
					<view v-if="realtimeMonitorDetailInfo.laserTimeout == '是'" >激光超时</view>
					<view v-if="realtimeMonitorDetailInfo.laseraAnomaly == '是'" >激光异常</view>
					<view v-if="realtimeMonitorDetailInfo.water == '是'" >浸水</view> -->
				</template>
			</view>
			
			<view class="info_box">
				<view class="label">数据时间</view>
				<view class="value">{{realtimeMonitorData.monitorTime}}</view>
			</view>
			<view class="info_box">
				<view class="label">具体位置</view>
				<view class="value">{{realtimeMonitorData.installPos}}</view>
			</view>
			<view class="flex_around_row device_status_box">
			<!-- 	<view class="flex_around_column">
					<text>{{realtimeMonitorDetailInfo.realdata}}</text>
					<text>甲烷(%VOL)</text>
				</view> -->
				<view class="flex_around_column">
					<text>{{realtimeMonitorData.voltage}}</text>
					<text>电压(V)</text>
				</view>
				<view class="flex_around_column">
					<text>{{realtimeMonitorData.CSQ}}</text>
					<text>CSQ(dbm)</text>
				</view>
				<view class="flex_around_column">
					<text>{{realtimeMonitorData.temperature}}</text>
					<text>温度(℃)</text>
				</view>
				<view class="flex_around_column">
					<text>{{realtimeMonitorData.humidity}}</text>
					<text>湿度(%RH)</text>
				</view>
			</view>
			<!-- <view class="info_box">
				<view class="label">安装位置</view>
				<view class="value">{{realtimeMonitorData.installDesc}}</view>
			</view> -->
			<!-- <view> -->
				<!-- <view>{{realtimeMonitorData.monitorIndex.}}</view> -->
			<!-- </view> -->
		</view>
	<!-- 	<view @click="enterMonitorData(realtimeMonitorData.alarmInspect)" class="btn_box" >
		监测曲线
		</view> -->
	</view>
</template>

<script>
	import { mapActions, mapState } from 'vuex';
export default {
	data() {
		return {
			realtimeMonitorDetailInfo:null,
		};
	},
	props:{
		realtimeMonitorData:{
			type:Object,
			default:{
				monitorValue:'--',
				monitorTime:'--',
				installPos:'--',
				voltage:'--',
				CSQ:'--',
				temperature:'--',
				humidity:'--'
			}
		},
	},
	computed:{
		...mapState({
			userInfo: ({ user }) => user.userInfo,
		}),
		equipStatus(){
			if(this.realtimeMonitorData.equipStatus && this.realtimeMonitorData.equipStatus.length > 0){
				return this.realtimeMonitorData.equipStatus.split(',')
			}else{
				return 
			}
			 
		}
	},
	// watch:{
	// 	realtimeMonitorData:{
	// 		handler(newVal){
	// 			// console.log('realtimeMonitorData',newVal)
				
	// 		},
	// 		deep:true,
	// 		immediate:true
	// 	}
	// },
	// mounted() {
		
	// },
	methods: {
		enterMonitorData(alarmInspect){
			uni.navigateTo({
				url:`/pages/views/monitorCurve/monitorCurve?alarmInspect=${alarmInspect}`,
				// complete(data) {
				// 	console.log(data)
				// }
			})
		},
		enterEquipDetailInfo(data){
			if(!data.isRead){
				this.$api.saveAlarmRead({
					userName: this.userInfo.nickName,
					infoId: data.equipId
				})
			}
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
	padding: 20rpx 20rpx 40rpx;
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
			.not_readed{
				position: absolute;
				display: inline-block;
				width: 10rpx;
				height: 10rpx;
				border-radius: 50%;
				background: #d8605f;
				right: -10rpx;
				top: 0;
			}
		}
		.alarm_type{
			color: $uni-color-warning;
			// background: #fbede1;
			padding: 0 20rpx;
			height: 40rpx;
			line-height: 40rpx;
			// border-top-left-radius: 40rpx;
			// border-top-right-radius: 40rpx;
			// border-bottom-right-radius: 40rpx;
			image{
				width: 25rpx;
				height: 25rpx;
				margin-right: 10rpx;
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
		border-top: 2rpx solid #dde0e4;
	}
}
.status_box{
	display: flex;
	height: 40rpx;
	view{
		height: 30rpx;
		line-height: 30rpx;
		font-size: 24rpx;
		padding: 0 10rpx;
		border-radius: 30rpx;
		background: rgb(255,231,231);
		color: rgb(255,96,92);
		margin-right: 20rpx;
	}
	.normal{
		background: rgb(228,245,236);
		color: rgb(85,191,135);
	}
}
.device_status_box{
	height: 150rpx;
	margin: 0 20rpx;
	background: rgb(245,246,250);
	border-radius: 10rpx;
	view{
		height: 100%;
		text{
			color: #999;
		}
		text:first-child{
			color: $uni-color-primary;
			font-size: 30rpx;
			font-weight: 500;
		}
	}
}
		
</style>
