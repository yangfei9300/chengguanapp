<template>
	<view>
		<view class="colonn">
			<view class="inputitem roww rowsa center_center">
				<view class="w-40"></view>
				<view>手机号</view>
				<view class="w-40"></view>
				<input v-model="form.phone" 
				placeholder="请输入手机号" class="allline" />
				<view class="w-40"></view>
			</view>
			<view class="inputitem roww rowsa center_center">
				<view class="w-40"></view>
				<view>新密码</view>
				<view class="w-40"></view>
				<input password v-model="form.password"  placeholder="请输入新密码" class="allline" />
				<view class="w-40"></view>
			</view>
			<view class="inputitem roww rowsa center_center">
				<view class="w-40"></view>
				<view>新密码</view>
				<view class="w-40"></view>
				<input password v-model="form.password1" placeholder="请再次输入新密码" class="allline" />
				<view class="w-40"></view>
			</view>
			<view class="roww center_center">
				<view class="bottombtn" @click.stop="toSubmit">确认修改</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form:{
					'password':'',
					password1:'',
					'phone':'',
					'code':'',
					'uId':'',
				}
			}
		},
		methods: {
			toSubmit(){
				
				var userInfo=uni.getStorageSync("userInfo");
				if(!userInfo){
					return false;
				}
				
				if(!this.isSubmit()){
					return false;
				}
				var data=this.form;
				data.id=uni.getStorageSync("userInfo").id;
				this.$axios
					.axios('POST', this.$paths.updatePwd, data)
					.then(res => {
						if(res.code==200){
							this.$tools.showToast("修改成功")
							setTimeout(res=>{
								uni.reLaunch({
									url:"/pages/index/index"
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
				if(this.form.phone==""){
					this.$tools.showToast("请输入手机号");
					return false;
				}
				if(!this.$tools.isphone(this.form.phone)){
					this.$tools.showToast("请输入正确的手机号");
					return false;
				}
				if(this.form.password==""){
					this.$tools.showToast("请输入密码");
					return false;
				}
				if(this.form.password!=this.form.password1){
					this.$tools.showToast("两次密码输入不一致");
					return false;
				}
				this.form.params={
					code:this.form.code
				}
				return true;
			},
			
		}
	}
</script>

<style>
@import url(updatePwd.css);
</style>
