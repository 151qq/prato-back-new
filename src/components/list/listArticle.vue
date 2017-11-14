<template>
    <section class="article-box">
      <div v-for="(item, index) in articleList"
          v-if="articleList.length"
          :key="index"
          class="report-box">
          <img class="report-i" :src="item.artImg">
          <div class="content-b">
            <p class="title">{{item.artTitle}}</p>
            <p class="des">{{item.artDesc}}</p>
            <p class="date">{{item.artDate}}</p>
          </div>
      </div>
      <div v-if="!articleList.length"
            class="null-box">
        还没有活动文章！
      </div>
    </section>
</template>
<script>
import util from '../../assets/common/util'
export default {
    data () {
      return {
        articleList: [
          {
            id: 0,
            artTitle: '文章标题文章标题文章标题文章标题文章标题文章标题',
            artDate: '2017/08/18',
            artImg: '/static/images/art1.jpg',
            artDesc: '文章标题文章标章标题文章标题文章标题，文章标题文'
          },
          {
            id: 1,
            artTitle: '文章标题文章标题文章标题文标题，文章章标题',
            artDate: '2017/08/18',
            artImg: '/static/images/art1.jpg',
            artDesc: '文章标题文章标标题文章标题文章标题文'
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
.article-box {
  .report-box {
    width: 670px;
    padding: 15px;
    box-sizing: border-box;
    overflow: hidden;
    margin-left: -15px;

    &:nth-of-type(2n+1) {
        background: #F9F9F9;
    }

    .report-i {
      float: left;
      width: 160px;
      height: 120px;
    }

    .content-b {
      float: right;
      width: 460px;

      .title {
        font-size: 16px;
        color: #000000;
        margin-bottom: 6px;
      }

      .des {
        font-size: 14px;
        color: #475669;
        line-height: 26px;
        height: 52px;
        overflow: hidden;
      }

      .date {
        font-size: 14px;
        color: #475669;
        line-height: 26px;
        overflow: hidden;
      }
    }
  }
}

</style>