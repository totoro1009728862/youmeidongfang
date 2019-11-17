<template>
    <van-popup v-model="calendarSwitch" position="right">
        <hx-header title="选择出行日期">
            <div slot="left" class="back-icon" @click="closeCalendar">
                <i class="hx-icon hx-icon-fanhui"></i>
            </div>
        </hx-header>
        <div class="calendar-warp">
            <!-- 周 -->
            <div class="week-warp-body">
                <ul class="week-warp">
                    <li>日</li>
                    <li>一</li>
                    <li>二</li>
                    <li>三</li>
                    <li>四</li>
                    <li>五</li>
                    <li>六</li>
                </ul>
            </div>
            <div class="calendar">
                <div v-for="(item, index) in calendarList" :key="index" class="calendar-item">
                    <div class="calendar-header">
                        <span>{{ item.y }}年{{ item.m }}月</span>
                    </div>
                    <div class="calendar-body">
                        <ul class="days-wrap">
                            <li v-for="(dayInfo, dayIndex) in item.dayInfo" :key="dayIndex" class="days-item" :class="dayInfo.week">
                                <div :class="{ actived: selectDate === dayInfo.date }" @click="select(dayInfo)">
                                    <span :class="{ disabled: !dayInfo.value }">{{ isToday(dayInfo.date) ? '今天' : dayIndex + 1 }}</span>
                                    <span v-if="dayInfo.value" class="options">￥{{ dayInfo.value }}</span>
                                </div>
                            </li>
                        </ul>
                        <div class="month-bg">{{ item.m }}</div>
                    </div>
                </div>
            </div>
        </div>
    </van-popup>
</template>
<script>
export default {
    name: 'PriceCalendar',
    model: {
        prop: 'selectDate',
        event: 'select'
    },
    props: {
        // 当前日期
        selectDate: {
            type: String,
            default: ''
        },
        // 是否展示日历
        calendarSwitch: {
            type: Boolean,
            default: false
        },
        // 后台返回的价格日历
        dateList: {
            type: Array,
            default() {
                return []
            }
        }
    },
    data() {
        return {
            today: ''
        }
    },
    computed: {
        calendarList() {
            const list = [...this.dateList]
            let arr = [] // 需求的日历数据结构[{y:2019,month:09,days:30,dateInfo{date:2019-9-30,value:377,status:1}}]
            if (!list.length) return []
            let listIndexArr = [] // 映射list下标的作用
            list.forEach(item => {
                listIndexArr.push(item.date)
            })
            const start = list[0].date
            const end = list[list.length - 1].date
            arr = this.setDateMonth(start, end) // 目前获取到结构[{y:2019,m:9,days:30}]
            for (let i in arr) {
                arr[i].dayInfo = []
                for (let j = 1; j <= arr[i].days; j++) {
                    const month = arr[i].m < 10 ? '0' + arr[i].m : arr[i].m
                    const date = `${arr[i].y}-${month}-${j < 10 ? '0' + j : j}`
                    // 如果该日期有值，则塞入
                    if (listIndexArr.indexOf(date) > -1) {
                        if (j === 1) {
                            const week = '0123456'.charAt(new Date(date.replace(/-/g, '/')).getDay())
                            arr[i].dayInfo.push({
                                ...list[listIndexArr.indexOf(date)],
                                week: 'week' + week
                            })
                        } else {
                            arr[i].dayInfo.push(list[listIndexArr.indexOf(date)])
                        }
                    } else {
                        if (j === 1) {
                            const week = '0123456'.charAt(new Date(date.replace(/-/g, '/')).getDay())
                            arr[i].dayInfo.push({ date, week: 'week' + week })
                        } else {
                            arr[i].dayInfo.push({ date })
                        }
                    }
                }
            }
            return arr
        }
    },
    created() {
        this.today = new Date()
    },
    methods: {
        // 返回关闭日历
        closeCalendar() {
            this.$emit('setCalendarSwitch', false)
        },
        select(v) {
            if (v.value) {
                this.$emit('select', v.date)
                this.closeCalendar()
            }
        },
        //计算日期之间的年月日{y:2019,m:9,days:30}
        setDateMonth(start, end) {
            let result = []
            let s = start.split('-')
            let e = end.split('-')
            let min = new Date()
            let max = new Date()
            min.setFullYear(s[0], s[1] * 1 - 1, 1) //开始日期
            max.setFullYear(e[0], e[1] * 1 - 1, 1) //结束日期
            let curr = min

            while (curr <= max) {
                let y = curr.getFullYear()
                let m = curr.getMonth() + 1
                let days = this.getDaysByMonth(y, m)
                result.push({ y, m, days })
                curr.setMonth(m)
            }
            return result
        },
        // 枚举每个月的天数
        getDaysByMonth(year, month) {
            let days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
            if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
                days[1] = 29
            }
            return days[month - 1]
        },
        // 获取年
        getYear(v) {
            return new Date(v.replace(/-/g, '/')).getFullYear()
        },
        // 获取月
        getMonth(v) {
            return new Date(v.replace(/-/g, '/')).getMonth() + 1
        },
        // 获取日
        getDate(v) {
            return new Date(v.replace(/-/g, '/')).getDate()
        },
        // 判断是否是当天
        isToday(day) {
            let d = new Date(day)
            return d.getFullYear() == new Date().getFullYear() && d.getMonth() == new Date().getMonth() && d.getDate() == new Date().getDate() ? true : false
        }
    }
}
</script>
<style lang="less" scoped>
.back-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
}
.today {
    height: 100px;
    color: #ffffff;
    background: #00b900;

    .options {
        color: #ffffff !important;
    }
}

