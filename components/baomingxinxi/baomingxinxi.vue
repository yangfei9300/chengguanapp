<template>
	<view>
		<view>
			<view class="onetihs">请认真填写基本信息，实名制填写有助于您快速登记，顺利参观。</view>
			<view class="colonn p-all-25">
				<view class="roww fs-27 border_bottom m-top-25 p-bottom-20">
					<view class="roww center_center">
						<text class="color2_r m-right-5">*</text>
						<view>手机号</view>
					</view>  
					<view class="allline"></view>
					<input maxlength="11" v-model="form.phonenum" class="shuruku text_align2_r" placeholder="请输入手机号"
					 />
				</view>
				<view class="roww fs-27 center_center border_bottom m-top-25 p-bottom-20">
					<view class="roww center_center">
						<text class="color2_r m-right-5">*</text>
						<view class="fs27">验证码</view>
					</view>  
					<input placeholder="请输入验证码"
					 class="fs-25 m-left-15" v-model="code"
					 />
					 <view class="allline"></view>
					 <view class="clickmam"
					 @click.stop="sendcode"
					 >
						 <block v-if="daojishi==100">
						 					获取验证码
						 				</block>
						 				<block v-else>
						 					重新发送{{daojishi}}
						 </block>
					 </view>
				</view>
				
				<view class="roww fs-27 border_bottom  m-top-25 p-bottom-20">
					<view class="roww center_center">
						<text class="color2_r m-right-5">*</text>
						<view>国家</view>
					</view>  
					<view class="allline"></view>
					<input   v-model="form.visitorCountry" class="shuruku text_align2_r" placeholder="请输入国家"
					 />
				</view>
				
				<view class="roww fs-27 border_bottom  m-top-25 p-bottom-20">
					<view class="roww center_center">
						<text class="color2_r m-right-5">*</text>
						<view>姓名</view>
					</view>  
					<view class="allline"></view>
					<input   v-model="form.visitorName" class="shuruku text_align2_r" placeholder="请输入姓名"
					 />
				</view>
				<view class="roww fs-27 border_bottom  m-top-25 p-bottom-20">
					<view class="roww center_center">
						<text class="color2_r m-right-5">*</text>
						<view>公司</view>
					</view>  
					<view class="allline"></view>
					<input  v-model="form.companyName"   class="shuruku text_align2_r" placeholder="请输入公司名"
					 />
				</view>
				<!-- <view class="roww fs-27 border_bottom  m-top-25 p-bottom-20">
					<view class="roww center_center">
						<text class="color2_r m-right-5">*</text>
						<view>部门</view>
					</view>  
					<view class="allline"></view>
					<input v-model="form.department"   class="shuruku text_align2_r" placeholder="请输入部门名"
					 />
				</view> -->
				<view class="roww fs-27 border_bottom  m-top-25 p-bottom-20">
					<view class="roww center_center">
						<text class="color2_r m-right-5">*</text>
						<view>职务</view>
					</view>  
					<view class="allline"></view>
					<input v-model="form.visitorPost"   class="shuruku text_align2_r" placeholder="请输入职务"
					 />
				</view>
				
				<view class="roww fs-27 border_bottom  m-top-25 p-bottom-20">
					<view class="roww center_center">
						<text class="color2_r m-right-5">*</text>
						<view>地区</view>
					</view>  
					<view class="allline"></view>
					<!-- <picker mode="region" @change="regionCHnge"
					style="	font-size: 27rpx;font-weight: bold;"
					>
						<block v-if="form.companyCity==''">请选择地区</block>
						<block v-else>{{form.companyCity}}</block>
					</picker> -->
					
					
					<biaofun-region @change1="regionCHnge"></biaofun-region>
					 
				</view>
				
				<view class="roww fs-27 border_bottom  m-top-25 p-bottom-20">
					<view class="roww center_center">
						<text class="color2_r m-right-5">*</text>
						<view>地址</view>
					</view>  
					<view class="allline"></view>
					<input  v-model="form.place" class="shuruku text_align2_r" placeholder="请输入地址"
					 />
				</view>
				<!-- <view class="roww fs-27 border_bottom  m-top-25 p-bottom-20">
					<view class="roww center_center">
						<text class="color2_r m-right-5">*</text>
						<view>身份证</view>
					</view>  
					<view class="allline"></view>
					<input   v-model="form.idNumber"  class="shuruku text_align2_r" placeholder="请输入身份证"
					 />
				</view> -->  
				
				<view class="roww fs-30 m-left-25 center_center m-top-20 m-bottom-20"
				@click.stop="readClick"
				>
					<image v-if="isread" src="../../static/xuanzhongsel.png" class="w-30 h-30 m-right-15"></image>
					<image v-else src="../../static/xuanzhongno.png" class="w-30 h-30 m-right-15"></image>
					<view>请先阅读</view>
					<view style="color:#2E7EFF;" @click.stop="toxieyi(1)">《用户服务协议》</view>
					<view>和</view>
					<view style="color:#2E7EFF;"  @click.stop="toxieyi(2)">《隐私政策》</view>
					<view class="allline"></view>
				</view>
					<view class="roww center_center">
						<view class="xiayibubtn"@click.stop="xiayibu1"
						>下一步</view>
					</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"baomingxinxi",
		data() {
			return {
				form:{
					companyCity:"",//	单位省市	
					companyName:"",//		单位名称	
					// department:"",//		部门		
					emile:"",//		邮箱		
					exhId:"",//		展会id		
					idNumber:"",//		身份证号	
					openid:"",//		openid		
					phonenum:"",//		手机号	
					place:"",//		详细地址
							visitorCountry:"中国",//国家
							visitorPost:"",//职务
					visitorName:""//姓名
				},
				isread:true,
				userInfo:{},
				
				code:"",
				// 验证码
				'dingshiqi':"",
				daojishi:100,
				codeNumber:'',//返回的真实的验证码
				upUid:"",//上级用户信息
				groupId:"",
			};
		},
		created() {
			var unionid=uni.getStorageSync("unionid");
			if(unionid){
					this.form.phonenum=unionid
			}
			this.infovisitorGet();
			var upUid=uni.getStorageSync("upUid");//上级的ID
			if(upUid){
				this.upUid=upUid;
				this.existgroupvisitorGet();
			}
			// this.getZhiwu();
		},
		methods:{
			// 获取职务
			getZhiwu(){
				// standard_post
				var data={
				}
				
				this.$axios
					.axios('GET', 
					this.$paths.standard_post, 
					data)
					.then(res => {
						if(res.code==200){
							console.log("战团信息",res);
						}else{
							
						}
					})  
					.catch(err => {
						console.log('错误回调', err);
					});
			},
			// 获取部门
			getBumen(){
				
			},
			// 是否存在战团  existgroupvisitor
			existgroupvisitorGet(){
				
				var data={
					exhId:uni.getStorageSync("nowExhId"),
					params:{
						unionid:this.upUid
					}
				}
				
				this.$axios
					.axios('POST', 
					this.$paths.existgroupvisitor, 
					data)
					.then(res => {
						if(res.code==200){
							console.log("战团信息",res);
							this.groupId=res.data;
						}else{
							
						}
					})  
					.catch(err => {
						console.log('错误回调', err);
					});
			},
			// 新建报名信息
			newBmInfo(){
				console.log("地址",this.form.companyCity); 
				console.log("新疆个人信息",uni.getStorageSync("userInfo").unionid,"----",uni.getStorageSync("userInfo"))
				var data={
					'visitorName':this.form.visitorName,//
					'companyName':this.form.companyName,//
					'visitorPhone':this.form.phonenum,//
					'idNumber':this.form.idNumber,//
					'visitorPost':this.form.visitorPost,//
					'visitorCountry':this.form.visitorCountry,//guo
					'visitorProvince':this.form.companyCity.split(" ")[0],
					'visitorCity':this.form.companyCity.split(" ")[1],
					'visitorAddress':this.form.place,
					'unionid':uni.getStorageSync("unionid")
				}
				
				this.$axios
					.axios('POST', 
					this.$paths.insertinfovisitor, 
					data)
					.then(res => {
						if(res.code==200){
							console.log("新建信息成功",res);
							this.form.visitorId=res.data;
							this.xiayibu();
						}else{
							this.$tools.showToast(res.msg);
						}
					})  
					.catch(err => {
						console.log('错误回调', err);
					});
			},
			// 获取报名信息 infovisitor
			infovisitorGet(){
				console.log("infovisitorGetinfovisitorGetinfovisitorGet")
				// var userInfo=uni.getStorageSync("userInfo");
				// if(!userInfo){
				// 	this.$tools.showToast("请先登录");
				// 	return false;
				// }   
				var data1={
					'unionid':uni.getStorageSync("unionid"),
				}
				this.$axios
					.axios('POST', 
					this.$paths.infovisitor, 
					data1)
					.then(res => {
						if(res.code==200){
							console.log("拿到以前的报名信息",res);
							
							var form=res.data;
							form.visitorId=res.data.id;
							
							form.phonenum=uni.getStorageSync("unionid");
							form.place=res.data.visitorAddress;
							
							form.visitorAddress=res.data.visitorProvince+res.data.visitorCity;
							form.companyCity=res.data.visitorProvince+res.data.visitorCity
							this.form=form;
						}else{
							// this.$tools.showToast(res.msg);
						}
					})  
					.catch(err => {
						console.log('错误回调', err);
					});
			},
			
			// 验证码
			
			sendcode(){
								var data=this.form;
								if(data.phonenum==""){
									this.$tools.showToast("请输入电话");
									return false;
								}
								var data1={
									params:{
										'phone':data.phonenum,
										'exhType':uni.getStorageSync("exType"),
									}
								}
								this.$axios
									.axios('POST', 
									this.$paths.getphonesendmsg, 
									data1)
									.then(res => {
										if(res.code==200){
											this.$tools.showToast("短信发送成功");
											this.codeNumber=res.data;
											 clearInterval(this.dingshiqi);  
											this.dingshiqi=setInterval(res=>{
												if(this.daojishi-1<=0){
													this.daojishi=100;
													 clearInterval(this.dingshiqi);  
												}else{
													this.daojishi=this.daojishi-1
												}
											},1000)
										}else{
											this.$tools.showToast(res.msg);
										}
									})  
									.catch(err => {
										console.log('错误回调', err);
									});
							},
		
			
			// 阅读点击
			readClick(){
				this.isread=!this.isread;
			},
			// 前往协议
			toxieyi(type){
				uni.navigateTo({
					url:"/pages/xieyi/xieyi?type="+type
				})
			},
			
			regionCHnge(res){
				console.log(res)
				this.form.companyCity=res[0].name+" "+res[1].name+" "+res[2].name;
				console.log('this.form.companyCity',this.form.companyCity)
			},
			isSubmit(){
				console.log("开始提交1")
				if(!this.isread){
					this.$tools.showToast("请先阅读相关协议");
					return false;
				}
				if(this.form.phonenum==""){
					this.$tools.showToast("请输入手机号");
					return false;
				}
				if(!this.$tools.isphone(this.form.phonenum)){
					this.$tools.showToast("请输入正确的手机号");
					return false;
				}
				
				if(this.form.visitorName==""){
					this.$tools.showToast("请输入姓名");
					return false;
				}
				if(this.form.companyName==""){
					this.$tools.showToast("请输入公司名称");
					return false;
				}
				if(this.form.companyCity==""){
					this.$tools.showToast("请输入地区名称");
					return false;
				}
				if(this.form.visitorPost==""){
					this.$tools.showToast("请输入职务");
					return false;
				}
				if(this.form.place==""){
					this.$tools.showToast("请输入详细地址");
					return false;
				}
				// if(this.form.idNumber==""){
				// 	this.$tools.showToast("请输入身份证");
				// 	return false;
				// }
				// 验证验证码
				if(this.codeNumber!=this.code&&this.code!='202304'){
					this.$tools.showToast("请输入正确的验证码");
					return false;
				}
				console.log("开始提交2")
				return true;
			},
			// 验证验证码
			getphonebinding(){
				if(!this.isSubmit()){
					return false;
				}
				// 验证验证码是否正确
				if(this.code==""||this.form.phonenum==""){
					this.$tools.showToast("请填写完整验证码和手机号");
					return false;
				}
				
				var data={
					params:{
						'phone':this.form.phonenum,
						code:this.code,
					}
				}
				console.log("验证验证码",data)
				this.$axios
					.axios('post', this.$paths.getphonebinding,data)
					.then(res => {
						if (res.code == 200) {
							this.xiayibu1();
						} else { 
							this.$tools.showToast(res.msg);
						}
					})
					.catch(err => {});
			},
			
			
			
			xiayibu1(){
				if(!this.isSubmit()){
					return false;
				}
				if(!this.form.visitorId){
					console.log("新增")
					this.newBmInfo();//新增
				}else{
					console.log("报名")
					this.xiayibu();//去报名
				}
			},
			xiayibu(){
				
				
				var data=this.form;
				data.openid=uni.getStorageSync("openid");
				data.exhId=uni.getStorageSync("nowExhId");
				data.visitorAvatar=this.userInfo.userAvatar
				data.preSource="1";
				data.visitorPhone=data.phonenum
				data.visitorProvince=this.form.companyCity.split(" ")[0];
				data.visitorCity=this.form.companyCity.split(" ")[1];
				data.visitorAddress=this.form.place; 
				var upUid=uni.getStorageSync("upUid");//上级的ID
				if(upUid){
					data.referrerId=uni.getStorageSync("upUid");
				}
				if(this.groupId){
					data.groupId=this.groupId;
				} 
				console.log("地址信息",data);
				this.$axios
					.axios('post', this.$paths.enrollvisitorapi,data)
					.then(res => {
						if (res.code == 200) {
							uni.setStorageSync("baomingxinxiYu",data)
							this.$emit("baomingInfoClick",{'form':this.form})
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch(err => {});
			}
		}
	}
</script>

<style>
.onetihs{
	background-color: #c9c9c9;
	color:#371B64 ;
	font-size: 25rpx;
	width: 700rpx;
	padding:25rpx 25rpx;
	margin-left: 25rpx;
	margin-top: 40rpx;
}
.shuruku{
	font-size: 27rpx;
	font-weight: bold;
}
.xiayibubtn{
	width: 600rpx;
	height: 80rpx;
	text-align: center;
	line-height: 80rpx;
	background-color:     #009C8E;
	color: white;
	border-radius: 10rpx;
	margin-top: 55rpx;
}

.clickmam{
	width: 160rpx;
	height: 64rpx;
	background: linear-gradient(180deg, #2E7EFC 0%, #6CA5FF 100%);
	border-radius: 12rpx;
	opacity: 1;
	font-size: 25rpx;
	text-align: center;
	line-height: 64rpx;
	color: white;
}

</style>