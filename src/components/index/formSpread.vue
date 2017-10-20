<template>
    <div class="form-b">
        <el-collapse v-model="activeNames" @change="collChange">
          <el-collapse-item class="formStylePro" title="营销活动管理" name="0">
            <section class="status-box">
                <div class="left">
                  <a class="xj-box" @click="changeOp('down')">文章下架</a>
                  <a class="pl-box" @click="changeOp('coment')">关闭评论</a>
                  <a class="cg-box" @click="changeOp('draft')">草稿删除</a>
                </div>
                <div class="right">
                  产品状态
                  <span>{{status[code]}}</span>
                </div>
            </section>
          </el-collapse-item>
          <div class="line-bold"></div>

          <el-collapse-item class="formStylePro" title="文章封面" name="1">
            <upLoad :path="coverImg" :is-btn="true"
                :is-not-del="true"
                @changeImg="changeImg"></upLoad>
            <div class="clear"></div>
            <el-button class="save-btn" type="info" :plain="true" size="small" icon="document"
                @click="saveData('coverImg')">保存</el-button>
            <div class="clear"></div>
          </el-collapse-item>

          <div class="line-bold"></div>
          <el-collapse-item class="formStylePro" title="文章摘要" name="2">
            <textarea class="abstract-box"
                placeholder="请输入摘要文字，最多不超过40个字"
                v-model="marketAbstract">
              </textarea>
            <span class="abstract-least">还可以输入{{leastNum}}个字</span>
            <div class="clear"></div>
            <el-button class="save-btn" type="info" :plain="true" size="small" icon="document"
                @click="saveData('marketAbstract')">保存</el-button>
            <div class="clear"></div>
          </el-collapse-item>

          <div class="line-bold"></div>

          <el-collapse-item class="formStylePro editShow" title="文章" name="3">
            <form-edit ref="formEdit"></form-edit>
          </el-collapse-item>
          <div class="line-bold"></div>

          <el-collapse-item class="formStylePro editShow" title="相关文章" name="4">
            <form-article ref="formArticle" :articles="articles"></form-article>
          </el-collapse-item>
          
          <template v-if="type !== 'add'">
            <div class="line-bold"></div>

            <el-collapse-item class="formStylePro" title="文章统计" name="5">
              <section class="pie-box">
                <div class="left">
                  <echart-pie :id-name="'reedUser'"
                      :echarts-date="echartData.reedUser"
                      ref="reedUser"></echart-pie>
                </div>
                <div class="right">
                  <echart-pie :id-name="'reedNum'"
                      :echarts-date="echartData.reedNum"
                      ref="reedNum"></echart-pie>
                </div>
              </section>

              <section class="tar-box">
                <div class="left">
                  <echart-tar :id-name="'reedTop'"
                      :echarts-date="echartData.reedTop"
                      ref="reedTop"></echart-tar>
                </div>
                <div class="right">
                  <echart-tar :id-name="'shareTop'"
                      :echarts-date="echartData.shareTop"
                      ref="shareTop"></echart-tar>
                </div>
              </section>

              <section class="pie-box">
                <div class="left">
                  <echart-pie :id-name="'shareStatisticsPublic'"
                      :echarts-date="echartData.shareStatisticsPublic"
                      ref="shareStatisticsPublic"></echart-pie>
                </div>
                <div class="right">
                  <echart-pie :id-name="'shareStatisticsPravite'"
                      :echarts-date="echartData.shareStatisticsPravite"
                      ref="shareStatisticsPravite"></echart-pie>
                </div>
              </section>

              <section class="pie-box">
                <div class="left">
                  <echart-pie :id-name="'comentStatistics'"
                      :echarts-date="echartData.comentStatistics"
                      ref="comentStatistics"></echart-pie>
                </div>
                <div class="right">
                  <echart-pie :id-name="'askStatistics'"
                      :echarts-date="echartData.askStatistics"
                      ref="askStatistics"></echart-pie>
                </div>
              </section>

            </el-collapse-item>

            <div class="line-bold"></div>

            <el-collapse-item class="formStylePro" title="文章传播" name="6">
              <section class="graph-box">
                <echart-graph :id-name="'spreadGraph'"
                      :echarts-date="echartData.spreadGraph"
                      ref="spreadGraph"></echart-graph>
              </section>
            </el-collapse-item>
            <div class="line-bold"></div>

            <el-collapse-item class="formStylePro" title="文章评论" name="7">
              <list-comment :comments="comments"></list-comment>
            </el-collapse-item>
          </template>
        </el-collapse>
    </div>
</template>
<script>
import util from '../../assets/common/util'
import formEdit from '../../components/form/formEdit'
import formArticle from '../../components/form/formArticle'
import upLoad from '../../components/common/upLoad'
import echartPie from '../../components/common/echart-pie'
import echartTar from '../../components/common/echart-tar'
import echartGraph from '../../components/common/echart-graph'
import listComment from '../../components/list/listComment'

import $ from 'Jquery'

