<template>
	<view class="container"  :style="{'background-image': `url(${urlConfig}/gas/mini/getLocalFile/bg)`}">
			<button plain @click="getUserInfo" open-type="getUserInfo"></button>
	</view>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import urlConfig from '../../../common/config.js'
let vm ;
export default {
	data() {
		return {
			urlConfig,
		};
	},
	watch:{},
	onLoad() {
		vm = this
		vm.getUserInfo()
	},
	methods: {
		...mapActions(['setUserInfo']),
		getUserInfo(){
			uni.getUserInfo({
			    complete: (res) => {
			        console.log(res)
					vm.setUserInfo(res.userInfo)
			    }
			})
		}
	}
};
</script>

<style lang="scss" scoped>
.container{
	background-size: 100% 400rpx;
	background-position: top center;
	background-repeat: no-repeat;
}
button{
	display: none;
}
</style>
