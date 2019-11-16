<template>
    <div class="hx-calendar">
        <div v-for="(item, index) in monthArr" :key="index" class="hx-month">
            <div class="hx-month-title">{{ formatTitle(item) }}</div>
            <hx-month :date="item" :datas="datas"></hx-month>
        </div>
    </div>
</template>

<script>
import hxMonth from './month/index.vue'
import { parseTime, parseDate } from './util.js'
export default {
    components: {
        hxMonth
    },
    props: {
        //显示月数
        months: {
            type: Number,
            default: 1
        },
        //月份标题格式
        titleFormat: {
            type: String,
            default: 'yyyy-MM'
        },
        //选中的日期
        currentDate: {
            type: [String, Date],
            default: () => new Date()
        },
        //数据
        datas: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            crtDate: '',
            monthArr: []
        }
    },
    watch: {
        currentDate(newVal) {
            let crtDate = parseTime(newVal, {}, false)
            this.crtDate = crtDate
        }
    },
    mounted() {
        let crtDate = parseTime(this.currentDate, {}, false)
        let _num = this.months,
            _months = [],
            _crtDate = parseDate(crtDate)
        _crtDate = parseTime(new Date(_crtDate.getFullYear(), _crtDate.getMonth(), 1))
        _num = _num && _num > 0 ? _num : 1
        for (let i = 0; i < _num; i++) {
            _months.push(_crtDate)
            _crtDate = parseTime(
                _crtDate,
                {
                    months: 1
                },
                false
            )
        }
        this.monthArr = _months
    },
    methods: {
        formatTitle(date) {
            let _date = parseDate(date)

            let year = _date.getFullYear(),
                month = _date.getMonth()
            //debugger;
            let format = this.titleFormat
            return format.replace(/y{4}/g, year).replace(/M{2}/g, month < 9 ? '0' + (month + 1) : month + 1)
        }
    }
}
</script>

<style lang="less" scoped>
.hx- {
    &calendar {
        background-color: #fff;
    }
    &month {
        &-title {
            padding-top: 28px;
            text-align: center;
        }
    }
}
</style>
