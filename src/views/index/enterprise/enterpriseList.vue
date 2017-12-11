<template>
    <div class="float-box flexBox" v-cloak>
        <!-- 左侧文章列表 -->
        <section class="leftBox">
            <dictionary-dir ref="listBox" :path-name="'enterprise-list'"></dictionary-dir>
        </section>
        <!-- 中间文章编辑区域 -->
        <div class="body-mid flexItem">
            <enterprise-form></enterprise-form>
        </div>
    </div>
</template>
<script>
import dictionaryDir from '../../../components/dirList/dictionaryDir'
import enterpriseForm from './enterpriseForm.vue'
import util from '../../../assets/common/util'

export default {
    data () {
        return {}
    },
    components: {
        dictionaryDir,
        enterpriseForm
    }
}
</script>