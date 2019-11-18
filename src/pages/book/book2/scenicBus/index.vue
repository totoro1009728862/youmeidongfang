<template>
    <div>
        <div v-show="!isChildRoute" class="hx-book">
            <ym-header title="填写信息">
                <div slot="left" class="left" @click="$routerBack">
                    <i class="icon ym-left"></i>
                </div>
            </ym-header>
            <div class="hx-book-summary">
                <div class="title">{{ productName }}</div>
                <dl class="unit">
                    <dt>套餐类型</dt>
                    <dd>{{ sltPackage.packName }}</dd>
                </dl>
                <dl class="unit">
                    <dt>出行人数</dt>
                    <dd>{{ personNumStr }}</dd>
                </dl>
                <dl class="unit">
                    <dt>出行时间</dt>
                    <dd>{{ currentDate }} {{ sltGoTime.stockTime }}</dd>
                </dl>
            </div>
            <div v-if="isRealName && isFinish" class="hx-book-person">
                <select-trips :trips-data="tripsData" @changeTravels="changeTravels" @goBaseTraveler="goBaseTraveler('1')" @goEdit="goEdit"></select-trips>
            </div>
            <div class="contact-box">
                <contact-form ref="contact" v-model="contactInfo" :has-bind="hasBind" :need-contact-name="needContactName"></contact-form>
            </div>

            <div class="hx-book-remark" @click.stop="openRemark">
                <div class="go-people">
                    <div class="go-title">
                        <span class="title">备注</span>
                        <span :class="{ c5: remark.remarkText }">{{ remark.remarkText ? remark.remarkText : '请输入您的内容' }}</span>
                        <span class="icon ym-xiangyou"></span>
                    </div>
                </div>
            </div>
            <!-- 协议 -->
            <agreement :has-bind="hasBind" :elec-protocol-url="elecProtocolUrl"></agreement>
            <div class="hx-book-bottom">
                <book-detail :total-price="totalPrice" :price-sys="priceSys" :mutil-num="passNumDetail" :btn-text="'去支付'" @next="createOrder"></book-detail>
            </div>
        </div>
        <!-- 备注 -->
        <template v-if="$route.name == 'Book2_scenicBus_remark'">
            <nuxt-child keep-alive :remark="remark" @remarkConfirm="remarkConfirm"></nuxt-child>
        </template>
        <template v-else-if="isTravelerInfoChildRoute">
            <nuxt-child
                keep-alive
                :is-select="true"
                :usable-i-d-list="acceptCardType && acceptCardType.split(',')"
                :adult-number="totalPersonNumber"
                :is-age-limit="false"
                :selected="sltPassengers"
                @change="handlerChangeTravelers"
            />
        </template>
        <template v-else-if="isTravelerEditChildRoute">
            <nuxt-child
                keep-alive
                :is-select="true"
                :usable-i-d-list="acceptCardType && acceptCardType.split(',')"
                :traveler="editTraveler"
                @save="handlerEditTravler"
            />
        </template>
    </div>
</template>

<script>
import bookDetail from '~/modules/book/bookDetail'
import ContactForm from '~/modules/book/contactForm'
import Agreement from '~/modules/book/agreement'
import SelectTrips from '~/modules/book/selectTrips.vue'
import { isWechat, getField, regPhoneNumber } from '~/common/utils'
import { add, mul } from '~/common/utils/calculation'
import routerBack from '~/common/minix/routerBack.js'

