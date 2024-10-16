<template>
	<view>
		<view class="viewsub colonn">
			<picker :range="typeList" range-key="name" @change="typeindexChange">
				<view class="roww border_bottom p-bottom-20">
					<view style="color: #757070" v-if="typeindex == null">请选择分类</view>
					<view v-else>{{ typeList[typeindex].name }}</view>
				</view>
			</picker>
			<view class="h-20"></view>
			<view class="roww border_bottom p-bottom-20">
				<input class="w-50" v-model="form.endTimeNum" 
				type="number"  placeholder="几" />
				<view>天</view>
			</view>
			<view class="h-20"></view>

			<view class="roww border_bottom p-bottom-20">
				<view style="color: blue" 
				v-if="form.lng==''" @click.stop="todingwei">点击定位</view>
				<view style="color: green"
				v-else>【定位已完成】</view>
				<view class="allline"></view>   
				<view   @click.stop="todingwei">刷新定位</view>
			</view>
			<view class="h-20"></view>
			<picker :range="teamList" range-key="tName" @change="teamindexChange">
				<view class="roww border_bottom p-bottom-20">
					<view style="color: #757070" v-if="teamindex == null">请选择处理大队</view>
					<view v-else>{{ teamList[teamindex].tName }}</view>
				</view>
			</picker>
			<view class="h-20"></view>
			<picker :range="teamusersList" range-key="name" @change="teamusersindexChange">
				<view class="roww border_bottom p-bottom-20">
					<view style="color: #757070" v-if="teamuserindex == null">请选择队员</view>
					<view v-else>{{ teamusersList[teamuserindex].name }}</view>
				</view>
			</picker>
			<view class="h-20"></view>
			<view class="roww border_bottom p-bottom-20">
				<input v-model="form.title" placeholder="请输入标题" />
			</view>
			<view class="roww border_bottom p-bottom-20">
				<input v-model="form.weizhi" placeholder="请输入街道" />
			</view>
			<textarea v-model="form.content" class="allline w-660" style="min-height: 200rpx" placeholder="请输入详情"></textarea>
			
			
			<view class="h-30"></view>
			<view class="huanhang">
				<view class="w-150 h-150 m-right-10 m-bottom-10 roww center_center" style="border: 1px solid #c9c9c9" 
				@click.stop="selimgs" v-if="imgs.length < 5">
					<image class="w-70 h-70" 
					src="/static/jiahao.png"></image>
				</view>
				<image v-for="(item, index) in imgs" 
				:src="item" 
				class="w-150 h-150 m-right-10 m-bottom-10"
				></image>
			</view>
		</view>  
		<view class="submit" 
		@click.stop="uploadimg(0,[],imgs)">提交</view>
	</view>
</template>

<script>
import leeDatetime from '@/components/lee-datetime.vue';

