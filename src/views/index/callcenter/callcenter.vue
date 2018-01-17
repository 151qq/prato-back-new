<template>
    <div class="float-box flexBox" v-cloak>
        <!-- 中间文章编辑区域 -->
        <div class="body-mid flexItem">
            <callcenter-form></callcenter-form>
        </div>
    </div>
</template>
<script>
import callcenterForm from './callcenterForm.vue'
import util from '../../../assets/common/util'

export default {
    data () {
        return {}
    },
    components: {
        callcenterForm
    }
}
</script>