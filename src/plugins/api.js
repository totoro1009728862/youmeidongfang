import api from '~/api/index.js'
export default ({ $axios }, inject) => {
    inject('api', api($axios))
}
