<template>
    <div class="float-box flexBox" v-cloak>
        <!-- 左侧文章列表 -->
        <section class="leftBox">
            <market-items ref="listBox" :path-name="'market-detail'"></market-items>
        </section>
        <!-- 中间文章编辑区域 -->
        <div class="body-mid flexItem">
            <market-form></market-form>
        </div>
    </div>
</template>
<script>
import marketItems from '../../../components/itemList/marketItems'
import marketForm from './marketForm.vue'
import util from '../../../assets/common/util'

export default {
    data () {
        return {}
    },
    components: {
        marketItems,
        marketForm
    }
}
</script>