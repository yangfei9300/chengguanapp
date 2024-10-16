<template>
	<view>
		<view class="colonn">
			<view class="colonn fs-35 m-all-20 br-10 background1 p-all-20"
			v-for="(item,index) in msgList"
			>
				<!-- <view class="roww ">
					<view>{{item.create_time}}</view>
					<view class="allline"></view>
					<view>{{item.isRead==1?'已读':'未读'}}</view>
				</view>  
				<view class="h-25"></view> -->
				<view class="huanhang">
					<view>{{item.msg}}</view>
				</view>
				<view class="roww endend">
					<view>{{item.createTime}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				msgList:[]
			}
		},
		onLoad() {
			this.getMyMsg();
		},
		methods: {
			getMyMsg(){
				var userInfo=uni.getStorageSync("userInfo")
				if(!userInfo){
					this.$tools.showToast("请先登录");
					return false;
				}
				var data={
					id:userInfo.id
				}
				this.$axios
					.axios('POST', this.$paths.getMyMsg, data)
					.then((res) => {
						if (res.code == 200) {
							this.msgList=res.data;
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch((err) => {
						console.log('错误回调', err);
					});
			}
		}
	}
</script>

<style>
@import url(myMsg.css);
</style>
