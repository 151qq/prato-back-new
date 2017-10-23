<template>
    <section class="monitor-noline-box">
      <div class="echar-b">
        <echarts-tar :id-name="'echar1'" :echarts-date="monitor.echartsData" :is-change="true" ref="echarts"></echarts-tar>
      </div>

      <div class="date-b">
        今天营销活动情况汇总
      </div>

      <section class="jsons-box">
        <div class="t-cont">
          <span class="one">外呼次数</span>
          <span class="two">{{monitor.outboundNum}}次</span>
        </div>
        <div class="t-cont">
          <span class="one">新增预约</span>
          <span class="two">{{monitor.addNum}}</span>
        </div>
      </section>

      <div class="date-b">
        营销活动汇总
      </div>

      <section class="jsons-box">
        <div class="t-cont">
          <span class="one">外呼总次数</span>
          <span class="two">{{monitor.totalNum}}次</span>
        </div>
        <div class="t-cont">
          <span class="one">新增预约总计</span>
          <span class="two">{{monitor.addCallNum}}</span>
        </div>
        <div class="t-cont">
          <span class="one">外呼预约率</span>
          <span class="two">{{monitor.outboundPer}}%</span>
        </div>
      </section>
    </section>
</template>
<script>
import util from '../../assets/common/util'
import echartsTar from '../common/echart-tar'
export default {
    data () {
      return {
        monitor: {
          name: '',
          dateArea: '',
          day: 0,
          totalNum: 0,
          successNum: 0,
          addNum: 0,
          addCallNum: 0,
          echartsData: {}
        },
        monitorEcharts: {}
      }
    },
    mounted () {
      this.getEchartsM()
    },
    methods: {
      getEchartsM () {
        util.request({
            method: 'get',
            interface: 'monitorNoline',
            data: {
              id: localStorage.getItem("id")
            }
        }).then(res => {
            this.monitor = res.result.result
            setTimeout(() => {
              console.log(this.$refs, 'refs')
              this.$refs.echarts.setEcharts()
            }, 0)
        })
      }
    },
    components: {
      echartsTar
    }
}
</script>
<style lang="scss">
.monitor-noline-box {
  width: 640px;

  .jsons-box {
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

  .date-m {
    display: block;
    margin: auto;
  }

  .date-b {
    text-align: center;
    font-size: 18px;
    margin: 20px 0;
    line-height: 30px;
    color: #20A0FF;
  }
}
</style>