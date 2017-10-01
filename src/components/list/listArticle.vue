<template>
    <section class="article-box">
      <div class="art-box" v-for="item in articleList">
        <div class="art-left">
          <p class="art-title">
            {{item.artTitle}}
          </p>
          <p class="art-date">{{item.artDate}}</p>
          <star :score="item.artScore"></star>
        </div>
        <div class="art-right">
          <img :src="item.artImg">
        </div>
        <div class="clear"></div>
        <div class="num-box">
          <p>
            <img src="../../assets/images/reed-icon.png">
            <span>阅读数</span>
            <i>{{item.artReedNum}}</i>
          </p>
          <p>
            <img src="../../assets/images/share-icon.png">
            <span>二次元分享数</span>
            <i>{{item.artShareNum}}</i>
          </p>
          <p>
            <img src="../../assets/images/coment-icon.png">
            <span>评论数</span>
            <i>{{item.artComentNum}}</i>
          </p>
          <p>
            <img src="../../assets/images/ask-icon.png">
            <span>主动咨询数</span>
            <i>{{item.artAskNum}}</i>
          </p>
        </div>
      </div>
    </section>
</template>
<script>
import util from '../../assets/common/util'
import star from '../common/star'
export default {
    data () {
      return {
        articleList: [
          {
            id: 0,
            artTitle: '文章标题文章标题文章标题文章标题文章标题文章标题，文章标题文章标题文章标题文章标题',
            artDate: '2017/08/18',
            artScore: 3.6,
            artImg: '/static/images/art1.jpg',
            artReedNum: 234,
            artShareNum: 22,
            artComentNum: 3,
            artAskNum: 4
          },
          {
            id: 1,
            artTitle: '文章标题文章标题文章标题文标题，文章标题文章标题文章标题文章标题',
            artDate: '2017/08/18',
            artScore: 4.4,
            artImg: '/static/images/art1.jpg',
            artReedNum: 234,
            artShareNum: 22,
            artComentNum: 3,
            artAskNum: 4
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
    },
    components: {
      star
    }
}
</script>
<style lang="scss">
.article-box {
  .art-box {
    overflow: hidden;
    margin-bottom: 30px;

    .art-left {
      float: left;
      width: 464px;
      margin-top: -2px;

      .art-title {
        font-size: 16px;
        color: #1F2D3D;
        line-height: 28px;
        height: 56px;
      }

      .art-date {
        font-size: 14px;
        color: #8492A6;
        line-height: 20px;
        margin-top: 7px;
        margin-bottom: 9px;
      }
    }

    .art-right {
      float: right;
      width: 160px;
      height: 110px;

      img {
        display: block;
        width: 160px;
        height: 110px;
      }
    }

    .num-box {
      width: 120%;
      margin-top: 20px;

      p {
        display: inline-block;
        margin-right: 40px;
        

        img {
          float: left;
          margin-top: 2px;
          margin-right: 5px;
        }

        span {
          float: left;
          font-size: 14px;
          color: #5E6D82;
          line-height: 20px;
          margin-right: 10px;
        }

        i {
          float: left;
          font-size: 14px;
          color: #1F2D3D;
          line-height: 20px;
        }

        &:first-child {
          img {
            margin-top: 5px;
          }
        }
      }
    }
  }
}

</style>