export default {
    data () {
        return {
            id: 0,
            code: 'down',
            status: {
              down: '下架',
              coment: '评论',
              draft: '草稿'
            },
            activeNames: ['1'],
            index: 0,
            articleinfo: [],
            type: '',
            coverImg: '',
            marketAbstract: '',
            leastNum: 40,
            articles: [],
            echartData: {},
            comments: []
        }
    },
    mounted () {
        this.type = this.$route.params.type
        if (this.type !== 'add') {
            var houseColl = localStorage.getItem("houseColl")
            if (houseColl) {
                this.activeNames = houseColl.split(',')
            }
            // this.getAllData()
        }
    },
    methods: {
        changeOp (type) {
          this.code = type
        },
        handleClose (datas, item) {
          datas.splice(datas.indexOf(item), 1)
        },
        getAllData () {
          this.getArticleInfo()
          this.$refs.formEdit.getArticle('articleHouse')
          this.getEhartData()
        },
        collChange () {
            localStorage.setItem("houseColl", this.activeNames)
        },
        abstractChange () {
          this.leastNum = 40 - this.marketAbstract.length
          if (this.leastNum === 0) {
            this.marketAbstract = this.marketAbstract.substring(0, 40)
          }
        },
        changeImg (data) {
          this.coverImg = data.url
        },
        getArticleInfo () {
          util.request({
              method: 'get',
              interface: 'articleInfo',
              data: {
                id: localStorage.getItem("id")
              }
          }).then(res => {
              this.articles = res.result.result.articles
              this.coverImg = res.result.result.coverImg
              this.marketAbstract = res.result.result.marketAbstract
              this.comments = res.result.result.comments
              setTimeout(() => {
                this.$refs.formArticle.getData()
              }, 0)
              
          })
        },
        getEhartData () {
          util.request({
              method: 'get',
              interface: 'articleEchart',
              data: {
                id: localStorage.getItem("id")
              }
          }).then(res => {
              this.echartData = res.result.result
              setTimeout(() => {
                this.$refs.reedUser.setEcharts()
                this.$refs.reedNum.setEcharts()
                this.$refs.reedTop.setEcharts()
                this.$refs.shareTop.setEcharts()
                this.$refs.shareStatisticsPublic.setEcharts()
                this.$refs.shareStatisticsPravite.setEcharts()
                this.$refs.comentStatistics.setEcharts()
                this.$refs.askStatistics.setEcharts()
                this.$refs.spreadGraph.setEcharts()
              }, 0) 
          })
        }
    },
    components: {
        formEdit,
        formArticle,
        upLoad,
        echartPie,
        echartTar,
        echartGraph,
        listComment
    }
}
</script>
<style lang="scss">
.form-b {
    margin-top: 30px;
}

.formStylePro {
    position: relative;
    width: 640px;
    margin: 0 auto;

    .pie-box, .tar-box {
      width: 640px;
      overflow: hidden;
      border-bottom: 1px solid #D3DCE6;
      padding-bottom: 30px;
      margin-bottom: 30px;

      &:last-child {
        border: none;
      }

      .left {
        width: 280px;
        float: left;
      }

      .right {
        width: 280px;
        float: right;
      }
    }

    .graph-box {
      background: #F9F9F9;
    }

    .tar-box {
      padding-bottom: 0;
      padding-top: 30px;
    }

    &:last-child {
        margin-bottom: 30px;
    }

    .echar-b {
      padding: 15px;
      border: 1px solid #D3DCE6;
      border-radius: 3px;
      margin-top: 20px;
      padding-bottom: 0;
    }
    

    .abstract-box {
      display: block;
      width: 100%;
      height: 120px;
      box-sizing: border-box;
      padding: 10px 20px;
      font-size: 14px;
      color: #475669;
      line-height: 30px;
      border-radius: 4px;
      border: none;
      background: #F9F9F9;
    }

    .abstract-least {
      display: block;
      font-size: 12px;
      color: #8492A6;
      line-height: 30px;
      text-align: right;
    }
}

.status-box {
    overflow: hidden;

    .left {
      float: left;
      width: 500px;

      a {
        float: left;
        width: 100px; 
        height: 28px;
        font-size: 14px;
        color: #ffffff;
        border-radius: 4px;
        box-sizing: border-box;
        padding-left: 34px;
        line-height: 28px;
        margin-right: 10px;
        cursor: pointer;
      }

      .xj-box {
        background: url(../../assets/images/xj-icon.png) 11px center no-repeat;
        background-color: #20A0FF;
      }

      .pl-box {
        background: url(../../assets/images/pl-icon.png) 11px center no-repeat;
        background-color: #20A0FF;
      }

      .cg-box {
        background: url(../../assets/images/cg-icon.png) 11px center no-repeat;
        background-color: #20A0FF;
      }
    }

    .right {
      float: right;
      height: 28px;
      text-align: right;
      font-size: 14px;
      line-height: 28px;
      color: #475669;

      span {
        float: right;
        height: 20px;
        padding: 0 8px;
        background: #7790B1;
        font-size: 12px;
        color: #ffffff;
        line-height: 20px;
        margin: 4px 0 0 8px;
        border-radius: 3px;
      }
    }
}

.line-bold {
    height: 9px;
    border-top: 1px solid #99A9BF;
    background: #F9F9F9;
    margin: 30px 0;
}

.el-collapse, .el-collapse-item__header, .el-collapse-item__wrap {
    background: #ffffff;
    border: none;
}

.el-collapse-item__wrap {
    padding-top: 20px;
    overflow: visible;
}

.el-collapse-item__content {
    padding: 0;
}

.el-collapse-item__header {
    padding: 0;
}

#container {
    width: 640px;
    height: 140px;
    margin: 15px 0;
}
</style>