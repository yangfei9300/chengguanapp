<script>
import { getLocations, clearLocations } from '@/uni_modules/Lin97112479-location/utssdk/index';
export default {
	globalData: {
		activityId: 5
	},
	onLoad() {},
	onLaunch: function () {
		console.log('yti');
		this.startDingwei();
	},
	onShow: function () {
		console.log('App Show');
	},
	onHide: function () {
		console.log('App Hide');
	},
	onUnload() {
		console.log('卸载');
	},   
	methods: {
		startDingwei() {
			let a = () => {     
				var obg = JSON.parse(uni.getStorageSync('LIn97112479'));
				var usreInfo = uni.getStorageSync('userInfo');
				var cgScheduling = uni.getStorageSync('cgScheduling');
				console.log('报错提醒', cgScheduling);
				if (usreInfo && cgScheduling) {
					var nowTimea = this.$tools.getCurrentTimeParts();
					var workTImeStart = cgScheduling.startTime;
					var workTImeEnd = cgScheduling.endTime;
					console.log(nowTimea, workTImeStart, workTImeEnd);
					var str = this.$tools.compareTimeStr(nowTimea, workTImeStart, workTImeEnd);
					console.log('aaa', str);
					if(str=='在区间内'){
						this.toShishidingwei(obg, usreInfo, cgScheduling);
					}
				}
			};  
			let b = function (err) {
				console.log('报错提醒', err);
				uni.showModal({
					title: '提示',
					content: JSON.stringify(err)
				});
			};
			const info = getLocations(
			{ provider: 'amap', 
				geocode: false, 
				fun: a, err:
				 b, time: 20000 }
			);
		},
		toShishidingwei(info, usreInfo, cgScheduling) {
			console.log("usreInfo",usreInfo)
			var data = {
				id: uni.getStorageSync('userInfo').id,
				name: info.addresses,
				lat: info.coords.latitude,
				lng: info.coords.longitude,
			};
			console.log('==', data);
			this.$axios
				.axios1('POST', this.$paths.myisweilan, data)
				.then((res) => {
					console.log('===', res);
					if (!res.data) {
						uni.vibrateShort({
							success: () => {
								console.log('success');
							}
						});
					}  
				})
				.catch((err) => {
					console.log('错误回调', err);
				});
		},
		//AES加密
		aesEncrypt(encrypt) {
			//加密值
			var e = this.AES.encrypt(encrypt, '1234567891234567', '1234567891234567');
			// console.error("加密结果",e);
			return e;
		},
		//AES解密
		aesDecrypt(decrypt) {
			// console.error("解密值",decrypt);
			//解密值
			var d = this.AES.decrypt(decrypt, '1234567891234567', '1234567891234567');
			// console.error("解密结果",d);
			return d;
		}
	}
};
</script>

<style lang="scss">
/*每个页面公共css */
@import url('/style/style.css');
@import url('/style/style_rpx.css');
@import '/style/ty_style_scss.scss';
</style>
