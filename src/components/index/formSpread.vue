<template>
    <div class="form-b">
        <el-collapse v-model="activeNames" @change="collChange">
          <el-collapse-item class="formStylePro" title="基本信息" name="0">
            <form-article-base ref="fromBase" :base-data="baseData" @saveData="saveForm"></form-article-base>
          </el-collapse-item>

          <div class="line-bold"></div>

          <el-collapse-item class="formStylePro editShow" title="文章正文" name="1">
            <form-edit ref="formEdit"></form-edit>
          </el-collapse-item>
          <!-- <div class="line-bold"></div> -->

          <!-- <el-collapse-item class="formStylePro editShow" title="相关文章" name="2">
            <form-article ref="formArticle" @saveData="setArticles"></form-article>
          </el-collapse-item> -->
          
          <template>
            <div class="line-bold"></div>

            <el-collapse-item class="formStylePro" title="文章统计" name="3">
              <list-statistics></list-statistics>
            </el-collapse-item>

            <div class="line-bold"></div>

            <el-collapse-item class="formStylePro" title="传播路径" name="4">
              <section class="graph-box">
                <echart-graph :id-name="'spreadGraph'"
                      :echarts-date="echartData.spreadGraph"
                      ref="spreadGraph"></echart-graph>
              </section>
            </el-collapse-item>
            <div class="line-bold"></div>

            <el-collapse-item class="formStylePro" title="文章评论" name="5">
              <list-comment :comments="comments"></list-comment>
            </el-collapse-item>
          </template>
        </el-collapse>
    </div>
</template>
<script>
import util from '../../assets/common/util'
import formEdit from '../../components/form/formEdit'
import formArticleBase from '../../components/form/formArticleBase'
import formArticle from '../../components/form/formArticle'
import upLoad from '../../components/common/upLoad'
import listStatistics from '../../components/list/listStatistics'
import echartGraph from '../../components/common/echart-graph'
import listComment from '../../components/list/listComment'

import $ from 'Jquery'

export default {
    data () {
        return {
            baseData: {},
            pageSize: 2,
            pageNumber: 1,
            total: 0,
            reportSelect: [],
            reportList: [],
            activeNames: ['1'],
            articleinfo: [],
            coverImg: '',
            articleId: '',
            echartData: {},
            comments: [],
            isFirst: true
        }
    },
    mounted () {
        var houseColl = localStorage.getItem("houseColl")
        if (houseColl) {
            this.activeNames = houseColl.split(',')
        }
    },
    methods: {
        getAllData () {
          this.getArticle()
          this.$refs.fromBase.initData()
          // this.$refs.formArticle.getData()
        },
        collChange () {
            localStorage.setItem("houseColl", this.activeNames)
            if (this.activeNames.indexOf('4') > -1 && this.isFirst) {
              this.getEhartData()
              this.isFirst = false
            }
        },
        getArticle () {
          util.request({
              method: 'get',
              interface: 'findArticleByFileCode',
              data: {
                fileCode: localStorage.getItem('code')
              }
          }).then(res => {
              var resData = res.result.result
              this.articleinfo = resData.fileAreaList ? resData.fileAreaList : []

              localStorage.setItem('articleId', resData.id)

              this.baseData = {
                title: resData.html5PageTitle,
                investor: resData.editorCode,
                coverImg: resData.html5PageindexImg,
                createTime: res.result.responsetime.split(' ')[0],
                abstract: resData.html5Summary
              }

              var data = {
                article: this.articleinfo,
                bgImg: resData.backgroundImg
              }

              this.$refs.formEdit.editInte(data)
          })
        },
        changeImg (data) {
          this.baseData.coverImg = data.url
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
                this.$refs.spreadGraph.setEcharts()
              }, 0) 
          })
        },
        saveForm () {
          var obj = {
            html5PageTitle: this.baseData.title,
            editorCode: this.baseData.investor,
            html5Summary: this.baseData.abstract,
            html5PageindexImg: this.baseData.coverImg,
            id: localStorage.getItem('articleId'),
            html5CatalogCode: localStorage.getItem('dirCode'),
            html5PageCode: localStorage.getItem('code')
          }

          this.$refs.formEdit.saveArticle(obj, this.updateTree)
        },
        updateTree () {
          var data = {
            code: localStorage.getItem('code')
          }

          this.$emit('updateTree', data)
        },
        setArticles (articles) {
          var formData = {
            articleCode: localStorage.getItem('code'),
            recommend: articles.join(',')
          }

          util.request({
              method: 'post',
              interface: 'setArticles',
              data: formData
          }).then(res => {
              console.log(res)
          })
        },
        saveAll () {
          this.saveForm()
          this.$refs.formEdit.saveAll()
          this.setArticles()
        }
    },
    components: {
        formEdit,
        formArticleBase,
        formArticle,
        upLoad,
        listStatistics,
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