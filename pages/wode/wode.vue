<template>
	<view>
		<view class="colonn">
			<view class="topcuwe"></view>
			<view class="colonn userinfoview center_center">
				<view class="roww w-700 allline center_center" v-if="userInfo">
					<view class="w-25"></view>

					<image v-if="userInfo.avatar" :src="BASE_IMG + userInfo.avatar" class="w-100 h-100" style="border-radius: 50%"></image>
					<image v-else src="/static/z1.png" class="w-100 h-100" style="border-radius: 50%"></image>

					<view class="w-25"></view>
					<view class="colonn">
						<view v-if="userInfo.name">{{ userInfo.name }}</view>
						<view v-else>未完善</view>
					</view>
					<view class="allline"></view>
					<view class="fs-30" style="color: red" @click.stop="tousewrup">编辑</view>
					<view class="w-30"></view>
				</view>

				<view class="roww w-700 allline center_center" v-else @click.stop="toLogin">
					<view>请先登录</view>
				</view>
				<view class="h-30"></view>
				<view class="roww w-700 rowsa fs-30">
					<view class="colonn center_center"
					@click="topages(2)"
					>
						<view class="fs-50 fw-600" v-if="myCount">{{myCount.myCSjCOunt}}</view>
						<view class="fs-50 fw-600" v-else>0</view>
						<view class="fs-25">处理案件（件）</view>
					</view>
					<view class="colonn center_center"
					@click="topages(4)">
						<view class="fs-50 fw-600" v-if="myCount">{{myCount.myHrhsCount}}</view>
						<view class="fs-50 fw-600" v-else>0</view>
						<view class="fs-25">为民服务（件）</view>
					</view>
				</view>
			</view>

			<view class="bottomenus colonn">
				<view>常用功能</view>
				<view class="h-20"></view>
				<view v-for="(item, index) in menus" @click.stop="topages(index + 1)" class="roww border_bottom center_center" style="padding: 25rpx 0rpx">
					<image :src="item.icon" class="w-50 h-50"></image>
					<view class="w-20"></view>
					<view class="fs-25">{{ item.name }}</view>
					<view class="allline"></view>
					<image src="/static/youjiantou1.png" class="w-40 h-40"></image>
				</view>
			</view>

			<!-- <view class="bottomenus colonn">
				<view>我的菜单</view>
				<view class="h-20"></view>
				<view class="huanhang">
					<view 
					class="colonn m-bottom-30 center_center"
					style="width: 20%;" v-for="(item,index) in 6"
					>
						<image src="/static/z3.png" 
						class="w-60 h-60"></image>
						<view class="h-20"></view>
						<view class="fs-20">上班打卡</view>
					</view>
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			BASE_IMG: '',
			menus: [
				{
					icon: '/static/gerenxinxixiugai.png',
					name: '个人信息修改'
				},
				{
					icon: '/static/wodechulianjian.png',
					name: '我的处理案件'
				},

				{
					icon: '/static/dakajilu.png',
					name: '打卡记录'
				},
				{
					icon: '/static/wodehaorenhaoshi.png',
					name: '我的好人好事'
				},
				{
					icon: '/static/xiugaimima.png',
					name: '修改密码'
				},
				
				{
					icon: '/static/shangchuan.png',
					name: '我上传的待办事件'
				},
				{
					icon: '/static/xuexi.png',
					name: '使用教程'
				},{
					icon: '/static/tuichudenglu.png',
					name: '退出登录'
				},{
					icon: '/static/gengdui.png',
					name: '检查更新'
				},{
					icon: '/static/xiaoxi.png',
					name: '我的消息'
				}
			],
			userInfo: null,
			myCount: {}
		};
	},
	onLoad() {
		this.BASE_IMG = this.$paths.BASE_IMG;
	},
	onShow() {
		this.userInfo = uni.getStorageSync('userInfo');
		if(this.userInfo){
			this.getCount();
		}
		
	},
	methods: {
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
		toLogin() {
			uni.navigateTo({
				url: '/pages/login/login'
			});
		},
		tousewrup() {
			uni.navigateTo({
				url: '/pages1/userInfo/userInfo'
			});
		},
		topages(type) {
			if (type == 3) {
				uni.navigateTo({
					url: '/pages1/dakaHistory/dakaHistory'
				});
			}else if (type == 1) {
				uni.navigateTo({
					url: '/pages1/userInfo/userInfo'
				});
			} else if (type == 5) {
				uni.navigateTo({
					url: '/pages/updatePwd/updatePwd'
				});
			} else if (type == 6) {
				uni.navigateTo({
					url: '/pages1/myUpDbsj/myUpDbsj'
				});
			} else if (type == 7) {
				
				uni.navigateTo({
					url: '/pages1/shuoming/shuoming'
				});
				
				
			}
			
			
			else if (type == 4) {
				uni.navigateTo({
					url: '/pages1/myHrhs/myHrhs'
				});
			} else if (type == 8) {
				uni.clearStorageSync();
				uni.reLaunch({
					url: '/pages/login/login'
				});
			} else if (type == 2) {
				uni.navigateTo({
					url: '/pages1/myHandleDbsj/myHandleDbsj'
				});
			}else if (type == 9) {
				uni.navigateTo({
					url: '/pages2/gengxin/gengxin'
				});
			}else if (type ==10) {
				uni.navigateTo({
					url: '/pages2/myMsg/myMsg'
				});
			}
			
			
		}
	}
};
</script>

<style>
@import url(wode.css);
</style>
