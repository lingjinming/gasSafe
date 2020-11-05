<template>
	<view class="chartBox" :class="{ landscape: landscape }">
		<uni-ec-canvas class="uni-ec-canvas" id="uni-ec-canvas" ref="uni-ec-canvas" canvas-id="uni-ec-canvas" :ec="ec"></uni-ec-canvas>
	</view>
</template>

<script>
let vm;
export default {
	data() {
		return {
			chartStyle: `width: 1000rpx;height:calc(100vh - 1000rpx)`
		};
	},
	computed: {
		ec() {
			vm = this;
			return {
				option: {
					dataZoom: [
						{
							// 'type':'inside',
							show: true,
							height: 25,
							xAxisIndex: 0,
							bottom: '2%',
							left: '20%',
							right: '20%',
							start: 10,
							end: 80,
							borderColor: '#dcdcdc'
						}
					],
					grid: {
						left: 35,
						right: '15',
						top: '20%',
						bottom: '15%',
						containLabel: true
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'shadow'
						},
						formatter(params) {
							console.log(params);
						}
					},
					legend: {
						show: true,
						x: '20',
						y: '10',
						icon: 'circle',
						itemWidth: 10,
						itemHeight: 10,
						textStyle: {
							color: '#333'
						},
						data: ['甲烷浓度', '温度']
					},
					xAxis: [
						{
							type: 'category',
							boundaryGap: false,
							axisLabel: {
								show: true,
								textStyle: {
									color: '#999' //X轴文字颜色
								}
							},
							axisLine: {
								show: false
							},
							axisTick: {
								show: false
							},
							data: vm.chartData.categories
						}
					],
					yAxis: [
						{
							type: 'value',
							name: '甲烷浓度（%VOL）',
							min: 0,
							max: 25,
							axisLine: {
								lineStyle: {
									color: '#999'
								}
							},
							axisTick: {
								show: false
							}
						},
						{
							type: 'value',
							name: '温度（°C）',
							min: -10,
							max: 60,
							axisLine: {
								lineStyle: {
									color: '#999'
								}
							},
							position: 'right',
							axisTick: {
								show: false
							},
							splitLine: {
								show: false,

								lineStyle: {
									type: 'dashed',
									color: '#666'
								}
							}
						}
					],
					series: [
						{
							name: '甲烷浓度',
							type: 'line',
							symbol: 'none',
							smooth: true,
							itemStyle: {
								normal: {
									color: '#ed9000',
									lineStyle: {
										color: '#ed9000',
										width: 2
									}
								}
							},
							data: vm.chartData.series[0]['data'],
							markLine: {
								lineStyle: {
									width: 2
								},
								label: {
									position: "insideEndTop",
									formatter: "{b}",
									color: "#333"
								},
								symbolSize: 0,
								data: [{
									name: "甲烷浓度门限值5%VOL",
									yAxis: 5,
									lineStyle: {
										color: "#f60902"
									}
								}]
							}
						},
						{
							name: '温度',
							type: 'line',
							symbol: 'none',
							smooth: true,
							yAxisIndex: 1,
							itemStyle: {
								normal: {
									color: '#428ee4',
									lineStyle: {
										color: '#428ee4',
										width: 2
									}
								}
							},
							data: vm.chartData.series[1]['data']
						}
					]
				}
			};
		}
	},
	props: {
		chartData: {
			type: Object
		},
		landscape: {
			type: Boolean
		}
	},
	mounted() {
		console.log(this.landscape);
		uni.getSystemInfo({
			success(res) {
				vm.cHeight = res.windowHeight;
				vm.cWidth = res.windowWidth;
			}
		});
	}
};
</script>
<style>
.chartBox {
	width: 100%;
	height: 600rpx;
}
.uni-ec-canvas {
	width: 100%;
	height: 100%;
	display: block;
}
.landscape {
	width: 100vh;
	height: 100vw;
	/* transform: rotateY(90deg); */
}
</style>
