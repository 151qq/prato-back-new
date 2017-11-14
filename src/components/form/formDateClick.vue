<template>
  <section class="date-outer-box">
    <section class="date-click-box">
      <section class="date-b-left">
        <date-pq
          :year="dateLeft.year"
          :month="dateLeft.month"
          :select-data="activeDate"></date-pq>
      </section>
      <section class="date-b-right">
        <date-pq
          :year="dateRight.year"
          :month="dateRight.month"
          :select-data="activeDate"></date-pq>
      </section>
      <div class="clear"></div>
    </section>
    <el-button class="save-btn" type="info" :plain="true" size="small" icon="document"
        @click="saveData('base')">保存</el-button>
    <div class="clear"></div>
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
              isHold: 1
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
  border: 1px solid #D3DCE6;
  position: relative;

  .date-b-left {
    width: 319px;
    padding: 30px 0;
    text-align: center;
    box-sizing: border-box;
    float: left;
    border-right: 1px solid #D3DCE6;
  }

  .date-b-right {
    width: 320px;
    position: absolute;
    right: 0;
    top: 0;
    padding: 30px 0;
    text-align: center;
    box-sizing: border-box;
    border-left: 1px solid #D3DCE6;
  }
}
</style>