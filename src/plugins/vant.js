import Vue from 'vue'
//按需引用vant组件
import {
    Icon,
    Swipe,
    SwipeItem,
    Lazyload,
    List,
    Button,
    Toast,
    Popup,
    ActionSheet,
    Sticky,
    Dialog,
    Picker,
    RadioGroup,
    Radio,
    DatetimePicker,
    TreeSelect,
    Sidebar,
    SidebarItem,
    Area,
    Tab,
    Tabs,
    PullRefresh,
    Stepper
} from 'vant'
/** 按需引用vant组件的样式，
 * base.less 包含icon、overlay、button、lazyload等等组件样式
 * 需要引用的样式具体看node_modules\vant\lib
 * 如需要全局引用 import 'vant/lib/index.css' 或者 'vant/lib/index.less'
 * 如果需要整体的修改vant的主题 可以在src/less下新建vant.less文件 修改vant的var变量
 * 尝试了覆盖vant/lib/style/var.less 不太好处理
 */

import 'vant/lib/style/base.less'

//swipe样式
import 'vant/lib/swipe/index.less'
import 'vant/lib/swipe-item/index.less'
//list 样式
import 'vant/lib/list/index.less'
//toast 样式
import 'vant/lib/toast/index.less'
//
import 'vant/lib/popup/index.less'
// ActionSheet
import 'vant/lib/action-sheet/index.less'
// Sticky
import 'vant/lib/sticky/index.less'
// dialog
import 'vant/lib/dialog/index.less'
// picker
import 'vant/lib/picker/index.less'
//radioGroup & radio
import 'vant/lib/radio/index.less'
// TreeSelect
import 'vant/lib/tree-select/index.less'
// sidebar
import 'vant/lib/sidebar/index.less'
// sidebar-item
import 'vant/lib/sidebar-item/index.less'
// tab
import 'vant/lib/tab/index.less'
// tabs
import 'vant/lib/tabs/index.less'
// pull-refresh
import 'vant/lib/pull-refresh/index.less'
// Stepper
import 'vant/lib/stepper/index.less'
//这里自动覆盖vant的样式的外链样式文件
import '~/assets/css/vant.css'

//注册到vue的全局样式中
Vue.use(Icon)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Lazyload, {
    error:
        '//timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573897539635&di=bd1304919f57fbd32560ba50100e91a4&imgtype=0&src=http%3A%2F%2Fen.pimg.jp%2F039%2F334%2F344%2F1%2F39334344.jpg',
    loading:
        '//timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573897596648&di=05cb0841b1a8c0b5747f2e4b6879eafa&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F1f828e876d3b9aed1bcd3213f28db91c0e8f44589965-9droKD_fw658',
    preload: 10,
    throttleWait: 300
})
Vue.use(List)
Vue.use(Button)
Vue.use(Popup)
Vue.use(ActionSheet)
Vue.use(Sticky)
Vue.use(Picker)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(DatetimePicker)
Vue.use(TreeSelect)
Vue.use(Sidebar)
Vue.use(SidebarItem)
Vue.use(Area)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(PullRefresh)
Vue.use(Stepper)
Vue.prototype.$Dialog = Dialog
//(1)这个方法是仅仅注入Vue实例，所有组件内都可以访问，但是不包含服务器端
// Vue.prototype.$Toast = Toast

export default (context, inject) => {
    //(2)注入context上下文，Vue实例不可以使用的
    // const { app } = context
    // app.$Toast = Toast

    //(3)同时注入context，Vue实例，甚至Vuex
    inject('Toast', Toast)
}
