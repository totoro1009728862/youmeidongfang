<template>
    <div class="cont">
        <van-tabs v-model="status" sticky class="tabs" color="#ab1f26" @change="onRefresh()">
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh(true)">
                <van-tab v-for="(item, index) in allMachinery" :key="index" :title="`${item.name}(${item.number}人)`">
                    <div class="list-box">
                        <div v-for="(user, i) in machineryArr" :key="i" class="item">
                            <div>{{ user.name }}</div>
                            <div class="rt">
                                机器
                                <span>{{ user.number }}</span>
                                台
                            </div>
                        </div>
                    </div>
                </van-tab>
            </van-pull-refresh>
        </van-tabs>
    </div>
</template>
<script>
export default {
    name: 'MachineryList',
    data() {
        return {
            allMachinery: [
                { name: 'MAC1', value: 0, number: 0 },
                { name: 'MAC2', value: 1, number: 0 },
                { name: 'MAC3', value: 2, number: 0 }
            ],
            machineryArr: [],
            status: 0, // 当前选中的类型
            isLoading: false,
            current: 1,
            pageSize: 10,
            scrollFinished: false
        }
    },
    mounted() {},
    methods: {
        // 刷新
        onRefresh(v) {
            if (v) {
                setTimeout(() => {
                    this.isLoading = false
                    this.machineryArr = []
                    this.current = 1
                    this.getlMachinery()
                }, 500)
            } else {
                this.isLoading = false
                this.machineryArr = []
                this.current = 1
                this.getlMachinery()
            }
        },
        getlMachinery() {
            this.machineryArr.push({ name: '强', number: 6 })
            this.total = 99
            this.scrollFinished = true
        }
    }
}
</script>
<style lang="less" scoped>
.cont {
    min-height: 100vh;
    background: #fff;
}
.list-box {
    display: flex;
    flex-flow: column wrap;
    background: #fff;
    padding: 0 20px;
    color: #222;
    border-top: 10px solid #ececec;
    .item {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
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
}
</style>
