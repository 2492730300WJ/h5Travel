<template>
	<view>
		<swiper class="swiper" vertical="true" id="swiper" :style="{height : swiperHeight}" @change="swiperChange">
			<swiper-item v-for="(item,index) in videoList" :key="index">
				<video :style="{height : swiperHeight}" class="swiper-item" :src="item.url" :controls="false" loop
				 :enable-play-gesture="true" :show-fullscreen-btn="false" object-fit='fill' x5-playsinline="" playsinline="true"
				 webkit-playsinline="true" x-webkit-airplay="allow" x5-video-player-type="h5" x5-video-player-fullscreen=""
				 x5-video-orientation="portraint" :show-center-play-btn="false" :autoplay="item.flag">
					<view class="video-description" color="#FFF">@{{item.author}}<br>{{item.description}}</view>
				</video>
				<cover-view>
					<cover-image :src="item.cover" class="video-image"></cover-image>
					<cover-view class="video-love" @click="love()">
						<uni-icons type="heart-filled" :color="isactive==true?'#f44336':'#ffffff'" size="44" />
						<view class="video-num">15</view>
					</cover-view>
					<cover-view class="video-comm" @click="comm">
						<uni-icons type="chat-filled" color="#ffffff" size="40" />
						<view class="video-num">28</view>
					</cover-view>
					<cover-view class="video-redo" @click="redo">
						<uni-icons type="redo-filled" color="#ffffff" size="40" />
						<view class="video-num">300</view>
					</cover-view>
				</cover-view>
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
				item: 0,
				swiperHeight: uni.getSystemInfoSync().windowHeight + "px",
				love_num: 0,
				comm_num: 0,
				redo_num: 0,
				isactive: false,
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
							this.swiperHeight = uni.getSystemInfoSync().windowHeight + "px"
						}
					}
				});
			},
			swiperChange(e) {
				var _self = this;
				var videoList = document.getElementById("swiper").getElementsByTagName("video");
				console.log(e.detail.current)
				videoList[e.detail.current].play();
				if (this.item > e.detail.current) {
					console.log(e.detail.current + 1)
					videoList[e.detail.current + 1].pause();
					videoList[e.detail.current + 1].currentTime = 0
				} else {
					console.log(e.detail.current - 1)
					videoList[e.detail.current - 1].pause();
					videoList[e.detail.current - 1].currentTime = 0
				}
				this.item = e.detail.current
			},
			love(item) {
				this.isactive = !this.isactive
			},
			comm() {},
			redo() {}
		}
	}
</script>
<style scoped>
	.swiper-item {
		height: 100%;
		width: 100%;
		z-index: 10;
	}

	.video-image {
		position: fixed;
		bottom: 45vh;
		right: 8px;
		height: 50px;
		width: 50px;
		border-radius: 50%;
		border: 3px solid #fff;
		z-index: 9999;
	}

	.video-love {
		position: fixed;
		bottom: 30vh;
		right: 15px;
		z-index: 9999;
	}

	.video-num {
		text-align: center;
		position: relative;
		bottom: 5px;
		font-size: 14px;
		color: #FFFFFF;
		z-index: 9999;
	}

	.video-comm {
		position: fixed;
		bottom: 20vh;
		right: 15px;
		z-index: 9999;
	}

	.video-redo {
		position: fixed;
		bottom: 10vh;
		right: 15px;
		z-index: 9999;
	}

	.video-description {
		position: fixed;
		bottom: 5vh;
		left: 14px;
		right: 70px;
		z-index: 9999;
		font-size: 16px;
		color: #FFFFFF;
		word-break: break-all;
	}
</style>
