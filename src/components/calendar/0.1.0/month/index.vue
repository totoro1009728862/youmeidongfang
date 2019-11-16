<template>
    <div class="hx-month">
        <template v-if="isWeekHead">
            <ul class="hx-month-head">
                <li>{{ getHeadText(days[0]) }}</li>
                <li>{{ getHeadText(days[1]) }}</li>
                <li>{{ getHeadText(days[2]) }}</li>
                <li>{{ getHeadText(days[3]) }}</li>
                <li>{{ getHeadText(days[4]) }}</li>
                <li>{{ getHeadText(days[5]) }}</li>
                <li>{{ getHeadText(days[6]) }}</li>
            </ul>
        </template>
        <div class="hx-month-content">
            <template v-for="(item, index) in weeks">
                <hx-week
                    :key="index"
                    :date="item"
                    :current-date="currentDate"
                    :week-index="weekIndex"
                    :year="year"
                    :month="month"
                    :datas="datas"
                    @sltDate="sltDate"
                >
                    <template v-if="$scopedSlots.default">
                        <slot></slot>
                    </template>
                </hx-week>
            </template>
        </div>
    </div>
</template>

<script>
import { weekIdx, parseDate, parseTime } from '../util.js'
import hxWeek from '../week/index.vue'
export default {
    components: {
        hxWeek
    },
    props: {
        weekHead: {
            type: Array,
            default: () => ['日', '一', '二', '三', '四', '五', '六']
        },
        weekIndex: {
            type: Number,
            default: 0
        },
        isFullWeek: {
            type: Boolean,
            default: true
        },
        isWeekHead: {
            type: Boolean,
            default: true
        },
        date: {
            type: [String, Date],
            default: ''
        },
        currentDate: {
            type: [String, Date],
            default: ''
        },
        datas: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            year: '',
            month: '',
            weeks: [],
            days: [],
            crtDate: ''
        }
    },
    watch: {
        date() {
            this.draw()
        }
    },
    mounted() {
        this.draw()
    },
    methods: {
        draw() {
            let crtDate,
                _idx,
                weeks = [],
                days = [],
                year,
                month,
                _weekIdx

            _weekIdx = this.weekIndex

            _weekIdx = _weekIdx >= 0 && _weekIdx <= 6 ? _weekIdx : 0
            crtDate = parseDate(this.date)
            year = crtDate.getFullYear()
            month = crtDate.getMonth()
            crtDate = new Date(year, month, 1)

            _idx = weekIdx(crtDate, _weekIdx)

            crtDate = parseDate(crtDate, {
                days: 0 - _idx
            })
            for (let i = 0; i < 42; i++) {
                let _crtDateStr = parseTime(crtDate, {}, false)
                days.push(_crtDateStr)
                if (i % 7 == 0) {
                    if (!(i > 0 && !this.isFullWeek && (crtDate.getFullYear() != year || crtDate.getMonth() != month))) {
                        weeks.push(_crtDateStr)
                    }
                }
                crtDate = parseDate(crtDate, {
                    days: 1
                })
            }
            this.year = year
            this.month = month
            this.weeks = weeks
            this.days = days
        },
        getHeadText(date) {
            date = date && date.length ? parseDate(date) : ''
            return date && date.getDay && this.weekHead[date.getDay()] ? this.weekHead[date.getDay()] : ''
        },
        sltDate(date, value) {
            this.$emit('sltDate', date, value)
        }
    }
}
</script>

<style lang="less" scoped>
.hx- {
    &month {
        margin: 5px 20px;
        &-head {
            display: flex;
            justify-content: space-around;
            color: #555;
            font-size: 30px;
            padding: 20px 0;
        }
    }
}
</style>
