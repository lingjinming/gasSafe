<template>
	<view class="container"  :style="{'background-image': `url(${urlConfig}/gas/mini/getLocalFile/bg)`}">
	  <view class="header">
		  <view class="title flex_center_row">燃气安全监测</view>
		  <view class="flex_between_row">
			  <view class="tab_box flex_between_row">
				  <view class="act" v-for="item in btns"
				  :key='item.id'
				  :class="{'cur':curType == item.type}"
				  @click="changeType(item.type)">{{item.type}}</view>
			  </view>
			  <image src="../../../static/img/map.png" mode="aspectFit" @click="enterMap"></image>
		  </view>
	  </view>
	  <view class="filter_box box_shadow">
		  <template v-if="curType == '报警列表'">
			  <type-tab :title="'报警类型'" :tabs.sync="alarmTypes">
			  </type-tab>
			  <type-tab :title="'报警状态'" :tabs.sync="alarmStatus">
			  </type-tab>
		  </template>
		  <template v-else>
			  <type-tab :title="'是否安装'" :tabs.sync="installStatus">
			  </type-tab>
		  </template>
	  </view>
	  <view class="search_box flex_between_row">
		  <view>共<text>{{recordsNum}}</text>条记录</view>
		  <view @click="enterSearch">搜索</view>
	  </view>
		<scroll-view scroll-y="true" :style="{height:curType == '报警列表'?'calc(100% - 690rpx)':'calc(100% - 540rpx)'}">
			<image class="no_alarm" :src='`${urlConfig}/gas/mini/getLocalFile/no_alarm`' v-if="!recordsNum"></image>
			<template v-if="curType == '报警列表'">
				<!-- <image class="no_alarm" :src='`${urlConfig}/gas/mini/getLocalFile/no_alarm`' v-if="!monitorData.length && !equipMonitorData.length"></image> -->
				<monitor-item v-for='item in monitorData' :monitorData.sync='item' :key='item.alarmId'></monitor-item>
			</template>
			<template v-else>
				<!-- <image class="no_alarm" :src='`${urlConfig}/gas/mini/getLocalFile/no_alarm`' v-if="!equipMonitorData.length"></image> -->
				<realtime-monitor-item v-for='item in equipMonitorData' :realtimeMonitorData.sync='item' :key='item.alarmid'></realtime-monitor-item>
			</template>
		</scroll-view>
	</view>
</template>

<script>
import urlConfig from '../../../common/config.js'
export default {
	data() {
		return {
			urlConfig,
			curType:'报警列表',
			btns:[
				{
					id:0,
					type:'报警列表'
				},
				{
					id:1,
					type:'实时监测'
				}
			],
			alarmTypes:[
					{	
						id:1,
						value:'一级报警',
						checked:true
					},
					{	
						id:2,
						value:'二级报警',
						checked:true
					},
					{
						id:3,
						value:'三级报警',
						checked:true
					}
			],
			alarmStatus:[
					{	
						id:0,
						value:'未解除',
						checked:true
					},
					{	
						id:1,
						value:'已解除',
						checked:true
					}
			],
			installStatus:[
				{
					id:0,
					value:'未安装',
					checked:true
				},
				{	
					id:1,
					value:'已安装',
					checked:true
				}
			],
			level:'1,2,3',
			ravelflag:"0,1",
			install:"0,1",
			recordsNum:0,
			monitorData:[],
			equipMonitorData:[]
		};
	},
	onShow() {
		this.changeType(this.curType)
	},
	watch:{
		alarmTypes:{
			handler(newVal){
				// debugger
				let arr = []
				 newVal.forEach(item => {
					 if (item.checked) {
						 arr.push(item.id)
					 }
				 })
				this.level = arr.join(',')
				this.getAlarmInfoFn()
			},
			deep:true
		},
		alarmStatus:{
			handler(newVal){
				let arr = []
				 newVal.forEach(item => {
					 if (item.checked) {
						 arr.push(item.id)
					 }
				 })
				this.ravelflag = arr.join(',')
				this.getAlarmInfoFn()
			},
			deep:true
		},
		installStatus:{
			handler(newVal){
				let arr = []
				 newVal.forEach(item => {
					 if (item.checked) {
						 arr.push(item.id)
					 }
				 })
				this.install = arr.join(',')
				this.getEquipMonitorFn()
			},
			deep:true
		},
	},
	methods: {
		reset(){
			this.recordsNum = 0
			this.monitorData = []
			this.equipMonitorData = []
		},
		enterMap(){
			uni.navigateTo({
				url:'../views/map'
			})
		},
		enterSearch(){
			uni.navigateTo({
				url:'../views/map'
			})
		},
		changeType(type){
			this.curType = type
			this.reset()
			if(this.curType == '报警列表'){
				this.getAlarmInfoFn()
			}else{
				this.getEquipMonitorFn()
			}
			
		},
		getAlarmInfoFn(){
			this.$api.getAlarmInfo({
				level:this.level,
				ravelflag:this.ravelflag,
			}).then(res =>{
				this.monitorData = res.data.data
				this.recordsNum = this.monitorData.length
			})
		},
		getEquipMonitorFn(){
			this.$api.getEquipMonitor({
				install:this.install
			}).then(res =>{
				this.equipMonitorData = res.data
				this.recordsNum = this.equipMonitorData.length
			})
		}
	}
};
</script>

<style lang="scss" scoped>
.container{
	background-size: 100% 400rpx;
	background-position: top center;
	background-repeat: no-repeat;
}
.header{
	position: relative;
	color: #fff;
	margin: 0 30rpx 20rpx;
	.flex_between_row{
		height: 70rpx;
	}
	.title{
		height: 50px;
		font-size: 20px;
		margin-top: 60rpx;
		// margin-bottom: 40rpx;
	}
	.tab_box{
		width: 280rpx;
		.cur{
			position: relative;
			font-size: 32rpx;
			font-weight: 600;
			&::after{
				position: absolute;
				content: '';
				width: 40rpx;
				height: 4rpx;
				background: #FFFFFF;
				border-radius: 4rpx;
				left: 50%;
				bottom: -8rpx;
				transform: translateX(-50%);
			}
		}
	}
	image{
		width:50rpx;
		height: 50rpx;
	}
}
.filter_box{
	margin: 0 30rpx;
	// height: 340rpx;
	padding: 20rpx 30rpx 10rpx;
	border-radius: 10rpx;
	background: #FFFFFF;
	box-sizing: border-box;
	display: flex;
	flex-wrap: wrap;
	// align-items: center;
}
type-tab{
	margin-bottom: 30rpx;
}
.search_box{
	margin: 0 30rpx;
	height: 80rpx;
	flex-shrink: 0;
	view:first-child{
		color: #666;
		font-size: 24rpx;
	}
	view:last-child{
		color: #333;
	}
	text{
		font-size: 32rpx;
		color: $uni-color-primary;
		margin: 0 6rpx;
	}
}
scroll-view{
	.no_alarm{
		width: 100%;
	}
}
</style>
