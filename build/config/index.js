const merge = require('webpack-merge')

const env = process.env.NODE_ENV || 'development'

let base = require('./base.js')

let config

switch (env) {
    case 'pro':
        config = merge(base, require('./prod.js'), {
            env: {
                domain: '/'
            }
        })
        break
    case 'integration':
        config = merge(base, require('./qa.js'), {
            env: {
                domain: '/'
            }
        })
        break
    case 'rc':
        config = merge(base, require('./stage.js'), {
            env: {
                domain: '/'
            }
        })
        break
    case 'host':
        config = merge(base, require('./host.js'), {
            env: {
                domain: '.zdserver.com'
            }
        })
        break
    case 'development':
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
