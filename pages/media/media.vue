<template>
	<view class="container999" @touchstart="refreshStart" @touchmove="refreshMove" @touchend="refreshEnd">
		<!-- 刷新组件需搭配scroll-view使用，并在pages.json中添加 "disableScroll":true-->
		<refresh ref="refresh" @isRefresh='isRefresh'></refresh>
		<view class='nav'>
			<uni-nav-bar background-color="#4b5cc4" :status-bar="true" fixed>
				<view slot="left" style="font-size: 28px;line-height: 28px;color: #f0fcff">视频</view>
				<uni-search-bar style="width: 100%;background-color: #4b5cc4;" :radius="100" @confirm="search" @input="input"></uni-search-bar>
			</uni-nav-bar>
			<!-- 导航栏 agents导航栏标题 -->
			<navTab ref="navTab" :tabTitle="tabTitle" @changeTab='changeTab'></navTab>
		</view>
		<!-- swiper切换 swiper-item表示一页 scroll-view表示滚动视窗 -->
		<swiper style="min-height: 100vh;margin-top: 120px;" :current="currentTab" @change="swiperTab">
			<swiper-item v-for="(listItem,listIndex) in list" :key="listIndex">
				<scroll-view style="height: 100%;" scroll-y="true" @scrolltolower="lower1" scroll-with-animation :scroll-into-view="toView">
					<view class="container" v-for="(item,index) in listItem" v-if="listItem.length > 0" :key="index">
						<uni-card :title="item.title" mode="style" :is-shadow="true" :thumbnail="item.cover" :extra="item.createTime"
						 @click="videoClick(item.mediaId)">
							{{item.description}}
						</uni-card>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	const util = require('../../util/util.js');
	import refresh from '../../common/js/refresh.vue';
	import navTab from '../../common/js/navTabV.vue';
	export default {
		components: {
			refresh,
			navTab
		},
		data() {
			return {
				toView: '', //回到顶部id
				currentPage: 'longIndex',
				currentTab: 0, //sweiper所在页
				pages: [1, 1, 1, 1, 1, 1, 1, 1, 1], //第几页存储 
				videoList: [],
				tabTitle: ['风景', '美食', '教育', '娱乐', '无聊', '哈哈', '你好', '不好', '嗯嗯'], //导航栏格式
				list: [
					[],
					[],
					[],
					[],
					[],
					[],
					[],
					[],
					[]
				], //数据格式
			};
		},
		onLoad(e) {
			this.init()
		},
		onShow() {},
		onHide() {},
		methods: {
			videoClick(mediaId) {
				uni.navigateTo({
					url: '/pages/media/mediaDetail?mediaId=' + mediaId,
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
						type: this.currentTab + 1,
						pageSize: 5,
						pageNo: 1
					},
					success: (res) => { // 请求成功后返回
						console.log(res)
						if (res.data.code == 200) {
							let tempList = this.list
							tempList[this.currentTab] = tempList[this.currentTab].concat(res.data.data.videoList)
							this.list = tempList
							this.$forceUpdate() //二维数组，开启强制渲染
						}
					}
				});
			},
			toTop() {
				this.toView = ''
				setTimeout(() => {
					this.toView = 'top' + this.currentTab
				}, 10)
			},
			changeTab(index, type) {
				this.currentTab = index;
				if (type) {
					const tempList = this.list;
					if (tempList[this.currentTab].length === 0) {
						this.init();
					}
				}
			},
			// 其他请求事件 当然刷新和其他请求可以写一起 多一层判断。
			isRequest(pages) {
				this.pages[this.currentTab]++
				var that = this;
				const pageNo = `${that.pages[that.currentTab]}`;
				uni.hideLoading()
				uni.request({
					url: this.$Url + '/video/list', //请求接口
					header: {
						'content-type': 'application/json; charset=UTF-8', //自定义请求头信息
					},
					method: 'POST',
					data: {
						type: this.currentTab + 1,
						pageSize: 5,
						pageNo: pageNo
					},
					success: (res) => { // 请求成功后返回
						console.log(res)
						if (res.data.code == 200) {
							let newData = res.data.data.videoList;
							let tempList = this.list
							if (newData.length != 0) {
								uni.showToast({
									icon: 'none',
									title: `请求数据成功`
								})
								tempList[this.currentTab] = tempList[this.currentTab].concat(newData)
								console.log(tempList)
								this.list = tempList
								this.$forceUpdate() //二维数组，开启强制渲染
							}
						}
					}
				});
			},
			// swiper 滑动
			swiperTab: function(e) {
				var index = e.detail.current //获取索引
				this.$refs.navTab.longClick(index, 'swiper');
			},
			// 加载更多 util.throttle为防抖函数
			lower1: util.throttle(function(e) {
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				this.isRequest();
			}, 300),
			// 刷新touch监听
			refreshStart(e) {
				this.$refs.refresh.refreshStart(e);
			},
			refreshMove(e) {
				this.$refs.refresh.refreshMove(e);
			},
			refreshEnd(e) {
				this.$refs.refresh.refreshEnd(e);
			},
			isRefresh() {
				setTimeout(() => {
					uni.showToast({
						icon: 'success',
						title: '刷新成功'
					})
					this.$refs.refresh.endAfter() //刷新结束调用
				}, 1000)
			}
		}
	};
</script>
<style lang="scss" scoped>
	/deep/ .uni-navbar--border{
		border: none;
	}
</style>
<style lang="scss">
	.container999 {
		width: 100vw;
		font-size: 28upx;
		min-height: 100vh;
		overflow: hidden;
		color: #6B8082;
		position: relative;
		background-color: #f6f6f6;
	}

	.content {
		width: 100%;
	}

	.card {
		width: 90%;
		height: 368upx;
		background-color: white;
		margin: 0 auto 42upx auto;
		background: #FFFFFF;
		box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.10);
		border-radius: 5px;
		position: relative;
	}

	.noCard {
		width: 90%;
		height: 200upx;
		margin: auto;
		background-color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #999999;
		box-shadow: 0 0 10upx 0 rgba(0, 0, 0, 0.10);
		border-radius: 10upx;
	}


	.nav {
		position: fixed;
		left: 0;
		top: 0;
		color: white;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
		font-size: 24upx;
		background-color: #4b5cc4;
		z-index: 996;
	}

	.searchInput999 {
		width: 90%;
		margin: 0 auto;
		background: white;
		border-radius: 30upx;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 56upx;
	}

	.search999 {
		width: 32upx;
		height: 32upx;
	}

	.searchBox999 {
		width: 56upx;
		height: 56upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.input999 {
		color: #999;
		width: 80%;
	}
</style>
