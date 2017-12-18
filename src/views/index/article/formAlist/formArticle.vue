<template>
    <section class="article-box-outer">
      <el-button class="add-btn" type="primary" size="small" icon="plus" @click="addReport">增加</el-button>
      <div v-for="(item, index) in reportSelect"
          v-if="reportSelect.length"
          :key="index"
          class="report-box">
          <img class="report-i" :src="item.html5PageindexImg">
          <div class="content-b">
            <p class="title">{{item.html5PageTitle}}</p>
          </div>
          <el-button class="delete-b"
                      type="danger"
                      :plain="true"
                      size="small"
                      icon="delete"
                      @click="deleteReport(index)">删除</el-button>
      </div>
      <div v-if="!reportSelect.length"
            class="null-box">
        还没有推荐文章，请点击增加按钮添加！
      </div>
      <div class="clear"></div>
      <el-button class="save-btn"
                  v-if="reportSelect.length"
                  type="info"
                  :plain="true"
                  size="small"
                  icon="document"
                  @click="setArticles">保存</el-button>
      <div class="clear"></div>

      <el-dialog class="report-m" title="选择文章" :visible.sync="dialogVisible">
          <div class="articles-box" v-for="(item, index) in reportList"
              @click="changeReport(index)"
              :class="item.isSelected ? 'active' : ''">
            <img class="report-i" :src="item.html5PageindexImg">
            <div class="content-b">
              <div class="title">{{item.html5PageTitle}}</div>
            </div>
          </div>
          <el-pagination
            layout="prev, pager, next"
            :page-size="pageSize"
            @current-change="changePage"
            :total="total">
          </el-pagination>
          <div slot="footer" class="dialog-footer">
            <el-button @click="closeSelect">取 消</el-button>
            <el-button type="primary" @click="confirmSelect">确 定</el-button>
          </div>
        </el-dialog>
    </section>
</template>
<script>
import util from '../../../../assets/common/util'
export default {
    data () {
        return {
          articles: [],
          pageSize: 2,
          pageNumber: 1,
          total: 0,
          reportSelect: [],
          reportAllList: [],
          reportList: [],
          dialogVisible: false
        }
    },
    methods: {
        getData () {
          this.getReportList()
          this.getSelectList()
          this.articles = []
        },
        getSelectList () {
          var formD = {
            fileCode: localStorage.getItem('code')
          }

          util.request({
              method: 'get',
              interface: 'findRecommendArticleByCode',
              data: formD
          }).then(res => {
              this.reportSelect = res.result.result

              this.reportSelect.forEach((item) => {
                this.articles.push(item.html5PageCode)
              })
          })
        },
        getReportList () {
            util.request({
                method: 'get',
                interface: 'findRecommendArticleByCode',
                data: {}
            }).then(res => {
                this.reportAllList = res.result.result
                this.total = this.reportAllList.length
                this.resetReport()
                this.getPageReport()
            })
        },
        getPageReport () {
          var startL = this.pageSize * (this.pageNumber - 1)
          var stopL = this.pageSize * this.pageNumber
          this.reportList = this.reportAllList.slice(startL, stopL)
        },
        deleteReport (index) {
          if (!this.articles.length) {
            return false
          }
          this.articles.splice(index, 1)
          this.reportSelect.splice(index, 1)
          this.resetReport()
        },
        resetReport () {
          // 存储选择状态
          this.selListInit = []

          this.reportAllList.forEach((item) => {
            var index = this.articles.indexOf(String(item.html5PageCode))
            // 存储选择状态
            this.selListInit.push(index > -1)

            if (index > -1) {
              item.isSelected = true
            } else {
              item.isSelected = false
            }
          })
          this.reportAllList = this.reportAllList.concat([])
        },
        changeReport (index) {
          let item = this.reportList[index]
          item.isSelected = !item.isSelected
          this.reportList = this.reportList.concat([])
        },
        addReport () {
          this.dialogVisible = true
        },
        closeSelect () {
          this.reportAllList.forEach((item, index) => {
            item.isSelected = this.selListInit[index]
          })
          this.dialogVisible = false
          this.reportAllList = this.reportAllList.concat([])
        },
        confirmSelect () {
          // 存储选择状态
          this.selListInit = []
          var selects = this.articles.concat([])
          this.reportAllList.forEach((item, num) => {
            var index = selects.indexOf(item.html5PageCode)
            // 存储选择状态
            this.selListInit.push(item.isSelected)

            if (index > -1 && !item.isSelected) {
              // 删除
              selects.splice(index, 1)
              this.reportSelect.splice(index, 1)
            } if (index < 0 && item.isSelected) {
              // 添加
              selects.push(item.html5PageCode)
              this.reportSelect.push(item)
            }
          })
          this.articles = selects.concat([])
          this.dialogVisible = false
        },
        changePage (size) {
          this.pageNumber = size
          this.getPageReport()
        },
        setArticles () {
          this.$emit('saveData', this.articles)
        }
    }
}
</script>
<style lang="scss">
.article-box-outer {

  .el-dialog--small {
    width: 478px;
  }

  .report-box {
    width: 670px;
    padding: 15px;
    box-sizing: border-box;
    overflow: hidden;
    margin-left: -15px;

    &:nth-of-type(2n) {
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
    }

    .delete-b {
        float: right;
        display: block;
        margin-top: 4px;
        cursor: pointer;
    }

    .save-sub-btn {
      float: right;
      margin-top: 4px;
      margin-left: 12px;
    }
  }

  .articles-box {
    width: 438px;
    heigth: 96px;
    padding: 8px 10px;
    box-sizing: border-box;
    overflow: hidden;
    margin-bottom: 14px;
    background: url(../../../../assets/images/check-icon.png) 398px center no-repeat;
    background-color: #EFF2F7;
    cursor: pointer;

    &.active {
      background: url(../../../../assets/images/check-now.png) 398px center no-repeat;
      background-color: #EFF2F7;
    }

    .report-i {
      float: left;
      width: 107px;
      height: 80px;
      border-radius: 4px;
    }

    .content-b {
      float: left;
      width: 260px;
      margin-left: 13px; 

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
    }
  }
}
</style>