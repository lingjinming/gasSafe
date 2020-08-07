<template>
	<view class="container">
	</view>
</template>

<script>
export default {
	data() {
		return {
			alarmId:'',
			relieveTime:'',
			operator:''
		};
	},
	onLoad(option) {
		this.alarmId = option.id
	},
	methods: {
		relieveAlarmFn(){
			this.$api.relieveAlarm({
				relieveTime:this.relieveTime,
				alarmId:this.alarmId,
				operator:this.operator
			}).then(res => {
				uni.navigateBack()
			})
		}
	}
};
</script>

<style>

</style>
