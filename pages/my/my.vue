<template>
	<view class="user">
		<!-- 头部 -->
		<view class="user-wrap">
			<view class="setting iconfont icon-shezhi"></view>
			<view class="info">
				<image class="avatar" mode="aspectFill" :src="userInfo.headPicUrl"></image>
				<view class="nickname">{{ userInfo.nickName }}</view>
				<navigator :class="isLogin" url="/pages/login/login" open-type="redirect" hover-class="other-navigator-hover">
					点此登录
				</navigator>
			</view>
		</view>
		<!-- 状态 -->
		<view class="order-status">
			<view class="status-wrap">
				<!-- 单元格 -->
				<view class="cell">
					<view class="cell-left">
						<image class="cell-icon" src="/static/images/user/icon-order.png" mode="aspectFill"></image>
						<view class="cell-text">全部动态</view>
					</view>
					<view class="iconfont iconmore1"></view>
				</view>
				<view class="status-list">
					<view class="status-item" hover-class="btn-hover" v-for="(item, index) in orderStatusList" :key="index">
						<view class="item-icon" :class="item.icon"></view>
						<view class="item-text">{{ item.name }}</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 滑动导航 -->
		<view style="border-radius: 20rpx; overflow: hidden; margin: 0 20rpx;">
			<com-nav :list="list" :col="4"></com-nav>
		</view>

		<!-- 用户功能 -->
		<view class="com-item">
			<view class="com-wrap">
				<view class="cell" v-for="(item, index) in userList" :key="index" @click="go(item.path)">
					<view class="cell-left">
						<image class="cell-icon" :src="item.icon" mode="aspectFill"></image>
						<view class="cell-text">{{ item.title }}</view>
					</view>
					<view class="iconfont iconmore1"></view>
				</view>
			</view>
		</view>

		<!-- 用户服务 -->
		<view class="com-item">
			<view class="com-wrap">
				<view class="cell" v-for="(item, index) in serverList" :key="index" @click="go(item.path)">
					<view class="cell-left">
						<image class="cell-icon" :src="item.icon" mode="aspectFill"></image>
						<view class="cell-text">{{ item.title }}</view>
					</view>
					<view class="iconfont iconmore1"></view>
				</view>
			</view>
		</view>
		<uni-popup ref="popupDialog" type="dialog">
			<uni-popup-dialog title="提示" content="您当前还未登录,是否前往登录页面？" :before-close="true" @confirm="dialogConfirm"
			 @close="dialogClose"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import comNav from './components/com-nav.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	export default {
		components: {
			comNav,
			uniPopupDialog
		},
		data() {
			return {
				userInfo: {
					headPicUrl: '',
					nickName: '无聊'
				},
				isLogin: 'nickname',
				orderStatusList: [{
						name: '今日动态',
						icon: 'iconfont icon-jinri',
						status: 10
					},
					{
						name: '昨日动态',
						icon: 'iconfont icon-zuori',
						status: 30
					},
					{
						name: '本周动态',
						icon: 'iconfont icon-benzhou',
						status: 40
					},
					{
						name: '本月动态',
						icon: 'iconfont icon-benyue',
						status: 50
					},
				],
				currentIndex: 0,
				list: [{
						icon: '/static/images/user/class-01.png',
						text: '我的卡券',
						path: 'a'
					},
					{
						icon: '/static/images/user/class-02.png',
						text: '个人主页',
						path: 'a'
					},
					{
						icon: '/static/images/user/class-03.png',
						text: '我的积分',
						path: 'a'
					},
					{
						icon: '/static/images/user/class-04.png',
						text: '点赞提醒',
						path: 'a'
					},
					{
						icon: '/static/images/user/class-05.png',
						text: '评论提醒',
						path: 'a'
					}
				],
				userList: [{
						title: '我的地址',
						icon: '/static/images/user/icon-address.png',
						path: '/pages/my/address/address'
					},
					{
						title: '我的收藏',
						icon: '/static/images/user/icon-collect.png',
						path: 'collect-list'
					},
					{
						title: '我的足迹',
						icon: '/static/images/user/icon-foot.png',
						path: 'browse-list'
					}
				],
				serverList: [{
						title: '客服中心',
						icon: '/static/images/user/icon-kefu.png',
						path: 'kefu'
					},
					{
						title: '帮助中心',
						icon: '/static/images/user/icon-help.png',
						path: 'help'
					},
					{
						title: '版本',
						icon: '/static/images/user/icon-about.png',
						path: '/pages/my/about/about'
					}
				]
			};
		},
		onLoad() {
			this.initMy();
		},
		//此处为自定义方法
		methods: {
			//初始化方法
			initMy() {
				// 校验是否存在refreshToken 如果没有显示登录按钮，隐藏功能按钮
				if (uni.getStorageSync("refreshToken").length == 0) {
					this.userInfo.headPicUrl = '/static/images/user/timg.jpg';
					this.userInfo.nickName = '未登录/请先登录';
				} else {
					this.userInfo.headPicUrl = '/static/images/user/hp-admin.jpg';
					this.userInfo.nickName = '你好';
					this.isLogin = 'nickname login';
				}
			},
			go(path) {
				// 校验TOKEN 去掉一些不需要登录的页面
				// 校验是否存在refreshToken 如果没有显示登录按钮，隐藏功能按钮
				if (path != '/pages/my/about/about' && uni.getStorageSync("refreshToken").length == 0) {
					this.$refs.popupDialog.open();
					return;
				}
				// console.log("jinr"+path)
				uni.navigateTo({
					url: path
				})
			},
			/**
			 * 对话框取消按钮
			 */
			dialogClose(done) {
				// 需要执行 done 才能关闭对话框
				done()
			},
			/**
			 * 对话框点击确认按钮
			 */
			dialogConfirm(done) {
				uni.navigateTo({
					url: '/pages/login/login'
				})
				done()
			},
		}
	};
