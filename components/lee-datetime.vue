<template>
	<view class="lee-datetime-main">
		<picker mode="multiSelector" 
		:disabled="disabled" @change="bindChange" 
		@columnchange="bindColumnchange"
			:value="indexPic" 
			:range="originData" range-key="text">
			<view class="lee-datetime-text">{{datetimeStr}}</view>
		</picker>
	</view>
</template>

<script>
	export default {
		name: "lee-datetime", // 时间选择器 年月日时分秒
		props: {
			// 传入时间值 ， 注意时间格式必须为YYYY-MM-DD hh:mm-ss 或者 YYYY-MM-DD
			// 传入时间值 ， 注意时间格式必须为YYYY-MM-DD hh:mm-ss 或者 YYYY-MM-DD
			// 传入时间值 ， 注意时间格式必须为YYYY-MM-DD hh:mm-ss 或者 YYYY-MM-DD
			value: {
				type: String,
				default: ""
			},
			// 是否禁用
			disabled: {
				type: Boolean,
				default: false
			},
			placeholder: {
				type: String,
				default: "请选择日期"
			}
		},

		watch: {
			value(newVal, oldVal) {
				this.setPropValue(newVal)
			}
		},
		data() {
			return {
				originData: [
					[],
					[],
					[],
					[],
					[],
					[]
				],
				indexPic: [0, 0, 0, 0, 0, 0],
				datetimeStr: "",
			}
		},
		mounted() {
			console.log("进入时间组件-mounted", this.value)
			this.datetimeStr = this.value && this.value != "" ? this.value : this.placeholder
			this.initData()
		},
		methods: {
			bindChange(event) {
				// 组件返回值
				let returnV = {
					text: "",
					value: ""
				}
				let returnVIndex = event.target.value
				let yyyy = this.originData[0][returnVIndex[0]]
				let mmmm = this.originData[1][returnVIndex[1]]
				let dddd = this.originData[2][returnVIndex[2]]
				let hh = this.originData[3][returnVIndex[3]]
				let mm = this.originData[4][returnVIndex[4]]
				let ss = this.originData[5][returnVIndex[5]]
				// 参数重组
				returnV.text = yyyy.text + mmmm.text + dddd.text + " " + hh.text + mm.text + ss.text
				returnV.value = yyyy.value + "-" + mmmm.value + "-" + dddd.value + " " + hh.value + ":" + mm.value + ":" +
					ss.value
				// 组件返回时间与参数值
				this.$emit("change", returnV)
			},
			bindColumnchange(event) {
				console.log('修改的列为', event.detail.column, '，值为', event.detail.value, this.indexPic, this.originData);
				this.indexPic[event.detail.column] = event.detail.value // 记录变动列下标值

				if (event.detail.column === 1) {
					let dd = this.getDateNum(this.originData[0][this.indexPic[0]].value, this.originData[event.detail
						.column][event.detail
						.value
					].value)
					let ddArr = []
					// 更新选中月天数日期
					for (let i = 1; i <= dd; i++) {
						ddArr.push({
							value: i < 10 ? '0' + i : i,
							text: i < 10 ? '0' + i + "月" : i + "月"
						})
					}
					this.originData[event.detail.column + 1] = ddArr // 更新选中月的天数日期
					// this.indexPic[event.detail.column + 1] = 0 // 更新选中月的天数日期下标
					this.originData = [...this.originData]
				}
			},
			// 更新prop传入值
			setPropValue(value) {
				let valueDate = new Date();
				if (value != "") {
					let str = value;
					// let str = "2020-02-02 02:02:02"; // test
					str = str.replace(/-/g, "/");
					console.log(str)
					valueDate = new Date(str);
				}
				// 获取传入值年月日时分秒后，为组件设置默认下标回显
				let yy = valueDate.getFullYear()
				let mm = valueDate.getMonth() + 1
				let dd = valueDate.getDate()
				let hh = valueDate.getHours()
				let mi = valueDate.getMinutes()
				let ss = valueDate.getSeconds()
				// console.log("组件传入值", yy, mm,
				// 	dd,
				// 	hh,
				// 	mi,
				// 	ss)
				this.originData.forEach((item, index) => {
					switch (index) {
						case 0:
							for (let i = 0; i < item.length; i++) {
								if (Number(item[i].value) === yy) {
									this.indexPic[0] = i
									break;
								}
							}
							break;
						case 1:
							for (let i = 0; i < item.length; i++) {
								if (Number(item[i].value) === mm) {
									this.indexPic[1] = i
									break;
								}
							}
							break;
						case 2:
							for (let i = 0; i < item.length; i++) {
								if (Number(item[i].value) === dd) {
									this.indexPic[2] = i
									break;
								}
							}
							break;
						case 3:

							for (let i = 0; i < item.length; i++) {
								if (Number(item[i].value) === hh) {
									this.indexPic[3] = i
									break;
								}
							}
							break;
						case 4:

							for (let i = 0; i < item.length; i++) {
								if (Number(item[i].value) === mi) {
									this.indexPic[4] = i
									break;
								}
							}
							break;
						case 5:

							for (let i = 0; i < item.length; i++) {
								if (Number(item[i].value) === ss) {
									this.indexPic[5] = i
									break;
								}
							}
							break;
					}
				})
				// 更新页面数组渲染
				this.indexPic = [...this.indexPic]
				this.datetimeStr = value && value != "" ? value : this.placeholder // 同步更新页面回显
				
			},
			// 数据初始化
			initData() {
				let year = [],
					month = [],
					date = [],
					hours = [],
					minutes = [],
					seconds = [],
					YY = 5, // 组件定义年限范围
					MM = 12,
					DD = this.getDateNum("", 1),
					hh = 23,
					mm = 60,
					ss = 60

				// 年数组
				let nowYY = new Date().getFullYear()

				for (let iyy = nowYY - YY; iyy <= nowYY + YY; iyy++) {
					year.push({
						value: iyy,
						text: iyy + "年"
					})
				}
				for (let imm = 1; imm <= MM; imm++) {
					month.push({
						value: imm < 10 ? '0' + imm : imm,
						text: imm < 10 ? '0' + imm + "月" : imm + "月"
					})
				}
				for (let idd = 1; idd <= DD; idd++) {
					date.push({
						value: idd < 10 ? '0' + idd : idd,
						text: idd < 10 ? '0' + idd + "日" : idd + "日"
					})
				}
				for (let ih = 0; ih <= hh; ih++) {
					hours.push({
						value: ih < 10 ? '0' + ih : ih,
						text: ih < 10 ? '0' + ih + "时" : ih + "时"
					})
				}
				for (let im = 0; im < mm; im++) {
					minutes.push({
						value: im < 10 ? '0' + im : im,
						text: im < 10 ? '0' + im + "分" : im + "分"
					})
					seconds.push({
						value: im < 10 ? '0' + im : im,
						text: im < 10 ? '0' + im + "秒" : im + "秒"
					})
				}

				this.originData[0] = year
				this.originData[1] = month
				this.originData[2] = date
				this.originData[3] = hours
				this.originData[4] = minutes
				this.originData[5] = seconds
				this.originData = [...this.originData]
				// console.log("查看源数组", this.originData)
				this.setPropValue(this.value)
			},
			// 获取当前月天数
			getDateNum(year, month) {
				if (!year) {
					year = new Date().getFullYear()
				}
				if (!month) {
					month = new Date().getMonth() + 1
				}
				// console.log(year + "年-" + (month) + "月")

				let d = new Date(year, month, 0);
				let result = d.getDate();
				return result
			}
		}
	}
</script>

<style scoped>
	.lee-datetime-main {
		min-width: 200rpx;
		min-height: 50rpx;
	}

	.lee-datetime-text {
		/* color: #888A88; */
		/* padding: 10rpx; */
	}
</style>
