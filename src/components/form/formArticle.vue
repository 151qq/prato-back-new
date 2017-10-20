<template>
    <section class="article-box-outer">
      <el-button class="add-btn" type="primary" size="small" icon="plus" @click="addArticle">增加</el-button>
      <div v-for="(item, index) in articleSelect" class="article-box">
          <img class="article-i" :src="item.imgUrl">
          <div class="content-b">
            <p class="title">{{item.title}}</p>
            <p class="des">{{item.des}}</p>
          </div>
          <el-button class="delete-b" type="danger" :plain="true" size="small" icon="delete"
              @click="deleteArticle(index)">删除</el-button>
      </div>
      <div class="clear"></div>
      <el-button class="save-btn" type="info" :plain="true" size="small" icon="document"
          @click="saveData('articles')">保存</el-button>
      <div class="clear"></div>

      <el-dialog class="article-m" title="选择文章" :visible.sync="dialogVisible">
          <div class="articles-box" v-for="(item, index) in articleList.slice(0, 2)"
              @click="changeArticle(index)"
              :class="item.isSelected ? 'active' : ''">
            <img class="article-i" :src="item.imgUrl">
            <div class="content-b">
              <p class="title">{{item.title}}</p>
              <p class="des">{{item.des}}</p>
              <p>
                
              </p>
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
import util from '../../assets/common/util'
import './common/form.scss'
export default {
    props: ['articles'],
    data () {
        return {
          pageSize: 2,
          pageNum: 1,
          total: 0,
          articleSelect: [],
          articleList: [],
          dialogVisible: false
        }
    },
    methods: {
        getData () {
          this.getSelectList()
          this.getArticleList()
        },
        getSelectList () {
          var formD = {
            ids: this.articles
          }

          util.request({
              method: 'get',
              interface: 'articleGetByIds',
              data: formD
          }).then(res => {
              this.articleSelect = res.result.result
          })
        },
        getArticleList () {
            var formD = {
              pageSize: this.pageSize,
              pageNum: this.pageNum,
              id: localStorage.getItem("id")
            }

            util.request({
                method: 'get',
                interface: 'articleList',
                data: formD
            }).then(res => {
                this.total = res.result.total
                this.articleList = res.result.result
                this.resetArticle()
            })
        },
        deleteArticle (index) {
          if (!this.articles.length) {
            return false
          }
          
          this.articleSelect.splice(index, 1)
          this.articles.splice(index, 1)
          this.resetArticle()
        },
        resetArticle () {
          // 存储选择状态
          this.selListInit = []

          this.articleList.forEach((item) => {
            var index = this.articles.indexOf(Number(item.id))
            // 存储选择状态
            this.selListInit.push(index > -1)

            if (index > -1) {
              item.isSelected = true
            } else {
              item.isSelected = false
            }
          })
          this.articleList = this.articleList.concat([])
        },
        changeArticle (index) {
          let item = this.articleList[index]
          item.isSelected = !item.isSelected
          this.articleList = this.articleList.concat([])
        },
        addArticle () {
          this.dialogVisible = true
        },
        closeSelect () {
          this.articleList.forEach((item, index) => {
            item.isSelected = this.selListInit[index]
          })
          this.dialogVisible = false
          this.articleList = this.articleList.concat([])
        },
        confirmSelect () {
          // 存储选择状态
          this.selListInit = []
          this.articles = []
          this.articleList.forEach((item, num) => {
            var index = this.articles.indexOf(Number(item.id))
            // 存储选择状态
            this.selListInit.push(item.isSelected)

            if (index > -1 && !item.isSelected) {
              // 删除
              this.articles.splice(index, 1)
              this.articleSelect.splice(index, 1)
            } if (index < 0 && item.isSelected) {
              // 添加
              this.articles.push(item.id)
              this.articleSelect.push(item)
            }
          })
          this.dialogVisible = false
        },
        changePage (size) {
          this.pageNum = size
          this.getArticleList()
        }
    }
}
</script>
<style lang="scss">
.article-box-outer {

  .save-btn {
    margin-top: 15px;
  }

  .el-dialog--small {
    width: 478px;
  }

  .el-pagination {
    margin-top: 20px;
  }

  .article-box {
    width: 670px;
    padding: 15px;
    box-sizing: border-box;
    overflow: hidden;
    margin-left: -15px;

    &:nth-of-type(2n) {
        background: #F9F9F9;
    }

    .article-i {
      float: left;
      width: 160px;
      height: 110px;
    }

    .content-b {
      float: right;
      width: 460px;

      .title {
        font-size: 16px;
        color: #000000;
      }

      .des {
        font-size: 14px;
        color: #475669;
        line-height: 24px;
        height: 48px;
        overflow: hidden;
      }
    }

    .delete-b {
        float: right;
        display: block;
        margin-top: 4px;
        cursor: pointer;
        margin-top: 10px;
    }
  }

  .articles-box {
    width: 438px;
    heigth: 96px;
    padding: 8px 10px;
    box-sizing: border-box;
    overflow: hidden;
    margin-bottom: 14px;
    background: url(../../assets/images/check-icon.png) 398px center no-repeat;
    background-color: #EFF2F7;
    cursor: pointer;

    &.active {
      background: url(../../assets/images/check-now.png) 398px center no-repeat;
      background-color: #EFF2F7;
    }

    .article-i {
      float: left;
      width: 107px;
      height: 73px;
      border-radius: 4px;
    }

    .content-b {
      float: left;
      width: 260px;
      margin-left: 13px; 

      .title {
        font-size: 16px;
        color: #000000;
      }

      .des {
        font-size: 14px;
        color: #475669;
        line-height: 24px;
        height: 48px;
        overflow: hidden;
      }
    }
  }
}
</style>