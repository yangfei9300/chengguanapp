<template>
	<view>
		<view class="roww rowsa fs-30 p-all-20 border_bottom"  
		style="text-align: center;">
			<view class="allline">时间</view>
			<view class="allline">上班打卡</view>
			<view class="allline">下班打卡</view>
		</view>  
		<view class="roww rowsa fs-30 p-all-20 border_bottom"
		style="text-align: center;" v-for="(item,index) in myDakiList">
			<view class="allline">{{item.attendDate}}</view>
			<view class="allline" v-if="item.params">
				<block v-if="item.params.in_status==1">
					<view>正常</view>
				</block>
				<block v-if="item.params.in_status==2">
					<view>迟到</view>
				</block>
				<block v-if="item.params.in_status==3">
					<view>早退</view>
				</block>
				<block v-if="!item.params.in_status">
					<view>缺卡</view>
				</block>
			</view>
			<view class="allline" v-else>
				缺勤
			</view>
			<view class="allline" v-if="item.params">
				<block v-if="item.params.out_status==1">
					<view>正常</view>
				</block>
				<block v-if="item.params.out_status==2">
					<view>迟到</view>
				</block>
				<block v-if="item.params.out_status==3">
					<view>早退</view>
				</block>
				<block v-if="!item.params.out_status">
					<view>缺卡</view>
				</block>
			</view>
			<view class="allline" v-else>
				缺勤
			</view>
		</view>
		<view class=" w-700 m-left-25 m-top-25">
			<view>缺勤：整天都没有打卡记录。<br>早退：早于下班时间打卡，<br>缺卡：没有打卡</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:{},
				myDakiList:[]
			}
		},
		onLoad() {
			var userInfo=uni.getStorageSync("userInfo");
			if(userInfo){
				this.userInfo=userInfo
				this.myDakaHistoryByUid();
			}else{
				this.$tools.showToast("请先登录");
			}
		},
		methods: {
			myDakaHistoryByUid(){
				var data = {
					'uId':this.userInfo.id,
					'attendDate':this.$tools.getCurrentDate(),
					params:{
						'year':this.$tools.getCurrentDate().split("-")[0],
						'month':this.$tools.getCurrentDate().split("-")[1],
					}
				};
				this.$axios
					.axios('POST', this.$paths.myDakaHistoryByUid, data)
					.then((res) => {
						if (res.code == 200) {
							this.myDakiList = res.data;
							console.log("打了卡",this.myDakiList);
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
@import url(dakaHistory.css);
</style>
