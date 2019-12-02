<template>
    <div class="cont">
        <ym-header title="我的机器"></ym-header>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" class="mt10" @load="getList">
            <div v-if="machList.length" class="list-box">
                <div v-for="(item, i) in machList" :key="i" class="item">
                    <div class="l-info">
                        <div class="mac-no">编号：{{ item.deviceNo }}</div>
                        <div class="mac-price">{{ item.price }}</div>
                    </div>
                    <div class="r-info">
                        <i>{{ item.useNum * -1 }}</i>
                    </div>
                </div>
            </div>
            <div v-if="!machList.length && !loading" class="no-list">暂无业绩，快去推广吧</div>
        </van-list>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'MyPerformance',
    middleware: 'checkLogin',
    data() {
        return {
            machList: [],
            total: 0, // 一共多少数据
            loading: false, // 数据加载loading
            reLoading: false, // 刷新数据中
            finished: false, // 拿到所有数据
            current: 1,
            pageSize: 11
        }
    },

    computed: {
        ...mapGetters(['userInfo'])
    },
    methods: {
        // 刷新
        onRefresh() {
            this.machList = []
            this.current = 1
            this.finished = false
            this.loading = false
            this.getList()
        },
        async getList() {
            const {
                userInfo,
                current,
                pageSize,
                $api: { member }
            } = this

            const params = {
                page: current,
                rows: pageSize,
                userId: userInfo.userId
            }
            const { code, data } = await member.mine.myDeviceList(params)
            if (code === 200) {
                this.total = data.total
                this.machList.push(...data.list)
                this.loading = false
                this.current++
                if (this.machList.length === this.total) {
                    this.finished = true
                }
            }
        }
    }
}
</script>
<style lang="less" scoped>
.cont {
    height: 100vh;
}
.select-dom {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    background: #fff;
    height: 44px;
    align-items: center;
    color: 888;
    font-size: 14px;
    .date-box {
        display: flex;
        flex-flow: row nowrap;
        padding: 7px 10px 7px 0;
        align-items: center;
        .bd,
        .ed {
            width: 120px;
            height: 30px;
            line-height: 30px;
            background: #ececec;
            text-align: center;
            border-radius: 4px;
        }
    }

    .actived {
        border-bottom-color: #ab1f26;
        font-weight: 600;
    }
}
.item {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    border-bottom: 1px solid #f7f7f7;
    height: 90px;
    padding: 0 20px;
    background: #fff;
    .l-info {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        .mac-price {
            font-size: 12px;
            line-height: 30px;
            color: #888;
            &::after {
                content: '元/次';
            }
        }
    }
    .r-info {
        font-size: 16px;
        color: #222;
        font-weight: bold;
        i {
            color: #ab1f26;
            &::before {
                content: '已使用';
            }
            &::after {
                content: '次';
            }
        }
    }
}
.end {
    width: 100%;
    line-height: 100px;
    color: #888;
    text-align: center;
    font-size: 14px;
}
.no-list {
    display: flex;
    min-height: calc(100vh - 200px);
    align-items: center;
    justify-content: center;
    color: #888;
    font-size: 14px;
}
</style>
