require('ts-node').register({
  transpileOnly: true,
})

const config = require('../taro.config.ts').default

// —— 在这里注入 ignoreWarnings ——

// 确保 h5 配置存在
if (!config.h5) config.h5 = {}

// 保留用户原有 webpackChain（如果有）
const userChainFn = config.h5.webpackChain

config.h5.webpackChain = function (chain) {
  // 先执行用户自己的 chain
  if (typeof userChainFn === 'function') {
    userChainFn(chain)
  }

  // 再注入我们的 ignoreWarnings
  chain.merge({
    ignoreWarnings: [/webpackExports/]
  })
}

module.exports = config
