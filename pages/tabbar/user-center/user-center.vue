<template>
	<view class="container"  :style="{'background-image': `url(${urlConfig}/gas/mini/getLocalFile/bg)`}">
		
		<view class="header_box">
			<image :src="userInfo.avatarUrl" class="box_shadow"></image>
			<view class="flex_around_column">
				<view>{{userInfo.nickName}}</view>
				<view>
					{{userInfo.city}}
				<!-- 	<button type="default" open-type="getPhoneNumber" getPhoneNumber='getPhoneNumber' @click="getPhoneNumber">
						{{phoneNumber?phoneNumber:'点击获取手机号'}}
					</button> -->
				</view>
			</view>
		</view>
		
		<view class="box_shadow user_info_box">
			<view class="flex_between_row">
				<view>
					<image src="../../../static/img/name.png" mode=""></image>
					<text>姓名</text>
				</view>
				<view >
					<input class="uni-input" disabled v-model="userInfoByApi.userName" />
				</view>
			</view>
			<view class="flex_between_row">
				<view>
					<image src="../../../static/img/company.png" mode=""></image>
					<text>所在单位</text>
				</view>
				<view >
					<input class="uni-input" disabled v-model="userInfoByApi.orgName" />
				</view>
			</view>
			<view class="flex_between_row">
				<view>
					<image src="../../../static/img/role.png" mode=""></image>
					<text>所属角色</text>
				</view>
				<view >
					<input class="uni-input" disabled v-model="userInfoByApi.roleName" />
				</view>
			</view>
			
			<view class="flex_between_row">
				<view >
					<image src="../../../static/img/about.png" mode=""></image>
					<text>报警推送</text>
				</view>
				<switch @click="requestSubscribeMessageFn" :checked="isSubscribed" disabled="true" />
			</view>
			
			<view class="flex_between_row">
				<view>
					<image src="../../../static/img/about.png" mode=""></image>
					<text>关于</text>
				</view>
				<view >
					<input class="uni-input" disabled v-model="about" />
				</view>
			</view>
		</view>
		
		<navigator class="sign_out_btn" hover-class="none" target="miniProgram" open-type="exit"> 退出</navigator>

	</view>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import urlConfig from '../../../common/config.js'
let vm ;
import { mixin } from '../../../common/mixins.js';

export default {
	data() {
		return {
			urlConfig,
			boolShow:false,
			userInfoByApi:{
				orgName: "",
				roleName: "",
				userId: "",
				userName: ""
			},
			about:'系统版本 v1.0.0',
			pwd:'******',
			phoneNumber:''
		};
	},
	mixins: [mixin],
	computed: {
		...mapState({
			//这里可以通过这种方式引用相应模块的state数据，其中user是模块名。在代码的其他部分可以使用this.userInfo访问数据
			userInfo: ({user}) => user.userInfo,
			isSubscribed: ({ tmplate }) => tmplate.isSubscribed
		})
	},
	onShow() {
		vm = this
		vm.getUserInfoFn()
		vm.getMainSwitch()//判断是否打开了订阅总开关
	},
	methods: {
		getUserInfoFn(){
			uni.getStorage({
				key:'userInfoByApi',
				success(data){
					vm.userInfoByApi = data.data
				}
			})
		},
		getPhoneNumber(e){
			console.log(JSON.stringify(e));  
		}
	}
};
</script>

<style lang="scss" scoped>
switch {
	transform: scale(0.7) translateX(40rpx);
}
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
	padding: 40rpx 25rpx;
	background: #fff;
	.flex_between_row{
		height: 80rpx;
		margin-bottom: 20rpx;
		view:first-child{
			display: flex;
			align-items: center;
			width: 220rpx;
			image{
				width: 72rpx;
				height: 72rpx;
				margin-right: 20rpx;
			}
		}
		view:last-child{
			width: calc(100% - 220rpx);
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
