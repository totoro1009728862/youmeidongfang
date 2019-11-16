<template>
    <div class="pb20">
        <div v-if="title" class="title">{{ title }}</div>
        <h3 v-if="subTitle" class="sub-title">{{ subTitle }}</h3>
        <div class="desc-html" v-html="pcDesc"></div>
    </div>
</template>
<script>
export default {
    name: 'Desctription',
    props: {
        pcDesc: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        subTitle: {
            type: String,
            default: ''
        }
    },
    data() {
        return {}
    }
}
</script>
<style lang="less" scoped>
.pb20 {
    padding-bottom: 20px;
}
.title {
    margin: 20px;
    text-align: center;
    font-size: 34px;
    font-weight: 600;
    color: #333;
}

.sub-title {
    font-size: 28px;
    color: #444;
    position: relative;
    height: 50px;
    line-height: 50px;
    font-weight: 600;
}

/deep/ .desc-html {
    font-size: 28px !important;
    white-space: pre-line;
    color: #444444;
    font-size: 28px;
    line-height: 50px;
    width: 100%;
    overflow: hidden;

    > div {
        width: 100%;
        overflow: hidden;

        img {
            width: 100%;
        }
    }

    p {
        font-size: 28px;

        strong {
            font-weight: 500 !important;
        }

        span {
            font-size: 28px !important;
            color: #444 !important;
        }

        a {
            color: #00b900 !important;
        }
    }

    img {
        width: 100% !important;
        display: block !important;
    }
}
</style>
