<template>
	<view class="container">
		<monitor-chart-landscape :chartData='chartData' v-if='chartData!==null'></monitor-chart-landscape>
		<!-- <monitor-chart-landscape2 :landscape='landscape' :chartData='chartData' v-if='chartData!==null'></monitor-chart-landscape2> -->
	</view>
</template>

<script>
	let vm = this
export default {
	data() {
		return {
			chartData:null,
			landscape:true
		};
	},
	onLoad(options) {
		vm = this
		if(options.alarmInspect){
			vm.equipCurveDataFn(options.alarmInspect)
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
		equipCurveDataFn(alarmInspect){
			vm.$api.equipCurveData({
				pipepointid:alarmInspect
			}).then(res => {
				let data = res.data
				// debugger
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
