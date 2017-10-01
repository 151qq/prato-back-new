const routers = [
  {
    path: '/',
    name: 'home',
    redirect: '/index/house/edit'
  },
  {
    path: '/index/house/:type',
    name: 'house',
    component (resolve) {
      require.ensure(['./article/house.vue'], () => {
        resolve(require('./article/house.vue'))
      })
    }
  }, {
    // 报告维护
    path: '/index/report/:type',
    name: 'report',
    component (resolve) {
      require.ensure(['./article/report.vue'], () => {
        resolve(require('./article/report.vue'))
      })
    }
  },
  {
    // 营销计划
    path: '/index/market/:type',
    name: 'market',
    component (resolve) {
      require.ensure(['./article/market.vue'], () => {
        resolve(require('./article/market.vue'))
      })
    }
  },
  {
    // 推广文章
    path: '/index/spread/:type',
    name: 'spread',
    component (resolve) {
      require.ensure(['./article/spread.vue'], () => {
        resolve(require('./article/spread.vue'))
      })
    }
  },
  {
    // 产品中心
    path: '/index/product/:type',
    name: 'product',
    component (resolve) {
      require.ensure(['./article/product.vue'], () => {
        resolve(require('./article/product.vue'))
      })
    }
  }, {
    // 素材库
    path: '/index/source',
    name: 'source',
    component (resolve) {
      require.ensure(['./source/source.vue'], () => {
        resolve(require('./source/source.vue'))
      })
    }
  }, {
    // 任务列表
    path: '/notice/detail/:id',
    name: 'notice',
    component (resolve) {
      require.ensure(['./notice/detail.vue'], () => {
        resolve(require('./notice/detail.vue'))
      })
    }
  }
]

export default routers
