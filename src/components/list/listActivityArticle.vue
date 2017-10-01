<template>
    <section class="activity-article-box">
      <div class="act-box" v-for="item in activityArticles">
        <div class="act-left">
          <img :src="item.actImg">
        </div>
        <div class="act-right">
          <p class="act-title">
            {{item.actTitle}}
          </p>
          <p class="act-des">
            {{item.actDes}}
          </p>
          <p class="act-date">{{item.actDate}}</p>
        </div>
      </div>
    </section>
</template>
<script>
import util from '../../assets/common/util'
export default {
    data () {
      return {
        activityArticles: [
          {
            id: 0,
            actImg: '/static/images/art1.jpg',
            actDate: '2017-12-22',
            actTitle: '章标题文章标题文章标题文章标题文章标',
            actDes: '佳程广场总占地面积17690平方米，总建筑面积141075平方米，楼体高度：103.8米。'
          },
          {
            id: 2,
            actImg: '/static/images/art1.jpg',
            actDate: '2017-12-22',
            actTitle: '章标题文章标题文章标题文章标题文章标',
            actDes: '佳程广场总占地面积17690平方米，总建筑面积141075平方米，楼体高度：103.8米。'
          }
        ]
      }
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
    }
}
</script>
<style lang="scss">
.activity-article-box {
  .act-box {
      overflow: hidden;
      margin-bottom: 15px;
      .act-left {
        float: left;
        width: 160px;
        height: 110px;

        img {
          display: block;
          width: 160px;
          height: 110px;
        }
      }

      .act-right {
        float: right;
        width: 464px;
        margin-top: -2px;

        .act-title {
          font-size: 16px;
          color: #000000;
          line-height: 28px;
        }

        .act-des {
          font-size: 14px;
          color: #475669;
          line-height: 28px;
          height: 56px;
          margin: 4px 0;
        }

        .act-date {
          font-size: 12px;
          color: #475669;
          line-height: 20px;
        }
      }
    }
}

</style>