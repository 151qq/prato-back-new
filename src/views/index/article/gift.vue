<template>
    <div class="float-box flexBox" v-cloak>
        <!-- 左侧文章列表 -->
        <section class="leftBox">
            <gift-list ref="listBox" @getInfo="getInfo"></gift-list>
        </section>
        <!-- 中间文章编辑区域 -->
        <div class="body-mid flexItem">
            <form-gift ref="editBox" @updateTree="updateTree"></form-gift>
        </div>
    </div>
    
</template>
<script>
import giftList from '../../../components/index/giftList.vue'
import formGift from '../../../components/index/formGift'
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
        giftList,
        formGift
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