<template>
    <div class="float-box flexBox" v-cloak>
        <!-- 左侧文章列表 -->
        <section class="leftBox" v-if="$route.params.type !== 'add'">
            <articles @getInfo="getInfo"></articles>
        </section>
        <!-- 中间文章编辑区域 -->
        <div class="body-mid flexItem">
            <form-market-online v-if="marketType === 'online'" ref="editBox"></form-market-online>
            <form-market-outline v-if="marketType === 'outline'" ref="editBox"></form-market-outline>
            <form-market-noline v-if="marketType === 'noline'" ref="editBox"></form-market-noline>
        </div>
    </div>
    
</template>
<script>
import articles from '../../../components/index/list.vue'
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
            if (this.$route.params.type === 'add') {
                return false
            }

            console.log(data, 'data')

            if (data.marketType) {
                this.marketType = data.marketType
            }
            
            // 编辑区域获取初始数据
            setTimeout(() => {
                this.$refs.editBox.getAllData()
            }, 0)
        }
    },
    components: {
        articles,
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