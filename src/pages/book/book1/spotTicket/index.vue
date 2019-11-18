<template>
    <div>
        <div v-show="!isChildRoute" class="hx-book">
            <ym-header title="订单填写">
                <div slot="left" class="left" @click="$routerBack">
                    <i class="icon ym-left"></i>
                </div>
            </ym-header>
            <div class="hx-book-content">
                <!-- 基础信息 -->
                <product-info
                    :scenic-name="scenicName"
                    :product-name="productName"
                    :is-change-ticket="isChangeTicket"
                    :refund-type="refundType"
                    :minute-num="minuteNum"
                    :advance-day="advanceDay"
                    @getByScenicTicketIdApi="getByScenicTicketIdApi"
                ></product-info>
                <!-- 价格日期选择 -->
                <div class="mt20">
                    <date-select v-model="selectDate" :date-list="dateList" @setCalendarSwitch="setCalendarSwitch"></date-select>
                </div>
                <div class="mt20">
                    <!-- 场次信息 -->
                    <scene-info v-if="false" v-model="time"></scene-info>
                </div>
                <!-- 购买份数 -->
                <ticket-count v-model="ticketNumber"></ticket-count>
                <!-- 选择出行人 -->
                <div v-if="isRealName">
                    <select-trips
                        :is-real-name="isRealName"
                        :trips-data="tripsData"
                        @changeTravels="changeTravels"
                        @goBaseTraveler="toSelectTraveler"
                        @goEdit="toTravelerEdit"
                    ></select-trips>
                </div>
                <!-- 联系人 -->
                <contact-form ref="contact" v-model="contactInfo" :has-bind="phoneNumber" :need-contact-name="needContactName"></contact-form>
                <!-- 协议 -->
                <agreement :has-bind="phoneNumber"></agreement>
            </div>
            <!-- 待出行待支付,出行中显示底部 -->
            <div class="detail-footer">
                <div>
                    <div class="bt" @click.stop="placeOrder">去支付</div>
                    <div v-if="payPrice" class="pay-price">
                        总额:
                        <span>
                            <i>￥</i>
                            {{ payPrice.price }}
                        </span>
                    </div>
                </div>
            </div>
            <!-- 日历选择组件 -->
            <price-calendar
                v-model="selectDate"
                :date-list="dateList"
                :calendar-switch="calendarSwitch"
                @setCalendarSwitch="setCalendarSwitch"
            ></price-calendar>
            <!-- 预订须知内容 -->
            <div v-if="explain">
                <ticket-notes v-model="noticeShow" :explain="explain" route-name="SpotTicket_CompanyApprove" :show-price="false"></ticket-notes>
            </div>
        </div>
        <template v-if="isTravelerInfoChildRoute">
            <nuxt-child
                keep-alive
                :is-select="true"
                :usable-i-d-list="acceptCardTypes"
                :adult-number="isRealName === 1 ? 1 : ticketNumber"
                :is-age-limit="false"
                :is-limit-select="isRealName === 1 ? false : true"
                :selected="travelPersons"
                @change="handlerChangeTravelers"
            />
        </template>
        <template v-else-if="isTravelerEditChildRoute">
            <nuxt-child keep-alive :is-select="true" :usable-i-d-list="acceptCardTypes" :traveler="editTraveler" @save="handlerEditTravler"></nuxt-child>
        </template>
    </div>
</template>

<script>
import DateSelect from '~/modules/assist/dateSelect.vue'
import PriceCalendar from '~/modules/assist/priceCalendar.vue'
import ProductInfo from './productInfo.vue'
import SceneInfo from './sceneInfo.vue'
import TicketCount from './ticketCount.vue'
import TicketNotes from '~/modules/assist/ticketNotes.vue'
import SelectTrips from '~/modules/book/selectTrips.vue'
import ContactForm from '~/modules/book/contactForm.vue'
import Agreement from '~/modules/book/agreement.vue'
import { isWechat, getField, debounce, regPhoneNumber } from '~/common/utils/index.js'
import routerBack from '~/common/minix/routerBack.js'

