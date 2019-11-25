<template>
    <div class="cont">
        <ym-header title="我的业绩"></ym-header>
        <van-sticky v-if="userType === 2" :offset-top="50">
            <div class="select-dom">
                <div class="date-box">
                    <div class="bd" @click="beginDateSwitch = true">{{ bDate }}</div>
                    <div>&nbsp;-&nbsp;</div>
                    <div class="ed" @click="endDateSwitch = true">{{ eDate }}</div>
                </div>
                <div @click="onRefresh">筛选</div>
            </div>
        </van-sticky>

        <van-list v-model="loading" :finished="finished" :immediate-check="false" finished-text="没有更多了" class="mt10" @load="getList">
            <div v-if="perList.length" class="list-box">
                <div v-for="(item, i) in perList" :key="i" class="item">
                    <div class="l-info">
                        <div class="mac-no">{{ typeTxt.t1 }}{{ item.deviceNo }}</div>
                        <div class="mac-price">{{ typeTxt.t2 }}{{ item.createDate }}</div>
                    </div>
                    <div class="r-info">
                        <i>{{ item.price }}</i>
                    </div>
                </div>
            </div>
            <div v-if="!perList.length && !loading" class="no-list">暂无业绩，快去推广吧</div>
        </van-list>
        <div v-if="userType === 2">
            <van-popup v-model="beginDateSwitch" position="bottom">
                <van-datetime-picker v-model="beginDate" type="date" :min-date="minDate" :max-date="maxDate" @cancel="cancel" @confirm="setBeginDate" />
            </van-popup>
            <van-popup v-model="endDateSwitch" position="bottom">
                <van-datetime-picker v-model="endDate" type="date" :min-date="minDate" :max-date="maxDate" @cancel="cancel" @confirm="setEndDate" />
            </van-popup>
        </div>
    </div>
</template>
<script>
export default {
    name: 'MyPerformance',
    middleware: 'checkLogin',
    data() {
        return {
            userType: 1, //2门店1代理
            beginDate: '', // 开始日期
            endDate: '', // 结束日期
            minDate: new Date('2010-01-01'),
            maxDate: new Date(),
            beginDateSwitch: false,
            endDateSwitch: false,

            perList: [],
            total: 0, // 一共多少数据
            status: 0, // 当前选中的类型
            loading: false, // 数据加载loading
            reLoading: false, // 刷新数据中
            finished: false, // 拿到所有数据
            current: 1,
            pageSize: 10
        }
    },
    computed: {
        typeTxt() {
            const v = this.userType
            return {
                t1: v === 1 ? '代理佣金' : '顾客购买收入',
                t2: v === 1 ? '' : '激活时间:'
            }
        }
    },
    created() {
        this.userType = this.$cookies.get('userType')
        this.endDate = new Date()
        const m = this.endDate.getMonth() + 1
        const y = this.endDate.getFullYear()
        this.beginDate = new Date(`${m > 3 ? y : y - 1}-${m - 3}-01`)
        this.bDate = this.formatDate(this.beginDate)
        this.eDate = this.formatDate(this.endDate)
        this.getList()
    },
    methods: {
        // 刷新
        onRefresh() {
            this.perList = []
            this.current = 1
            this.finished = false
            this.loading = false
            this.getList()
        },
        async getList() {
            const {
                current,
                bDate,
                eDate,
                $api: { member },
                $cookies
            } = this
            const params = {
                userId: $cookies.get('userId'),
                operation: 0,
                startDayTime: bDate,
                endDayTime: eDate,
                page: current,
                rows: 10
            }
            const { code, data } = await member.mine.myPerformanceList(params)
            if (code === 200) {
                this.total = data.total
                this.perList.push(...data.list)
                this.loading = false
                this.current++
                if (this.perList.length === this.total) {
                    this.finished = true
                }
            }
        },
        // 赋值开始日期
        setBeginDate(e) {
            if (e.getTime() > this.endDate.getTime()) {
                this.beginDate = new Date(this.bDate)
                this.$Toast('开始日期不能大于结束日期')
                return
            }
            this.bDate = this.formatDate(this.beginDate)
            this.beginDateSwitch = false
        },
        // 赋值结束日期
        setEndDate(e) {
            if (e.getTime() < this.beginDate.getTime()) {
                this.endDate = new Date(this.eDate)
                this.$Toast('结束日期不能小于开始日期')
                return
            }
            this.eDate = this.formatDate(this.endDate)
            this.endDateSwitch = false
        },
        //  确定赋值
        cancel() {
            this.beginDateSwitch = this.endDateSwitch = false
        },
        formatDate(v) {
            if (!v) return ''
            const m = v.getMonth() + 1
            const y = v.getFullYear()
            const d = v.getDate()
            return `${y}-${m < 10 ? '0' + m : m}-${d < 10 ? '0' + d : d}`
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
        }
    }
    .r-info {
        font-size: 16px;
        color: #222;
        font-weight: bold;
        i {
            color: #ab1f26;
            &::before {
                content: '+￥';
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
