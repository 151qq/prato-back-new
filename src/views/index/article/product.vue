<template>
    <div class="float-box flexBox" v-cloak>
        <!-- 左侧文章列表 -->
        <section class="leftBox">
            <product-list ref="listBox" @getInfo="getInfo"></product-list>
        </section>
        <!-- 中间文章编辑区域 -->
        <div class="body-mid flexItem">
            <form-product ref="editBox" @updateTree="updateTree"></form-product>
        </div>
    </div>
    
</template>
<script>
import productList from '../../../components/index/productList.vue'
import formProduct from '../../../components/index/formProduct'
import util from '../../../assets/common/util'

export default {
    data () {
        return {
        }
    },
    methods: {
        getInfo (data) {
            this.$refs.editBox.getAllData()
        },
        updateTree (data) {
            this.$refs.listBox.reLoadList(data.code)
        }
    },
    components: {
        productList,
        formProduct
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