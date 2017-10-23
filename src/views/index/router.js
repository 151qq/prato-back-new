const routers = [
  {
    path: '/',
    name: 'home',
    component (resolve) {
      require.ensure(['./main.vue'], () => {
        resolve(require('./main.vue'))
      })
    },
    children: [
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
        // 企业注册
        path: '/company',
        name: 'company',
        component (resolve) {
          require.ensure(['./company/company.vue'], () => {
            resolve(require('./company/company.vue'))
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
  },
  {
    // 登录页
    path: '/login',
    name: 'login',
    component (resolve) {
      require.ensure(['./login.vue'], () => {
        resolve(require('./login.vue'))
      })
    }
  }
]

export default routers
