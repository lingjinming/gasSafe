<template>
	<view class="pull_up_btn" @touchstart.stop="start" @touchend.stop="end">
		<image v-if="isUp" src="../../static/img/pull_down.png" mode=""></image>
		<image v-else src="../../static/img/pull_up.png" mode=""></image>
	</view>
</template>

<script>
	export default {
		name: 'poll-up',
		props: {
			isUp:{
				type:Boolean,
				default:false,
			}
		},
		data() {
			return {
				startData:{clientX:'',clientY:''}
			};
		},
		methods: {
			start(e){
				this.startData.clientX=e.changedTouches[0].clientX;
				this.startData.clientY=e.changedTouches[0].clientY;
			},
			end(e){
				const subX=e.changedTouches[0].clientX-this.startData.clientX;
				const subY=e.changedTouches[0].clientY - this.startData.clientY;
				if(subY>50 || subY<-50){
					if(subY>50){
						this.$emit('update:isUp',false)
						
					}else if(subY<-50){
						this.$emit('update:isUp',true)
					}
				}else{
					if(subX>100){
						console.log('右滑')
					}else if(subX<-100){
						console.log('左滑')
					}else{
						console.log('无效')
					}
				}
			}
		}
	}
</script>

<style lang="scss">
.pull_up_btn{
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	top: 0;
	height: 80rpx;
	width: 100%;
	color: #428ee4;
	font-size: 24rpx;
	text-align: center;
	image{
		width: 170rpx;
		height: 40rpx;
	}
}
</style>
