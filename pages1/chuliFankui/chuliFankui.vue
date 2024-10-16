<template>
	<view>
		<view class="viewsub colonn">
			<view>处理结果上报</view>
			
			<!-- <view class="roww border_bottom p-bottom-20">
				<view style="color: blue" 
				v-if="form.lng==''" @click.stop="todingwei">点击定位</view>
				<view style="color: green"
				v-else>【定位已完成】</view>
				<view class="allline"></view>   
				<view   @click.stop="todingwei">刷新定位</view>
			</view>
			<view class="h-20"></view> -->
			<view class="h-20"></view>
			<textarea class="allline w-660"  
			v-model="form.resultContent"
			style="min-height: 200rpx;"
			placeholder="请输入(比如:已处理完成)"></textarea>
			<view class="h-30"></view>
			<view class="huanhang">
				<view class="w-150 h-150 m-right-10 m-bottom-10 roww center_center" style="border: 1px solid #c9c9c9"
				@click.stop="selimgs" v-if="imgs.length < 5">
					<image class="w-70 h-70" 
					src="/static/jiahao.png"></image>
				</view>
				<image v-for="(item, index) in imgs" 
				:src="item" mode="aspectFill" class="w-150 h-150 m-right-10 m-bottom-10"></image>
			</view>
		</view>
		<view class="submit" @click.stop="uploadimg(0,[],imgs)">提交</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form:{
					'id':'',
					'resultContent':'',
					'resultImgs':'',
					'status':3,
				},
				imgs: [],
			}
		},
		onLoad(options) {
			this.options=options;
			this.form.id=options.id;
		},
		methods: {
			toSubmit(){
				var data=this.form;
				this.$axios
					.axios('POST', this.$paths.updateShijian2, data)
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
			isSubit(){
				if(this.form.resultContent==""){
					this.$tools.showToast("请输入内容");
					return false;
				}
				if(this.imgs.length<=0){
					this.$tools.showToast("请上传处理后的图片");
					return false;
				}
				return true;
				
			},
			uploadimg(index, listu, listb) {
				if (!this.isSubit()) {
					return false;
				}
				if(listb.length<=0){
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
								this.form.resultImgs = listu.join(',');
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
			},
		}
	}
</script>

<style>
@import url(chuliFankui.css);
</style>