export default {
    middleware: 'checkLogin',
    components: {
        ProductInfo,
        DateSelect,
        PriceCalendar,
        SceneInfo,
        TicketCount,
        SelectTrips,
        ContactForm,
        Agreement,
        TicketNotes
    },
    mixins: [routerBack],
    data() {
        return {
            businessType: 4, // 门票
            userId: '',
            productId: '',
            productName: '',
            scenicName: '', // 景点名称
            phoneNumber: '', // 绑定的手机号
            isChangeTicket: 0, // 是否需要换票
            refundType: null, // 退款类型1可退,2部分退,3不可退
            minuteNum: 0, // 票余数
            advanceDay: 0, // 可买哪天的票
            noticeShow: false, // 预订须知开关
            explain: null, // 预订须知内容

            dateList: [], // 出行日期
            calendarSwitch: false, // 显示日历选择组件
            selectDate: '', // 出行日期

            time: { a: '09:00-10:00场', b: '余票充足', c: 1 },
            ticketNumber: 1, //票数
            trips: [], // 快捷选择的出行人
            travelPersons: [], //选中的出行人
            isRealName: 0, //产品是否需要实名认证0不需要1需要1个2全都需要
            acceptCardTypes: [], // 实名认证的证件类型

            contactInfo: {}, // 联系人信息
            needContactName: '', // 是否需要联系人姓名
            payPrice: {} //房差价格，付款金额，成人单价儿童单价等
        }
    },
    computed: {
        // 选择出行人
        tripsData() {
            return {
                trips: this.trips,
                travelPersons: this.travelPersons,
                adultNumber: this.ticketNumber
            }
        },
        //是否是子路由
        isChildRoute() {
            return !/^book_spotticket$/.test(this.$route.name.toLowerCase())
        },
        //
        isTravelerInfoChildRoute() {
            let routeName = this.$route.name.toLowerCase()
            return this.isChildRoute && /^book_spotticket_travelerinfo/.test(routeName)
        },
        isTravelerEditChildRoute() {
            let routeName = this.$route.name.toLowerCase()
            return this.isChildRoute && /^book_spotticket_traveler_edit$/.test(routeName)
        }
    },
    watch: {
        ticketNumber() {
            this.travelPersons = []
            this.getPriceApi()
        },
        selectDate() {
            this.getPriceApi()
        }
    },
    async asyncData({ app, query }) {
        const {
            $api: { book }
        } = app
        const { productId, userId } = query
        const { code, data } = await book.scenicTicketInitCreateOrder(productId)
        const { code: codeTrips, data: dataTrips } = await book.getRecentTravelPersonList()
        if (code === 200 && codeTrips === 200) {
            const { productName, scenicName, isChangeTicket, refundType, minuteNum, advanceDay, isRealName, acceptCardTypes, needContactName } = data
            const { travelPersonList } = dataTrips
            return {
                userId,
                productId,
                scenicName,
                productName,
                isChangeTicket,
                refundType,
                minuteNum,
                advanceDay,
                isRealName,
                trips: travelPersonList,
                acceptCardTypes,
                needContactName
            }
        }
        return null
    },
    beforeRouteLeave(to, from, next) {
        if (to.name === 'SpotTicket') {
            this.resetData()
        }
        next()
    },
    activated() {
        this.readyFunc()
    },
    methods: {
        resetData() {
            this.ticketNumber = 1
            this.selectDate = ''
            this.remarkInfo = ''
            this.travelPersons = []
            this.contactInfo = {}
        },
        readyFunc() {
            this.getPhoneNumberApi()
            this.getScenicTicketPriceCalendar()
        },
        // 是否绑定手机号
        async getPhoneNumberApi() {
            const {
                $api: { book }
            } = this
            const { code, data } = await book.getPhoneNumber()
            if (code === 200) {
                this.phoneNumber = data
                this.$set(this.contactInfo, 'contactPhone', data)
                // this.$store.commit('setTravelerContact', this.hasBind)
            }
        },
        // 获取价格日历
        async getScenicTicketPriceCalendar() {
            const {
                $api: { book },
                productId
            } = this

            const { code, data } = await book.scenicTicketPriceCalendar(productId)
            if (code === 200) {
                const { defaultTravelDate, priceCalendars } = data
                this.selectDate = this.selectDate || defaultTravelDate
                this.dateList = priceCalendars
            }
        },
        //获取价格
        async getPriceApi() {
            const {
                $api: { book },
                ticketNumber,
                productId,
                selectDate
            } = this
            if (!ticketNumber || !productId || !selectDate) {
                return
            }
            let params = {
                ticketNumber,
                productId,
                travelDate: selectDate
            }
            const { code, data } = await book.scenicTicketGetPrice(params)
            if (code === 200) {
                this.payPrice = data
            }
        },
        // 获取预订须知数据
        async getByScenicTicketIdApi() {
            const {
                $api: { product },
                explain,
                productId
            } = this
            if (explain && explain.id) {
                this.noticeShow = true
                return
            } else {
                const { code, data } = await product.getByScenicTicketId(productId)
                if (code === 200) {
                    this.noticeShow = true
                    this.explain = data
                }
            }
        },
        // 日历开关
        setCalendarSwitch(v) {
            this.calendarSwitch = v
        },
        //快捷点击出行人事件
        changeTravels(item) {
            const val = this.isRealName === 1 ? 1 : this.ticketNumber
            //判断资料是否齐全
            let cards = item.travelPersonCardList
            for (let v in cards) {
                //如果联系人拥有的证件满足订单需要的证件
                if (this.acceptCardTypes.indexOf(cards[v].acceptCardType) > -1) {
                    item.cardType = cards[v].acceptCardType
                    item.cardNumber = cards[v].cardNumber
                    break
                }
            }
            // 如果出行人包含当前选择的就去掉，否则插入
            if (this.hasTravels(item)) {
                this.travelPersons.splice(this.travelPersons.indexOf(item), 1)
            } else {
                this.travelPersons.push(item)
                // 如果选择超过可选值则去掉第一个符合条件的值
                if (this.travelPersons.length && this.travelPersons.length > val) {
                    // 如果已选成人数大于可选成人数则删除第一个成人
                    this.travelPersons.splice(0, 1)
                }
            }
        },
        // 生成订单去支付
        placeOrder: debounce(async function() {
            const {
                $api: { book },
                productId,
                ticketNumber,
                userId,
                $refs: { contact },
                payPrice: { price },
                contactInfo: { contactPhone, contactName },
                selectDate,
                travelPersons,
                isRealName,
                phoneNumber,
                needContactName
            } = this
            let phoneReg = regPhoneNumber(contactPhone)
            //循环判断出行人证件信息是否完全
            if (!travelPersons.length && isRealName) {
                this.$Toast('请选择出行人')
                return false
            }
            if (!this.isOkFunc()) {
                this.$Toast('请完善出行人的证件信息')
                return false
            }
            if (needContactName && !contactName) {
                this.$Toast('请填写联系人姓名')
                return false
            }
            if (!contactPhone && !phoneNumber) {
                this.$Toast('请填写联系人手机号')
                return false
            }
            if (phoneReg) {
                this.$Toast(phoneReg)
                return
            }
            if (!phoneNumber && !contact.code) {
                this.$Toast('请输入短信验证码')
                return false
            } else if (travelPersons.length < ticketNumber && isRealName === 2) {
                this.$Toast('请添加出行人数至购票数量')
                return false
            } else {
                let params = {
                    channel: 2,
                    introducerId: userId || '',
                    contactName: needContactName ? contactName.trim() : '',
                    contactTel: contactPhone || phoneNumber,
                    passCode: phoneNumber ? '' : contact.code, // 是否绑定手机号,没有传验证码
                    payPrice: price,
                    productId,
                    travelDate: selectDate,
                    travelPersons,
                    scenicTicketNumber: ticketNumber
                }
                const { code, data } = await book.createScenicTicketOrder(params)
                if (code === 200) {
                    let link = getField()
                    if (isWechat(navigator.userAgent)) {
                        this.getPayInfoApi(link, data.orderId)
                    } else {
                        window.location.href = link + `/pay?orderNo=${data.orderId}&businessType=${this.businessType}`
                    }
                }
            }
        }, 500),
        // 跳转支付页面
        async getPayInfoApi(link, orderNo) {
            const { $api, businessType } = this
            const { code, data } = await $api.getPayInfo()
            if (code === 200) {
                window.location.href = link + `/pay?orderNo=${orderNo}&businessType=${businessType}&openId=${data}`
            }
        },
        // 验证证件是否完善
        isOkFunc() {
            let isOk = true
            // 需要所有出行人证件
            if (this.isRealName === 2) {
                if (this.travelPersons && this.travelPersons.length) {
                    this.travelPersons.forEach(item => {
                        if (!item.cardType) {
                            this.$Toast('请完善出行人的证件信息')
                            isOk = false
                        }
                    })
                }
            } else if (this.isRealName === 1) {
                isOk = false
                // 如果只需要一人证件
                if (this.travelPersons && this.travelPersons.length) {
                    for (let i in this.travelPersons) {
                        if (this.travelPersons[i].cardType) {
                            isOk = true
                            break
                        }
                    }
                }
            }

            return isOk
        },
        //是否包含
        hasTravels(item) {
            let has = false
            for (let v in this.travelPersons) {
                if (this.travelPersons[v].id === item.id) {
                    has = true
                    break
                }
            }
            return has
        },
        //跳转到选择常用旅客页
        toSelectTraveler() {
            this.$router.push({
                name: 'Book_SpotTicket_TravelerInfo',
                query: {
                    ...this.$route.query
                }
            })
        },
        //去编辑页面
        toTravelerEdit(item) {
            this.editTraveler = Object.assign({}, item)
            this.editTraveler.travelPersonCardList = [].concat(item.travelPersonCardList)
            this.$router.push({
                name: 'Book_SpotTicket_Traveler_Edit',
                query: {
                    ...this.$route.query
                }
            })
        },
        //处理常旅选择/取消
        handlerChangeTravelers(travelers) {
            if (this.trips.length) {
                let trips = [...this.trips]
                travelers.forEach(item => {
                    for (let v in trips) {
                        if (trips[v].id === item.id) {
                            trips.splice(v, 1)
                        }
                    }
                })
                let list = travelers.concat(trips)
                if (list.length > 8) {
                    list = list.slice(0, 8)
                }
                this.trips = list
            }
            this.travelPersons = [].concat(travelers)
        },
        //编辑后的数据，业务端来保存
        async handlerEditTravler(traveler) {
            //先判断这个人是成人 还是儿童，符不符合要求，然后在保存
            //保存地址和方法，如下：
            this.$Toast.loading({
                mask: true,
                message: '提交中...',
                duration: 0
            })
            const { code } = await this.$api.member.mine.saveTraveler(traveler)
            this.$Toast.clear()
            if (code == 200) {
                let cards = traveler.travelPersonCardList
                // 修改数据结构把符合的证件赋值到json第一级
                for (let v in cards) {
                    //如果联系人拥有的证件满足订单需要的证件
                    if (this.acceptCardTypes.indexOf(cards[v].acceptCardType) > -1) {
                        traveler.cardType = cards[v].acceptCardType
                        traveler.cardNumber = cards[v].cardNumber
                        break
                    }
                }

                for (let i in this.travelPersons) {
                    if (traveler.id === this.travelPersons[i].id) {
                        this.$set(this.travelPersons[i], 'travelPersonCardList', traveler.travelPersonCardList)
                        this.$set(this.travelPersons, i, traveler)
                    }
                }
                this.$routerBack()
            }
        }
    }
}
</script>