export default {
    name: 'ScenicBusBook2',
    middleware: 'checkLogin',
    components: {
        bookDetail,
        ContactForm,
        Agreement,
        SelectTrips
    },
    filters: {
        showTravelName: function(value) {
            let showText = value
            if (value && value.length > 4) {
                showText = value.slice(0, 3) + '...'
            }
            return showText
        }
    },
    mixins: [routerBack],
    data() {
        return {
            passengers: [],
            hasBind: '',
            phoneNumber: '',
            remark: {
                remarkSwitch: false,
                remarkText: ''
            },
            needClick: true,
            editTraveler: null,
            sltPassengers: [],
            // book1数据
            baseInfo: {},
            selInfo: {},
            priceSys: [],
            passNumDetail: {},
            contactInfo: {}, // 联系人信息
            fromPass: false,
            isFinish: false
        }
    },
    computed: {
        sltPackage() {
            return this.selInfo.sltPackage || {}
        },
        currentDate() {
            return this.selInfo.currentDate
        },
        sltGoTime() {
            return this.selInfo.sltGoTime || {}
        },
        sltReturnTime() {
            return this.selInfo.sltReturnTime || {}
        },
        sltStartPoint() {
            return this.selInfo.sltStartPoint || {}
        },
        sltEndPoint() {
            return this.selInfo.sltEndPoint || {}
        },
        isRealName() {
            return this.baseInfo.isRealName
        },
        productName() {
            return this.baseInfo.productName
        },
        acceptCardType() {
            return this.baseInfo.acceptCardType
        },
        stockOrigin() {
            return this.baseInfo.stockOrigin
        },
        elecProtocolUrl() {
            return this.baseInfo.elecProtocolUrl
        },
        needContactName() {
            return this.baseInfo.needContactName
        },
        tripsData() {
            const { passengers, sltPassengers, totalPersonNumber } = this
            return {
                trips: passengers, // 常旅乘客
                travelPersons: sltPassengers,
                adultNumber: totalPersonNumber, // 成人数量为总数
                childrenNumber: 0 // 没有儿童量
            }
        },
        personNum() {
            let adultNum = 0,
                childrenNum = 0,
                seniorNum = 0,
                studentNum = 0,
                num = 0
            const passNumDetail = this.passNumDetail
            this.priceSys.map(item => {
                if (item.type == 'adult' && passNumDetail.adultNum > 0) {
                    adultNum += passNumDetail.adultNum
                } else if (item.type == 'children' && passNumDetail.childrenNum > 0) {
                    childrenNum += passNumDetail.childrenNum
                } else if (item.type == 'senior' && passNumDetail.seniorNum > 0) {
                    seniorNum += passNumDetail.seniorNum
                } else if (item.type == 'student' && passNumDetail.studentNum > 0) {
                    studentNum += passNumDetail.studentNum
                } else if (item.type == 'family' && passNumDetail.familyNum > 0) {
                    adultNum += 2 * passNumDetail.familyNum
                    childrenNum += passNumDetail.familyNum
                } else if (item.type == 'parentChild' && passNumDetail.parentChildNum > 0) {
                    adultNum += passNumDetail.parentChildNum
                    childrenNum += passNumDetail.parentChildNum
                } else if (item.type == 'general' && passNumDetail.busNum > 0) {
                    num += passNumDetail.busNum
                }
            })
            return {
                adultNum,
                childrenNum,
                seniorNum,
                studentNum,
                num
            }
        },
        personNumStr() {
            let res = []
            let personNum = this.personNum
            personNum.adultNum > 0 && res.push(`${personNum.adultNum}成人`)
            personNum.childrenNum > 0 && res.push(`${personNum.childrenNum}儿童`)
            personNum.seniorNum > 0 && res.push(`${personNum.seniorNum}老人`)
            personNum.studentNum > 0 && res.push(`${personNum.studentNum}学生`)
            personNum.num > 0 && res.push(`${personNum.num}人`)
            return res.join(' + ')
        },
        checkedTravelsById() {
            let arr = this.sltPassengers.map(item => {
                return item.id
            })
            return arr
        },
        totalPrice() {
            let res = 0
            const passNumDetail = this.passNumDetail
            this.priceSys.map(item => {
                if (item.type == 'general') {
                    res = add(res, mul(item.value, passNumDetail.busNum))
                } else {
                    res = add(res, mul(item.value, passNumDetail[item.type + 'Num'] || 0))
                }
            })
            return res
        },
        totalPersonNumber() {
            return this.personNum.adultNum + this.personNum.childrenNum + this.personNum.seniorNum + this.personNum.studentNum + this.personNum.num
        },
        //是否是子路由
        isChildRoute() {
            return !/^book2_scenicbus$/.test(this.$route.name.toLowerCase())
        },
        //
        isTravelerInfoChildRoute() {
            let routeName = this.$route.name.toLowerCase()
            return this.isChildRoute && /^book2_scenicbus_travelerinfo/.test(routeName)
        },
        isTravelerEditChildRoute() {
            let routeName = this.$route.name.toLowerCase()
            return this.isChildRoute && /^book2_scenicbus_traveler_edit$/.test(routeName)
        }
    },
    beforeRouteLeave(to, from, next) {
        //  返回book1清除用户手动选择的参数
        this.fromPass = false
        this.sltPassengers = []
        this.passengers = []
        this.remark = {
            remarkSwitch: false,
            remarkText: ''
        }
        next()
    },
    activated() {
        if (this.fromPass) return
        // 获取book1选择的数据
        let BusBook1Info = this.$session.get('BusBook1Info')
        if (!BusBook1Info) {
            this.$router.replace({
                name: 'Book1_scenicBus',
                query: {
                    ...this.$route.query,
                    stockOrigin: 0
                }
            })
        } else {
            const { baseInfo, selInfo, priceSys, passNumDetail } = BusBook1Info
            this.baseInfo = baseInfo
            this.selInfo = selInfo
            this.priceSys = priceSys
            this.passNumDetail = passNumDetail
        }

        // 实名认证
        if (this.isRealName) {
            this.isFinish = false
            this.$api.book
                .getRecentTravelPersonList()
                .then(res => {
                    if (res.code == 200) {
                        this.passengers = res.data.travelPersonList
                    }
                    this.isFinish = true
                })
                .catch(() => {
                    this.isFinish = true
                })
        }
        this.$api.book.getPhoneNumber().then(res => {
            if (res.code === 200) {
                this.hasBind = res.data
                this.$set(this.contactInfo, 'contactPhone', res.data)
            }
        })
    },
    methods: {
        remarkConfirm(e) {
            this.remark.remarkText = e
            this.$routerBack()
        },
        // 跳转选择出行人 1为出行人 2为联系人
        goBaseTraveler() {
            this.$router.push({
                name: 'Book2_ScenicBus_TravelerInfo',
                query: {
                    ...this.$route.query
                }
            })
        },
        //快捷点击出行人事件
        changeTravels(item) {
            //判断资料是否齐全
            let cards = item.travelPersonCardList
            let sltPassengers = [].concat(this.sltPassengers)
            for (let v in cards) {
                //如果联系人拥有的证件满足订单需要的证件
                if (this.acceptCardType.indexOf(cards[v].acceptCardType) > -1) {
                    item.acceptCardType = cards[v].acceptCardType
                    item.cardType = cards[v].acceptCardType
                    item.cardNumber = cards[v].cardNumber
                    break
                }
            }
            // 如果出行人包含当前选择的就去掉，否则插入
            if (this.hasTravels(item)) {
                sltPassengers.splice(sltPassengers.indexOf(item), 1)
            } else {
                sltPassengers.push(item)
                // 如果选择超过可选值则去掉第一个符合条件的值
                if (sltPassengers.length && sltPassengers.length > this.totalPersonNumber) {
                    sltPassengers.splice(0, 1)
                }
            }
            this.sltPassengers = sltPassengers
        },

        // 备注信息
        openRemark() {
            this.$router.push({
                name: 'Book2_scenicBus_remark'
            })
        },

        //是否包含
        hasTravels(item) {
            let has = false
            for (let v in this.sltPassengers) {
                if (this.sltPassengers[v].id === item.id) {
                    has = true
                    break
                }
            }
            return has
        },

        // 跳转编辑
        goEdit(item) {
            this.editTraveler = Object.assign({}, item)
            this.editTraveler.travelPersonCardList = [].concat(item.travelPersonCardList)
            this.$router.push({
                name: 'Book2_ScenicBus_Traveler_Edit',
                query: {
                    ...this.$route.query,
                    travelerid: item.id
                }
            })
        },
        createOrder() {
            const {
                contactInfo: { contactPhone, contactName }
            } = this
            if (!this.isPassengerOk()) return false
            if (this.needContactName && !contactName) {
                this.$Toast('请填写联系人姓名')
                return false
            }
            if (regPhoneNumber(contactPhone)) {
                this.$Toast(regPhoneNumber(contactPhone))
                return
            }
            let numberObject = {}
            Object.keys(this.passNumDetail).forEach(x => {
                if (x == 'busNum') {
                    numberObject['general'] = this.passNumDetail[x]
                } else {
                    numberObject[x.replace('Num', '')] = this.passNumDetail[x]
                }
            })
            let params = {
                numberObject,
                stockOrigin: this.stockOrigin, //1好行，2省联网
                baseBusNumber: this.passNumDetail.busNum, //车票数量
                channel: 2, //渠道
                contactName,
                contactTel: contactPhone, //联系人电话
                destinationCityName: '',
                goTime: this.sltGoTime.stockTime, //出发时间
                includeScenic: this.sltPackage.includeScenic,
                introducerId: this.$route.query.introducerId || 0, //推广员id
                lineId: this.sltPackage.busLineId, //线路id
                orderRemark: this.remark.remarkText, //备注
                packId: this.sltPackage.id, //套餐id
                packName: this.sltPackage.packName, // 套餐名称
                passCode: this.hasBind ? '' : this.$refs.contact.code,
                payPrice: this.totalPrice, //总价
                productId: this.$route.query.productId, //产品id
                returnTime: (this.sltReturnTime && this.sltReturnTime.stockTime) || '', //返程时间
                stationDownId: this.sltEndPoint.busStationId, //下车点
                stationUpId: this.sltStartPoint.busStationId, //上车点
                ticketType: this.sltPackage.ticketType, //票类型
                travelDate: this.currentDate, //出发日期
                travelPersons: this.sltPassengers //出游人信息
            }
            this.$Toast.loading('订单生成中...')
            this.$api.book.creatScenicBusOrder(params).then(async res => {
                this.$Toast.clear()

                if (res.code == 200) {
                    // parseDomain(window.location.href)
                    // this.clearAllHistory()
                    if (isWechat(navigator.userAgent)) {
                        let payInfo = await this.$api.getPayInfo()
                        if (payInfo.code === 200) {
                            let link = getField()
                            window.location.href = link + `/pay?orderNo=${res.data.orderId}&businessType=1&openId=${payInfo.data}`
                        }
                    } else {
                        let link = getField()
                        window.location.href = link + `/pay?orderNo=${res.data.orderId}&businessType=1`
                    }
                }
            })
        },
        isPassengerOk() {
            const isOk = () => {
                let isOk = true
                this.sltPassengers.forEach(item => {
                    if (!item.acceptCardType) {
                        isOk = false
                    }
                })
                return isOk
            }
            if (this.isRealName) {
                if (!isOk()) {
                    this.$Toast('请完善出行人的证件信息')
                    return false
                }
                if (this.totalPersonNumber > this.sltPassengers.length) {
                    this.$Toast('请选择出行人')
                    return false
                }
                if (this.personNum.num <= 0 && this.personNum.seniorNum + this.personNum.studentNum <= 0) {
                    let adultNum = 0,
                        childrenNum = 0
                    this.sltPassengers.map(item => {
                        item.isAdult ? adultNum++ : childrenNum++
                    })
                } else {
                    if (this.personNum.num > 0) {
                        if (this.sltPassengers.length != this.personNum.num) {
                            this.$Toast('请选择出行人')
                            return false
                        }
                    } else if (this.sltPassengers.length != this.totalPersonNumber) {
                        this.$Toast('请选择出行人')
                        return false
                    }
                }

                return true
            }
            this.sltPassengers = []
            return true
        },
        handlerChangeTravelers(travelers) {
            this.fromPass = true
            if (this.passengers.length) {
                let passengers = [...this.passengers]
                travelers.forEach(item => {
                    let cards = item.travelPersonCardList
                    // 修改数据结构把符合的证件赋值到json第一级
                    for (let v in cards) {
                        //如果联系人拥有的证件满足订单需要的证件
                        if (this.acceptCardType.indexOf(cards[v].acceptCardType) > -1) {
                            item.acceptCardType = cards[v].acceptCardType
                            item.cardNumber = cards[v].cardNumber
                            break
                        }
                    }
                    for (let v in passengers) {
                        if (passengers[v].id === item.id) {
                            passengers.splice(v, 1)
                        }
                    }
                })
                let list = travelers.concat(passengers)
                if (list.length > 8) {
                    list = list.slice(0, 8)
                }
                this.passengers = list
            }
            this.sltPassengers = travelers
        },
        async handlerEditTravler(traveler) {
            this.fromPass = true
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
                this.$Toast.success('保存成功')
                let cards = traveler.travelPersonCardList
                // 修改数据结构把符合的证件赋值到json第一级
                for (let v in cards) {
                    //如果联系人拥有的证件满足订单需要的证件
                    if (this.acceptCardType.indexOf(cards[v].acceptCardType) > -1) {
                        traveler.acceptCardType = cards[v].acceptCardType
                        traveler.cardNumber = cards[v].cardNumber
                        traveler.cardType = cards[v].acceptCardType
                        break
                    }
                }
                let sltPass = [].concat(this.sltPassengers)
                sltPass = sltPass.map(x => {
                    if (x.id == traveler.id) {
                        return Object.assign({}, x, traveler)
                    } else return x
                })
                this.passengers = this.passengers.map(x => {
                    if (x.id == traveler.id) {
                        return Object.assign({}, x, traveler)
                    } else return x
                })
                this.sltPassengers = sltPass
                // 清空数据
                this.$routerBack()
            }
        }
    }
}
</script>

