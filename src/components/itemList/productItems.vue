<template>
  <div class="leftBoxList">
    <section class="head-part">
        <span class="add-dir" @click="addItem">添加方案</span>
    </section>
    <el-menu :default-active="activeName" class="el-menu-vertical-demo">
        <el-menu-item
            class="one-list"
            v-for="(item, index) in treeData"
            :index="index + ''">
            <router-link
                class="lists-box"
                :to="{name: pathName, query: {index: index, type: item.eventCode, enterpriseCode: item.enterpriseCode, page: pageNumber}}">
                
                <div class="img-box">
                  <img v-if="item.eventPlanCover" :src="item.eventPlanCover">
                </div>

                <div class="p-box">
                    <span class="title">{{item.eventPlanTitle}}</span>

                    <div  class="btn-box">
                        <i  v-if="item.eventPlanStatus == 'draft'"
                            class="el-icon-circle-close btn-icon"
                            @click.stop="deleteItem(item.eventCode, index)"></i>

                        <i  v-if="item.eventPlanStatus == 'draft'"
                            class="el-icon-document btn-icon"
                            @click.stop="changeStatus(item.eventCode, index)"></i>
                    </div>
                </div>
            </router-link>
        </el-menu-item>
    </el-menu>
    <section class="page-box">
      <span v-if="pageNumber > 1" class="page-up" @click="loadUp">上一页</span>
      <span v-if="pageNumber < maxPage" class="page-down" @click="loadDown">下一页</span>
    </section>

    <el-dialog title="添加方案" :visible.sync="isAddItem">
      <el-form :label-position="'left'" :model="addItemForm" label-width="80px">
        <el-form-item label="方案名称">
            <el-input v-model="addItemForm.title" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
            <el-button @click="isAddItem = false">取 消</el-button>
            <el-button type="primary" @click="confirmItem">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import util from '../../assets/common/util'
  import upload from '../../components/common/upload'

  export default{
    props: ['pathName'],
    data(){
      return {
        treeData: [],
        activeName: '',
        openeds: [],
        isAddItem: false,
        addItemForm: {
            title: ''
        },
        pageSize: 20,
        pageNumber: 1,
        maxPage: 1,
        total: 0
      }
    },
    mounted(){
      this.pageNumber = this.$route.query.index / 20 + 1
      this.loadList('reload')
    },
    watch: {
      $route () {
        setTimeout(() => {
          this.activeName = String(this.$route.query.index % 20)
        }, 0)
      }
    },
    methods: {
      loadList(type){
        var formData = {
          enterpriseCode: this.$route.query.enterpriseCode,
          pageSize: this.pageSize,
          pageNumber: this.pageNumber
        }

        util.request({
          method: 'get',
          interface: 'eventInfoList',
          data: formData
        }).then(res => {
          if (res.result.success != '1') {
            this.$message.error(res.result.message)
            return
          }

          this.total = res.result.total
          this.maxPage = this.total / this.pageSize
          this.treeData = res.result.result

          // 无类型或需要重新加载目录时
          if (!this.treeData.length) {
            return
          }

          // 删除非当前选中或刷新页面，保留当前
          if (type) {
            setTimeout(() => {
              this.activeName = String(this.$route.query.index % 20)
            }, 0)
            return
          }

          var pathObj = {
            name: this.pathName,
            query: {
              index: 0,
              type: this.treeData[0].eventCode,
              enterpriseCode: this.treeData[0].enterpriseCode
            }
          }

          setTimeout(() => {
            this.activeName = '0'
          }, 0)
          this.$router.push(pathObj)
        })
      },
      loadDown () {
        this.pageNumber++
        if (this.pageNumber > this.maxPage) {
          this.pageNumber = this.maxPage
          return
        }
        this.loadList()
      },
      loadUp () {
        this.pageNumber--
        if (this.pageNumber < 1) {
          this.pageNumber = 1
          return
        }
        this.loadList()
      },
      addItem () {
        this.isAddItem = true
      },
      changeImg (data) {
        this.addItemForm.url = data.url
      },
      confirmItem () {
        if (!this.addItemForm.title) {
          this.$message.error('方案名称不能为空！')
          return
        }

        var formData = {
            enterpriseCode: this.$route.query.enterpriseCode,
            eventPlanTitle: this.addItemForm.title
        }

        util.request({
            method: 'post',
            interface: 'eventInfoInsert',
            data: formData
        }).then(res => {
            if (res.result.success == '1') {
              this.isAddItem = false
              this.pageNumber = 1
              this.loadList()
            } else {
              this.$message.error(res.result.message)
            }
        })
      },
      changeStatus (code, index) {
        this.$confirm('此操作将发布该方案, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.submitMarket(code)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消发布'
          })
        })
      },
      submitMarket (code) {
        util.request({
          method: 'post',
          interface: 'eventInfoChangeStatus',
          data: {
            eventCode: code
          }
        }).then(res => {
          if (res.result.success == '1') {
            this.loadList('reload')
            this.$message({
              type: 'success',
              message: '删除发布!'
            })
          } else {
            this.$message.error(res.result.message)
          }
        })
      },
      deleteItem (code, index) {
        this.$confirm('此操作将删除该方案, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteItemByCode(code, index)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      deleteItemByCode (code, index) {
        util.request({
          method: 'post',
          interface: 'eventInfoDelete',
          data: {
            eventCode: code
          }
        }).then(res => {
          if (res.result.success == '1') {
            this.loadList()

            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          } else {
            this.$message.error(res.result.message)
          }
        })
      }
    },
    components: {
      upload
    }
  }
</script>
