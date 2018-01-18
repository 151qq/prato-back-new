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
        path: 'articleDetail',
        name: 'article-detail',
        component (resolve) {
          require.ensure(['./article/articleDetail.vue'], () => {
            resolve(require('./article/articleDetail.vue'))
          })
        }
      },
      {
        // 推广文章
        path: 'articleList',
        name: 'article-list',
        component (resolve) {
          require.ensure(['./article/article.vue'], () => {
            resolve(require('./article/article.vue'))
          })
        }
      },
      {
        // 产品中心
        path: 'product',
        name: 'product',
        component (resolve) {
          require.ensure(['./product/product.vue'], () => {
            resolve(require('./product/product.vue'))
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
        // 调研
        path: 'surveyList',
        name: 'survey-list',
        component (resolve) {
          require.ensure(['./survey/survey.vue'], () => {
            resolve(require('./survey/survey.vue'))
          })
        }
      },
      {
        // 调研详情
        path: 'surveyDetail',
        name: 'survey-detail',
        component (resolve) {
          require.ensure(['./survey/surveyDetail.vue'], () => {
            resolve(require('./survey/surveyDetail.vue'))
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
        // 券
        path: 'coupon',
        name: 'coupon',
        component (resolve) {
          require.ensure(['./coupon/coupon.vue'], () => {
            resolve(require('./coupon/coupon.vue'))
          })
        }
      },
      {
        // 文章模版
        path: 'articleTemplate',
        name: 'article-template',
        component (resolve) {
          require.ensure(['./articleTemplate/articleTemplate.vue'], () => {
            resolve(require('./articleTemplate/articleTemplate.vue'))
          })
        }
      },
      {
        // 会员搜索页
        path: 'member',
        name: 'member',
        component (resolve) {
          require.ensure(['./member/member.vue'], () => {
            resolve(require('./member/member.vue'))
          })
        }
      },
      {
        // 会员详情
        path: 'memberDetail',
        name: 'member-detail',
        component (resolve) {
          require.ensure(['./member/memberDetail.vue'], () => {
            resolve(require('./member/memberDetail.vue'))
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