<style lang="less" scoped>
.hx-book {
    color: #222;
    font-size: 14px;
    padding-bottom: 120px;
    &-summary {
        margin-top: 20px;
        padding: 30px;
        background-color: #fff;

        .title {
            font-size: 32px;
            font-weight: bold;
            line-height: 46px;
            padding-bottom: 10px;
        }

        .unit {
            display: flex;
            font-size: 28px;
            color: #555;
            line-height: 60px;

            dt {
                margin-right: 20px;
            }

            dd {
                flex: 1;
            }
        }
    }

    &-person {
        margin-top: 20px;
        background-color: #fff;
    }

    &-remark {
        margin-top: 20px;
        padding: 6px 30px;
        background-color: #fff;
        display: flex;
        justify-content: space-between;

        // .title {
        //   font-weight: bold;
        //   font-size: 34px;
        //   line-height: 48px;
        //   margin-right: 80px;
        // }
        input {
            flex: 1;
        }

        input::placeholder {
            font-size: 30px;
        }
    }

    &-atten {
        display: flex;
        padding: 20px 30px;
        align-items: center;

        span.icon {
            height: 28px;
            width: 28px;
            background-color: #888;
            color: #fff;
            border-radius: 14px;
            line-height: 28px;
            text-align: center;
            font-size: 10px;
            margin-right: 6px;
        }

        p {
            font-size: 24px;
            color: #888;

            a {
                color: #04c71f;
            }
        }
    }

    &-bottom {
        position: fixed;
        bottom: 0;
        max-width: 750px;
        width: 100%;
    }
}

