<template>
	<view class="item_detail_box box_shadow" :style="!isUp?hide:show">
		<pull-up :isUp.sync='isUp'></pull-up>
		<view class="detail_head">
			<view>{{monitorDetail.alarmDesc}}</view>
			<view>
				<text>1.6km</text>|<text>方兴大道与创新大道西北向</text>
			</view>
			<view class="flex_between_row">
				<view>5.4%VOL <text>2级</text></view>
				<view>{{monitorDetail.monitorTimeStr}}</view>
			</view>
		</view>
		<scroll-view scroll-y="true" v-show="isUp">
			<view class="comm_box flex_column">
				<view class="tit_box flex_between_row">
					<view>监测曲线</view>
					<view>》</view>
				</view>
				<view class="con_box">
					<view>运行指标</view>
					<view>运行指标</view>
					<view>运行指标</view>
					<view>运行指标</view>
					<view>运行指标</view>
					<view>运行指标</view>
					<view>运行指标</view>
					<view>运行指标</view>
					
				</view>
			</view>
			<view class="comm_box flex_column">
				<view class="tit_box flex_between_row">
					<view>当前设备</view>
					<view>运行指标</view>
				</view>
				<view class="con_box">
					<view>运行指标</view>
					<view>运行指标</view>
					<view>运行指标</view>
					<view>运行指标</view>
					<view>运行指标</view>
					<view>运行指标</view>
					<view>运行指标</view>
					<view>运行指标</view>
				</view>
			</view>
			<view class="comm_box flex_column">
				<view class="tit_box flex_between_row">
					<view>历史报警</view>
				</view>
				<view class="con_box">
					<view>运行指标</view>
					<view>运行指标</view>
					<view>运行指标</view>
					<view>运行指标</view>
					<view>运行指标</view>
					<view>运行指标</view>
					<view>运行指标</view>
					<view>运行指标</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			monitorDetail:null,
			isUp:false ,//默认收起状态
			show:"height: 1000rpx;top:calc(100vh - 1000rpx)",
			hide:"height: 260rpx;top:calc(100vh - 260rpx)",
		};
	},
	mounted() {
		let vm = this;
		uni.getStorage({
		    key: 'monitorDetail',
		    success(res) {
		        // console.log(res.data);
				vm.monitorDetail = res.data
		    }
		});
	},
	methods: {

	}
};
</script>

<style lang="scss" scoped>
.item_detail_box{
	position: absolute;
	width: 100%;	
	border-top-left-radius: 10rpx;
	border-top-right-radius: 10rpx;
	padding: 0 20rpx;
	background: #FFFFFF;
	transition: all .5s;
	.detail_head{
		height: 260rpx;
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
		}
		.con_box{
			padding: 20rpx 0;
		}
	}
}

</style>
