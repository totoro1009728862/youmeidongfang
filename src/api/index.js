import product from './product'
import member from './member'
export default $axios => ({
    product: product($axios),
    member: member($axios)
})
