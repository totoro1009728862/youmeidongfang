const merge = require('webpack-merge')

const env = process.env.NODE_ENV || 'development'

let base = require('./base.js')

let config

switch (env) {
    case 'product':
        config = merge(base, require('./prod.js'), {
            env: {
                domain: '/'
            }
        })
        break
    default:
        config = merge(base, require('./dev.js'), {
            env: {
                domain: '/'
            }
        })
        break
}

module.exports = merge(config, {
    env: {
        NODE_ENV: env
    }
})
