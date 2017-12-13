<template>
    <div class="float-box flexBox" v-cloak>
        <!-- 左侧文章列表 -->
        <section class="leftBox">
            <market-dir ref="listBox" :path-name="'market-list'"></market-dir>
        </section>
        <!-- 中间文章编辑区域 -->
        <div class="body-mid flexItem">
            <item-list></item-list>
        </div>
    </div>
</template>
<script>
import marketDir from '../../../components/dirList/marketDir'
import itemList from './itemList.vue'
import util from '../../../assets/common/util'

export default {
    data () {
        return {}
    },
    components: {
        marketDir,
        itemList
    }
}
</script>