<template>
	<view class="colonn">
		<view class="topview"></view>
		<swiper class="baneers m-all-25" 
		style="margin-top: -100rpx">
			<swiper-item class="baneers"
			v-for="(item,index) in banneers"
			>
				<image :src="BASE_IMG+item.img"
				 class="baneers"
				 mode="aspectFill"
				 ></image>
			</swiper-item>
		</swiper>

		<view class="shuju huanhang">
			<view  class="colonn center_center h-150" style="width: 33%">
				<view class="fs-40 m-bottom-15">{{myCount?myCount.myCtCount:0}}</view>
				<view class="fs-26" style="color: #999999">队内总工单</view>
			</view>
			<view  class="colonn center_center h-150" style="width: 33%">
				<view class="fs-40 m-bottom-15">{{myCount?myCount.myCSjCOunt:0}}</view>
				<view class="fs-26" style="color: #999999">个人总工单</view>
			</view>
			<view  class="colonn center_center h-150" style="width: 33%">
				<view class="fs-40 m-bottom-15">{{myCount?myCount.myHrhsCount:0}}</view>
				<view class="fs-26" style="color: #999999">我的好人好事</view>
			</view>
		</view>

		<view class="menus colonn">
			<view style="font-weight: bold">常用应用</view>
			<view class="h-20"></view>
			<view class="huanhang">
				<view class="colonn center_center" style="width: 25%" @click.stop="todaka">
					<image src="../../static/z3.png" class="w-80 h-80"></image>
					<view class="h-20"></view>
					<view class="fs-27">上班打卡</view>
				</view>

				<view class="colonn center_center" style="width: 25%" 
				@click.stop="toadddbsx">
					<image src="../../static/z1.png" class="w-80 h-80"></image>
					<view class="h-20"></view>
					<view class="fs-27">上传案件</view>
				</view>
				<view class="colonn center_center" style="width: 25%" @click.stop="tohrhs">
					<image src="../../static/z4.png" class="w-80 h-80"></image>
					<view class="h-20"></view>
					<view class="fs-27">好人好事</view>
				</view>
				<view class="colonn center_center" style="width: 25%" @click.stop="todaka">
					<image src="../../static/z2.png" class="w-80 h-80"></image>
					<view class="h-20"></view>
					<view class="fs-27">公益岗打卡</view>
				</view>
			</view>
		</view>

		<view class="colonn p-all-25">
			<view class="roww center_center">
				<view class="leftline"></view>
				<view>待办事项</view>
				<view class="allline"></view>
			</view>
			<view class="colonn">
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

					<view class="colonn fs-30" style="padding: 23rpx 33rpx 0rpx 33rpx">
						<view>{{item.title}}</view>
						<view class="h-20"></view>
						<view>{{item.content}}</view>
						<view class="huanhang m-top-10 m-bottom-10">
							<image 
							:src="item1" 
							class="w-145 h-145 br-10 m-right-10 m-bottom-10"
							 v-for="(item1, index1) in item.imgs" mode="aspectFill"></image>
						</view>
					</view>

					<view class="roww p-all-25">
						<view class="allline"></view>
						<view class="btnsub">查看详情</view>
					</view>
				</view>
			</view>
		</view>
		<!-- <button @click="startDingwei">开启</button>
		<button @click="tonewUserKaoqin">生成考勤表</button>
		<button @click="exportKaoqin">生成考勤表</button> -->
		
	</view>
</template>

<script>

