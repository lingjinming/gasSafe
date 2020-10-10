<template>
	<view class="item_detail_box box_shadow" :style="!isUp ? hide : show">
		<pull-up :isUp.sync="isUp"></pull-up>
		<image @click="openLocation" class="openLocation_btn" src="../../static/img/open_location.png" mode=""></image>
		<view class="detail_head">
			<view class="alarmDesc padding_right150">{{ realtimeMonitorDetail.equipmentCode }}</view>
			<view class="padding_right150">
				<!-- <text>1.6km</text>|<text>{{realtimeMonitorDetail.alarmRoad}}</text> -->
				<text>{{ realtimeMonitorDetail.installPos }}</text>
			</view>
			<view class="flex_between_row">
				<view class="monitorValue">{{ realtimeMonitorDetail.monitorValue }}</view>
				<view>{{ realtimeMonitorDetail.monitorTime }}</view>
			</view>
		</view>
		<scroll-view scroll-y="true" v-show="isUp">
			<view class="comm_box flex_column">
				<view class="con_box">
					<view class="indicators"><indicators-item :equipmentCode="realtimeMonitorDetail.equipmentCode"></indicators-item></view>
					<view class="device_info_row">
						<text>GPS位置</text>
						<text>{{ realtimeMonitorDetail.GPSposition }}</text>
					</view>
					<!-- 			<view class="device_info_row">
						<text>数据时间</text>
						<text>{{realtimeMonitorDetail.monitorIndex.datatime}}</text>
					</view> -->
					<view class="device_info_row">
						<text>关联对象</text>
						<text>{{ realtimeMonitorDetail.relateObject }}</text>
					</view>
					<view class="device_info_row">
						<text>所属对象</text>
						<text>{{ realtimeMonitorDetail.alarmPoint }}</text>
					</view>
					<view class="device_info_row">
						<text>所在节点</text>
						<text>{{ realtimeMonitorDetail.equipNode }}</text>
					</view>
				</view>
			</view>
			<view class="comm_box flex_column">
				<view class="tit_box flex_between_row"><view>井内照片</view></view>
				<view class="con_box">
					<view class="flex_center_row" v-if="!realtimeMonitorDetail.filePath.length">暂无图片</view>
					<image v-else v-for="(item, i) in realtimeMonitorDetail.filePath" :key="i" :src="item"></image>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
let vm;
export default {
	data() {
		return {
			realtimeMonitorDetail: null,
			equipId: '',
			isUp: false, //默认收起状态
			show: 'height: 1000rpx;top:calc(100vh - 1000rpx)',
			hide: 'height: 260rpx;top:calc(100vh - 260rpx)',
			showIndicators: false
		};
	},
	mounted() {
		vm = this;
		vm.init();
	},
	methods: {
		init() {
			uni.getStorage({
				key: 'realtimeMonitorDetail',
				success(res) {
					vm.equipId = res.data.equipId || res.data.equipid;
					vm.getEquipDetailInfoFn();
				}
			});
		},
		openLocation() {
			uni.openLocation({
				latitude: this.realtimeMonitorDetail.latitude,
				longitude: this.realtimeMonitorDetail.longtitude,
				name: this.realtimeMonitorDetail.equipmentCode,
				address: this.realtimeMonitorDetail.installPos
			});
		},
		getEquipDetailInfoFn() {
			this.$api
				.getEquipDetailInfo({
					equipId: vm.equipId
				})
				.then(res => {
					vm.realtimeMonitorDetail = res.data;
					uni.$emit('realtimeMonitorDetail', res.data);
				});
		}
	}
};
</script>

<style lang="scss" scoped>
.item_detail_box {
	position: absolute;
	width: 100%;
	border-top-left-radius: 10rpx;
	border-top-right-radius: 10rpx;
	padding: 0 20rpx;
	background: #ffffff;
	transition: all 0.5s;
	.detail_head {
		height: 260rpx;
		padding-top: 66rpx;
		padding-bottom: 20rpx;
		font-size: 24rpx;
		color: $uni-text-color-grey;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		.alarmDesc {
			font-size: 28rpx;
			color: #333;
			font-weight: 600;
		}
		.monitorValue {
			color: $uni-color-warning;
			font-size: 24rpx;
			text {
				font-size: 24rpx;
				border-radius: 4rpx;
				margin-left: 20rpx;
				padding: 0 8rpx;
				border: 2rpx solid $uni-color-warning;
			}
		}
	}
	.info_box {
		display: flex;
		align-items: center;
		height: 50rpx;
		margin-bottom: 20rpx;
		.label {
			width: 200rpx;
			color: #666;
		}
		.value {
			color: #666;
			flex: 1;
			flex-shrink: 0;
			display: flex;
			flex-wrap: wrap;
			align-items: center;
		}
	}
}
.device_info_row {
	display: flex;
	align-items: center;
	height: 70rpx;
	text {
		font-size: 24rpx;
		color: #666;
		&:first-child {
			display: block;
			width: 180rpx;
		}
		&:last-child {
			display: block;
			width: calc(100% - 180rpx);
			overflow: hidden;
			text-overflow: hidden;
			text-overflow: ellipsis;
		}
	}
}
.history_alarm_box {
	border-bottom: 2rpx solid $uni-bg-color-grey;
	margin-bottom: 20rpx;
	padding-bottom: 20rpx;
	&:last-child {
		margin-bottom: 0;
		border-bottom: none;
		padding-bottom: 0;
	}
}
scroll-view {
	height: calc(100% - 260rpx);
	flex-shrink: 0;
	background: #f5f6f9;
	padding-top: 10rpx;
	.comm_box {
		background: #fff;
		margin-bottom: 10rpx;
		.tit_box {
			width: 100%;
			height: 90rpx;
			line-height: 90rpx;
			border-bottom: 2rpx solid #dde0e4;
			font-size: 28rpx;
			font-weight: 600;
		}
		.con_box {
			padding: 20rpx 0;
			width: 100%;
			.chart_info {
				padding: 0 20rpx;
				background: #e5eefa;
				color: $uni-color-primary;
				height: 44rpx;
				line-height: 44rpx;
			}
			.chartBox {
				height: 600rpx;
			}
			image {
				width: 150rpx;
				height: 150rpx;
				margin-right: 25rpx;
				margin-bottom: 25rpx;
			}
		}
	}
}
</style>