</script>

<style lang="scss">
	page {
		background: #f2f2f2;
	}

	.btn-hover {
		background: #f2f2f2 !important;
	}

	.user {
		.user-wrap {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 50vw;
			padding: 30rpx;
			z-index: 9;
			border-radius: 0 0 20% 20%;
			background: url('https://handsel.oss-cn-shenzhen.aliyuncs.com/1588938371592.jpg') no-repeat;
			background-size: cover;

			.setting {
				color: #fff;
				position: absolute;
				top: 60rpx;
				left: 60rpx;
				font-size: 50rpx;
			}

			.info {
				position: absolute;
				text-align: center;

				.avatar {
					width: 150rpx;
					height: 150rpx;
					border-radius: 50%;
				}

				.nickname {
					color: #fff;
					font-size: 28rpx;
				}
			}
		}

		.order-status {
			padding: 0 20rpx;
			margin-top: -10vw;

			.status-wrap {
				border-radius: 25rpx;
				overflow: hidden;

				.status-list {
					display: flex;
					justify-content: space-evenly;
					align-items: center;
					background: #fff;
					padding-top: 30rpx;
					padding-bottom: 30rpx;

					.status-item {
						flex: 1;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;

						.item-icon {
							line-height: 1;
							font-size: 65rpx;
							color: #bbb;
						}

						.item-text {
							font-size: 28rpx;
							color: #666;
							margin-top: 5rpx;
						}
					}
				}
			}
		}

		.com-item {
			padding-left: 20rpx;
			padding-right: 20rpx;
			margin-top: 20rpx;

			.com-wrap {
				border-radius: 25rpx;
				overflow: hidden;
			}
		}

		.cell {
			height: 80rpx;
			padding-left: 20rpx;
			padding-right: 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background: #fff;
			border-bottom: 1px solid #f8f8f8;

			&:active {
				background: #f2f2f2;
			}

			&:last-child {
				border-bottom: none !important;
			}

			.cell-left {
				display: flex;
				align-items: center;

				.cell-icon {
					width: 50rpx;
					height: 50rpx;
				}

				.cell-text {
					color: #666;
					font-size: 28rpx;
					margin-left: 20rpx;
				}
			}

			.iconfont {
				font-size: 40rpx;
				color: #999;
			}
		}
	}

	.login {
		display: none;
	}
</style>
