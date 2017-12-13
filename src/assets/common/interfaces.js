/**
 * Created by zhangbin on 2017/7/6.
 */
const platform = "/E2-Platform/"
export default {
    interfaces: {
        "authentication": platform + "authentication.json",     //登录
        "uploadArticleAreaImage": platform + "siteEdit/uploadArticleAreaImage.json",   //图片上传接口
        "deleteDraftFile": platform + "html5SiteInfo/deleteDraftFile.json",                       //文章删除接口,参数 html5PageCode,id
        "mediaList": platform + "html5SiteInfo/mediaList.json",
        "getUserInfo": platform + "getUserInfo.json",
        "draftArticle": platform + "siteEdit/draftArticle.json",          //保存草草
        "publishArticle": platform + "siteEdit/publishArticle.json",       //发布
        "changePassword": platform + "changePassword.json",         //修改密码
        "getTelCode": "/static/api/common/telcode.json",      // 获取手机验证码
        "forgetPassword": "/static/api/common/telcode.json",   // 提交新密码

        /**
        * 上传头像 post                                
        */
        "headImage": platform + "headImage.json",
        "logout": platform + 'logout.json',
        "changePassword": platform + "changePassword.json",         //修改密码
        "resetPassword": platform + "resetPassword.json",  // 重置密码
        "imageUpload": platform + 'houses/image/upload.json',
        uploadFile: platform + 'platformFile/uploadFile.json',

        /**
        * 企业 get
        */
        showAllEnt: platform + 'enterprise/showAllEnt.json',
        showEnterpriseInfo: platform + 'enterprise/showEnterpriseInfo.json',
        manageEnterpriseInfo: platform + 'enterprise/manageEnterpriseInfo.json',
        removeEnterpriseInfo: platform + 'enterprise/removeEnterpriseInfo.json',
        disOfEnterpriseInfo: platform + 'enterprise/disOfEnterpriseInfo.json',


        /**
        * 客服 get
        */
        insertCallCenterConfig: platform + 'callCenterConfig/insertCallCenterConfig.json',
        updateCallCenterConfig: platform + 'callCenterConfig/updateCallCenterConfig.json',
        findCallCenterConfig: platform + 'callCenterConfig/findCallCenterConfig.json',

        /**
        * 我的素材库 get
        */
        listPage: platform + 'material/listPage.json',
        materialFolderInsert: platform + 'material/materialFolderInsert.json',
        materialFolderDelete: platform + 'material/materialFolderDelete.json',
        materialFolderUpdate: platform + 'material/materialFolderUpdate.json',
        /**
        * 我的素材库大图 get
        * id 素材分类id
        */
        getSourceBig: '/static/api/source/bigImgs.json',
        /**
        * 添加素材tab post
        * name
        */
        createTab: '/static/api/source/createTab.json',
        /**
        * 添加素材tab post
        * id 素材分类id
        */
        deleteTab: '/static/api/source/createTab.json',
        /**
        * 删除素材tab img post
        * id 素材分类id
        * imgs []
        */
        deleteImgs: '/static/api/source/createTab.json',
        /**
        * 添加素材tab img post
        * id 素材分类id
        * imgs []
        */
        addImgs: '/static/api/source/createTab.json',
        /**
        * 更新素材tab name post
        * id 素材分类id
        * name
        */
        putSource: '/static/api/source/updateSource.json',
        /**
        * 我的任务列表 get
        * pageSize 每页多少条
        * currentPage 当前页数
        */
        notice: '/static/api/common/notice.json',
        /**
        * 任务详情 get
        * id 任务标识
        */
        noticeDetail: '/static/api/common/noticeDetail.json',
        /**
        * 获取二维码 get
        * path
        */
        getEwm: '/static/api/common/getEwm.json',
        /**
        * 发送邮件 post
        * email 邮件地址
        * id 报告序列标识
        */
        sendMail: '/static/api/report/sendMail.json',


        /**
        * 产品树 get
        */
        productTree: '/static/api/product/productTree.json',
        /**
        * 产品基础信息 get
        * id 产品序列标识
        */
        proinfo: '/static/api/product/info.json',
        /**
        * 产品信息 get
        * id 产品序列标识
        */
        probase: '/static/api/product/base.json',
        /**
        * 产品类型 get
        * id 产品序列标识
        */
        protype: '/static/api/product/type.json',
        /**
        * 规格 get
        * id 楼盘序列标识
        */
        prospec: '/static/api/product/prospec.json',
        /**
        * 产品介绍 get
        * id 产品序列标识
        */
        proarticle: '/static/api/product/article.json',
        /**
        * 产品图片图片 get
        * id 产品序列标识
        */
        proimgs: '/static/api/product/proimgs.json',
        /**
        * 物业外观图片 get
        * id 楼盘序列标识
        */
        pubimgs: '/static/api/product/pubimgs.json',


        /**
        * 营销树 get
        */
        eventInfoList: platform + 'event/eventInfoList.json',
        eventInfoDelete: platform + 'event/eventInfoDelete.json',
        eventInfoGet: platform + 'event/eventInfoGet.json',
        eventInfoInsert: platform + 'event/eventInfoInsert.json',
        eventInfoUpdate: platform + 'event/eventInfoUpdate.json',
        eventInfoChangeStatus: platform + 'event/eventInfoChangeStatus.json',


        couponInfoList: platform + 'coupon/couponInfoList.json',
        couponInfoDelete: platform + 'coupon/couponInfoDelete.json',
        couponInfoInsert: platform + 'coupon/couponInfoInsert.json',
        couponInfoGet: platform + 'coupon/couponInfoGet.json',
        couponInfoUpdate: platform + 'coupon/couponInfoUpdate.json',
        couponInfoChangeStatus: platform + 'coupon/couponInfoChangeStatus.json',
        getCouponType: platform + 'coupon/getCouponType.json',



        /**
        * 推荐文章 get
        * key 搜索时使用，返回搜索相关数据
        */
        articleList: '/static/api/article/articleList.json',
        /**
        * 推广文章 get
        */
        // spreadTree: '/static/api/article/articleTree.json',
        spreadTree: platform +'report/reportTree.json',
        draftArticle: platform + 'siteEdit/draftArticle.json',
        findArticleByFileCode: platform + 'siteEdit/findArticleByFileCode.json',
        getInvestors: platform +'getUserInfoByRoleCode.json',
        findRecommendArticleByCode: platform + 'siteEdit/findRecommendArticleByCode.json',
        setArticles: platform + 'siteEdit/setRecommendArticle.json',
        saveArticleArea: platform + 'siteEdit/saveArticleArea.json',
        /**
        * 推广文章 get
        */
        articleInfo: '/static/api/article/articleInfo.json',
        /**
        * 获取文章通过ids get
        * ids 文章报告id eg: [1,2,3]
        */
        articleGetByIds: '/static/api/article/articleGetByIds.json',
        /**
        * 文章统计 get
        * ids 文章报告id eg: [1,2,3]
        */
        articleEchart: '/static/api/article/articleEchart.json',

        getCitys: '/static/api/common/city.json'
    }
}
