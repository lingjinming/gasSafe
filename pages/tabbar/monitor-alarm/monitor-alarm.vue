<template>
	<view class="container"  :style="{'background-image': 'url(../../../static/img/tabbar/index_bg.png)'}">
	  <view class="header">
		  <view class="title flex_center_row">燃气安全监测</view>
		  <view class="flex_between_row">
			  <view class="tab_box flex_between_row">
				  <view class="act" v-for="item in btns"
				  :key='item.id'
				  :class="{'cur':curType == item.type}"
				  @click="changeType(item.type)">{{item.type}}</view>
			  </view>
			  <image src="../../../static/img/qa.png" mode="aspectFit" @click="enterMap"></image>
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
			<template v-if="curType == '报警列表'">
				<monitor-item v-for='item in monitorData' :monitorData.sync='item' :key='item.alarmId'></monitor-item>
			</template>
			<template v-else>
				<realtime-monitor-item></realtime-monitor-item>
			</template>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
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
					id:5,
					value:'未安装',
					checked:true
				},
				{	
					id:6,
					value:'已安装',
					checked:true
				}
			],
			level:'1,2,3',
			ravelflag:"0,1",
			recordsNum:0,
			monitorData:[
				{
					alarmId:'11',
					alarmLevel:'22',
					alarmDesc:'33',
					monitorTimeStr:'44',
					alarmDesc:'55',
					ravelFlag:0 //1表示已解除 0表示未解除
				}
			]
		};
	},
	onShow() {
		this.getAlarmInfoFn()
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
	},
	methods: {
		enterMap(){
			uni.navigateTo({
				url:'../../views/map'
			})
		},
		enterSearch(){
			uni.navigateTo({
				url:'../../views/map'
			})
		},
		changeType(type){
			this.curType = type
		},
		getAlarmInfoFn(){
			this.$api.getAlarmInfo({
				level:this.level,
				ravelflag:this.ravelflag,
			}).then(res =>{
				this.monitorData = res.data.data
				this.recordsNum = res.data.data.length
			})
		}
	}
};
</script>

<style lang="less" scoped>
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
		color: #428ee4;
		margin: 0 6rpx;
	}
}
// scroll-view{
// 	padding: 0 30rpx;
// }
</style>
