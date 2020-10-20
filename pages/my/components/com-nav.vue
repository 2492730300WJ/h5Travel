<template>
	<view class="com-nav">
		<uni-swiper-dot :info="ListData" :current="currentIndex" mode="default">
			<swiper @change="currentIndexChange" :style="getHeight">
				<swiper-item v-for="(item, index) of ListData" :key="index">
					<uni-grid :showBorder="false" :square="true" :column="col">
						<uni-grid-item v-for="(c, i) of item" :key="i" style="height: 150rpx;">
							<view class="grid-item" :class="getAnimated" @click="goPage(c.path)">
								<image class="item-icon" :src="c.icon" mode="widthFix"></image>
								<text class="item-text">{{ c.text }}</text>
							</view>
						</uni-grid-item>
					</uni-grid>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
		<uni-popup ref="popupDialogNav" type="dialog">
			<uni-popup-dialog :type="msgType" title="提示" content="您当前还未登录,是否前往登录页面？" :before-close="true" @confirm="dialogConfirmNav"
			 @close="dialogCloseNav"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import uniSwiperDot from './uni-swiper-dot.vue'
	import uniGrid from './uni-grid.vue'
	import uniGridItem from './uni-grid-item.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	export default {
		components: {
			uniSwiperDot,
			uniGrid,
			uniGridItem,
			uniPopupDialog
		},
		props: {
			row: {
				type: Number,
				default: 1
			},
			col: {
				type: Number,
				default: 5
			},
			list: {
				type: Array,
				default: () => []
			},
			animated: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				currentIndex: 0
			};
		},
		computed: {
			getHeight() {
				return `height: ${this.row * 150}rpx;`;
			},
			getAnimated() {
				return this.animated ? this.animated : '';
			},
			ListData() {
				const pageCount = Math.ceil(this.list.length / (this.row * this.col));
				const PageList = [];
				for (let i = 0; i < pageCount; ++i) {
					PageList[i] = this.list.slice(this.row * this.col * i, this.row * this.col * (i + 1));
				}
				return PageList;
			}
		},
		methods: {
			currentIndexChange(e) {
				this.currentIndex = e.detail.current;
			},
			goPage(path) {
				// 校验TOKEN 去掉一些不需要登录的页面
				// 校验是否存在refreshToken 如果没有显示登录按钮，隐藏功能按钮
				if (path != '/pages/my/about/about' && uni.getStorageSync("refreshToken").length == 0) {
					this.$refs.popupDialogNav.open();
				}
			},
			/**
			 * 对话框取消按钮
			 */
			dialogCloseNav(done) {
				// 需要执行 done 才能关闭对话框
				done()
			},
			/*
			 * 对话框点击确认按钮
			 */
			dialogConfirmNav(done) {
				uni.navigateTo({
					url: '/pages/login/login'
				})
				done()
			},
		}
	};
</script>

<style lang="scss">
	.com-nav {
		margin-top: 20rpx;
		padding-top: 20rpx;
		background: #fff;
		border-radius: 20rpx;

		.grid-item {
			display: flex;
			flex-direction: column;
			align-items: center;

			.item-icon {
				width: 80rpx;
				height: 80rpx;
				margin-bottom: 12rpx;
			}

			.item-text {
				font-size: 25rpx;
				color: #666;
			}
		}
	}
</style>
