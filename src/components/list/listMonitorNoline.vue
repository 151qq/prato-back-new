<template>
    <section class="monitor-noline-box">
      <div class="cont-b">
        {{monitor.name}}营销活动已经进行了
        <span>{{monitor.day}}</span>天，
        外呼总次数<span>{{monitor.totalNum}}</span>，
        形成预约<span>{{monitor.successNum}}</span>次，
        今天新增外呼<span>{{monitor.addNum}}</span>，
        新增预约<span>{{monitor.addCallNum}}</span>次
      </div>

      <div class="echar-b">
        <echarts-tar :id-name="'echar1'" :echarts-date="monitor.echartsData" :is-change="true" ref="echarts"></echarts-tar>
      </div>
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

  .date-m {
    display: block;
    margin: auto;
  }

  .date-b {
    text-align: center;
    font-size: 18px;
    margin-top: 40px;
    line-height: 30px;
    color: #20A0FF;
  }

  .cont-b {
    font-size: 14px;
    color: #1F2D3D;
    line-height: 30px;
    text-align: center;

    span {
      color: #20A0FF;
    }
  }
}
</style>