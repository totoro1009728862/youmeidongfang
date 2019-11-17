const domain = process.env.domain
export default async context => {
    const { app, route, redirect } = context
    const { $cookies } = app
    const userToken = $cookies.get('userToken')
    if (!userToken) {
        const { query, fullPath } = route
        if (process.server) {
            $cookies.set('originUrl', encodeURIComponent(fullPath), { domain, path: '/' })
            redirect({
                name: 'Login',
                query: {
                    ...query,
                    originUrl: encodeURIComponent(fullPath)
                }
            })
        } else if (process.client) {
            $cookies.set('originUrl', encodeURIComponent(fullPath), { domain, path: '/' })
            app.router.push({
                name: 'Login',
                query: {
                    ...query,
                    originUrl: encodeURIComponent(fullPath)
                }
            })
        }
    }
}
