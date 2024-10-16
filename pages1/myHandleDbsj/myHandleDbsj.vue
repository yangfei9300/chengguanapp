<template>
	<view>
		
		<view class="roww">
			<v-tabs
			v-model="current"
			activeColor="   #113281" 
			lineColor="   #113281"  
			:scroll="false" 
			:tabs="tabs" 
			@change="changeTab"
			></v-tabs>
		</view>
		
		<view class="colonn roww center_center">
			<view class="colonn "
			>
				<view class="listvie colonn " 
				v-for="(item, index) in hrhsList" 
				>
					<view class="roww border_bottom fs-30" 
					style="padding: 23rpx 33rpx">
						<view class="">提交时间：{{item.createTime}}</view>
						<view class="allline"></view>
						<!-- <view class="" 
						style="color: red; font-weight: bold">{{status[item.status]}}</view> -->
					</view>
			
					<view class="roww border_bottom fs-30" 
					style="padding: 10rpx 33rpx 20rpx 33rpx"
					v-if="item.params">
						<view class="">提交人所属队伍：</view>
						<view >{{item.params.ttname}}</view>
					</view>
					
					<view class="roww border_bottom fs-30"
					style="padding: 10rpx 33rpx 20rpx 33rpx"
					v-if="item.params">
						<view class="">提交人姓名：</view>
						<view >{{item.params.tuname}}</view>
					</view>
			
					<view class="colonn fs-30" 
					style="padding: 23rpx 33rpx 0rpx 33rpx">
						<view>标题：{{item.title}}</view>
						<view class="h-20"></view>
						<view>内容：{{item.content}}</view>
						<view class="huanhang m-top-20 m-bottom-10">
							<image 
							:src="BASE_IMG+item1" 
							class="w-145 h-145 br-10 m-right-10 m-bottom-10"
							style="background-color:$f5f5f5;"
							 v-for="(item1, index1) in item.imgs" mode="aspectFill"></image>
						</view>
					</view>
					
					<view class="roww border_bottom fs-30"
					style="padding: 10rpx 33rpx 20rpx 33rpx"
					>
						<view class="">处理开始时间：</view>
						<view >{{item.resultStartTime}}</view>
					</view>
					<view class="roww border_bottom fs-30"
					style="padding: 10rpx 33rpx 20rpx 33rpx"
					>
						<view class="">处理结束时间：</view>
						<view >{{item.resultEndTime}}</view>
					</view>
					
					<view class="colonn fs-30"
					style="padding: 23rpx 33rpx 0rpx 33rpx">
						<view>{{item.resultContent}}</view>
						<view class="huanhang m-top-20 m-bottom-10">
							<image 
							:src="BASE_IMG+item1" 
							class="w-145 h-145 br-10 m-right-10 m-bottom-10"
							style="background-color:$f5f5f5;"
							 v-for="(item1, index1) in item.resultImgs" mode="aspectFill"></image>
						</view>
					</view>
					
					
					<view class="roww"
					style="padding: 23rpx 33rpx 23rpx 33rpx"
					v-if="item.fenNum"
					>
						<view>分数</view>
						<view class="allline"></view>
						<view  style="color: red;">{{item.fenNum}}</view>
					</view>
					<view class="roww"
					style="padding: 23rpx 33rpx 23rpx 33rpx"
					v-else
					>
						<view>分数</view>
						<view class="allline"></view>
						<view style="color: red;">暂未审核</view>
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
				
				current: 0,
				tabs: [
				  '已提交',
				  '处理中',
				  '处理完成',
				  '已打分',
				],
				
				
				hrhsList:[],
				BASE_IMG:"",
				userInfo:{}
			}
		},
		onLoad() {
			this.BASE_IMG=this.$paths.BASE_IMG;
			var userInfo=uni.getStorageSync("userInfo")
			if(userInfo){
				this.userInfo=userInfo;
				this.getMyHaorenhaoshi()
			}else{
				this.$tools.showToast("请先登录");
			}
		},
		methods: {
			
			changeTab(res){
				console.log("changeTab",res);
				this.current=res;
				this.getMyHaorenhaoshi();
			},
			// 获取我的好心
			getMyHaorenhaoshi(){
				var data={
					'cUId':uni.getStorageSync("userInfo").id,
					'status':this.current+1
				}
				this.$axios
					.axios('POST', this.$paths.myUpDbsj, data)
					.then(res => {
						if(res.code==200){
							var hrhsList=res.data;
							
							for(var a=0;a<hrhsList.length;a++){
								if(hrhsList[a].imgs){
									hrhsList[a].imgs=hrhsList[a].imgs.split(",");
								}
							}
							
							for(var a=0;a<hrhsList.length;a++){
								if(hrhsList[a].resultImgs){
									hrhsList[a].resultImgs=hrhsList[a].resultImgs.split(",");
								}
							}
							
							this.hrhsList=hrhsList;
						}else{
							this.$tools.showToast(res.msg)
						}
					})
					.catch(err => {
						console.log('错误回调', err);
					});
			}
		}
	}
</script>

<style>
@import url(myHandleDbsj.css);
</style>
