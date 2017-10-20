<template>
    <section class="monitor-outline-box">
      monitor.dateArea

      <div class="date-b">2016年5月9日</div>
      <div class="cont-b">
        {{monitor.name}}营销活动已经举报活动{{monitor.hostNum}}次，还将举办{{monitor.mayNum}}次，比原计划多（少）举办{{monitor.muchNum}}次
      </div>

      <div id="container"></div>

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
          hostNum: 0,
          mayNum: 0,
          muchNum: 0,
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
            interface: 'monitorOutline',
            data: {
              id: localStorage.getItem("id")
            }
        }).then(res => {
            this.monitor = res.result.result
            setTimeout(() => {
              this.$refs.echarts.setEcharts()
              this.drawMap(this.monitor.point)
            }, 0)
        })
      },
      drawMap (pointData) {
        var map = new window.BMap.Map('container')
        var point = new window.BMap.Point(pointData.lng, pointData.lat)
        map.centerAndZoom(point, 15)
      }
    },
    components: {
      echartsTar
    }
}
</script>
<style lang="scss">
.monitor-outline-box {
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

  #container {
    width: 640px;
    height: 140px;
    margin: 15px 0;
  }
}
</style>