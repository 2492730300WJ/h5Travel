<template>
	<view>
		<view class="uni-padding-wrap uni-common-mt">
			<view>
				<video @error="videoErrorCallback" id="myVideo" :src="src" :danmu-list="danmakuList" enable-danmu danmu-btn controls></video>
			</view>
			<!-- #ifndef MP-ALIPAY -->
			<view class="uni-list uni-common-mt">
				<view class="uni-list-cell">
					<view>
						<view class="uni-label">弹幕内容</view>
					</view>
					<view class="uni-list-cell-db">
						<input v-model="danmuValue" class="uni-input" type="text" placeholder="在此处输入弹幕内容" />
					</view>
				</view>
			</view>
			<view class="uni-btn-v">
				<button @click="sendDanmu" class="page-body-button">发送弹幕</button>
			</view>
			<!-- #endif -->
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				videoId: '',
				src: '',
				danmakuList: [],
				danmuValue: ''
			}
		},
		onLoad(option) {
			this.init(option);
		},
		onReady: function(res) {
			// #ifndef MP-ALIPAY
			this.videoContext = uni.createVideoContext('myVideo')
			// #endif
		},
		methods: {
			init(option) {
				this.videoId = option.videoId;
				var _self = this;
				uni.request({
					url: _self.$Url + '/video/get', //请求接口
					header: {
						'content-type': 'application/json; charset=UTF-8', //自定义请求头信息
					},
					method: 'POST',
					data: {
						videoId: this.videoId
					},
					success: (res) => { // 请求成功后返回
						console.log(res)
						if (res.data.code == 200) {
							this.src = res.data.data.video.url;
							this.danmakuList = res.data.data.danmakuList
						}
					}
				});
			},
			sendDanmu: function() {
				this.videoContext.sendDanmu({
					text: this.danmuValue,
					color: this.getRandomColor()
				});
				this.danmuValue = '';
			},
			  videoErrorCallback: function(e) {
			            uni.showModal({
			                content: e.target.errMsg,
			                showCancel: false
			            })
			        },
			getRandomColor: function() {
				const rgb = []
				for (let i = 0; i < 3; ++i) {
					let color = Math.floor(Math.random() * 256).toString(16)
					color = color.length == 1 ? '0' + color : color
					rgb.push(color)
				}
				return '#' + rgb.join('')
			}
		}
	}
</script>
<style>
	#myVideo {
		width: 100%;
	}
</style>
