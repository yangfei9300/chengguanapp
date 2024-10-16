export default {
	//检测是否开启系统定位权限
	hasLocationPermission() {
		let system = uni.getSystemInfoSync();
		if (system.platform === 'android') { //安卓
			let context = plus.android.importClass("android.content.Context");
			let locationManager = plus.android.importClass("android.location.LocationManager");
			let main = plus.android.runtimeMainActivity();
			let service = main.getSystemService(context.LOCATION_SERVICE);
			//已开启系统定位服务功能
			if (service.isProviderEnabled(locationManager.GPS_PROVIDER)) return true;
			else { //未开启引导开启
				uni.showModal({
					title: '友情提示',
					content: '请开启位置服务功能',
					success: e => {
						if (e.confirm) {
							//打开手机系统gps定位设置页面
							let Intent = plus.android.importClass('android.content.Intent');
							let Settings = plus.android.importClass('android.provider.Settings');
							let intent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS);
							main.startActivity(intent);
						}
					}
				})

			}
		} else if (system.platform === 'ios') { //ios
			let cllocationManger = plus.ios.import("CLLocationManager");
			let enable = cllocationManger.locationServicesEnabled();
			let status = cllocationManger.authorizationStatus();
			plus.ios.deleteObject(cllocationManger);
			if (enable && status != 2) return true; //已开启定位功能
			else {
				uni.showModal({
					title: '友情提示',
					content: '请前往设置-定位服务打开定位服务功能',
					success: e => {
						if (e.confirm) {
							let UIApplication = plus.ios.import("UIApplication");
							let application = UIApplication.sharedApplication();
							let NSURL = plus.ios.import("NSURL");
							let setting = NSURL.URLWithString("app-settings:");
							application.openURL(setting);
							plus.ios.deleteObject(setting);
							plus.ios.deleteObject(NSURL);
							plus.ios.deleteObject(application);
						}
					}
				});
			}
		}
		return false;
	},
	/**开启后台持续获取定位功能
	 * successCallBack:成功回调函数
	 *failCallBack:失败回调函数 
	 *maximumAge：获取定位间隔时间
	 */
	startLocationService( successCallBack=()=>{},failCallBack=()=>{},maximumAge=60*1000) {
		if (this.hasLocationPermission()) { //有定位权限
			let locationWatcherId = plus.geolocation.watchPosition((position) => {
				successCallBack({
					locationWatcherId,
					position:position.coords
				})
			}, function(e) {
				console.log(e, '定位失败');
				failCallBack(e)
			}, {
				maximumAge, //获取位置间隔时间，在不同定位模块下支持范围值可能不同，如百度定位模块的间隔范围为大于等于1秒，如果设置的值小于最小值则使用最小值。iOS平台根据设备位置变化自动计算回调更新的间隔时间。
				// provider: 'amap', //优先使用定位模块，“system”：表示系统定位模块，支持wgs84坐标系； “baidu”：表示百度定位模块，支持gcj02/bd09/bd09ll坐标系； “amap”：表示高德定位模板，支持gcj02坐标系，默认值按以下优先顺序获取（amap>baidu>system）
				// timeout: 10000, //定位超时
				enableHighAccuracy: true,//高精确度获取位置信息
				//coordsType:"gcj02",//坐标系类型, “wgs84”：表示WGS-84坐标系； “gcj02”：表示国测局经纬度坐标系,"bd09":百度地图使用的坐标系
				//geocode:false//是否解析地址
			});

		}


	},
	//关闭定位功能
	closeLocationService(locationWatcherId) {//locationWatcherId:开启步骤生成的监听器id
		plus.geolocation.clearWatch(locationWatcherId)
	},
}

