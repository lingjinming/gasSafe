<template>
	<view class="item_detail_box box_shadow" :style="!isUp?hide:show">
		<pull-up :isUp.sync='isUp'></pull-up>
		<view class="fixed_box removeAlarm_btn_box">
			<view class="btn_removeAlarm" :class="{alarm_removed:monitorDetail.ravelFlag}" @click="removeAlarm">{{monitorData.ravelFlag?'报警已解除':'报警解除'}}</view>
		</view>
		<image @click="openLocation" class="openLocation_btn" src="../../static/img/open_location.png" mode=""></image>
		<view class="detail_head">
			<view class="alarmDesc padding_right150">{{monitorDetail.alarmDesc}}</view>
			<view class="padding_right150">
				<!-- <text>1.6km</text>|<text>{{monitorDetail.alarmRoad}}</text> -->
				<text>{{monitorDetail.alarmRoad}}</text>
			</view>
			<view class="flex_between_row">
				<view class="monitorValue">{{monitorDetail.monitorValue}}<text>{{monitorDetail.alarmLevel}}</text></view>
				<view>{{monitorDetail.monitorTime}}</view>
			</view>
		</view>
		<scroll-view scroll-y="true" v-show="isUp">
			<view class="comm_box flex_column">
				<view class="tit_box flex_between_row" @click="enterMonitor">
					<view>监测曲线</view>
					<view>》</view>
				</view>
				<view class="con_box" v-show="monitorDetail.historyCurveData.length">
					<view class="chart_info flex_between_row">
						<view>最高值：{{monitorDetail.historyCurveData[0].maxValue}}%VOL</view>
						<view>{{monitorDetail.historyCurveData[0].maxTime}}</view>
					</view>
					<view class="chartBox" ref='chart'>
						<monitor-chart-landscape2 :chartData='chartData' v-if='chartData!==null'></monitor-chart-landscape2>
						
						<!-- <monitor-chart :chartData='chartData' v-if='chartData !==null'></monitor-chart> -->
					</view>
				</view>
				<view class="no_data" v-show="!monitorDetail.historyCurveData.length">暂无数据</view>
			</view>
			<view class="comm_box flex_column">
				<view class="tit_box flex_between_row">
					<view>当前设备</view>
					<view class="indicators" :class="{cur:showIndicators}" @click="showIndicators = !showIndicators">运行指标</view>
				</view>
				<view class="con_box">
					<view class="device_info_row">
						<text>设备名称</text>
						<text>{{monitorDetail.equipmentName}}</text>
					</view>
					<view class="device_info_row">
						<text>设备编码</text>
						<text>{{monitorDetail.equipmentCode}}</text>
					</view>
					<view class="device_info_row">
						<text>安装日期</text>
						<text>{{monitorDetail.installTime}}</text>
					</view>
					<view class="device_info_row">
						<text>设备厂商</text>
						<text>{{monitorDetail.manufacturer}}</text>
					</view>
					<view class="device_info_row">
						<text>所属对象</text>
						<text>{{monitorDetail.equipObject}}</text>
					</view>
					<view class="device_info_row">
						<text>所在节点</text>
						<text>{{monitorDetail.equipNode}}</text>
					</view>
					<view class="device_info_row">
						<text>安装位置</text>
						<text>{{monitorDetail.installPos}}</text>
					</view>
					<view class="indicators" v-show="showIndicators">
						<indicators-item :equipmentCode='monitorDetail.equipmentCode'></indicators-item>
					</view>
				</view>
			</view>
			<view class="comm_box flex_column">
				<view class="tit_box flex_between_row">
					<view>历史报警</view>
				</view>
				<view class="con_box">
					<view class="history_alarm_box" v-for="item in monitorDetail.historyAlarm" :key='item.alarmId'>
						<view>{{item.alarmDesc}}</view>
						<view class="device_info_row">
							<text>报警开始时间</text>
							<text>{{item.startTime}}</text>
						</view>
						<view class="device_info_row">
							<text>报警结束时间</text>
							<text>{{item.endTime}}</text>
						</view>
						<view class="device_info_row">
							<text>最高报警级别</text>
							<text>{{item.maxLevel}}级</text>
						</view>
						<view class="flex_between_row">
							<view class="device_info_row">
								<text>最高浓度报警</text>
								<text>{{item.maxLevel}}级</text>
							</view>
							<text>{{item.maxTime}}</text>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	let vm = this
