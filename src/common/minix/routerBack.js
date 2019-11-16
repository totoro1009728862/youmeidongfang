export default {
    data() {
        return {
            isFromHXTrip: true //是否来之好行，是否有好行的历史路由
        }
    },
    // beforeRouteEnter(to, from, next) {
    //     next(vm => {
    //         console.log(from)
    //         if (from && from.name) {
    //             vm.isFromHXTrip = true
    //         } else {
    //             vm.isFromHXTrip = false
    //         }
    //     })
    // },
    activated() {
        this.isFromHXTrip = window.history.length > 1
    },
    methods: {
        $routerBack() {
            if (this.isFromHXTrip) {
                this.$router.back()
            } else {
                this.$router.replace({
                    name: 'Home'
                })
            }
        }
    }
}
