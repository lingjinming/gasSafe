<template>
	<view class="container"  :style="{'background-image': `url(${urlConfig}/gas/mini/getLocalFile/bg)`}">
		
		<view class="header_box">
			<image :src="userInfo.avatarUrl" class="box_shadow"></image>
			<view class="flex_around_column">
				<view>{{userInfo.nickName}}</view>
				<view>{{userInfo.city}}</view>
			</view>
		</view>
		
		<view class="box_shadow user_info_box">
			<view class="flex_between_row">
				<view>
					<image src="../../../static/img/alarm/device_alarm.png" mode=""></image>
					<text>姓名</text>
				</view>
				<view >
					<input class="uni-input" v-model="userInfo.nickName" />
				</view>
			</view>
			<view class="flex_between_row">
				<view>
					<image src="../../../static/img/alarm/device_alarm.png" mode=""></image>
					<text>所在单位</text>
				</view>
				<view >
					<input class="uni-input" v-model="userInfo.nickName" />
				</view>
			</view>
			<view class="flex_between_row">
				<view>
					<image src="../../../static/img/alarm/device_alarm.png" mode=""></image>
					<text>所属角色</text>
				</view>
				<view >
					<input class="uni-input" v-model="userInfo.nickName" />
				</view>
			</view>
			<view class="flex_between_row">
				<view>
					<image src="../../../static/img/alarm/device_alarm.png" mode=""></image>
					<text>关于</text>
				</view>
				<view >
					<input class="uni-input" v-model="userInfo.nickName" />
				</view>
			</view>
			<view class="flex_between_row">
				<view>
					<image src="../../../static/img/alarm/device_alarm.png" mode=""></image>
					<text>修改密码</text>
				</view>
				<view >
					<input class="uni-input" v-model="userInfo.nickName" />
				</view>
			</view>
		</view>
		
		<view class="sign_out_btn">退出</view>
		<popup-layer v-show='boolShow' ref="popupRef" :direction="'top'">
		  <view>
			  <button @click="getuserinfo" @getuserinfo='getuserinfo' class="btn_box" open-type="getUserInfo" >
				  请授权获取用户信息
			  </button>
		  </view>
		</popup-layer>
	</view>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import urlConfig from '../../../common/config.js'
let vm ;
export default {
	data() {
		return {
			urlConfig,
			boolShow:false
		};
	},
	computed: {
		...mapState({
			//这里可以通过这种方式引用相应模块的state数据，其中user是模块名。在代码的其他部分可以使用this.userInfo访问数据
			userInfo: ({user}) => user.userInfo,
		})
	},
	watch:{},
	onShow() {
		vm = this
		if(!vm.userInfo.nickName){
			vm.boolShow = true
			this.$refs.popupRef.show(); // 或者 boolShow = rue
			vm.getuserinfo()
		}else{
			vm.boolShow = false
			this.$refs.popupRef.close();
		}
	},
	methods: {
		...mapActions(['setUserInfo']),
		getuserinfo(){
			uni.getUserInfo({
			    complete: (res) => {
					vm.setUserInfo(res.userInfo) 
					vm.boolShow = false
					this.$refs.popupRef.close();
			    }
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
.header_box{
	display: flex;
	align-items: center;
	padding: 100rpx 0 20rpx 80rpx;
	image{
		width: 156rpx;
		height: 156rpx;
		border-radius: 50%;
		margin-right: 40rpx;
	}
	.flex_around_column{
		height: 100rpx;
		color: #fff;
		view{
			height: 50rpx;
			line-height: 50rpx;
		}
		view:first-child{
			font-weight: 600;
			font-size: 32rpx;
		}
	}
}
.user_info_box{
	border-radius: 20rpx;
	position: absolute;
	left: 26rpx;
	right: 26rpx;
	top: 300rpx;
	padding: 40rpx;
	background: #fff;
	.flex_between_row{
		height: 80rpx;
		margin-bottom: 20rpx;
		view:first-child{
			display: flex;
			align-items: center;
			width: 200rpx;
			image{
				width: 72rpx;
				height: 72rpx;
			}
		}
		view:last-child{
			width: calc(100% - 200rpx);
			flex-shrink: 0;
			input{
				height: 100%;
				width: 100%;
				text-align: right;
			}
		}
	}
}
.sign_out_btn{
	position: absolute;
	bottom: 60rpx;
	height: 72rpx;
	line-height: 72rpx;
	right: 26rpx;
	left: 26rpx;
	border-radius: 10rpx;
	background: #FFFFFF;
	color: #333;
	text-align: center;
	letter-spacing: 4rpx;
}
</style>
