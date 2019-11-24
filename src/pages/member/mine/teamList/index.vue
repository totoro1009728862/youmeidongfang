<template>
    <div class="cont">
        <ym-header title="我的团队"></ym-header>
        <van-sticky :offset-top="50">
            <div v-if="allStatus && allStatus.length" class="tabs">
                <div
                    v-for="(item, index) in allStatus"
                    :key="index"
                    :class="{ actived: item.businessType === businessType }"
                    @click="linkTab(item.businessType)"
                >
                    <span>{{ `${item.name}(${item.totalNum})人` }}</span>
                </div>
            </div>
        </van-sticky>
        <div class="mt10" @touchmove="getUsers()">
            <div v-for="(user, i) in users" :key="i" class="item">
                <div>{{ user.name }}</div>
                <div class="rt">
                    机器
                    <span>{{ user.totalNum }}</span>
                    台
                </div>
            </div>
            <div v-if="!users.length && !loading" class="no-list">暂无{{ typeName }}，快去推广吧</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'TeamList',
    middleware: 'checkLogin',
    data() {
        return {
            userId: null,
            businessType: 0, // 一级，二级
            allStatus: [],
            users: [],
            finished: false, // 拿到所有数据
            current: 1,
            pageSize: 12,
            loading: false,
            scrollEnd: false
        }
    },
    computed: {
        typeName() {
            if (this.allStatus && this.allStatus.length && this.businessType) {
                let v = this.allStatus[this.businessType - 1]
                return v.name
            } else {
                return ''
            }
        }
    },
    async asyncData({ app }) {
        const userId = app.$cookies.get('userId')
        const {
            $api: { member }
        } = app
        const { data } = await member.mine.myTeamGroup({ userId })
        return {
            allStatus: data,
            userId,
            businessType: data[0].businessType || 1
        }
    },
    created() {
        this.getUsers()
    },
    methods: {
        async getUsers() {
            if (this.finished || this.loading) {
                return
            }
            this.loading = true
            const {
                userId,
                current,
                allStatus,
                businessType,
                pageSize,
                $api: { member }
            } = this
            const total = allStatus[businessType - 1].totalNum

            const params = {
                userId,
                businessType,
                page: current,
                rows: pageSize
            }
            const { data } = await member.mine.myTeamGroupList(params)
            this.loading = false
            this.users = [].concat(this.users).concat(data)
            this.current++

            if (this.users.length >= total) {
                console.log('数据加载完毕')
                this.finished = true
            }
        },
        linkTab(v) {
            if (this.businessType === v) return
            this.businessType = v
            this.users = []
            this.current = 1
            this.finished = false
            this.getUsers()
        }
    }
}
</script>
<style lang="less" scoped>
.cont {
    height: 100vh;
}
.tabs {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    background: #fff;
    height: 44px;
    align-items: center;
    div {
        font-size: 14px;
        font-weight: 500;
        color: rgba(34, 34, 34, 1);
        line-height: 44px;
        border-bottom: 2px solid #fff;
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
    height: 60px;
    padding: 0 20px;
    background: #fff;
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
</style>
