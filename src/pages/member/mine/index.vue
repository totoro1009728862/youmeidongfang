<template>
    <div class="mine">{{ userInfo.name }}</div>
</template>
<script>
export default {
    name: 'TeamList',
    data() {
        return {
            userInfo: {
                name: '李强'
            }
        }
    },
    mounted() {},
    methods: {}
}
</script>
<style lang="less" scoped></style>
