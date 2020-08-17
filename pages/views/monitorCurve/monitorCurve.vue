<template>
	<view class="container">
		<monitor-chart-landscape :chartData='chartData' v-if='chartData!==null'></monitor-chart-landscape>
	</view>
</template>

<script>
	let vm = this
export default {
	data() {
		return {
			chartData:null
		};
	},
	onLoad(options) {
		vm = this
		if(options.alarmPoint){
			vm.equipCurveDataFn(options.alarmPoint)
		}else{
			uni.getStorage({
				key:'monitorDetailData',
				success(data){
					vm.chartData = data.data
				}
			})
		}
	},
	methods: {
		equipCurveDataFn(pipepointid){
			vm.$api.equipCurveData({
				pipepointid
			}).then(res => {
				let data = res.data
				vm.chartData = {
					categories: data['times'],
					series: [
						{
							data:data['values'],
							name:'甲烷浓度',
							index:0
						},
						{
							data:data['wendu'],
							name:'温度',
							index:1
						},
					]
				}
			})
		}
	}
};
</script>

<style lang="scss" scoped>
.container{
	background: #fff;
}
</style>
