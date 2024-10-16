<template>
	<view>
		<view class="colonn">
			
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
			
			<view class="listvie colonn" 
			v-for="(item, index) in shijianList" 
			@click.stop="toInfo(item)">
				<view class="roww border_bottom fs-30" 
				style="padding: 23rpx 33rpx">
					<view class="">时间：{{item.createTime}}</view>
					<view class="allline"></view>
					<view class="" 
					style="color: red; font-weight: bold">{{status[item.status-1]}}</view>
				</view>
		
				<view class="roww border_bottom fs-30" 
				style="padding: 10rpx 33rpx 20rpx 33rpx">
					<view class="">提交人姓名：</view>
					<view class="allline"></view>
					<view>{{item.params.tuname}}</view>
				</view>
				
				<view class="roww border_bottom fs-30"
				style="padding: 10rpx 33rpx 20rpx 33rpx">
					<view class="">指派人姓名：</view>
					<view class="allline"></view>
					<view>{{item.params.cuname}}</view>
				</view>
				<view class="roww border_bottom fs-30"
				style="padding: 10rpx 33rpx 20rpx 33rpx">
					<view class="">指派人电话：</view>
					<view class="allline"></view>
					<view>({{item.params.cuphone}})</view>
					<view class="w-20"></view>
					<view style="color: blue;" @click.stop="toMakePhone(item.params.cuphone)">复制电话</view>
				</view>
		
				<view class="colonn fs-30" style="padding: 23rpx 33rpx 0rpx 33rpx">
					<view>{{item.title}}</view>
					<view class="h-20"></view>
					<view>{{item.content}}</view>
					<view class="huanhang m-top-10 m-bottom-10">
						<image 
						:src="BASE_IMG+item1" 
						class="w-145 h-145 br-10 m-right-10 m-bottom-10"
						 v-for="(item1, index1) in item.imgs" mode="aspectFill"></image>
					</view>
				</view>
				
				<!-- <view class="roww p-all-25">
					<view class="allline"></view>
					<view class="btnsub">查看详情</view>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	// 我上传的案件
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
				
				
				shijianList:[],
				status:[
					'已提交','处理中','处理完成','已打分'
				],
				BASE_IMG:""
			}
		},
		onLoad() {
			this.BASE_IMG=this.$paths.BASE_IMG;
			var userInfo=uni.getStorageSync("userInfo")
			if(userInfo){
				this.myUpDbsj();
			}else{
				this.$tools.showToast("请先登录");
			}
			
		},
		methods: {
			
			changeTab(res){
				console.log("changeTab",res);
				this.current=res;
				this.myUpDbsj();
			},
			
			toMakePhone(phone){
				uni.setClipboardData({
					data: phone,
					showToast:false,
					success:  ()=> {
						this.$tools.showToast("电话复制成功");
					}
				});
			},
			toInfo(item) {
				uni.navigateTo({
					url: '/pages1/daichuliInfo/daichuliInfo?id='+item.id
				});
			},
			myUpDbsj(){
				var userInfo=uni.getStorageSync("userInfo")
				var data={
					'uTId':userInfo.id,
					'status':this.current+1
				}
				this.$axios
					.axios('POST', 
					this.$paths.myUpDbsj, data)
					.then(res => {
						if(res.code==200){
							var shijianList=res.data;
							for(var a=0;a<shijianList.length;a++){
								if(shijianList[a].imgs){
									shijianList[a].imgs=shijianList[a].imgs.split(",");
								}
							}
							this.shijianList=shijianList;
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
@import url(myUpDbsj.css);
</style>
