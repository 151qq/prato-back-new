<template>
    <section class="logs-box">
      <div class="t-cont" v-for="(item, index) in logs">
        <span class="one">
          {{item.date}}
        </span>
        <span class="two">
          {{item.des}}
        </span>
      </div>
    </section>
</template>
<script>
export default {
    props: ['logs'],
    data () {
      return {
        monitor: {
          name: '',
          dateArea: '',
          day: 0,
          pubNum: 0,
          reedNum: 0,
          comentNum: 0,
          askNum: 0,
          echartsData: {}
        },
        monitorEcharts: {}
      }
    }
}
</script>
<style lang="scss">
.logs-box {
  border: 1px solid #D3DCE6;
  border-bottom: none;

  .one {
    width: 135px;
    float: left;
    min-height: 40px;
    font-size: 14px;
    color: #5E6D82;
    line-height: 40px;
    text-align: center;
  }

  .two {
    position: relative;
    width: 503px;
    float: left;
    min-height: 40px;
    border-left: 1px solid #D3DCE6;
    font-size: 14px;
    color: #5E6D82;
    box-sizing: border-box;
    padding: 0 22px;
    line-height: 40px;
    text-align: left;
  }

  .t-title {
    overflow: hidden;
    border-bottom: 1px solid #D3DCE6;
    background: #F0F0F0;
  }

  .t-cont {
    overflow: hidden;
    cursor: pointer;
    border-bottom: 1px solid #D3DCE6;

    &:nth-child(odd) {
      background: #f9f9f9;
    }

    &:hover {
      background: #EFF2F7;
    }
  }
}
</style>