<template>
	<view class="container">
	<map class="map" id="map"
	:longitude="longitude" 
	:latitude="latitude" scale="16" 
	:markers="markers">
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
export default {
	data() {
		return {
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
					}
			],
		};
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
	},
	onLoad(options) {
		let vm = this;
		vm.initMap()
		
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
					console.log('longitude:',vm.longitude)
					console.log('latitude:',vm.latitude)
			    }
			});
		}
	},
	mounted(){
		let vm = this;
		uni.$on('alarmDetailPos',(alarmDetailPos)=>{
			let data = alarmDetailPos[0]
			vm.longitude = data.longtitude
			vm.latitude = data.latitude
			console.log('longitude:',vm.longitude)
			console.log('latitude:',vm.latitude)
			vm.markers.push({
			  latitude: data.latitude,
			  longitude: data.longitude,
			  iconPath: '../../static/logo.png',
			  width: 30,
			  height: 30,
			  id:data.alarmid
			})
		})
		uni.$on('realtimeMonitorDetail',(data)=>{
			vm.longitude = data.longtitude
			vm.latitude = data.latitude
			console.log('longitude:',vm.longitude)
			console.log('latitude:',vm.latitude)
			vm.markers.push({
			  latitude: data.latitude,
			  longitude: data.longitude,
			  iconPath: '../../static/logo.png',
			  width: 30,
			  height: 30,
			  id:data.alarmId
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
		initMap(){
			let vm = this;
			// var myAmapFun = new amapFile.AMapWX({ key: vm.key });
			
			// myAmapFun.getRegeo({
			//   iconPath: "../../static/logo.png",
			//   iconWidth: 22,
			//   iconHeight: 32,
			//   success: function (data) {
			// 	vm.markers.push({
			// 	  id: data[0].id,
			// 	  latitude: data[0].latitude,
			// 	  longitude: data[0].longitude,
			// 	  iconPath: data[0].iconPath,
			// 	  width: data[0].width,
			// 	  height: data[0].height
			// 	})
			//   },
			// })
		},
		getAlarmInfoFn(){
			this.$api.getAlarmInfo({
				level:this.level,
			}).then(res =>{
				console.log(res)
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
