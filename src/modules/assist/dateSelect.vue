<template>
    <div class="product-date">
        <div class="product-date-top" @click="openCalendar">
            <div class="title">
                出行日期
                <span v-if="bookInfo" class="small-text">({{ bookInfo }})</span>
            </div>
        </div>
        <div class="date-box">
            <div id="box">
                <div class="date-ul">
                    <div
                        v-for="(item, index) in dateList"
                        v-show="item.status === 1"
                        :key="index"
                        class="more-date"
                        :class="{ active: item.date === selectDate }"
                        @click="select(item.date)"
                    >
                        <p>{{ item.date | toWeek }}</p>
                        <p class="price">{{ item.value }}</p>
                    </div>
                </div>
            </div>
            <div class="more-wrap" :class="{ bshadow: dateList && dateList.length >= 3 }">
                <div class="more" @click="openCalendar">
                    <p class="price-blue">更多</p>
                    <p class="price-blue">日期</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'DateSelect',
    filters: {
        toWeek(v) {
            if (v) {
                let str = '日一二三四五六'.charAt(new Date(v).getDay())
                let d = v.substring(5, v.length)
                return d.replace(/\//g, '-') + ' 周' + str
            } else {
                return ''
            }
        }
    },
    model: {
        prop: 'selectDate',
        event: 'select'
    },
    props: {
        selectDate: {
            type: String,
            default: ''
        },
        bookInfo: {
            type: String,
            default: ''
        },
        dateList: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    data() {
        return {}
    },
    watch: {
        selectDate() {
            this.$nextTick(() => {
                const dom = document.querySelector(`.active`)
                const box = document.querySelector('#box')
                if (dom) {
                    if (dom.offsetLeft - box.scrollLeft > 310 || box.scrollLeft - dom.offsetLeft > 310) {
                        box.scrollLeft = dom.offsetLeft
                    }
                }
            })
        }
    },
    methods: {
        openCalendar() {
            this.$emit('setCalendarSwitch', true)
        },
        select(v) {
            this.$emit('select', v)
        }
    }
}
</script>
<style lang="less" scoped>
.product-date {
    width: 100%;
    background-color: #ffffff;
    margin-bottom: 20px;
    padding: 20px;

    .product-date-top {
        height: 80px;
        display: flex;
        font-size: 32px;
        line-height: 80px;
        color: #222;

        .title {
            font-weight: bold;
            color: #222;
        }

        .small-text {
            color: #888;
            font-size: 26px;
            font-weight: 400;
        }
    }

    .date-box {
        position: relative;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        width: 100%;

        margin-top: 10px;

        > div:nth-child(1) {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            width: calc(100% - 100px);
            overflow: auto;

            .date-ul {
                display: flex;
                flex-flow: row nowrap;
                width: auto;
                height: 112px;
            }
        }
    }

    .more-wrap {
        display: flex;
        flex-flow: row-reverse nowrap;
        width: 120px;
        height: 100%;
        z-index: 10;
    }
    .bshadow {
        box-shadow: -10px 0px 10px -10px rgba(0, 0, 0, 0.2);
    }
    .more-date,
    .more {
        position: relative;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        height: 110px;
        border-radius: 10px;
        font-size: 24px;
        background: #fff;
        border: 2px solid #aaa;
    }

    .more-date {
        width: 194px;
        margin-right: 10px;
        overflow: hidden;
        p {
            font-size: 28px;
            color: #222;
        }

        .price {
            color: #fa4c1d;
            font-size: 30px;
            font-weight: 600;

            &::before {
                content: '￥';
            }

            &::after {
                content: '起';
                padding-left: 4px;
                color: #888;
                font-size: 20px;
                font-weight: 400;
            }
        }
    }
    .active {
        background: url('../../assets/image/actived.png') no-repeat no-repeat;
        background-size: 194px 110px;
        border: none;
    }
    .more {
        width: 100px;
        height: 110px;

        p {
            font-size: 28px;
            color: #222;
            color: #04c71f;
        }
    }
}
</style>
