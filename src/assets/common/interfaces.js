/**
 * Created by zhangbin on 2017/7/6.
 */
const platform = "/E2-Platform/"
export default {
    interfaces: {
        "authentication": platform + "authentication.json",
        "getUserInfo": platform + "getUserInfo.json",
        "changePassword": platform + "changePassword.json",
        "getTelCode": "/static/api/common/telcode.json",
        "forgetPassword": "/static/api/common/telcode.json",
        "headImage": platform + "headImage.json",
        "logout": platform + 'logout.json',
        "changePassword": platform + "changePassword.json",
        "resetPassword": platform + "resetPassword.json",

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
        materialFolderInsert: platform + 'material/save.json',
        materialFolderDelete: platform + 'material/delete.json',
        materialFolderUpdate: platform + 'material/update.json',
        materialCopy: platform + 'material/copy.json',
        materialMove: platform + 'material/move.json',
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
        pruductCatalogList: platform + 'product/productCatalogList.json',
        deleteProductCatalog: platform + 'product/deleteProductCatalog.json',
        saveProductCatalog: platform + 'product/saveProductCatalog.json',
        productInfoGet: platform + 'product/productInfoGet.json',
        productInfoSave: platform + 'product/productInfoSave.json',
        productInfoDelete: platform + 'product/productInfoDelete.json',
        productScenarioList: platform + 'product/productScenarioList.json',
        getProductScenario: platform + 'product/getProductScenario.json',
        productScenarioSave: platform + 'product/productScenarioSave.json',
        productScenarioDelete: platform + 'product/deleteProductScenario.json',
        productParameterList: platform + 'product/productParameterList.json',
        deleteProductParameter: platform + 'product/deleteProductParameter.json',
        productParameterSave: platform + 'product/productParameterSave.json',
        productParameterDelete: platform + 'product/deleteProductParameter.json',
        productAlbumList: platform + 'product/productAlbums.json',
        deleteProductAlbum: platform + 'product/deleteProductAlbum.json',
        productAlbumSave: platform + 'product/productAlbumSave.json',
        getProductType: platform + 'product/getProductType.json',
        productInfoList: platform + 'product/productInfoList.json',

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
        html5PageList: platform + 'html5PageList.json',
        html5PageDelete: platform + 'html5PageDelete.json',
        html5PageSubmit: platform + 'html5PageSubmit.json',
        html5PageGet: platform + 'html5PageGet.json',
        html5PageSave: platform + 'html5PageSave.json',
        html5PageAreaSave: platform + 'html5PageAreaSave.json',
        listPageArea: platform + 'listPageArea.json',
        deletePageArea: platform + 'deletePageArea.json',
        html5PageExtendInsert: platform + 'html5PageExtendInsert.json',
        html5PageExtendGet: platform + 'html5PageExtendGet.json',

        getTemplates: platform +'htmlPageTemplate/listPage.json',
        insertTemplate: platform + 'htmlPageTemplate/save.json',
        deleteTemplate: platform + 'htmlPageTemplate/delete.json',
        updateTemplate: platform +'htmlPageTemplate/update.json',
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