.go-people {
    position: relative;
    // padding: 0 40px;
    width: 100%;

    .go-title {
        .title {
            font-size: 32px;
            font-weight: bold;
            // line-height: 48px;
        }

        display: flex;
        flex-flow: row nowrap;
        height: 100px;
        // line-height: 100px;
        font-size: 30px;
        align-items: center;
        font-weight: 600;

        .people-tip {
            font-weight: 400;
            font-size: 24px;
            padding: 0 20px;
            flex: 1;

            > span {
                margin: 0;
                color: #888;

                i {
                    color: #fa4c1d;
                }
            }
        }

        > span:nth-child(2) {
            width: 440px;
            margin-left: 60px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #ccc;
            font-weight: 400;
            font-size: 30px;
        }

        .icon {
            position: absolute;
            right: 20px;
            line-height: 100px;
            top: 0;
            font-size: 30px;
            font-weight: 400;
        }

        .iconxinzeng,
        .iconlianxi {
            font-size: 36px;
            color: #04c71f;
        }

        .c5 {
            color: #555 !important;
        }
    }

    .checked-travels {
        height: 120px;
        display: flex;
        justify-content: flex-start;
        flex-flow: row nowrap;
        align-items: center;
        .left-type {
            width: 180px;
            font-size: 30px;
            font-weight: 500;
            color: rgba(34, 34, 34, 1);
        }

        .right-go {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            width: 80px;
            font-size: 30px;
        }

        .right-info {
            height: 120px;
            width: 100%;
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;

            > div:nth-child(1) {
                font-size: 30px;
                font-weight: 500;
                color: rgba(34, 34, 34, 1);
                padding-bottom: 6px;
            }

            > div:nth-child(2) {
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-between;
                font-size: 26px;
                font-weight: 500;
                padding-top: 6px;
                color: rgba(136, 136, 136, 1);
            }
        }
    }

    .notrips-choose {
        display: flex;
        justify-content: center;
        // align-items: center;
        // height: 120px;
        padding-bottom: 20px;

        > div {
            // position: relative;
            // bottom: 20px;
            width: 388px;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            // background: rgba(245, 245, 245, 1);
            // border-radius: 6px;
            // border: 2px solid rgba(230, 230, 230, 1);
            // color: #04c71f;
            font-size: 30px;
            color: #fff;
            background-color: #00b900;
            border-radius: 30px;

            span {
                padding-left: 10px;
                font-size: 30px;
            }
        }
    }

    .fast-choose {
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-start;
        margin-bottom: 20px;
        .go-select {
            height: 60px;
            line-height: 60px;
            background: rgba(245, 245, 245, 1);
            border-radius: 6px;
            border: 2px solid rgba(230, 230, 230, 1);
            font-size: 28px;
            padding-left: 10px;

            span {
                position: relative;
                bottom: 2px;
                color: #888;
                font-size: 28px;
                vertical-align: middle;
            }
        }

        > div {
            position: relative;
            margin: 0 20px 20px 0;
            min-width: 100px;
            text-align: center;
            height: 60px;
            line-height: 60px;
            padding: 0 10px;
            border: 2px solid #e6e6e6;
            font-size: 28px;
            color: #555;
            border-radius: 6px;
            overflow: hidden;
            .icon-xuanzhongkuang {
                display: none;
                position: absolute;
                right: -3px;
                bottom: 0;
                font-size: 48px;
                width: 48px;
                height: 48px;
                color: #04c71f;
                border-radius: 10px;
            }
        }

        > .actived {
            border-color: #04c71f;
            color: #04c71f;

            .icon {
                display: block;
            }
        }
    }

    .go-tip {
        display: flex;
        flex-flow: row nowrap;
        line-height: 100px;
        color: #555;

        div:nth-child(1) {
            width: 160px;
        }
    }

    .bt2 {
        padding-top: 10px;
        border-top: 2px solid #f5f5f5;
        &:last-child {
            padding-bottom: 10px;
        }
    }
}

.cf6 {
    color: #fa4c1d;
    font-size: 28px;
}

.contact-box {
    background: #fff;
    margin-top: 20px;
}
</style>
