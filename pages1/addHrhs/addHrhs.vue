<template>
	<view>
		<view class="viewsub colonn">
			<view class="roww border_bottom p-bottom-20">
				<input v-model="form.title" placeholder="请输入标题" />
			</view>
			<view class="h-20"></view>
			<textarea class="allline w-660" style="min-height: 200rpx" placeholder="请输入详情" v-model="form.content"></textarea>
			<view class="h-30"></view>

			<view class="roww border_bottom p-bottom-20">
				<view style="color: blue" v-if="form.lng == ''" @click.stop="todingwei">点击定位</view>
				<view style="color: green" v-else>【定位已完成】</view>
				<view class="allline"></view>
				<view   @click.stop="todingwei">刷新定位</view>
			</view>
			<view class="h-20"></view>

			<view class="huanhang">
				<view class="w-150 h-150 m-right-10 m-bottom-10 roww center_center" style="border: 1px solid #c9c9c9" @click.stop="selimgs" v-if="imgs.length < 5">
					<image class="w-70 h-70" src="/static/jiahao.png"></image>
				</view>
				<image v-for="(item, index) in imgs" :src="item" class="w-150 h-150 m-right-10 m-bottom-10"></image>
			</view>
		</view>
		<view class="submit" 
		@click.stop="uploadimg(0,[],imgs)"
		
		>提交</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			form: {
				title: '',
				content: '',
				imgs: '',
				lat: '',
				lng: '',
				dId: '',
				uId: ''
			},
			imgs: []
		};
	},
	onLoad() {
		this.todingwei();
	},
	methods: {
		uploadimg(index, listu, listb) {
			if (!this.isSubmit()) {
				return false;
			}
			this.$axios
				.axiosUpload(this.$paths.uploadFile, 
				listb[index])
				.then((res) => {
					if (res.code == 200) {
						console.log('上海城结果', res);
						listu.push(res.fileName);
						if (listu.length != listb.length) {
							this.uploadimg(index + 1, listu, listb);
						} else {
							console.log('上传完成');
							console.log(index, listu, listb);
							// this.zhutuImg = this.zhutuImg.concat(listu);
							this.form.imgs = listu.join(',');
							this.toSubmit();
						}
					} else {
						this.$tools.showToast(res.msg);
					}
				})
				.catch((err) => {
					console.log('错误回调', err);
				});
		},

		todingwei() {
			uni.getLocation({
				type: 'wgs84',
				success: (res) => {
					this.form.lng = res.longitude;
					this.form.lat = res.latitude;
					this.$tools.showToast("定位完成");
				},
				complete: (res) => {
					console.log('jies', res);
				}
			});
		},
		toSubmit() {
			
			var data = this.form;
			data.dId = uni.getStorageSync('userInfo').teamId;
			data.uId = uni.getStorageSync('userInfo').id;
			// if (this.imgs.length > 0) {
			// 	data.imgs = this.imgs.join(',');
			// }
			this.$axios
				.axios('POST', this.$paths.addHrhs, data)
				.then((res) => {
					if (res.code == 200) {
						this.$tools.showToast('上传成功');
						setTimeout((res) => {
							uni.navigateBack({
								delta: 1
							});
						}, 1000);
					} else {
						this.$tools.showToast(res.msg);
					}
				})
				.catch((err) => {
					console.log('错误回调', err);
				});
		},
		isSubmit() {
			var userInfo = uni.getStorageSync('userInfo');
			if (!userInfo) {
				this.$tools.showToast('请先登录');
				return false;
			}
			if (this.form.title == '') {
				this.$tools.showToast('请输入标题');
				return false;
			}
			if (this.form.content == '') {
				this.$tools.showToast('请输入内容');
				return false;
			}
			if (this.imgs.length <= 0) {
				this.$tools.showToast('请上传照片');
				return false;
			}
			return true;
		},
		selimgs() {
			uni.chooseImage({
				count: 5 - this.imgs.length, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], //从相册选择
				success: (res) => {
					var list = res.tempFilePaths;
					this.imgs = this.imgs.concat(list);
				}
			});
		}
	}
};
</script>

<style>
page {
	background-color: #f7f6fa;
}
.viewsub {
	width: 700rpx;
	background: rgba(255, 255, 255, 1);
	border-radius: 20rpx;
	margin: 25rpx;
	padding: 20rpx;
}
.submit {
	width: 650rpx;
	height: 90rpx;
	background:    #113281;
	border-radius: 45rpx;
	text-align: center;
	line-height: 90rpx;
	color: white;
	position: fixed;
	bottom: 200rpx;
	left: 50rpx;
}
</style>
