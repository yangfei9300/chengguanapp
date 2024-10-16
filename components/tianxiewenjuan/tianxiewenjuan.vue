<template>
	<view>
		<view class="colonn">
			<view class="colonn tishiview">
				<view class="onetihs1 fs-32  font_size7_r">填写问卷</view>
				<view class="onetihs1 fs-25 font_size7_r m-top-10">请填写一下问卷信息</view>
			</view> 
			<view class="colonn center_center" style="margin-left: 0rpx;margin-top: 40rpx;"
			v-for="(item,index) in zhanhuiwenjuan"
			v-if="indexNow==index"
			>  
				<view class="roww w-650 fs-30 center_center">
					<view class="color2_r">*</view>
					<view class="w-590">{{index+1}}.{{item.content}}({{item.qType==1?'单选题':'多选题'}})</view>
					<view class="allline"></view>
				</view>
				<view class="colonn m-top-15" style="border-top: 1px solid #c9c9c9;">
					<view class="roww xuanzekuang " v-for="(item1,index1) in item.quesOption"
					@click.stop="xuansel(index,index1)"
					>
						<block v-if="item1.is">
							<image src="../../static/sel.png" class="w-40 h-40 m-right-15"></image>
						</block>
						<block v-if="!item1.is">
							<image src="../../static/nosel.png" class="w-40 h-40 m-right-15"></image>
						</block>
						<view class="w-550 lh-40">{{item1.txt}}</view>
						<view class="allline"></view>
					</view>
				</view>
				<view class="roww w-600 m-top-40 m-bottom-25 rowsa">
					<block v-if="indexNow==0" >
					   <view class="shangyibu"  style="background-color: #c9c9c9;" >上一步</view>
					</block>
					<block v-else >
					   <view class="shangyibu"   @click="indexNowClick(1)">上一步</view>
					</block>
					<block v-if="(zhanhuiwenjuan.length-1)!=indexNow" >
						<view class="xiayibux" @click="indexNowClick(2)">下一步</view>
					</block>
					<block v-else>
						
						<view class="xiayibux" 
						:style="{
							 'background-color': isall?'#009c8e':'#c9c9c9'   
						}"
						 @click="indexNowClick(2)">提交问卷</view>
					</block>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'tianxiewenjuan',
	data() {
		return {
			zhanhuiwenjuan:[],
			indexNow:-1,
			isall:false,
		};
	},
	beforeCreate() {
		console.log('实例初始化');
		
	},
	created() {
		console.log('实例创建完成');
		this.getWenjuan();
	},  
	beforeMount() {
		console.log('实例挂载前调用');
	},
	mounted() {
		console.log('挂载实例之后调用');
	},
	beforeUpdate() {
		console.log('数据更新时调用');
	},
	updated() {
		console.log('由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子');
	},
	beforeDestroy() {
		console.log('Vue实例销毁之前调用');
	},
	destroyed() {
		console.log('Vue销毁之后调用');
	},
	methods: {
		// toTijiaoJuanzi(){
		// 	this.$emit('toTijiaoJuanzi',this.zhanhuiwenjuan);
		// },
		xuansel(index,index1){
			var zhanhuiwenjuan=this.zhanhuiwenjuan;
				
					if(zhanhuiwenjuan[index].qType==1){
						for(var b=0;b<zhanhuiwenjuan[index].quesOption.length;b++){
							zhanhuiwenjuan[index].quesOption[b].is=false;
						}
						zhanhuiwenjuan[index].quesOption[index1].is=true;
						zhanhuiwenjuan[index].seltxt=[zhanhuiwenjuan[index].quesOption[index1].id];
					}else{
						zhanhuiwenjuan[index].quesOption[index1].is=!zhanhuiwenjuan[index].quesOption[index1].is;
						var txtsel=[];
						for(var c=0;c<zhanhuiwenjuan[index].quesOption.length;c++){
							if(zhanhuiwenjuan[index].quesOption[c].is){
								txtsel.push(zhanhuiwenjuan[index].quesOption[c].id);
							}
						}
						zhanhuiwenjuan[index].seltxt=txtsel;
					}
					
			this.zhanhuiwenjuan=zhanhuiwenjuan;
			this.$forceUpdate()
			this.isdatiAll();
		},
		indexNowClick(type){
			
			
			
			if(type==1){
				if(this.indexNow==0){
					this.$emit('xiayibu', 1);
					console.log("上一步")
				}else{
					this.indexNow=this.indexNow-1;
				}
			}else{
				
				var zhanhuiwenjuan=this.zhanhuiwenjuan;
				if((zhanhuiwenjuan.length-1)==this.indexNow){
					if(!this.isall){
						this.$tools.showToast("请先答完题目");
						return false;
					} 
					console.log("跳转到下面成功界面")
					this.$emit('toTijiaoJuanzi',{
						'zhanhuiwenjuan':zhanhuiwenjuan
					} );
				}else{
					this.indexNow=this.indexNow+1;
				}
			}
		},
		// 判断是否答题完成
		isdatiAll(){
			var zhanhuiwenjuan=this.zhanhuiwenjuan
			var ishave=true;
			for(var a=0;a<zhanhuiwenjuan.length;a++){
				console.log("是否选择了",zhanhuiwenjuan[a].seltxt)
				if(zhanhuiwenjuan[a].seltxt.length<=0){
					ishave=false;
				}
			}
			this.isall=ishave;
			return ishave;
		},
		xiayibu(type) {
			this.$emit('xiayibu', type);
		},
		getWenjuan() {
			var data = {
				exhId: "117"
			};
			this.$axios
				.axios('POST', 
				// this.$paths.miniappenrollques, 
				"https://frdzlfapi.zsyflive.com/api/visitor/ques", 
				data)
				.then(res => {
					if (res.code == 200) {
						console.log(res)
						var zhanhuiwenjuan = res.data;
						console.log("当前的问题",zhanhuiwenjuan,zhanhuiwenjuan.length)
						for(var a=0;a<zhanhuiwenjuan.length;a++){
							console.log("asd",zhanhuiwenjuan[a])
								zhanhuiwenjuan[a].quesOption=zhanhuiwenjuan[a].params.options;
								
								for(var b=0;b<zhanhuiwenjuan[a].quesOption.length;b++){
									zhanhuiwenjuan[a].quesOption[b].is=false;
									zhanhuiwenjuan[a].quesOption[b].txt=zhanhuiwenjuan[a].quesOption[b].content;
								}
								zhanhuiwenjuan[a].seltxt=[];
						}
						this.zhanhuiwenjuan=zhanhuiwenjuan;
						console.log("问题",this.zhanhuiwenjuan)
						if(this.zhanhuiwenjuan.length>0){
							this.indexNow=0;
						}
						console.log("zhanhuiwenjuan",zhanhuiwenjuan)
					} else {
						this.$tools.showToast(res.msg);
					}
				})
				.catch(err => {
					console.log(err)
				});
		}
	}
};
</script>

<style>
.tishiview {
	width: 700rpx;
	padding: 25rpx 25rpx;
	background-color: #c9c9c9;
	margin-left: 25rpx;
	margin-top: 40rpx;
}
.onetihs1 {
	color: #371b64;
}
.xuanzekuang {
	width: 650rpx;
	border-bottom: 1px solid #c9c9c9;
	border-left: 1px solid #c9c9c9;
	border-right: 1px solid #c9c9c9;
	padding: 20rpx 20rpx;
}
.shangyibu {
	background-color: #009c8e;
	width: 250rpx;
	height: 70rpx;
	text-align: center;
	line-height: 70rpx;
	border-radius: 10rpx;
	color: white;
	font-weight: bold;
	font-size: 30rpx;
}
.xiayibux {
	background-color: #009c8e;
	width: 250rpx;
	height: 70rpx;
	text-align: center;
	line-height: 70rpx;
	border-radius: 10rpx;
	color: white;
	font-weight: bold;
	font-size: 30rpx;
}
</style>
