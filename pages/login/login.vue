<template>
	<view>
		<view class="colonn center_center">
			<view class="h-199"></view>
			<image src="/static/chengguan.png" mode="widthFix" 
			class="logo"></image>
			<view class="h-141"></view>
			<view class="inputvuew roww center_center">
				<view class="w-55"></view>
				<image src="/static/shoujihoa.png" class="w-40 h-40 "></image>
				<view class="w-20"></view>
				<input v-model="form.phone" placeholder="请输入手机号码" class="allline" />
			</view>
			<view class="h-30"></view>
			<view class="inputvuew roww center_center">
				<view class="w-55"></view>
				<image src="/static/mima.png" class="w-40 h-40 "></image>
				<view class="w-20"></view>
				<input password v-model="form.password"  placeholder="请输入密码" class="allline" />
			</view>
			<view class="h-100"></view>
			<view class="roww center_center">
				<view class="loginbtn" @click.stop="toLogin">登录</view>
			</view>
			<view class="roww">
				<view class="w-620 roww m-top-30 fs-30"
				style="color: #999999;"
				>
				<!-- @click.stop="tozhuce" -->
					<view  class="yincang1">立即注册</view>
					<view class="allline"></view>
					<view @click.stop="topassword">忘记密码</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shopInfo:{},
				BASE_IMG:"",
				form:{
					'phone':'',
					'password':'',
				}
			}
		},
		onLoad() {
			this.BASE_IMG=this.$paths.BASE_IMG;
		},
		methods: {
			
			topassword(){
				uni.navigateTo({
					url:"/pages/updatePwd/updatePwd"
				})
			},
			
			tozhuce(){
				uni.navigateTo({
					url:"/pages/register/register"
				})
			},
			toLogin(){
				if(this.form.phoneNumber==""){
					this.$tools.showToast("请输入手机号");
					return false;
				}
				if(this.form.password==""){
					this.$tools.showToast("请输入密码");
					return false;
				}
				
				// var us={"createBy":null,"createTime":"2024-07-29 19:10:09","updateBy":null,"updateTime":"2024-07-29 19:38:27","remark":null,"id":1,"name":"杨飞1","avatar":"/profile/upload/2024/07/29/哆啦A梦_20240729190937A002.png","phone":"18340070901","password":"1","email":"2855299844@qq.com","fen":null,"uType":null,"teamId":1,"isDz":null,"areaId":null,"isJin":null,"workTimeZaoS":null,"workTimeZaoX":null,"workTimeXiaS":null,"workTimeXiaX":null,"restType":null,"renark":"测试账号"}
				// uni.setStorageSync("userInfo",us);
				// setTimeout(res=>{
				// 				uni.reLaunch({
				// 					url:"/pages/index/index"
				// 				})
				// },1000)
				this.$axios   
					.axios('POST', this.$paths.cguserlogin, this.form)
					.then(res => {
						if(res.code==200){
							this.$tools.showToast("登录成功")
							console.log("撒",res)
							uni.setStorageSync("userInfo",res.data);
							if(res.cgScheduling){
								uni.setStorageSync("cgScheduling",res.cgScheduling)
							}
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
			
		}
	}
</script>

<style>
@import url(login.css);
</style>
