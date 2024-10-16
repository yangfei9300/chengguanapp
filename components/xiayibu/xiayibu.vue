<template>
	<view>
		<view class="roww w-650  m-left-50 rowsa center_center">
			<view class="colonn center_center">
				<view
				:class="{
					'yuansel':xiabiao>=0,
					'yuanselno':xiabiao<0,
				}"
				>
					1
				</view>
				<view class="fs-25 m-top-15"
				:class="{
					'color1ses':xiabiao>=0,
				}"
				>个人信息</view>
			</view>
			
			
			<view class="xiansel"></view>
			
			
			<view class="colonn center_center">
			<view
			:class="{
				'yuansel':xiabiao>=1,
				'yuanselno':xiabiao<1,
			}"
			>
				2
			</view>
			<view class="fs-25 m-top-15"
				:class="{
					'color1ses':xiabiao>=1,
				}">填写问卷</view>
			</view>
			
			<view class="xiansel"></view>
			<view class="colonn center_center">
			<view
			:class="{
				'yuansel':xiabiao>=2,
				'yuanselno':xiabiao<2,
			}"
			>  
				3
			</view>  
			<view class="fs-25 m-top-15"
				:class="{
					'color1ses':xiabiao>=2,
				}">报名成功</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"xiayibu",
		props: {
			xiabiao:{
				type: Number,
				value:0
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style>
.yuansel{
	width: 50rpx;
	height: 50rpx;
	text-align: center;
	line-height: 50rpx;
	background-color:  #371B64;
	color: white;
	font-size: 30rpx;
	border-radius: 50%;
}
.yuanselno{
	width: 50rpx;
	height: 50rpx;
	text-align: center;
	line-height: 50rpx;
	background-color:  #f0e8e8;
	color: #999999;
	font-size: 30rpx;
	border-radius: 50%;
}
.xiansel{
	width: 150rpx;
	height: 1px;
	background-color: #371B64;
}
.color1ses{
	color: #371B64;
}
</style>