<template>
    <section class="monitor-box">
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

      <div class="date-b">今天活动成果汇总</div>

      <section class="jsons-box">
        <div class="t-cont">
          <span class="one">新增阅读</span>
          <span class="two">{{monitor.reedNum}}次</span>
        </div>
        <div class="t-cont">
          <span class="one">新增评论</span>
          <span class="two">{{monitor.comentNum}}条</span>
        </div>
        <div class="t-cont">
          <span class="one">新增分享</span>
          <span class="two">{{monitor.shareNum}}次</span>
        </div>
        <div class="t-cont">
          <span class="one">新发优惠券</span>
          <span class="two">{{monitor.quanNum}}张</span>
        </div>
        <div class="t-cont">
          <span class="one">新增客户咨询</span>
          <span class="two">{{monitor.askNum}}次</span>
        </div>
        <div class="t-cont">
          <span class="one">新派发积分</span>
          <span class="two">{{monitor.integralNum}}分</span>
        </div>
      </section>
      
      <div class="echar-b">
        <echarts-tar :id-name="'echar1'" :echarts-date="monitor.echartsData" :is-change="true" ref="echarts"></echarts-tar>
      </div>

      <div class="date-b">活动总进程</div>

      <section class="jsons-box">
        <div class="t-cont">
          <span class="one">活动进程</span>
          <span class="two">第{{monitor.processDay}}天</span>
        </div>
        <div class="t-cont">
          <span class="one">文章</span>
          <span class="two">{{monitor.articleNum}}篇</span>
        </div>
        <div class="t-cont">
          <span class="one">总阅读</span>
          <span class="two">{{monitor.allReedNum}}次</span>
        </div>
        <div class="t-cont">
          <span class="one">总评论</span>
          <span class="two">{{monitor.allCommentNum}}条</span>
        </div>
        <div class="t-cont">
          <span class="one">总分享</span>
          <span class="two">{{monitor.allShareNum}}次</span>
        </div>
        <div class="t-cont">
          <span class="one">派发优惠券</span>
          <span class="two">{{monitor.subQuanNum}}张</span>
        </div>
        <div class="t-cont">
          <span class="one">客户主动咨询</span>
          <span class="two">{{monitor.autoAskNum}}次</span>
        </div>
        <div class="t-cont">
          <span class="one">派发积分</span>
          <span class="two">{{monitor.SubIntegralNum}}分</span>
        </div>
        <div class="t-cont">
          <span class="one">剩余积分</span>
          <span class="two">{{monitor.lestIntegralNum}}分</span>
        </div>
      </section>
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
          day: 0,
          pubNum: 0,
          reedNum: 0,
          comentNum: 0,
          askNum: 0,
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
      echartsTar,
      datePq
    }
}
</script>
<style lang="scss">
.monitor-box {
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

    span {
      color: #20A0FF;
    }
  }
}
</style>