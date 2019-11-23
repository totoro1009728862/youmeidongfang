import Vue from 'vue'
import VueLocalStorage from 'vue-localstorage'
import VueSessionStorage from 'vue-sessionstorage'
import createPersistedState from 'vuex-persistedstate'

Vue.use(VueLocalStorage)
Vue.use(VueSessionStorage)
export default ({ store }) => {
    createPersistedState({
        key: 'local',
        paths: ['userInfo']
    })(store)
}
