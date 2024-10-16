<template>
	<view class="">
		<view class="listvie colonn">
			<view class="roww border_bottom fs-30" style="padding: 23rpx 33rpx">
				<view class="">时间：{{info.createTime}}</view>
				<view class="allline"></view>
				<view class="" style="color: red; font-weight: bold">
					{{status[info.status-1]}}</view>
			</view>

			<view class="roww border_bottom fs-30" style="padding: 10rpx 33rpx 20rpx 33rpx">
				<view class="">提交人姓名：</view>
				<view class="allline"></view>
				<view>{{tuser.name}}</view>
			</view>

			<view class="colonn fs-30" style="padding: 23rpx 33rpx 0rpx 33rpx">
				<!-- <view v-if="info.params.ptName">平台：{{info.params.ptName}}</view> -->
				<!-- <view class="h-20"></view> -->
				<view>标题：{{info.title}} </view>
				<view class="h-20"></view>
				<view>内容：{{info.content}}</view>
				<view class="h-20"></view>
				<view>街道：{{info.weizhi}}</view>
				<view class="huanhang m-top-10 m-bottom-10">
					<image
					:src="item" 
					class="w-145 h-145 br-10 m-right-10 m-bottom-10"
					 v-for="(item, index) in info.imgs" mode="aspectFill"></image>
				</view>
			</view>
			<view class="roww border_bottom fs-30" 
			style="padding: 10rpx 33rpx 20rpx 33rpx"
			v-if="!info.resultStartTime"
			>
				<view class="">操作：</view>
				<view class="allline"></view>
				<view class="btncl" @click.stop="updateShijian">点击开始处理</view>
			</view>
			
			<view class="roww border_bottom fs-30" 
			style="padding: 10rpx 33rpx 20rpx 33rpx"
			@click.stop="toIngo"
			>
				<view class="">操作：</view>
				<view class="allline"></view>
				<view class="btncl">点击上报结果</view>
			</view>

			<view v-if="cuser" class="roww border_bottom fs-30" style="padding: 10rpx 33rpx 20rpx 33rpx">
				<view class="">处理人姓名：</view>
				<view class="allline"></view>
				<view>{{cuser.name}}</view>
			</view>

			<view class="roww border_bottom fs-30" 
			v-if="info.resultStartTime"
			style="padding: 10rpx 33rpx 20rpx 33rpx">
				<view class="">处理开始时间：</view>
				<view class="allline"></view>
				<view>{{info.resultStartTime}}</view>
			</view>

			<view class="roww border_bottom fs-30" 
			v-if="info.resultEndTime"
			style="padding: 10rpx 33rpx 20rpx 33rpx">
				<view class="">处理结束时间：</view>
				<view class="allline"></view>
				<view>{{info.resultEndTime}}</view>
			</view>

			<view class="colonn fs-30" style="padding: 23rpx 33rpx 0rpx 33rpx">
				<view>{{info.resultContent}}</view>
				<view class="huanhang m-top-20 m-bottom-10">
					<image 
					:src="BASE_IMG+item" 
					class="w-145 h-145 br-10 m-right-10 m-bottom-10" 
					v-for="(item, index) in info.resultImgs" 
					mode="aspectFill"></image>
				</view>
			</view>

			<view class="roww border_bottom fs-30" style="padding: 10rpx 33rpx 20rpx 33rpx">
				<view class="">最终得分：</view>
				<view class="allline"></view>
				<view v-if="info.fenNum&&info.fenNum!=''">{{info.fen_num}}分</view>
				<view v-else>未打分</view>  
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			info:{},
			tuser:{},
			cuser:{},
			BASE_IMG:"",
			status:[
				'已提交','处理中','处理完成','已打分'
			],
			options:{},
			pt:[],
		};
	},
	onLoad(options) {  
		this.BASE_IMG=this.$paths.BASE_IMG;
		this.options=options;
	},
	onShow() {
		this.getInfo();
	},
	methods: {
		updateShijian(){
			var data={
				'id':this.options.id,
				status:2,
				cTId:uni.getStorageSync("userInfo").teamId,
				cUId:uni.getStorageSync("userInfo").id,
			}
			this.$axios
				.axios('POST', 
				this.$paths.updateShijian, data)
				.then(res => {
					if(res.code==200){
						this.$tools.showToast("修改成功")
						setTimeout(res=>{
							this.getInfo();
						},1000)
					}else{
						this.$tools.showToast(res.msg)
					}
				})
				.catch(err => {
					console.log('错误回调', err);
				});
		},
		getInfo(){
			var data={
				'id':this.options.id
			}
			this.$axios
				.axios('POST', 
				this.$paths.getDaibanShiInfo, data)
				.then(res => {
					if(res.code==200){
						var info=res.data;
						if(info.imgs){
							info.imgs=info.imgs.split(",");
						}else{
							info.imgs=[];
						}
						for(var a=0;a<info.imgs.length;a++){
							if(info.imgs[a].indexOf("http")==-1){
								info.imgs[a]=this.BASE_IMG+info.imgs[a];
							}
						}
						if(info.resultImgs){
							info.resultImgs=info.resultImgs.split(",");
						}else{
							info.resultImgs=[];
						}
						this.info=info;
						this.tuser=res.tuser;
						this.cuser=res.cuser;
						
					}else{
						this.$tools.showToast(res.msg)
					}
				})
				.catch(err => {
					console.log('错误回调', err);
				});
		},
		toIngo(){
			uni.navigateTo({
				url:"/pages1/chuliFankui/chuliFankui?id="+this.options.id
			})
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
	}
};
</script>

<style>
@import url(daichuliInfo.css);
</style>
