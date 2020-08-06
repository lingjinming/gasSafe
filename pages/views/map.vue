<template>
	<view class="container">
	<uni-search-bar ></uni-search-bar>
	<popup-layer ref="popupRef" :direction="'top'" v-model="boolShow">
	  <view class="zidingyiBox">
				   11
	  </view>
	</popup-layer>
	  <map class="map" id="map" 
	  :longitude="longitude" 
	  :latitude="latitude" scale="16" 
	  :markers="markers">
	  
	     <cover-view class="controls-title">简单的自定义 controls</cover-view>
	  </map> 
	</view>
</template>

<script>
let amapFile = require('../../libs/amap-wx.js');  //引入高德js
export default {
	data() {
		return {
			key:'9e794c3f3803c391c37b1a815f05a504',
			markers: [],
			latitude: '',
			longitude: '',
			textData: {},
			boolShow:true
		};
	},
	onLoad() {
		let vm = this;
		var myAmapFun = new amapFile.AMapWX({ key: vm.key });
		
		myAmapFun.getRegeo({
		  iconPath: "../../static/logo.png",
		  iconWidth: 22,
		  iconHeight: 32,
		  success: function (data) {
			vm.markers.push({
			  id: data[0].id,
			  latitude: data[0].latitude,
			  longitude: data[0].longitude,
			  iconPath: data[0].iconPath,
			  width: data[0].width,
			  height: data[0].height
			})
		  },
		})
	},
	methods: {
		show(){
			this.$refs.popupRef.show(); // 或者 boolShow = rue
		},
		close(){
			this.$refs.popupRef.close();// 或者 boolShow = false
		}
	}
};
</script>

<style>
.map{
  width: 100%;
  height: 100%;
}
.zidingyiBox{
	height: 100rpx;
	width: 100%;
}

</style>
