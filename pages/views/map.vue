<template>
	<view class="container">
	<map class="map" id="map"
	:longitude="longitude" 
	:latitude="latitude" :scale="scale" 
	:markers="markers"
	@markertap='chooseMarker'
	show-location>
	</map> 	
	<view class="layer_box" @click='show'>
			<image src="../../static/img/layer.png"></image>
	</view>
	<uni-search-bar :placeholder="'搜地点,查设备,找窨井'"></uni-search-bar>
	<popup-layer v-show='boolShow' ref="popupRef" :direction="'left'">
	  <type-tab :title="'报警级别'" :isColumn=true :tabs.sync="alarmTypes">
	  </type-tab>
	</popup-layer>
	
	<monitor-item-detail v-if='monitorDetail'></monitor-item-detail>
	<realtime-monitor-item-detail v-if='showRealtimeMonitorDetail'></realtime-monitor-item-detail>
	  
	</view>
</template>

<script>
let amapFile = require('../../libs/amap-wx.js');  //引入高德js
let vm ;
export default {
	data() {
		return {
			scale:10,
			showRealtimeMonitorDetail:false, // 默认不展示监测详情
			monitorDetail:false,// 默认不展示设备详情
			key:'9e794c3f3803c391c37b1a815f05a504',
			markers: [],
			latitude: '',
			longitude: '',
			textData: {},
			boolShow:false,
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
					},
					{
						id:0,
						value:'无报警',
						checked:true
					}
			],
		};
	},
	watch:{
		alarmTypes:{
			handler(newVal){
				vm = this
				// debugger
				let arr = []
				 newVal.forEach(item => {
					 if (item.checked) {
						 arr.push(item.id)
					 }
				 })
				this.level = arr.join(',')
				if(arr.length == vm.alarmTypes.length){
					this.level = ''		 
				}
				this.initMap()
			},
			deep:true,
			immediate:true,
		},
	},
	onLoad(options) {
		vm = this;
		if(options.realtimeMonitorDetail){
			this.showRealtimeMonitorDetail = true
		}else if(options.monitorDetail){
			this.monitorDetail = true
		}else{
			uni.getLocation({ // 默认定位到用户位置
			    type: 'gcj02',
			    success: function (res) {
					vm.longitude = res.longitude
					vm.latitude = res.latitude
			    }
			});
		}
	},
	mounted(){
		uni.$on('alarmDetailPos',(alarmDetailPos)=>{
			let data = alarmDetailPos[0]
			vm.scale = 16
			vm.longitude = data.longtitude
			vm.latitude = data.latitude
			let alarmLevel = data.alarmLevel.substr(0, data.alarmLevel.length - 1)
			vm.markers.push({
			  latitude: vm.latitude,
			  longitude: vm.longitude,
			  iconPath: `../../static/img/alarm/alarm_level${alarmLevel}.png`,
			  width: 30,
			  height: 30,
			  id:vm.longitude
			})
		})
		uni.$on('realtimeMonitorDetail',(data)=>{
			vm.longitude = data.longtitude
			vm.latitude = data.latitude
			vm.scale = 16
			vm.markers.push({
			  latitude: vm.latitude,
			  longitude: vm.longitude,
			  iconPath: '../../static/img/alarm/device_alarm.png',
			  width: 30,
			  height: 30,
			  id:vm.longitude
			})
		})
	},
	beforeDestroy() {
		uni.$off('alarmDetailPos')
		uni.$off('realtimeMonitorDetail')
	},
	methods: {
		show(){
			this.boolShow = true
			this.$refs.popupRef.show(); // 或者 boolShow = rue
		},
		close(){
			this.$refs.popupRef.close();// 或者 boolShow = false
		},
		chooseMarker(e){
			// debugger
			// if(!e.detail.markerId && e.detail.markerId!=0){
			// 	return false
			// }
			vm.scale = 16
			let id = e.detail.markerId
			let curMarker = vm.markers.filter(item => item.id == id)
			if(curMarker[0].alarmid == ''){ // 设备点位
			vm.showRealtimeMonitorDetail = true
			vm.monitorDetail = false
			
				uni.setStorage({
					key:'realtimeMonitorDetail',
					data:curMarker[0]
				})
				
			}else{
				vm.monitorDetail = true
				vm.showRealtimeMonitorDetail = false
				
				uni.setStorage({
					key:'monitorDetail',
					data:curMarker[0]
				})
		
			}

		},
		initMap(){
			vm.scale = 10
			vm.$api.getAlarmMapView({
				level:vm.level
			}).then(res => {
				vm.markers = []
				let markersArr = res.data.data
				markersArr.forEach((item,index) => {
					let iconPath = item.alarmid ? `../../static/img/alarm/alarm_level${item.alarmLevel}.png`:
					`../../static/img/alarm/device_alarm.png`
					let title = item.alarmid ? '甲烷浓度超标报警':''
					vm.markers.push({
					  title,
					  id:item.longtitude,
					  latitude: item.latitude || '',
					  longitude: item.longtitude || '',
					  iconPath,
					  width: 30,
					  height: 30,
					  alarmid:item.alarmid || '',
					  equipid:item.equipid || '',
					  alarmLevel:item.alarmLevel || ''
					})
				})
				
				console.log(vm.markers)
			})
		},
	}
};
</script>

<style lang="scss">
.map{
  width: 100%;
  height: 100%;
}
popup-layer view{
	width: 40vw;
}
.layer_box{
	position: absolute;
	right: 40rpx;
	top: 200rpx;
	height: 100rpx;
	width: 100rpx;
	image{
		width: 100%;
		height: 100%;
	}

}
uni-search-bar{
	position: absolute;
	top: 40rpx;
	left: 40rpx;
	right: 40rpx;
	width: calc(100% - 80rpx);
	border-radius: 10rpx;
	box-shadow: 0 0 10rpx 8rpx rgba(211, 211, 211, 0.2);
}

</style>
