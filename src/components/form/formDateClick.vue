<template>
    <section class="date-click-box">
      activeDate
      
      <div class="clear"></div>
      <el-button class="save-btn" type="info" :plain="true" size="small" icon="document"
        @click="saveData('base')">保存</el-button>
    </section>
</template>
<script>
import './common/form.scss'
export default {
    data () {
        return {

        }
    }
}
</script>
<style lang="scss">
.date-click-box {
  overflow: hidden;
}
</style>