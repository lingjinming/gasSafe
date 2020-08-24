<template>
	<view class="tab_box" :class="{'isColumn':isColumn}">
		<view class="tit">{{title}}</view>
		<view class="tab_item_box">
			<view v-for="item in tabs" :key='item.id'
			:class="['tab_item flex_center_row',{'cur':item.checked}]"
			@click="changeType(item)">
				{{item.value}}
				<image v-if="item.checked" src="../../static/img/checked.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props:{
			title:{
				type:String,
				default:'tab标题'
			},
			isColumn:{
				type:Boolean,
				default:false
			},
			tabs:{
				type: Array,
				default: [
					{	
						id:0,
						value:'类型1',
						checked:true
					},
					{	
						id:1,
						value:'类型2',
						checked:false
					},
					{
						id:2,
						value:'类型3',
						checked:true
					}
				]
			}
		},
		onShow(){
			// console.log(this.title)
			// console.log(this.tabs)
		},
		methods:{
			changeType(item){
				item.checked = !item.checked
				// console.log(this.tabs)
				this.$emit('update:tabs',this.tabs)
			}
		}
	}
</script>

<style lang="scss" scoped>
.tab_box{
	.tit{
		color: #999;
		height: 40rpx;
		line-height: 40rpx;
		margin-bottom: 15rpx;
	}
	.tab_item_box{
		display: flex;
		flex-wrap: wrap;
		.tab_item{
			position: relative;
			width: 194rpx;
			height: 72rpx;
			border-radius: 10rpx;
			color: #999;
			background: #f5f6fa;
			margin-right: 20rpx;
			&:nth-child(3n){
				margin-right: 0;
			}
			image{
				position: absolute;
				right: 0;
				bottom: 0;
				width: 40rpx;
				height: 36rpx;
			}
		}
		.cur{
			color: $uni-color-primary;
			background: #e9f1fb;
		}
	}
}
.isColumn{
	.tit{
		text-align: center;
		margin: 50rpx 0;
	}
	.tab_item_box{
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.tab_item{
			margin-right: 0;
			margin-bottom: 40rpx;
		}
	}
}
</style>
