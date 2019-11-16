<template>
    <div class="travel-count">
        <div class="count">
            <div class="count-type">
                <div>购买份数</div>
            </div>
            <div class="add-subtract">
                <div class="jian" :class="{ 'no-click': ticketNumber <= 1 }">
                    <span class="hx-icon hx-icon-jian" @click="reduceNumber"></span>
                </div>
                <div class="number">{{ ticketNumber }}</div>
                <div class="jian" :class="{ 'no-click': ticketNumber >= 99 }">
                    <span class="hx-icon hx-icon-jiahao" @click="addNumber"></span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'TicketCount',
    model: {
        prop: 'ticketNumber',
        event: 'change'
    },
    props: {
        ticketNumber: {
            type: Number,
            default: 1
        }
    },
    data() {
        return {}
    },
    methods: {
        // 加事件
        addNumber() {
            this.$emit('change', this.ticketNumber < 99 ? this.ticketNumber + 1 : this.ticketNumber)
        },
        // 减事件
        reduceNumber() {
            this.$emit('change', this.ticketNumber > 1 ? this.ticketNumber - 1 : this.ticketNumber)
        }
    }
}
</script>

<style lang="less" scoped>
.travel-count {
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    padding: 30px;
    background: #fff;
    .count {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        height: 80px;

        .count-type {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            align-items: center;
            width: 320px;

            > div {
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                font-weight: 600;
                color: #222;
                font-size: 32px;
            }
            span {
                display: inline-block;
                padding-left: 10px;
                color: #555;
                font-size: 22px;
            }
        }

        .add-subtract {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            width: 234px;

            .jian {
                height: 60px;
                width: 60px;
                line-height: 60px;
                text-align: center;
                border: 2px solid #e6e6e6;

                span {
                    font-size: 26px;
                    color: #555;
                }
            }

            .number {
                height: 60px;
                width: 90px;
                line-height: 60px;
                text-align: center;
                border-top: 2px solid #e6e6e6;
                border-bottom: 2px solid #e6e6e6;
            }

            .no-click {
                span {
                    color: #e6e6e6;
                }
            }
        }
    }
}
</style>
