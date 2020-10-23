<template>
	<view>
		<swiper class="swiper" vertical="true" id="swiper" :style="{height : swiperHeight}" @change="swiperChange">
			<swiper-item v-for="(item,index) in videoList" :key="index">
				<video class="swiper-item" :src="item.url" controls loop :poster="item.cover" enable-play-gesture
				 play-btn-position="center" :show-fullscreen-btn="false"></video>
			</swiper-item>
		</swiper>
	</view>
</template>
<script>
	import uniCard from '@/components/uni-card/uni-card.vue'
	export default {
		components: {
			uniCard
		},
		data() {
			return {
				videoList: "",
				swiperHeight: uni.getSystemInfoSync().windowHeight + "px",
			};
		},
		onLoad() {
			this.init()
		},
		methods: {
			videoClick(videoId) {
				uni.navigateTo({
					url: '/pages/media/mediaDetail?videoId=' + videoId,
				})
			},
			init() {
				var _self = this;
				uni.request({
					url: _self.$Url + '/video/list', //请求接口
					header: {
						'content-type': 'application/json; charset=UTF-8', //自定义请求头信息
					},
					method: 'POST',
					data: {

					},
					success: (res) => { // 请求成功后返回
						console.log(res)
						if (res.data.exceptionCode == 200) {
							this.videoList = res.data.result.videoList
						}
					}
				});
			},
			swiperChange(e) {
				var videoList = document.getElementById("swiper").getElementsByTagName("video");
				console.log(e.detail.current)
				videoList[e.detail.current].pause()
				console.log("停止")
			}
		}
	}
</script>
<style scoped>
	.swiper-item {
		height: 100%;
		width: 100%;
	}
</style>
