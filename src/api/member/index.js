import login from './login'
// import order from './order'
// import mine from './mine'

export default $axios => ({
    login: login($axios)
    // order: order($axios),
    // mine: mine($axios)
})
