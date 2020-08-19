<template>
	<view class="item_box">
	  	<view class="flex_around_column">
			{{equipMonitorData.speed}}
			<text>泵转速（r/s）</text>
		</view>
		<view class="flex_around_column">
			{{equipMonitorData.voltage}}
			<text>电池电压</text>
		</view>
		<view class="flex_around_column">
			{{equipMonitorData.datalength}}
			<text>液位（cm）</text>
		</view>
		<view class="flex_around_column">
			{{equipMonitorData.temperature}}
			<text>温度℃</text>
		</view>
		<view class="flex_around_column">
			{{equipMonitorData.humidity}}
			<text>湿度%RH</text>
		</view>
		<view class="flex_around_column">
			{{equipMonitorData.signal}}
			<text>流量（m3/h）</text>
		</view>
		<view class="flex_around_column">
			{{equipMonitorData.temperature}}
			<text>CSQ</text>
		</view>
		<view class="flex_around_column">
			{{equipMonitorData.water}}
			<text>浸水状态</text>
		</view>
		<view class="flex_around_column">
			{{equipMonitorData.guard}}
			<text>防盗状态</text>
		</view>
		<view>
			<text>数据时间 : {{equipMonitorData.datatime}}</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			equipMonitorData:{
			  "msg": "success",
			  "datalength": 0,
			  "datatime": "2020-08-11 20:37:33",
			  // "guard": "否",
			  // "temperature": "27.0",
			  // "humidity": "84.0",
			  // "realdata": "0.00%VOL",
			  "signal": "10.0",
			  // "water": "是",
			  // "speed": "0.0",
			  // "voltage": "3.7"
			}
		};
	},
	props:{
		equipmentCode:{
			type:String,
			default:''
		},
	},
	watch:{
		equipmentCode(newVal){
			this.equipMonitorIndexFn(newVal)
		}
	},
	methods: {
		equipMonitorIndexFn(equipmentCode){
			this.$api.equipMonitorIndex({
				equipmentCode
			}).then(res => {
				this.equipMonitorData = res.data
			})
		}
	}
};
</script>

<style lang="scss" scoped>
.item_box{
	display: flex;
	flex-wrap: wrap;
	border-top:2rpx solid $uni-bg-color-grey;
	padding-top: 20rpx;
	view{
		color: #999;
		font-size: 24rpx;
	}
	.flex_around_column{
		height: 130rpx;
		padding: 15rpx;
		border-radius: 10rpx;
		background: #f5f6f9;
		margin-right: 20rpx;
		margin-bottom: 20rpx;
		width: calc((100% - 40rpx) / 3);
		color: $uni-color-primary;
		font-size: 32rpx;
		text{
			color: #666;
			font-size: 24rpx;
		}
		&:nth-child(3n){
			margin-right: 0;
		}
	}
}

</style>
