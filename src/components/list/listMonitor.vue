<template>
    <section class="monitor-box">
      monitor.dateArea

      <div class="date-b">2016年5月9日</div>
      <div class="cont-b">
        {{monitor.name}}营销活动已经进行了{{monitor.day}}天，文章已经发出<span>{{monitor.pubNum}}</span>篇，今天新增阅读<span>{{monitor.reedNum}}</span>，评论<span>{{monitor.comentNum}}</span>条，客户主动咨询<span>{{monitor.askNum}}</span>次。
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
          pubNum: 0,
          reedNum: 0,
          comentNum: 0,
          askNum: 0,
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
            interface: 'monitorData',
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
.monitor-box {
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

    span {
      color: #20A0FF;
    }
  }
}
</style>