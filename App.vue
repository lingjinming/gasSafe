<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
		uni.login({
			success(res) {
				if(res.code){
					uniCloud.callFunction({
					    name: 'gaslogin',
					    data: {
							  code:res.code
						  },
						  success(res) {
							  uni.setStorage({
								key:'openid',
								data:res.result.res.data.openid
							  })
						  }
					  })
				}
			},
		})
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/*每个页面公共css */ 
page,view,scroll-view,text,button{
	font-family: 微软雅黑;
	box-sizing: border-box !important;
	font-size: 28rpx;
}
page,
button,.container{
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  font-family: 'Courier New', Courier, monospace;
  background: #f5f6f9;
}
	
.flex_center_row{
	display: flex;
	align-items: center;
	justify-content: center;
}		
.flex_between_row{
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.flex_around_row{
	display: flex;
	justify-content: space-around;
	align-items: center;
}
.flex_column{
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.flex_around_column{
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
}
.box_shadow{
	box-shadow: 0 0 10rpx 8rpx rgba(211, 211, 211, 0.2);
}
.fixed_box{
	position: fixed;
	bottom: 0;
	left: 0;
	z-index: 999;
	width: 100%;
	background: #fff;
}
.padding_right150{
	padding-right: 150rpx;
}
.openLocation_btn{
	position: absolute;
	z-index: 999;
	width: 100rpx;
	height: 100rpx;
	right: 40rpx;
	top: 60rpx;
}
</style>
