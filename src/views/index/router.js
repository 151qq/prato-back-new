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
