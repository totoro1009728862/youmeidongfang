<template>
    <!-- 联系人 -->
    <div class="scene-cont">
        <div class="title">场次信息</div>
        <div class="times-box">
            <div
                v-for="(item, index) in times"
                :key="index"
                class="time"
                :class="{ c8: item.c === 3, actived: item.a === time.a }"
                @click="changeTimes(item)"
            >
                <div>{{ item.a }}</div>
                <div :class="{ 'c-orange': item.c === 2 }">{{ item.b }}</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'SceneInfo',
    model: {
        prop: 'time',
        event: 'change'
    },
    props: {
        times: {
            type: Array,
            default: () => {
                return [
                    { a: '09:00-10:00场', b: '余票充足', c: 1 },
                    { a: '09:00-11:00场', b: '余票充足', c: 1 },
                    { a: '09:00-17:00场', b: '余票充足', c: 3 },
                    { a: '09:00-12:00场', b: '余票充足', c: 2 },
                    { a: '09:00-16:00场', b: '余票充足', c: 3 },
                    { a: '09:00-13:00场', b: '余票充足', c: 1 },
                    { a: '09:00-15:00场', b: '余票充足', c: 2 },
                    { a: '09:00-14:00场', b: '余票充足', c: 1 }
                ]
            }
        },
        time: {
            type: Object,
            default: () => {
                return { a: '09:00-10:00场', b: '余票充足', c: 1 }
            }
        }
    },
    data() {
        return {}
    },
    methods: {
        changeTimes(item) {
            this.$emit('change', item)
        }
    }
}
</script>

<style lang="less" scoped>
.scene-cont {
    border-radius: 6px;
    background-color: #ffffff;
    margin: 40px 0 0;

    .title {
        font-size: 32px;
        font-weight: 500;
        border-top: 2px solid #e6e6e6;
        padding: 30px 0 20px;
        position: relative;
    }

    .times-box {
        position: relative;
        display: flex;
        flex-flow: row wrap;
        width: calc(100% + 20px);

        .time {
            position: relative;
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
            justify-content: center;
            width: 216px;
            height: 100px;
            background: rgba(245, 245, 245, 1);
            border-radius: 10px;
            border: 2px solid#fff;
            margin: 0 14px 14px 0;

            > div {
                font-size: 26px;
                font-weight: 500;
                color: rgba(34, 34, 34, 1);
            }

            > .c-orange {
                color: #ff6138;
            }
        }
        .actived {
            border-color: #00b900;
        }
    }

    .c8 {
        > div {
            color: #888 !important;
        }
    }
}
</style>
