<template>
	<view>
		<view class="a-address" v-for="(item,index) in videoList" :key="index">
			<uni-card @click="videoClick(item.url)" mode="style" :is-shadow="true" :thumbnail="item.cover" :extra="item.time">
				{{item.description}}
			</uni-card>
		</view>
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
				videoList: ""
			};
		},
		onLoad() {
			this.init()
		},
		methods: {
			videoClick(src) {
				uni.navigateTo({
					url: '/pages/media/mediaDetail?src=' + src,
				})
			},
			init() {
				var _self = this;
				uni.request({
					url: _self.$Url + '/video/get', //请求接口
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
			}
		}
	}
</script>