<style lang="less" scoped>
.hx-book {
    background-color: #f5f5f5;
    overflow: auto;
    min-height: 100vh;
    font-size: 28px;
}
.mt20 {
    margin-top: 20px;
    padding: 0 10px;
    background: #fff;
}
.detail-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100px;
    display: flex;
    justify-content: center;
    > div {
        position: relative;
        display: flex;
        width: 100%;
        max-width: 750px;
        align-items: center;
        justify-content: flex-end;
        background: #fff;
        color: #555;
        font-size: 30px;
    }
    .pay-price {
        position: absolute;
        height: 100px;
        line-height: 100px;
        left: 20px;
        top: 0;
        color: #555;
        font-size: 30px;
        span {
            color: #ff6138;
            font-size: 32px;
            font-weight: 600;
            i {
                font-size: 24px;
            }
        }
    }
    .bt {
        height: 80px;
        line-height: 80px;
        background: #00b900;
        color: #fff;
        font-size: 34px;
        width: 240px;
        text-align: center;
        border-radius: 40px;
        display: flex;
        flex-flow: column nowrap;
        margin-right: 20px;
        // padding: 6px 0;
        font-weight: 500;
        span {
            width: 100%;
        }
        span:nth-child(1) {
            line-height: 32px;
            font-size: 30px;
            font-weight: 500;
        }
        span:nth-child(2) {
            line-height: 30px;
            font-size: 24px;
        }
    }
}
</style>
