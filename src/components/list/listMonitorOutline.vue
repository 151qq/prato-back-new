<template>
    <section class="monitor-outline-box">
      <section class="date-monitor-box">
        <section class="date-b-left">
          <date-pq
            :year="dateLeft.year"
            :month="dateLeft.month"
            :no-click="true"
            :select-data="activeDate"></date-pq>
        </section>
        <section class="date-b-right">
          <date-pq
            :year="dateRight.year"
            :month="dateRight.month"
            :no-click="true"
            :select-data="activeDate"></date-pq>
        </section>
      </section>

      <div class="date-b">2016年5月9日</div>
      <div class="cont-b">
        {{monitor.name}}营销活动已经举报活动{{monitor.hostNum}}次，还将举办{{monitor.mayNum}}次，比原计划多（少）举办{{monitor.muchNum}}次
      </div>

      <div id="container"></div>

      <div class="date-b">
        本次地面推广活动情况
      </div>

      <section class="jsons-box">
        <div class="t-cont">
          <span class="one">到场客户</span>
          <span class="two">{{monitor.comeNum}}人</span>
        </div>
        <div class="t-cont">
          <span class="one">新增潜客</span>
          <span class="two">{{monitor.newNum}}人</span>
        </div>
      </section>

      <div class="date-b">
        营销活动汇总
      </div>

      <section class="jsons-box">
        <div class="t-cont">
          <span class="one">到场客户总计</span>
          <span class="two">{{monitor.totalNum}}人</span>
        </div>
        <div class="t-cont">
          <span class="one">新增潜客总计</span>
          <span class="two">{{monitor.newTotalNum}}人</span>
        </div>
        <div class="t-cont">
          <span class="one">到场客户中位数</span>
          <span class="two">{{monitor.comMidNum}}人</span>
        </div>
        <div class="t-cont">
          <span class="one">新增潜客中位数</span>
          <span class="two">{{monitor.newMidNum}}人</span>
        </div>
      </section>

      <div class="echar-b">
        <echarts-tar :id-name="'echar1'" :echarts-date="monitor.echartsData" :is-change="true" ref="echarts"></echarts-tar>
      </div>
    </section>
</template>
<script>
import util from '../../assets/common/util'
import datePq from '../common/date-pq'
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
        monitorEcharts: {},
        dateLeft: {
          year: '2017',
          month: '10'
        },
        dateRight: {
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
      echartsTar,
      datePq
    }
}
</script>
<style lang="scss">
.monitor-outline-box {
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

  .date-monitor-box {
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