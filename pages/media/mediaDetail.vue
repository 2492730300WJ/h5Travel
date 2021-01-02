<template>
	<view>
		<uni-nav-bar left-icon="back"  :title="title" :status-bar="true" fixed>
			 <view slot="left" @click="back()">返回</view>
		</uni-nav-bar>
		<view style="background-color: #a9acb0;">
			<video style="width: 100%!important;" id="myVideo" :src="src" controls></video>
		</view>
		<view class='nav'>
			<navTab ref="navTab" :tabTitle="tabTitle" @changeTab='changeTab'></navTab>
		</view>
	</view>
</template>
<script>
	import navTab from '../../common/js/navTab.vue';
	export default {
		components: {
			navTab
		},
		data() {
			return {
				mediaId: '',
				src: '',
				currentTab: 0, //sweiper所在页
				danmakuList: [],
				danmuValue: '',
				title: '',
				videoContext:'',
				tabTitle:['简介','评论'], //导航栏格式
			}
		},
		onLoad(option) {
			this.init(option);
		},
		methods: {
			init(option) {
				this.mediaId = option.mediaId;
				var _self = this;
				uni.request({
					url: _self.$Url + '/video/get', //请求接口
					header: {
						'content-type': 'application/json; charset=UTF-8', //自定义请求头信息
					},
					method: 'POST',
					data: {
						mediaId: this.mediaId
					},
					success: (res) => { // 请求成功后返回
						console.log(res)
						if (res.data.code == 200) {
							this.src = res.data.data.video.url;
							this.title = res.data.data.video.title;
						}
					}
				});
			},
			changeTab(index, type) {
				this.currentTab = index;
			},
			back() {
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>
<style>
	.nav {
		left: 0;
		top: 0;
		color: #e74de7;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
		font-size: 24upx;
		background-color: #a9acb0;
		z-index: 996;
	}
</style>
