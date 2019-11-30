<template>
    <div class="cont">
        <ym-header title="提现明细"></ym-header>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" class="mt10" @load="getList">
            <div v-if="logs.length" class="list-box">
                <div v-for="(log, i) in logs" :key="i" class="item">
                    <div class="l-info">
                        <div class="mac-no">{{ log.remark }}</div>
                        <div class="mac-price">{{ log.createDate }}</div>
                    </div>
                    <div class="r-info">
                        <i>{{ log.price }}</i>
                    </div>
                </div>
                <div v-if="!logs.length && !isLoading" class="no-list">暂无提现记录</div>
            </div>
        </van-list>
    </div>
</template>
<script>
export default {
    name: 'CashLog',
    middleware: 'checkLogin',
    data() {
        return {
            logs: [], // 提现log
            total: 0, // 一共多少数据
            loading: false, // 数据加载loading
            finished: false, // 拿到所有数据
            current: 1,
            pageSize: 10
        }
    },
    methods: {
        async getList() {
            const {
                current,
                $api: { member },
                $cookies,
                $route: { query }
            } = this
            const params = {
                userId: $cookies.get('userId'),
                operation: 1,
                page: current,
                rows: 10
            }

            const { code, data } =
                query.cashType && query.cashType == 1
                    ? await member.mine.myPerformanceList(params)
                    : await member.mine.myBrokerageList(params)
            if (code === 200) {
                this.total = data.total
                this.logs.push(...data.list)
                this.loading = false
                this.current++
                if (this.logs.length === this.total) {
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
.list-box {
    display: flex;
    flex-flow: column wrap;
    border-top: 10px solid #f7f7f7;
    padding: 0 20px;
    color: #222;
    background: #fff;
    .item {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        border-bottom: 1px solid #f7f7f7;
        height: 90px;
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
                    content: '￥';
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
}
</style>
