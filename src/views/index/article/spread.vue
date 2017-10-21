<template>
    <div class="float-box flexBox" v-cloak>
        <!-- 左侧文章列表 -->
        <section class="leftBox">
            <article-list ref="listBox" @getInfo="getInfo"></article-list>
        </section>
        <!-- 中间文章编辑区域 -->
        <div class="body-mid flexItem">
            <form-spread ref="editBox" @updateTree="updateTree"></form-spread>
        </div>
    </div>
    
</template>
<script>
import articleList from '../../../components/index/articleList.vue'
import formSpread from '../../../components/index/formSpread'
import util from '../../../assets/common/util'

export default {
    data () {
        return {
        }
    },
    methods: {
        getInfo (data) {
            // 编辑区域获取初始数据
            this.$refs.editBox.getAllData()
        },
        updateTree (data) {
            this.$refs.listBox.reLoadList(data.code)
        }
    },
    components: {
        articleList,
        formSpread
    }
}
</script>
<style lang="scss">
.leftBox {
    width: 400px;
    min-height: 100%;
    background: #F0F0F0;
}
.el-collapse-item__header {
    font-size: 20px;
    color: #000000;
}
</style>