.calendar {
    background-color: #fff;
    width: 100%;
    height: calc(100vh - 180px);
    overflow-y: auto;
    background-color: #fff;
    -webkit-overflow-scrolling: touch;
    .calendar-item {
        position: relative;
        margin-top: 20px;
        box-sizing: border-box;
        overflow: hidden;
        border-radius: 10px;
        &:last-child {
            padding-bottom: 120px;
        }
        .calendar-header {
            text-align: center;
            font-size: 34px;
            color: #333;
            font-weight: bold;
            height: 120px;
            line-height: 120px;
            background-color: #fff;
        }

        .calendar-body {
            position: relative;
            .month-bg {
                position: absolute;
                top: 0;
                left: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
                color: #00b900;
                font-size: 300px;
                z-index: 1;
                opacity: 0.1;
            }
            .days-wrap {
                position: relative;
                display: flex;
                flex-flow: row wrap;
                justify-content: flex-start;
                z-index: 9;
                .days-item {
                    text-align: center;
                    height: 100px;
                    margin-bottom: 20px;
                    vertical-align: middle;
                    border: none;
                    font-weight: medium;
                    color: #222222;
                    width: 14.28%;
                    position: relative;

                    div {
                        display: flex;
                        flex-flow: column nowrap;
                        justify-content: center;
                        align-items: center;
                        height: 100px;
                        border-radius: 5px;

                        span {
                            display: block;
                            font-size: 28px;
                            height: 30px;
                            line-height: 30px;
                            color: #444;
                        }
                        .disabled {
                            color: #cccccc;
                        }
                        .options {
                            font-size: 18px;
                            color: #ff6138;
                        }
                    }
                    .actived {
                        background: #00b900;
                        > span {
                            color: #fff;
                        }
                    }
                }
            }
        }
    }
}

.calendar-warp {
    width: 100%;
    .week-warp-body {
        height: 80px;
        width: 100%;
        background: #f5f5f5;
        .week-warp {
            display: flex;
            align-items: center;
            width: 100%;
            background: #f5f5f5;
            box-sizing: border-box;
            justify-content: space-around;
            height: 80px;
            padding: 0 20;
            position: fixed;
            top: 100px;
            left: 0;

            li {
                text-align: center;
                vertical-align: middle;
                font-size: 28px;
                font-weight: medium;
                &:first-child,
                &:last-child {
                    color: #30c776;
                }
            }
        }
    }
}
.week1 {
    margin-left: 14.28%;
}
.week2 {
    margin-left: 28.56%;
}
.week3 {
    margin-left: 42.84%;
}
.week4 {
    margin-left: 57.12%;
}
.week5 {
    margin-left: 71.4%;
}
.week6 {
    margin-left: 85.68%;
}
</style>
