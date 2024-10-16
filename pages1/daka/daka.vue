<template>
	<view>
		<view class="colonn">
			<view class="roww topinfo" v-if="userInfo">
				<image mode="aspectFill" :src="BASE_IMG + userInfo.avatar" class="w-80 h-80"></image>
				<view class="w-20"></view>
				<view class="colonn rowsb h-80">
					<view class="fs-40">{{ userInfo.name }}</view>
					<view class="fs-25">编号：{{ userInfo.id }}</view>
				</view>
			</view>
			<view class="colonn dakaview pore center_center">
				<view class="roww center_center" style="position: absolute; top: 20rpx">
					<!-- <view style="color:    #113281;">排班了吗</view> -->
				</view>
				<view class="colonn leftcenter">
					<view class="btndaka colonn center_center" @click="getWeizhi">
						<view class="shangbandaka">
							{{ wenanDa[dakaInfo.sxbType] }}
						</view>
						<view class="h-15"></view>
						<view class="shijians" v-if="dakaInfo.sxbType == 1 || dakaInfo.sxbType == 3">{{ dakaInfo.dakTime.startTime }}上班</view>
						<view class="shijians" v-if="dakaInfo.sxbType == 2 || dakaInfo.sxbType == 4">{{ dakaInfo.dakTime.endTime }}下班</view>
					</view>
					<view class="h-25"></view>
					<!-- <view class="w-500" style="text-align: center;">山东省济南市历城区全服街道耳环东家</view> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			userInfo: null,
			BASE_IMG: '',
			dakaInfo: {}, 
			wenanDa: ["",'上班打卡', '下班打卡', '打迟到卡', '打早退卡', '打早退卡']
		};
	},
	onLoad() {
		this.BASE_IMG = this.$paths.BASE_IMG;
		this.userInfo = uni.getStorageSync('userInfo');
		if (this.userInfo) {
			this.getDakaTImess();
		} else {
			uni.showModal({
				title: '提示',
				content: '请先登录',
				showCancel:false,
				success: (res) => {
					uni.navigateBack({
						delta:1
					})
				}
			});
		}
	},
	methods: {
		// 获取文案显示
		getDakaTImess() {
			var data = {
				uId: this.userInfo.id
			};
			this.$axios
				.axios('POST', this.$paths.getDakaTImess, data)
				.then((res) => {
					console.log("获取文案提示",res);
					if (res.code == 200) {   
						this.dakaInfo = res;
					} else {
						this.$tools.showToast(res.msg);
					}
				})
				.catch((err) => {
					console.log('错误回调', err);
				});
		},
		getWeizhi() {
			uni.getLocation({
				type: 'gcj02', //返回可以用于uni.openLocation的经纬度
				success: (res) => {
					const latitude = res.latitude;
					const longitude = res.longitude;
					console.log('--', latitude, longitude);
					this.toUserDaka(latitude, longitude);
				},
				complete: (res) => {
					console.log('姐', res);
				}
			});
		},
		toUserDaka(latitude, longitude) {
			if (!this.userInfo) {
				this.$tools.showToast('请先登录');
				return false;
			}
			var data = {
				// lat 36.665992 lng 117.014637

				lat: latitude,
				lon: longitude,
				uId: this.userInfo.id
			};
			this.$axios
				.axios('POST', this.$paths.toUserDaka, data)
				.then((res) => {
					if (res.code == 200) {
						this.$tools.showToast(res.msg);
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
@import url(daka.css);
</style>
