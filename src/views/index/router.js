const routers = [
  {
    path: '/',
    name: 'home',
    redirect: '/market'
  },
  {
    // 营销计划
    path: '/market',
    name: 'market',
    component (resolve) {
      require.ensure(['./article/market.vue'], () => {
        resolve(require('./article/market.vue'))
      })
    }
  },
  {
    // 推广文章
    path: '/spread',
    name: 'spread',
    component (resolve) {
      require.ensure(['./article/spread.vue'], () => {
        resolve(require('./article/spread.vue'))
      })
    }
  },
  {
    // 产品中心
    path: '/product',
    name: 'product',
    component (resolve) {
      require.ensure(['./article/product.vue'], () => {
        resolve(require('./article/product.vue'))
      })
    }
  },
  {
    // 礼品中心
    path: '/gift',
    name: 'gift',
    component (resolve) {
      require.ensure(['./article/gift.vue'], () => {
        resolve(require('./article/gift.vue'))
      })
    }
  },
  {
    // 素材库
    path: '/source',
    name: 'source',
    component (resolve) {
      require.ensure(['./source/source.vue'], () => {
        resolve(require('./source/source.vue'))
      })
    }
  }
]

export default routers
