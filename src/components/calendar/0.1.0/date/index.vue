<template>
    <div class="hx-date" @click="sltDate">
        <div class="date" :class="{ current: isCurrent, disable: !isHasData, outMonth: isOutMonth }">
            <div class="day">{{ dateDay }}</div>
            <div class="date-cont">
                <template v-if="$scopedSlots.default">
                    <slot></slot>
                </template>
                <template v-else>
                    <div>{{ value.value ? `&yen;${value.value}` : '' }}</div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import { parseTime, parseDate } from '../util.js'
export default {
    props: {
        date: {
            type: [String, Date],
            default: ''
        },
        year: {
            type: Number,
            default: 2019
        },
        month: {
            type: Number,
            default: 1
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
        return {}
    },
    computed: {
        isHasData() {
            let datasArr = this.datas
            if (!(datasArr && datasArr.length)) return false
            datasArr = datasArr.filter(item => parseTime(this.date) == parseTime(item.date))
            if (!(datasArr && datasArr.length)) return false
            return true
        },
        isOutMonth() {
            let dateObj = parseDate(this.date)
            return dateObj.getFullYear() != this.year || dateObj.getMonth() != this.month
        },
        isCurrent() {
            if (!this.isHasData || this.isOutMonth) return false
            let crtDate = this.currentDate

            let isHasCrtDate = crtDate && (crtDate.length || crtDate.getTime)

            if (!isHasCrtDate) return false

            crtDate = parseTime(crtDate)
            return crtDate == parseTime(this.date)
        },
        dateDay() {
            return parseDate(this.date).getDate()
        },
        value() {
            let res = {}
            let datasArr = this.datas
            if (!(datasArr && datasArr.length)) return res
            datasArr = datasArr.filter(item => parseTime(this.date) == parseTime(item.date))
            if (!(datasArr && datasArr.length)) return res
            res = datasArr[0]
            return res
        }
    },
    methods: {
        sltDate() {
            if (this.isCurrent || this.isOutMonth || !this.isHasData) return false
            this.$emit('sltDate', this.date, this.value)
        }
    }
}
</script>

<style lang="less" scoped>
.hx- {
    &date {
        // margin: 10px 0;
        .day {
            padding-top: 10px;
            text-align: center;
            font-size: 30px;
            line-height: 30px;
            color: #222;
        }
        .date-cont {
            padding-top: 6px;
            font-size: 20px;
            color: #ff6138;
            text-align: center;
            line-height: 20px;
        }
        .date {
            border-radius: 10px;
            height: 80px;
            width: 80px;
            &.disable {
                .day,
                .date-cont {
                    color: #ccc;
                }
            }
            &.outMonth {
                .day {
                    color: #ccc;
                }
                .date-cont {
                    visibility: hidden;
                }
            }
            &.current {
                background: #00b900;
                .day {
                    color: #fff;
                    font-weight: 500;
                }
                .date-cont {
                    color: #fff;
                }
            }
        }
    }
}
</style>
