<template>
    <div class="hx-week">
        <template v-for="(item, index) in days">
            <hx-date :key="index" :date="item" :current-date="currentDate" :year="year" :month="month" :datas="datas" @sltDate="sltDate">
                <template v-if="$scopedSlots.default">
                    <slot></slot>
                </template>
            </hx-date>
        </template>
    </div>
</template>

<script>
import { weekIdx, parseDate, parseTime } from '../util.js'
import hxDate from '../date/index'
export default {
    components: {
        hxDate
    },
    props: {
        date: {
            type: [String, Date],
            default: ''
        },
        weekIndex: {
            type: Number,
            default: 0
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
        return {
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
                days = [],
                _weekIdx

            _weekIdx = this.weekIndex
            _weekIdx = _weekIdx >= 0 && _weekIdx <= 6 ? _weekIdx : 0

            crtDate = parseDate(this.date)
            _idx = weekIdx(crtDate, _weekIdx)
            crtDate = parseDate(crtDate, {
                days: 0 - _idx
            })
            for (let i = 0; i < 7; i++) {
                let _crtDateStr = parseTime(crtDate, {}, false)
                days.push(_crtDateStr)
                crtDate = parseDate(crtDate, {
                    days: 1
                })
            }
            this.days = days
        },
        sltDate(date, value) {
            this.$emit('sltDate', date, value)
        }
    }
}
</script>

<style lang="less" scoped>
.hx- {
    &week {
        display: flex;
        justify-content: space-around;
    }
}
</style>
