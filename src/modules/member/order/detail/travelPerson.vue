<template>
    <div v-show="orderTravelPersonDtoList.length" class="order-travel">
        <div class="order-traveler-title">出行人</div>
        <div v-for="(item, index) in orderTravelPersonDtoList" :key="index" class="order-traveler-tow">
            <hx-person-item :person-dto-info="item"></hx-person-item>
        </div>
    </div>
</template>
<script>
export default {
    name: 'TravelPerson',
    props: {
        orderTravelPersonDtoList: {
            type: Array,
            default: () => {
                return []
            }
        }
    }
}
</script>

<style lang="less" scoped>
.order-travel {
    padding: 0 30px;
    border-radius: 6px;
    background-color: #ffffff;
    margin-bottom: 20px;
    .order-traveler-title {
        font-size: 34px;
        font-weight: bold;
        padding: 30px 0 0;
        position: relative;
    }
    .order-traveler-tow {
        font-size: 28px;
        padding: 20px 0;
        display: flex;
        border-bottom: 2px solid #e6e6e6;
        &:last-child {
            border-bottom: none;
        }
        p {
            color: #888;
        }
        .title {
            width: 160px;
            flex: 0 160px;
        }
        .content {
            flex: 1;
            h4 {
                font-size: 30px;
                span {
                    padding: 0 10px;
                    height: 30px;
                    background: rgba(240, 240, 240, 1);
                    border-radius: 15px;
                    font-size: 20px;
                    color: #888888;
                }
            }
        }
    }
}
</style>
