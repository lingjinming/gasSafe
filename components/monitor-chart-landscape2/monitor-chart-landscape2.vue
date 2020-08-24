<template>
	<view class="chartBox" :class="{landscape:landscape}">
		<uni-ec-canvas
		   class="uni-ec-canvas"
		   id="uni-ec-canvas"
		   ref="uni-ec-canvas"
		   canvas-id="uni-ec-canvas"
		   :ec="ec"
		></uni-ec-canvas>
	</view>
</template>

<script>
let vm;
export default{
	data(){
		return {
			chartStyle:`width: 1000rpx;height:calc(100vh - 1000rpx)`
		}
	},
	computed:{
		ec(){
			vm = this
			return {
				option:{
				        dataZoom: [{
				                  "show": true,
				                  "height": 12,
				                  "xAxisIndex": [
				                    0
				                  ],
				                  bottom:'5%',
				                  "start": 10,
				                  "end": 50,
				                  handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
				                  handleSize: '110%',
				                  handleStyle:{
				                    color:"#d3dee5",
				                  },
				                  textStyle:{
				                    color:"#fff",
								},
				                  borderColor:"#90979c"
				                }],
						grid: {
					        left: '20',
				            right: '20',
				            top:'20%',
					        bottom: '10%',
					        containLabel: true
						},
						tooltip : {
							show: true,
							trigger: 'axis'
						},
						legend: {
							show:true,
							x:'20',
							y:'10',
							icon: 'circle',
							itemWidth:10,
							itemHeight:10,
							textStyle:{
								color:'#333'
							},
							data:['甲烷浓度','温度']
						},
						xAxis : [
					        {
					            type : 'category',
					            boundaryGap : false,
				                 axisLabel: {
				                    show: true,
				                    textStyle: {
				                        color: "#999" //X轴文字颜色
				                    }
				                },
					            axisLine:{
				               		show:false,
								},
								axisTick:{
					            	show:false,
					            },  
					            data : vm.chartData.categories
					        }
					    ],
					    yAxis : [
							{
								type : 'value',
								name : '甲烷浓度（%VOL）',
								min:0,
								max:1000,
								axisLine:{
									lineStyle:{
										color:'#999',
									}
								},
								axisTick:{
					            	show:false,
					            }
							},
							{
								type : 'value',
								name : '温度（°C）',
								min:0,
								max:100,
								axisLine:{
									lineStyle:{
										color:'#999'
									}
								},
								axisTick:{
					            	show:false,
					            },
								splitLine:{
									show:true,
									
									lineStyle:{
									    type:'dashed',
										color:'#666'
									}
								}
							}
						],
						series : [
							{
								name:'甲烷浓度',
								type:'line',
								symbol:'none',
								smooth:true,
					            itemStyle: {
							        normal: {
										color:'#ed9000',
							            lineStyle: {
											color: "#ed9000",
											width:2
							            }
							        }
								},
								data:vm.chartData.series[0]['data']
							},
							{
								name:'温度',
								type:'line',
								symbol:'none',
								smooth:true,
					            itemStyle: {
							        normal: {
							            color:'#428ee4',
							            lineStyle: {
											color: "#428ee4",
											width:2
							            }
							        }
								},
								data:vm.chartData.series[1]['data']
							}
						]
					}
			} 
		}
	},
	props:{
		chartData: {
			type:Object
		},
		landscape:{
			type:Boolean
		}
	},
	mounted() {
		console.log(this.landscape)
		uni.getSystemInfo({
			success(res) {
				vm.cHeight = res.windowHeight
				vm.cWidth = res.windowWidth
			}
		})
		
	},
}
</script>
<style>
	.chartBox{
		width:100%;
		height:600rpx;
	}
.uni-ec-canvas{
    width:100%;
    height:100%;
    display:block;
}
.landscape{
	width:100vh;
	height:100vw;
	/* transform: rotateY(90deg); */
}
</style>