<template>
	<view>
	<uni-card
		@click="videoClick('http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4')"
	    mode="style"
	    :is-shadow="true"
	    thumbnail="https://img-blog.csdnimg.cn/20190301125102646.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTAxMDE5OA==,size_16,color_FFFFFF,t_70"
	    extra="2020-10-22 18:00:00"
	>
	        一只傻鸟
	</uni-card>
	<uni-card
		@click="videoClick('http://vjs.zencdn.net/v/oceans.mp4')"
	    mode="style"
	    :is-shadow="true"
	    thumbnail="https://img-blog.csdnimg.cn/20190301125255914.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTAxMDE5OA==,size_16,color_FFFFFF,t_70"
	    extra="2020-10-22 17:00:00"
	>
	        一只鲸鱼
	</uni-card>
	<uni-card
		@click="videoClick('https://media.w3.org/2010/05/sintel/trailer.mp4')"
	    mode="style"
	    :is-shadow="true"
	    thumbnail="https://img-blog.csdnimg.cn/20190301125528758.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTAxMDE5OA==,size_16,color_FFFFFF,t_70"
	    extra="2020-10-22 16:00:00"
	>
	        风景
	</uni-card>
</view>
</template>
<script>
	import uniCard from '@/components/uni-card/uni-card.vue'
	export default {
		components: {uniCard},
	    data() {
	       return {
	       };
	    },
	    methods: {
			videoClick(src) {
				uni.navigateTo({
					url: '/pages/media/mediaDetail?src='+src,
				})
			}
	    }
	}
</script>
