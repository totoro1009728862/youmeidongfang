<template>
    <div class="cont">
        <ym-header title="我的业绩"></ym-header>
        <van-sticky v-if="tabIndex" :offset-top="50">
            <div class="select-dom">
                <div class="date-box">
                    <div class="bd" @click="beginDateSwitch = true">{{ bDate }}</div>
                    <div>&nbsp;-&nbsp;</div>
                    <div class="ed" @click="endDateSwitch = true">{{ eDate }}</div>
                </div>
                <div @click="onRefresh">筛选</div>
            </div>
        </van-sticky>

        <van-pull-refresh v-model="reLoading" :immediate-check="false" @refresh="onRefresh(true)">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getList">
                <div v-if="users.length" class="list-box">
                    <div v-for="(user, i) in users" :key="i" class="item">
                        <div>{{ user.name }}</div>
                        <div class="rt">
                            机器
                            <span>{{ user.number }}</span>
                            台
                        </div>
                    </div>
                    <div v-if="!users.length && !isLoading" class="no-list">暂无{{ item.name }}，快去推广吧</div>
                </div>
            </van-list>
        </van-pull-refresh>
        <div v-if="tabIndex">
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
    name: 'TeamList',
    data() {
        return {
            tabIndex: 0, // 0代理，1店家
            beginDate: '', // 开始日期
            endDate: '', // 结束日期
            minDate: new Date('2010-01-01'),
            maxDate: new Date(),
            beginDateSwitch: false,
            endDateSwitch: false,

            users: [],
            total: 90, // 一共多少数据
            status: 0, // 当前选中的类型
            loading: false, // 数据加载loading
            reLoading: false, // 刷新数据中
            finished: false, // 拿到所有数据
            current: 1,
            pageSize: 10
        }
    },
    async asyncData() {
        return { tabIndex: 1 }
    },
    created() {
        this.endDate = new Date()
        const m = this.endDate.getMonth() + 1
        const y = this.endDate.getFullYear()
        this.beginDate = new Date(`${m > 3 ? y : y - 1}-${m - 3}-01`)
        this.bDate = this.formatDate(this.beginDate)
        this.eDate = this.formatDate(this.endDate)
    },
    methods: {
        // 刷新
        onRefresh(v) {
            if (v) {
                setTimeout(() => {
                    this.reLoading = false
                    this.users = []
                    this.current = 1
                    this.getList()
                }, 500)
            } else {
                this.reLoading = false
                this.users = []
                this.current = 1
                this.getList()
            }
        },
        getList() {
            console.log('-------')
            setTimeout(() => {
                for (let i = 0; i < 15; i++) {
                    this.users.push({
                        name: '强',
                        number: this.current + '-' + i
                    })
                }
                this.loading = false
                this.current++
                if (this.total && this.users.length >= this.total) {
                    this.finished = true
                }
            }, 500)
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
.list-box {
    display: flex;
    flex-flow: column wrap;
    border-top: 10px solid #ececec;
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
        height: 60px;
        .rt {
            color: #888;
            span {
                padding: 0 8px;
                color: #ab1f26;
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