export default {
	
	data() {
		return {
			status:[
				'已提交','处理中','处理完成','已打分'
			],
			banneers:[],
			locationWatcherId: '', //监听器id
			shijianList:[],
			myCount:null,
			userInfo:null,
			maximumAge: 10 * 1000 //间隔时间10s
		};
	},
	onLoad() {
		this.BASE_IMG=this.$paths.BASE_IMG;
		var userInfo = uni.getStorageSync('userInfo');
		if (!userInfo) {
			uni.reLaunch({
				url: '/pages/login/login'
			});
		}
		this.getBanners();
		this.getDaibanShiList();
	},
	onShow() {
		var userInfo = uni.getStorageSync('userInfo');
		if (userInfo) {
			this.userInfo=userInfo;
			this.getCount()
			this.getDaibanShiList()
		}
		// this.exportKaoqin();
	},
	onPullDownRefresh() {
		var userInfo = uni.getStorageSync('userInfo');
		if (userInfo) {
			this.userInfo=userInfo;
			this.getCount()
			this.getDaibanShiList()
		}
		uni.stopPullDownRefresh()
	},
	methods: {
		// 导出
		exportKaoqin(){
			var data = {
			};
			this.$axios
				.axios('POST', this.$paths.exportKaoqin, data)
				.then((res) => {
					if (res.code == 200) {
						
					} else {
						this.$tools.showToast(res.msg);
					}
				})
				.catch((err) => {
					console.log('错误回调', err);
				});
		},
		// 开始定位
		startDingwei(){
			 let a = ()=>{
					var obg=JSON.parse(uni.getStorageSync('LIn97112479'))
					console.log('报错提醒',obg);
					var usreInfo=uni.getStorageSync("userInfo");
					if(usreInfo){
						this.toShishidingwei(obg);
					}
			    }
			    let b = function(err){
			    console.log('报错提醒',err);
			    uni.showModal({
			        title:'提示',
			        content:JSON.stringify(err)
			    })
			}   
			const info= getLocations({provider:"amap",
			geocode:true,fun:a,err:b,time:1000})
		},
		toShishidingwei(info){
			var data={
				'id':uni.getStorageSync("userInfo").id,
				'name':info.addresses,
				'lat':info.coords.latitude,
				'lng':info.coords.longitude,
				'renark':info.address.country+","+info.address.province
				+","+info.address.city
				+","+info.address.district
				+","+info.address.street   
				+","+info.address.streetNum
				+","+info.address.poiName
				+","+info.address.cityCode
			}
			console.log("==",data)
			this.$axios
				.axios('POST', this.$paths.myisweilan, data)
				.then((res) => {
					if (res.code == 200) {
						this.$tools.showToast(res.data);
					} else {
						this.$tools.showToast(res.msg);
					}
				})
				.catch((err) => {
					console.log('错误回调', err);
				});
		},
		
		tonewUserKaoqin(){
			var data = {
				'uId':this.userInfo.id,
			};
			this.$axios
				.axios('POST', this.$paths.tonewUserKaoqin, data)
				.then((res) => {
					if (res.code == 200) {
						
					} else {
						this.$tools.showToast(res.msg);
					}
				})
				.catch((err) => {
					console.log('错误回调', err);
				});
		},
		// 获取个数
		getCount() {
			var data = {
				'cUId':this.userInfo.id,
				'cTId':this.userInfo.teamId,
			};
			this.$axios
				.axios('POST', this.$paths.getShiCount, data)
				.then((res) => {
					if (res.code == 200) {
						this.myCount = res.data;
					} else {
						this.$tools.showToast(res.msg);
					}
				})
				.catch((err) => {
					console.log('错误回调', err);
				});
		},
		getDaibanShiList(){
			var userInfo = uni.getStorageSync('userInfo');
			if (!userInfo) {
				return
			}
			var data={
				'cUId':userInfo.id,
				'cTId':userInfo.teamId,
				params:{
					'status':'11'
				}
			}   
			this.$axios
				.axios('POST', 
				this.$paths.getDaibanShiList, data)
				.then(res => {
					console.log("res",res);
					if(res.code==200){
						var shijianList=res.data;
						for(var a=0;a<shijianList.length;a++){
							if(shijianList[a].imgs){
								shijianList[a].imgs=shijianList[a].imgs.split(",");
								for(var b=0;b<shijianList[a].imgs.length;b++){
									var imgs=shijianList[a].imgs;
									if(imgs[b].indexOf("http")==-1){
										imgs[b]=this.BASE_IMG+imgs[b];
									}
									shijianList[a].imgs=imgs;
								}
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
		},
		getBanners(){
			var data={}
			this.$axios
				.axios('POST', 
				this.$paths.getbanners, data)
				.then(res => {
					if(res.code==200){
						this.banneers=res.data;
					}else{
						this.$tools.showToast(res.msg)
					}
				})
				.catch(err => {
					console.log('错误回调', err);
				});  
		},
	
		todaka() {
			uni.navigateTo({
				url: '/pages1/daka/daka'
			});
		},
		toadddbsx() {
			
			var userInfo=uni.getStorageSync("userInfo");
			if(userInfo&&userInfo.teamId==12){
				uni.navigateTo({
					url: '/pages1/adddbsj/adddbsj'
				});
			}else{
				this.$tools.showToast("只有直属大队有权限上传案件");
			}
		},
		tohrhs() {
			uni.navigateTo({
				url: '/pages1/addHrhs/addHrhs'
			});
		},
		toInfo(item) {
			uni.navigateTo({
				url: '/pages1/daichuliInfo/daichuliInfo?id='+item.id
			});
		},
		//开启定位功能
		open() {
			this.$locationWatcher.startLocationService(
				(e) => {
					let { latitude, longitude } = e.position;
					console.log(`当前位置，经度${longitude},纬度${latitude}`);
					if (!this.locationWatcherId) {
						this.locationWatcherId = e.locationWatcherId; //举例保存到data，实际可以缓存到全局
					}
				},
				(e) => {
					console.log(e, '定位失败');
				},
				this.maximumAge
			);
		},

		//关闭定位
		close() {
			this.locationWatcherId && this.$locationWatcher.closeLocationService(this.locationWatcherId);
		},
	}
};
</script>

<style>
@import url(index.css);
</style>
