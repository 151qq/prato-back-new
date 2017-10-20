<template>
    <section class="date-click-box">
      <date-pq
          :year="dateLeft.year"
          :month="dateLeft.month"
          :no-right="dateLeft.noRight"
          :select-data="activeDate"></date-pq>

      <date-pq
          :year="dateRight.year"
          :month="dateRight.month"
          :no-right="dateRight.noLeft"
          :select-data="activeDate"></date-pq>
      
      <div class="clear"></div>
      <el-button class="save-btn" type="info" :plain="true" size="small" icon="document"
        @click="saveData('base')">保存</el-button>
    </section>
</template>
<script>
import datePq from '../common/date-pq'
import './common/form.scss'
export default {
    data () {
        return {
          dateLeft: {
            noRight: true,
            year: '2017',
            month: '10'
          },
          dateRight: {
            noLeft: true,
            year: '2017',
            month: '11'
          },
          activeDate: [
            {
              date: '2017-10-20',
              isHold: 0
            },
            {
              date: '2017-10-19',
              isHold: 0
            },
            {
              date: '2017-10-22',
              isHold: 0
            },
            {
              date: '2017-11-16',
              isHold: 0
            }
          ]
        }
    },
    components: {
      datePq
    }
}
</script>
<style lang="scss">
.date-click-box {
  overflow: hidden;
}
</style>