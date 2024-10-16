<template>
	<view>
		<view class="colonn roww center_center">
			<view class="colonn">
				<view class="listvie colonn" v-for="(item, index) in hrhsList">
					<view class="roww border_bottom fs-30" style="padding: 23rpx 33rpx">
						<view class="">提交时间：{{ item.createTime }}</view>
						<view class="allline"></view>
						<!-- <view class="" 
						style="color: red; font-weight: bold">{{status[item.status]}}</view> -->
					</view>

					<view class="roww border_bottom fs-30" style="padding: 10rpx 33rpx 20rpx 33rpx" v-if="userInfo">
						<view class="">提交人姓名：</view>
						<view v-if="userInfo">{{ userInfo.name }}</view>
					</view>

					<view class="colonn fs-30" style="padding: 23rpx 33rpx 0rpx 33rpx">
						<view>{{ item.title }}</view>
						<view class="h-20"></view>
						<view>{{ item.content }}</view>
						<view class="huanhang m-top-20 m-bottom-10">
							<image
								:src="BASE_IMG + item1"
								class="w-145 h-145 br-10 m-right-10 m-bottom-10"
								style="background-color: $f5f5f5"
								v-for="(item1, index1) in item.imgs"
								mode="aspectFill"
							></image>
						</view>
					</view>
					<!-- <view class="roww" style="padding: 23rpx 33rpx 23rpx 33rpx" v-if="item.status">
						<view>分数</view>
						<view class="allline"></view>
						<view style="color: red">110</view>
					</view> -->
					<view class="roww" style="padding: 23rpx 33rpx 23rpx 33rpx" >
						<view>分数</view>
						<view class="allline"></view>
						<view style="color: red" v-if="!item.fen">暂未审核</view>
						<view style="color: red" v-else>{{ item.fen }}分</view>
					</view>
					<view class="roww" v-if="item.remark" 
					style="padding: 23rpx 33rpx 23rpx 33rpx" >
						<view>备注</view>
						<view class="allline"></view>
						<view  >{{ item.remark }}</view>
					</view>
					
					
					<!-- <view class="roww p-all-25">
						<view class="allline"></view>
						<view class="btnsub">查看详情</view>
					</view> -->
				</view>
			</view>   
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			hrhsList: [],
			BASE_IMG: '',
			userInfo: {}
		};
	},
	onLoad() {
		this.BASE_IMG = this.$paths.BASE_IMG;
		var userInfo = uni.getStorageSync('userInfo');
		if (userInfo) {
			this.userInfo = userInfo;
			this.getMyHaorenhaoshi();
		} else {
			this.$tools.showToast('请先登录');
		}
	},
	methods: {
		getMyHaorenhaoshi() {
			var data = {
				uId: uni.getStorageSync('userInfo').id
			};
			this.$axios
				.axios('POST', this.$paths.getMyHaorenhaoshi, data)
				.then((res) => {
					if (res.code == 200) {
						var hrhsList = res.data;

						for (var a = 0; a < hrhsList.length; a++) {
							if (hrhsList[a].imgs) {
								hrhsList[a].imgs = hrhsList[a].imgs.split(',');
							}
						}
						this.hrhsList = hrhsList;
					} else {
						this.$tools.showToast(res.msg);
					}
				})
				.catch((err) => {
					console.log('错误回调', err);
				});
		}
	}
};
</script>

<style>
@import url(myHrhs.css);
</style>
