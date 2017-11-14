<template>
    <div class="float-box flexBox" v-cloak>
        <!-- 左侧文章列表 -->
        <section class="leftBox">
            <market-list ref="listBox" @getInfo="getInfo"></market-list>
        </section>
        <!-- 中间文章编辑区域 -->
        <div class="body-mid flexItem">
            <form-market ref="editBox" @updateTree="updateTree"></form-market>
        </div>
    </div>
    
</template>
<script>
import marketList from '../../../components/index/marketList.vue'
import formMarket from '../../../components/index/formMarket'
import util from '../../../assets/common/util'

export default {
    data () {
        return {
            marketType: ''
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
        marketList,
        formMarket
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