<template>
    <div class="float-box flexBox" v-cloak>
        <!-- 左侧文章列表 -->
        <section class="leftBox">
            <callcenter-dir ref="listBox" :path-name="'article-list'"></callcenter-dir>
        </section>
        <!-- 中间文章编辑区域 -->
        <div class="body-mid flexItem">
            <article-form></article-form>
        </div>
    </div>
</template>
<script>
import callcenterDir from '../../../components/dirList/callcenterDir'
import articleForm from './articleForm.vue'
import util from '../../../assets/common/util'

export default {
    data () {
        return {}
    },
    components: {
        callcenterDir,
        articleForm
    }
}
</script>