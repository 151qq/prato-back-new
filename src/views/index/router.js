const routers = [
  {
    path: '/',
    name: 'home',
    redirect: '/marketList',
    component (resolve) {
      require.ensure(['./main.vue'], () => {
        resolve(require('./main.vue'))
      })
    },
    children: [
      {
        // 推广文章
        path: 'spread',
        name: 'spread',
        component (resolve) {
          require.ensure(['./article/spread.vue'], () => {
            resolve(require('./article/spread.vue'))
          })
        }
      },
      {
        // 产品中心
        path: 'productList',
        name: 'product-list',
        component (resolve) {
          require.ensure(['./product/productList.vue'], () => {
            resolve(require('./product/productList.vue'))
          })
        }
      },
      {
        // 产品中心
        path: 'productDetail',
        name: 'product-detail',
        component (resolve) {
          require.ensure(['./product/productDetail.vue'], () => {
            resolve(require('./product/productDetail.vue'))
          })
        }
      },
      {
        // 礼品中心
        path: 'gift',
        name: 'gift',
        component (resolve) {
          require.ensure(['./article/gift.vue'], () => {
            resolve(require('./article/gift.vue'))
          })
        }
      },
      {
        // 素材库
        path: 'source',
        name: 'source',
        component (resolve) {
          require.ensure(['./source/source.vue'], () => {
            resolve(require('./source/source.vue'))
          })
        }
      },
      {
        // 企业信息
        path: 'enterpriseList',
        name: 'enterprise-list',
        component (resolve) {
          require.ensure(['./enterprise/enterpriseList.vue'], () => {
            resolve(require('./enterprise/enterpriseList.vue'))
          })
        }
      },
      {
        // 企业信息详情
        path: 'enterpriseDetail',
        name: 'enterprise-detail',
        component (resolve) {
          require.ensure(['./enterprise/enterpriseDetail.vue'], () => {
            resolve(require('./enterprise/enterpriseDetail.vue'))
          })
        }
      },
      {
        // 客服配置
        path: 'callcenter',
        name: 'callcenter',
        component (resolve) {
          require.ensure(['./callcenter/callcenter.vue'], () => {
            resolve(require('./callcenter/callcenter.vue'))
          })
        }
      },
      {
        // 营销方案
        path: 'marketList',
        name: 'market-list',
        component (resolve) {
          require.ensure(['./market/marketList.vue'], () => {
            resolve(require('./market/marketList.vue'))
          })
        }
      },
      {
        // 营销方案详情
        path: 'marketDetail',
        name: 'market-detail',
        component (resolve) {
          require.ensure(['./market/marketDetail.vue'], () => {
            resolve(require('./market/marketDetail.vue'))
          })
        }
      },
      {
        // 营销方案
        path: 'coupon',
        name: 'coupon',
        component (resolve) {
          require.ensure(['./coupon/coupon.vue'], () => {
            resolve(require('./coupon/coupon.vue'))
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
