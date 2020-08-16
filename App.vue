<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
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
</style>