export default {
	data() {
		return {
			monitorDetail:null,
			alarmId:'',
			isUp:false ,//默认收起状态
			show:"height: 1000rpx;top:calc(100vh - 1000rpx)",
			hide:"height: 340rpx;top:calc(100vh - 340rpx)",
			showIndicators:false,
			chartData:null,
		};
	},
	mounted() {
		vm = this;
		vm.init()
	},
	watch:{
		isUp(newVal){
			if(newVal){
				uni.getStorage({
					key:'monitorDetailData',
					success(res){
						vm.chartData = res.data
					}
				})
			}
		}
	},
	methods: {
		init(){
			uni.getStorage({
			    key: 'monitorDetail',
			    success(res) {
					vm.alarmId = res.data.alarmId || res.data.alarmid
					if(!vm.alarmId){
						return false
					}
					vm.alarmDetailInfoFn()
			    }
			});
		},
		openLocation(){
			uni.openLocation({
				latitude:this.monitorDetail.latitude,
				longitude:this.monitorDetail.longtitude,
				name:this.monitorDetail.alarmPoint,
				address:this.monitorDetail.alarmRoad
			})
		},
		removeAlarm(){
			if(vm.monitorDetail.ravelFlag){
				return false
			}
			let id = vm.alarmId
			uni.navigateTo({
				url:`/pages/views/removeAlarm/removeAlarm?id=${id}`
			})
		},
		alarmDetailInfoFn(){
			this.$api.alarmDetailInfo({
				alarmId:this.alarmId
			}).then(res => {
				this.monitorDetail = res.data[0]
				console.log('this.monitorDetail.historyCurveData.length',this.monitorDetail.historyCurveData.length)
				if(this.monitorDetail.historyCurveData.length){
					let tempchartData = {
						categories: this.monitorDetail.historyCurveData[0]['times'],
						series: [
							{
								data:this.monitorDetail.historyCurveData[0]['values'],
								name:'甲烷浓度',
								index:0,
							},
							{
								data:this.monitorDetail.historyCurveData[0]['wendu'],
								name:'温度',
								index:1,
							},
						]
					}
					uni.setStorage({
						key:'monitorDetailData',
						data:tempchartData,
					})
				}else{
					uni.clearStorage('monitorDetailData')
				}
				
				
				uni.$emit('alarmDetailPos',res.data)
			})
		},
		enterMonitor(){
			uni.navigateTo({
				url:`/pages/views/monitorCurve/monitorCurve`,
			})
		}
	}
};
</script>

<style lang="scss" scoped>
.item_detail_box{
	position: absolute;
	width: 100%;	
	border-top-left-radius: 10rpx;
	border-top-right-radius: 10rpx;
	padding: 0 20rpx 80rpx;
	background: #FFFFFF;
	transition: all .5s;
	.detail_head{
		height: 260rpx;
		padding-top: 66rpx;
		padding-bottom: 20rpx;
		font-size: 24rpx;
		color: $uni-text-color-grey;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		.alarmDesc{
			font-size: 28rpx;
			color: #333;
			font-weight: 600;
		}
		.monitorValue{
			color: $uni-color-warning;
			font-size: 24rpx;
			text{
				font-size: 24rpx;
				border-radius: 4rpx;
				margin-left: 20rpx;
				padding: 0 8rpx;
				border: 2rpx solid $uni-color-warning;
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
			color: #666;
			flex: 1;
			flex-shrink: 0;
			display: flex;
			flex-wrap: wrap;
			align-items: center;
		}
	}
}
.device_info_row{
	display: flex;
	align-items: center;
	height: 70rpx;
	text{
		font-size: 24rpx;
		color: #666;
		&:first-child{
			display: block;
			width: 180rpx;
		}
		&:last-child{
			display: block;
			width: calc(100% - 180rpx);
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
	}
}
.history_alarm_box{
	border-bottom: 2rpx solid $uni-bg-color-grey;
	margin-bottom: 20rpx;
	padding-bottom: 20rpx;
	&:last-child{
		margin-bottom: 0;
		border-bottom: none;
		padding-bottom: 0;
	}
}
scroll-view{
	height: calc(100% - 260rpx);
	flex-shrink: 0;
	background: #f5f6f9;
	padding-top: 10rpx;
	.comm_box{
		background: #fff;
		margin-bottom: 10rpx;
		.tit_box{
			width: 100%;
			height: 90rpx;
			line-height: 90rpx;
			border-bottom: 2rpx solid #dde0e4;
			font-size: 28rpx;
			font-weight: 600;
			.indicators{
				height: 50rpx;
				line-height: 50rpx;
				border-radius: 4rpx;
				text-align: center;
				padding: 0 10rpx;
				font-size: 24rpx;
				color: $uni-color-primary;
				border:2rpx solid $uni-color-primary;
			}
			.cur{
				border: none;
				background: $uni-color-primary;
				color: #fff;
				
			}
		}
		.con_box{
			padding: 20rpx 0;
			width: 100%;
			.chart_info{
				padding: 0 20rpx;
				background: #e5eefa;
				color: $uni-color-primary;
				height: 44rpx;
				line-height: 44rpx;
			}
			.chartBox{
				height: 600rpx;
			}
		}
	}
}
.removeAlarm_btn_box{
	height: 90rpx;
	line-height: 90rpx;
	display: flex;
	align-items: center;
	padding: 0 40rpx;
	box-shadow: 0 0 10rpx 8rpx rgba(211, 211, 211, 0.2);
	.btn_removeAlarm{
		height: 60rpx;
		line-height: 60rpx;
		color: $uni-color-primary;
		border: 2rpx solid $uni-color-primary;
		border-radius: 10rpx;
		padding: 0 30rpx;
	}
	.alarm_removed{
		color: $uni-text-color-disable;
		border: 2rpx solid $uni-text-color-disable;
	}
}
.no_data{
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	margin: 20rpx 0;
	color: $uni-text-color-disable;
}
.flex_between_row:last-child{
	.device_info_row{
		text:last-child{
			width: 100rpx;
		}
	}
}
</style>
