<template>
    <div class="float-box flexBox" v-cloak>
        <!-- 左侧文章列表 -->
        <section class="leftBox">
            <market-list ref="listBox" @getInfo="getInfo"></market-list>
        </section>
        <!-- 中间文章编辑区域 -->
        <div class="body-mid flexItem">
            <form-market-online v-if="marketType === 'online'" ref="editBox" @updateTree="updateTree"></form-market-online>
            <form-market-outline v-if="marketType === 'outline'" ref="editBox" @updateTree="updateTree"></form-market-outline>
            <form-market-noline v-if="marketType === 'noline'" ref="editBox" @updateTree="updateTree"></form-market-noline>
        </div>
    </div>
    
</template>
<script>
import marketList from '../../../components/index/marketList.vue'
import formMarketOnline from '../../../components/index/formMarketOnline'
import formMarketOutline from '../../../components/index/formMarketOutline'
import formMarketNoline from '../../../components/index/formMarketNoline'
import util from '../../../assets/common/util'

export default {
    data () {
        return {
            marketType: ''
        }
    },
    methods: {
        getInfo (data) {
            console.log(data)
            if (data.type) {
                this.marketType = data.type
            }
            
            // 编辑区域获取初始数据
            setTimeout(() => {
                this.$refs.editBox.getAllData()
            }, 0)
        },
        updateTree (data) {
            this.$refs.listBox.reLoadList(data.code)
        }
    },
    components: {
        marketList,
        formMarketOnline,
        formMarketOutline,
        formMarketNoline
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