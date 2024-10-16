<template>
	<view>
		<view class="colonn">
			<view class="roww border_bottom inputview center_center">
				<view>头像</view>
				<view class="allline"></view>
				<image v-if="userInfo.avatar" 
				:src="BASE_IMG + userInfo.avatar" 
				@click.stop="selimg()"
				class="w-110 h-110"></image>
				<image v-else
				@click.stop="selimg()" 
				src="/static/wd_gr@2x.png"
				class="w-110 h-110"></image>
			
			</view>
			<view class="roww border_bottom inputview">
				<view>姓名</view>
				<view class="w-20"></view>
				<input class="allline inoutal"
				  v-model="userInfo.name"
				placeholder="请输入姓名"/>
			</view>
			<view class="roww border_bottom inputview">
				<view>手机号</view>
				<view class="w-20"></view>
				<input class="allline inoutal"
				  v-model="userInfo.phone"
				  maxlength="11"
				  placeholder="请输入手机号"/>
			</view>
			<view class="roww border_bottom inputview">
				<view>邮箱</view>
				<view class="w-20"></view>
				<input class="allline inoutal" 
				  v-model="userInfo.email" 
				placeholder="请输入邮箱"/>
			</view>
		</view>
		
		<view class="roww">
			<view class="subbtnn" @click.stop="toSibmit">立即提交</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:{},
				BASE_IMG:""
			}
		},
		onLoad() {
			this.BASE_IMG = this.$paths.BASE_IMG;
			this.userInfo = uni.getStorageSync('userInfo');
		},
		methods: {
			toSibmit(){
				if(!this.isSubmit()){
					return false;
				}
				this.$axios
					.axios('POST', this.$paths.updateUserInfo, 
					this.userInfo)
					.then(res => {
						if(res.code==200){
							uni.setStorageSync("userInfo",res.data)
							this.$tools.showToast("修改成功")
							setTimeout(res=>{
								uni.navigateBack({
									delta:1
								})
							},1000)
						}else{
							this.$tools.showToast(res.msg)
						}
					})
					.catch(err => {
						console.log('错误回调', err);
					});
			},
			isSubmit(){
				if(this.userInfo.avatar==""){
					this.$tools.showToast("请上传头像");
					return false;
				}
				if(this.userInfo.name==""){
					this.$tools.showToast("请填写姓名");
					return false;
				}
				if(this.userInfo.phone==""){
					this.$tools.showToast("请填写电话");
					return false;
				}
				if(this.userInfo.email==""){
					this.$tools.showToast("请填写邮箱");
					return false;
				}
				return true;
			},
			selimg() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						var list = res.tempFilePaths;
						console.log("--",list);
						if (list.length > 0) {
							this.uploadun(list[0]);
						}
					}
				});
			},
			uploadun(img) {
				this.$axios
					.axiosUpload(this.$paths.uploadFile, img, {})
					.then((res) => {
						this.userInfo.avatar = res.fileName;
					})
					.catch((err) => {
						console.log('错误回调', err);
					});
			}
		}
	}
</script>

<style>
@import url(userInfo.css);
</style>
