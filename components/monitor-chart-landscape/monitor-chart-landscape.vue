<template>
	<canvas :canvas-id="canvasId" id="lineChart" class="chart"
	:style="{'width':cWidth*pixelRatio+'px','height':cHeight*pixelRatio+'px', 'transform': 'scale('+(1/pixelRatio)+')','margin-left':-cWidth*(pixelRatio-1)/2+'px','margin-top':-cHeight*(pixelRatio-1)/2+'px'}"
	@touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd" @error="error"></canvas>
</template>

<script>
import uCharts from '../../js_sdk/u-charts/u-charts/u-charts.js';
var _self;
var lineChart=null;
export default {
	data() {
		return {
			pixelRatio:1,
			rotate:true,
			canvasId:'lineChart',
			cWidth:375,
			cHeight:300,
		};
	},
	props:{
		chartData: {
			type:Object,
			default:{
				categories: ['2012', '2013', '2014', '2015', '2016', '2017'],
				series: [{
					name: '成交量A',
					data: [35, 20, 25, 37, 4, 20],
					color: '#000000'
				}, {
					name: '成交量B',
					data: [70, 40, 65, 100, 44, 68]
				}, {
					name: '成交量C',
					data: [100, 80, 95, 150, 112, 132]
				}]
			}
		},
	},
	mounted() {
	    _self = this;
		uni.getSystemInfo({
			success(res) {
				_self.cHeight = res.windowHeight
				_self.cWidth = res.windowWidth
				_self.showChart("lineChart",_self.chartData);
			}
		})
		
	},
	watch:{
		chartData(newVal){
			console.log(newVal)
		}
	},
	methods: {
		showChart(canvasId,chartData){
			lineChart=new uCharts({
				$this:_self,
				canvasId: canvasId,
				// padding:[10,15,4,5],
				type: 'line',
				legend:true,
				fontSize:12,
				categories: chartData.categories,
				series: chartData.series,
				xAxis: {
					disableGrid:true,
					itemCount:12,
					scrollShow:true,
					gridColor:'red',
					gridType:'dash',
					axisLine:false
				},
				yAxis: {
					showTitle:true,
					data:[
						{
							title:'甲烷浓度（VOL）',
							position: 'left',
							axisLine:false
						},
						{
							title:'温度（°C）',
							position: 'right',
							axisLine:false
						}
					]
				},
				rotate:_self.rotate,
				dataLabel: false,
				dataPointShape:false,
				enableScroll:true,
				enableMarkLine:true,
				width: _self.cWidth,
				height: _self.cHeight,
				legend:{
					position:'top',
					float:'left'
				},
				extra:{
					markLine:{
						data:[
							{
								value:5,
							}
						]
					},
					line:{
						type:'curve',
						width:'1px'
					}
				}
			});
		},
		updateChart(){
			lineChart.updateData({
				series: _self.chartData.series,
				categories: _self.chartData.categories
			});
		},
		touchStart(e) {
			lineChart.showToolTip(e, {
				format: function(item, category) {
					return category + ' ' + item.name + ':' + item.data
				}
			});
			lineChart.scrollStart(e);
		},
		touchMove(e) {
			lineChart.scroll(e);
		},
		touchEnd(e) {
			lineChart.scrollEnd(e);
		},
		error(e) {
			console.log(e)
		}
	}
};
</script>

<style lang="scss" scoped>
.chart{
	height: 100%;
	width: 100%;
}
</style>
