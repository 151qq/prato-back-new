<template>
    <div class="float-box flexBox" v-cloak>
        <!-- 左侧文章列表 -->
        <section class="leftBox">
            <callcenter-dir ref="listBox" :path-name="'callcenter'"></callcenter-dir>
        </section>
        <!-- 中间文章编辑区域 -->
        <div class="body-mid flexItem">
            <callcenter-form></callcenter-form>
        </div>
    </div>
</template>
<script>
import callcenterDir from '../../../components/dirList/callcenterDir'
import callcenterForm from './callcenterForm.vue'
import util from '../../../assets/common/util'

export default {
    data () {
        return {}
    },
    components: {
        callcenterDir,
        callcenterForm
    }
}
</script>