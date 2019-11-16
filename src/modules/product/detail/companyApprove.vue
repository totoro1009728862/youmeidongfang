<template>
    <div class="approve-warp">
        <div class="approve-icon">
            <i class="hx-icon hx-icon-gongyingshang"></i>
        </div>
        <div class="approve-company">
            <p>{{ supplierName }}</p>
        </div>
        <div class="approve-link" @click="openCompanyApprove">认证资质</div>
    </div>
</template>
<script>
export default {
    name: 'CompanyApprove',
    props: {
        supplierName: {
            type: String,
            default: ''
        },
        routeName: {
            type: String,
            default: ''
        }
    },
    data() {
        return {}
    },
    methods: {
        // 资质认证跳转
        openCompanyApprove() {
            this.$router.push({
                name: this.routeName,
                query: {
                    productId: this.$route.query.productId,
                    preview: this.$route.query.preview
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
.approve-warp {
    display: flex;
    min-height: 80px;
    line-height: 40px;
    font-size: 28px;
    margin-bottom: 20px;
    padding: 20px;
    background: #fff;

    .approve-icon {
        width: 60px;
        flex: 0 60px;

        i {
            font-size: 32px;
            margin-top: 20px;
        }
    }

    .approve-company {
        flex: 1;
        min-width: 0;
        font-weight: 500;
    }

    .approve-link {
        flex: 0 120px;
        width: 120px;
        color: #00b900;
    }
}
</style>
