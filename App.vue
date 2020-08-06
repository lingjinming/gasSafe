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
page,view,scroll-view,text{
	box-sizing: border-box !important;
}
page,
.container{
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  font-size: 28rpx;
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
.flex_around_column{
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
}
</style>