export default {
	components: {
		leeDatetime
	},
	data() {
		return {
			BASE_IMG:"",
			leeDateTime: '',
			typeList: [],
			teamusersList: [],
			typeindex: null,
			teamindex: null,
			teamuserindex: null,
			form: {
				title: '',
				endTime: '',
				type: '',
				content: '',
				imgs: "",
				cTId: '',
				cUId: '',
				'lng':'',
				'lat':'',
				tTId: '',
				uTId: '',
				weizhi:'',
				endTimeNum:''
			},
			imgs: [],
			teamList: []
		};
	},
	onLoad() {
		this.BASE_IMG=this.$paths.BASE_IMG;
		this.getShijianType();
		this.getCgDui();
		this.todingwei();
	},
	methods: {
		
		uploadimg(index, listu, listb) {
			if (!this.isSubmit()) {
				return false;
			}
			if(listb.length<=0){
				return false;
			}
			this.$axios
				.axiosUpload(this.$paths.uploadFile, 
				listb[index])
				.then((res) => {
					if (res.code == 200) {
						console.log('上海城结果', res);
						listu.push(res.fileName);
						if (listu.length != listb.length) {
							this.uploadimg(index + 1, listu, listb);
						} else {
							console.log('上传完成');
							console.log(index, listu, listb);
							// this.zhutuImg = this.zhutuImg.concat(listu);
							this.form.imgs = listu.join(',');
							this.toSubmit();
						}
					} else {
						this.$tools.showToast(res.msg);
					}
				})
				.catch((err) => {
					console.log('错误回调', err);
				});
		},
		
		getDateTimePlusTwoDays(num) {
		    // 获取当前时间
		    const now = new Date();
		    // 设置时间为当前时间加上两天（2 * 24 * 60 * 60 * 1000 毫秒）
		    now.setTime(now.getTime() + num * 24 * 60 * 60 * 1000);
		    // 提取年月日时分秒
		    const year = now.getFullYear();
		    const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份是从0开始的，所以要加1
		    const date = String(now.getDate()).padStart(2, '0');
		    const hours = String(now.getHours()).padStart(2, '0');
		    const minutes = String(now.getMinutes()).padStart(2, '0');
		    const seconds = String(now.getSeconds()).padStart(2, '0');
		
		    // 拼接成字符串
		    const dateTime = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
		
		    return dateTime;
		},

		
		todingwei() {
			
			console.log("+=")
			uni.getLocation({
				type: 'wgs84',
				success: (res) => {
					this.form.lng = res.longitude;
					this.form.lat = res.latitude;
					this.$tools.showToast("定位完成");
				},
					complete: (res) => {
						console.log("jies",res);
					}
				
			});
		},
		toSubmit() {
			if (!this.isSubmit()) {
				return false;
			}
			var data = this.form;
			data.tTId = uni.getStorageSync('userInfo').teamId;
			data.uTId = uni.getStorageSync('userInfo').id;
			data.endTime=   this.getDateTimePlusTwoDays(data.endTimeNum)
			// if (this.imgs.length > 0) {
			// 	data.imgs = this.imgs.join(',');
			// }
			this.$axios
				.axios('POST', this.$paths.addcgTreatDoMat, data)
				.then((res) => {
					if (res.code == 200) {
						this.$tools.showToast('上传成功');
						setTimeout((res) => {
							uni.navigateBack({
								delta: 1
							});
						}, 1000);
					} else {
						this.$tools.showToast(res.msg);
					}
				})
				.catch((err) => {
					console.log('错误回调', err);
				});
		},
		isSubmit() {
			
			var userInfo = uni.getStorageSync('userInfo');
			if (!userInfo) {
				this.$tools.showToast('请先登录');
				return false;
			}
			if (this.form.type == '') {
				this.$tools.showToast('请选择事件分类');
				return false;
			}
			if (this.form.cTId == '') {
				this.$tools.showToast('请选择处理队伍');
				return false;
			}
			if (this.form.cUId == '') {
				this.$tools.showToast('请选择处理人员');
				return false;
			}
			if (this.form.title == '') {
				this.$tools.showToast('请选择标题');
				return false;
			}
			if (this.form.content == '') {
				this.$tools.showToast('请选择内容');
				return false;
			}
			return true;
		},
		// 队伍用户
		teamusersindexChange(res) {
			this.teamuserindex = parseInt(res.detail.value);
			this.form.cUId = this.teamusersList[this.teamuserindex].id;
		},
		// 获取城管队员的
		getDuiyuan(teamId) {
			var data = {
				teamId: teamId
			};
			this.$axios
				.axios('POST', this.$paths.getTeampeoples, data)
				.then((res) => {
					this.teamusersList = res.data;
				})
				.catch((err) => {
					console.log('错误回调', err);
				});
		},
		teamindexChange(res) {
			this.teamindex = parseInt(res.detail.value);
			this.form.cTId = this.typeList[this.teamindex].id;
			this.getDuiyuan(this.form.cTId);
		},
		// 获取城管大队
		getCgDui() {
			var data = {
				type: 1
			};
			this.$axios
				.axios('POST', this.$paths.getTeamList, data)
				.then((res) => {
					this.teamList = res.data;
				})
				.catch((err) => {
					console.log('错误回调', err);
				});
		},

		selimgs() {
			uni.chooseImage({
				count: 5 - this.imgs.length, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], //从相册选择
				success: (res) => {
					console.log("selimgs",res);
					var list = res.tempFilePaths;
					this.imgs = this.imgs.concat(list);
				}
			});
		},

		typeindexChange(res) {
			this.typeindex = parseInt(res.detail.value);
			this.form.endTimeNum = this.typeList[this.typeindex].numDay;
			this.form.type = this.typeList[this.typeindex].id;
		},
		getShijianType() {
			var data = {
				type: 1
			};
			this.$axios
				.axios('POST', this.$paths.getCgEventType, data)
				.then((res) => {
					this.typeList = res.data;
				})
				.catch((err) => {
					console.log('错误回调', err);
				});
		},
		bindLeeDateTimeChange(e) {
			console.log('查看时间组件返回值', e.value, e.text);
			this.leeDateTime = e.value;
		}
	}
};
</script>

<style>
@import url(adddbsj.css);
</style>
