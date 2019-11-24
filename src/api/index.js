import product from './product'
import member from './member'
// import assist from './assist'
// import book from './book'

export default $axios => ({
    product: product($axios),
    member: member($axios)
    // assist: assist($axios),
    // book: book($axios)
    // wxGetConfig: () => {
    //     return $axios.$post(`/user/common/wxjs/getConfig`)
    // },
    // 获取openId
    // getPayInfo: () => {
    //     return $axios.$get(`/user/customer/wxlogin/getPayInfo`)
    // }
})
