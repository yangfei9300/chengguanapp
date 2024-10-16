<template>
	<view>
		<view class="colonn rowsa  " style="height: 100vh;">
			<view class="colonn w-750">   
			<!-- {{sss}} -->
				<view class="h-20"></view>
				<view class="w-200"
				style="width: 750rpx;text-align:center;"
				>当前版本</view>
				<view class="h-20"></view>
				<view class="w-200"
				style="width: 750rpx;text-align:center;"
				>{{version}}</view>
				<view class="h-20"></view>
				<view class="roww fs-30 rowsa p-left-20 m-bottom-30 m-top-30 p-right-20" 
				v-if="isGengxin">
					<view>下载进度</view>
					<view class="w-40"></view>
					<progress style="width: 650rpx;" :percent="numJindu"></progress>
					<view class="w-40"></view>
					<view>{{numJindu}}%</view>
				</view>
				
				
				<button size="default"  class="btndd"
					@click="getIsGengxin">检查更新</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isGengxin: false,
				numJindu: 0,
				gengxinUrl: "",
				version: "0.0.0", //当前版本号
				sss:"",
			}
		},
		onLoad() {
			this.getNowVersion();
			uni.$off('scan') //在此生命周期里销毁地址改变事件的监听
			uni.$on('scan', (res) => {
				console.log("扫码界面监听结果", res)
				this.initScan(res.data);
			})
		},  
		methods: {
			getNowVersion(){
				//#ifdef APP-PLUS
				console.log('版本', plus.runtime.versionCode)
				plus.runtime.getProperty(plus.runtime.appid, (info) => {
					this.version = info.version;
				})
				//#endif
			},
			initScan(res) {
				this.gengxinUrl = res.barcode;
				console.log("扫码内容", res);
			},
			// 获取是否更新  
			getIsGengxin() {
				this.$axios
					.axios('post', this.$paths.getversion, {})
					.then(res => {    
						if (res.code == 200) {
							console.log("结果",res)
							var sss=JSON.stringify(res)
							this.sss=sss;
							// return false;
							if(res.data.version!=(this.version+"")){
								
								uni.showModal({									title: '提示',									content: '确定要更新吗？',									success:  (res2)=> {										if (res2.confirm) {											console.log('用户点击确定');
											        
											this.toGengxin(res.data.file);
											this.isGengxin=true;
																					} else if (res2.cancel) {											console.log('用户点击取消');										}									}								});
								
								
								
							}else{
								this.$tools.showToast("已是最新版本");
							}
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch(err => {});
			},
			toGengxin(url) {
				const downloadTask = uni.downloadFile({
					url: url,
					success: res => {
						if (res.statusCode !== 200) {
							console.error('下载安装包失败', res);
							return;
						}
						// 下载好直接安装，下次启动生效
						plus.runtime.install(res.tempFilePath, {
							force: false
						}, () => {
							uni.hideLoading()
							uni.showModal({
								title: '安装成功是否重启？',
								success: res => {
									if (res.confirm) {
										plus.runtime.restart();
									}
								}
							});
						}, err => {
							uni.hideLoading()
							uni.showModal({
								title: '更新失败',
								content: err.message,
								showCancel: false
							});
						});
					},
					//接口调用结束
					complete: () => {

						uni.hideLoading();
						downloadTask.offProgressUpdate(); //取消监听加载进度
					}
				});
				//监听下载进度
				downloadTask.onProgressUpdate(res => {
					// state.percent = res.progress;
					if (res.progress >= 100) {   
						this.isGengxin = false;
					}  
					this.numJindu = res.progress;
					// waiting.setTitle("正在下载 - " + res.progress + "%");
					// console.log('下载进度百分比:' + res.progress); // 下载进度百分比
					// console.log('已经下载的数据长度:' + res.totalBytesWritten); // 已经下载的数据长度，单位 Bytes
					// console.log('预期需要下载的数据总长度:' + res.totalBytesExpectedToWrite); // 预期需要下载的数据总长度，单位 Bytes
				});
			}
		}
	}
</script>

<style>
	@import url(gengxin.css);
</style>
