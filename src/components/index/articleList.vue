<template>
  <div class="allBoxA">
    <el-input
      class="search-title"
      placeholder="输入关键字进行过滤"
      v-model="filterText">
    </el-input>

    <el-menu :default-active="activeName" :default-openeds="openeds" class="el-menu-vertical-demo">
      <el-submenu 
          v-for="(item1, index1) in treeData"
          :index="index1 + ''">

        <template slot="title">{{item1.label}}</template>

        <el-submenu class="two-box"
            v-for="(item2, index2) in item1.children"
            :index="index1 + '-' + index2">
          <template slot="title">
            {{item2.label}}
            <span @click.stop="setData(item1.nodeCode, item2.nodeCode)" class="add-box">
            +
            </span>
          </template>

          <el-menu-item
              v-for="(item3, index3) in item2.children"
              :index="index1 + '-' + index2 + '-' + index3">

                <div class="lists-box"
                    :data-index="index1 + '-' + index2 + '-' + index3"
                    :id="'tree' + item3.nodeCode"
                    @click="getInfo(item3.nodeCode, item2.nodeCode)">

                  <img class="img-box" :src="item3.imgUrl">

                  <div class="p-box">

                    <span class="title">{{item3.label}}</span>

                    <div>
                      <img v-if="!item3.status"
                          @click.stop="submitItem(item3.nodeCode)"
                          src="../../assets/images/yfb.png">

                      <img v-if="!item3.status"
                          @click.stop="delItem(item3.nodeCode)"
                          src="../../assets/images/delete-icon.png">
                    </div>
                  </div>
                </div>
          </el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>

    <el-dialog title="订阅客户" :visible.sync="dialogFormVisible">

      <section class="checkBox">
        <el-checkbox-group v-model="checkedRoles">
          <el-checkbox v-for="(role, index) in roleList"
                        :label="role.enterpriseCode"
                        :key="index">{{role.enterpriseCname}}</el-checkbox>
        </el-checkbox-group>
      </section>

      <el-pagination
            layout="prev, pager, next"
            :page-size="pageSize"
            @current-change="changePage"
            :total="total">
      </el-pagination>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmSub">确 定</el-button>
      </div>
    </el-dialog>

    <add-article :is-add="isAdd" :add-data="addData" @addSucess="reLoadList"></add-article>

  </div>
</template>
<script>
  import util from '../../assets/common/util'
  import addArticle from './addArticle'
  import $ from 'Jquery'
  export default{
    data(){
      return {
        isAdd: {
          value: false
        },
        filterText: '',
        treeData: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        activeName: '0-0-0',
        openeds: ['0', '0-0'],
        addData: {},
        roleList: [],
        checkedRoles: [],
        dialogFormVisible: false,
        currentData: {},
        pageSize: 21,
        pageNumber: 1,
        total: 0
      }
    },
    mounted(){
      this.loadList()
    },
    watch: {
      filterText (value) {
        var opens = []
        if (value === '') {
          let arrs = this.activeName.split('-')
          opens = [arrs[0], arrs[0] + '-' + arrs[1]]
          this.openeds = opens
          return false
        }
        if (!this.treeData[0].children || !this.treeData[0].children.length) {
          return false
        }
        this.treeData.forEach((item1, index1) => {
          // 外层有，打开
          if (item1.label.indexOf(value) > -1) {
            opens.push(String(index1))
          }

          if (!item1.children || !item1.children.length) {
            return false
          }
          // 外层没有，内层有，也要打开外层
          item1.children.forEach((item2, index2) => {
            if (item2.label.indexOf(value) > -1) {
              opens.push(String(index1))
              opens.push(String(index1 + '-' + index2))
            }

            if (!item2.children || !item2.children.length) {
              return false
            }

            item2.children.forEach((item3, index3) => {
              if (item3.label.indexOf(value)> -1) {
                opens.push(String(index1))
                opens.push(String(index1 + '-' + index2))
              }
            })
          })
        })
        this.openeds = opens
      }
    },
    methods: {
      loadList(){
        util.request({
          method: 'get',
          interface: 'spreadTree',
          data: {}
        }).then(res => {
          this.treeData = this.filterData(res.result.result)

          //存在第一课树且没有params时，及初始化时
          if (this.treeData[0].children.length && this.treeData[0].children[0].children.length && !this.$route.params.code) {

            var data = {
              code: this.treeData[0].children[0].children[0].nodeCode
            }
            localStorage.setItem('code', data.code)
            localStorage.setItem('dirCode', this.treeData[0].children[0].nodeCode)
            this.$emit('getInfo', data)
          }
        })
      },
      reLoadList (data) {
        util.request({
          method: 'get',
          interface: 'spreadTree',
          data: {}
        }).then(res => {
          this.treeData = this.filterData(res.result.result)

          setTimeout(() => {
            this.activeName = document.getElementById('tree' + data.code).getAttribute('data-index')
            var treeList = this.activeName.split('-')
            this.openeds = [treeList[0], treeList[0] + '-' + treeList[1]]

            localStorage.setItem('code', data.code)
            localStorage.setItem('dirCode', this.treeData[treeList[0]].children[treeList[1]].nodeCode)
            this.$emit('getInfo', data)
          }, 0)
        })
      },
      filterData (datas) {
        var opDatas = datas.concat([])
        opDatas = opDatas.filter((item1, index1) => {
          return item1.children && item1.children.length
        })

        return opDatas
      },
      setData (code1, code2) {
        this.addData = {
          code1: code1,
          code2: code2
        }
        this.isAdd.value = true
      },
      getInfo (code, dirCode) {
        var data = {
          code: code
        }
        localStorage.setItem('code', data.code)
        localStorage.setItem('dirCode', dirCode)
        this.$emit('getInfo', data)
      },
      delItem (id) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteArticleById(id)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      confirmSub () {
        util.request({
          method: 'post',
          interface: 'sendSubscriberArticle',
          data: {
            articleCode: this.currentData.id,
            subscriber: this.checkedRoles.join(',')
          }
        }).then(res => {
          this.treeData[this.currentData.index1].children[this.currentData.index2].children[this.currentData.index3].status = res.result.result
          this.$message({
            type: 'success',
            message: '发布成功!'
          })
          this.dialogFormVisible = false
        })
      },
      changePage (size) {
        $('.allBox .el-dialog__body .el-checkbox-group').scrollTop(252 * (size - 1))
      },
      submitItem (id, index1, index2, index3) {
        this.checkedRoles = []
        this.currentData = {
          id: id,
          index1: index1,
          index2: index2,
          index3: index3
        }
        
        util.request({
          method: 'get',
          interface: 'enterpriseList',
          data: {
            key: 'value'
          }
        }).then(res => {
          this.roleList = res.result.result
          this.total = this.roleList.length
          this.dialogFormVisible = true
        })
      },
      deleteArticleById (id) {
        util.request({
          method: 'post',
          interface: 'deleteDraftFile',
          data: {
            html5PageCode: id
          }
        }).then(res => {
          this.loadList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }
    },
    components: {
      addArticle
    }
  }
</script>
<style lang="scss">
  .allBoxA {
    width: 400px;
    background: #F9F9F9;

    .el-dialog__body {

      .el-pagination {
        padding: 0;
      }

      .el-checkbox-group {
        max-height: 252px;
        overflow: hidden;

        .el-checkbox {
          width: 190px;
          float: left;
          margin: 0;
          box-sizing: border-box;
          margin-bottom: 15px;
          margin-right: 10px;
          overflow: hidden;
        }
      }
    }

    .el-dialog--small {
      width: 640px;
    }

    .search-title {
      margin: 10px 0;
      padding: 0 10px;
      box-sizing: border-box;
    }

    .el-submenu {
      .el-submenu__title {
        font-size: 16px;
        color: #000000;
        background: #F0F0F0;
        border-bottom: 1px solid #E0E0E0;

        &:hover {
          background: #EFF2F7;
        }
      }
    }

    .two-box {
      background: #F9F9F9;

      .add-box {
        float: right;
        font-size: 30px;
        margin-right: 30px;
        line-height: 56px;
        margin-top: -4px;
        color: #000000;
      }
  
      .el-submenu__title {
        font-size: 14px;
        color: #000000;
        background: #F9F9F9;
        border-bottom: 1px solid #E0E0E0;

        &:hover {
          background: #EFF2F7;
        }
      }

      .el-menu-item {
        height: 60px;
        background: #F9F9F9;
        border-bottom: 1px solid #E0E0E0;

        .lists-box {
          position: relative;
          display: block;
          width: 100%;
          height: 60px;
          box-sizing: border-box;
          cursor: pointer;

          .img-box {
            float: left;
            width: 50px;
            height: 30px;
            margin: 15px 15px 0 0;
          }

          .p-box {
            float: left;
            width: 200px;
            margin-top: 10px;

            .title {
              display: block;
              font-size: 14px;
              height: 40px;
              color: #000000;
              line-height: 20px;
              white-space: normal;
              word-wrap:break-word;
              word-break:break-all;
            }

            div {
              display: none;
              position: absolute;
              right: -27px;
              top: 10px;
              width: 48px;
              height: 16px;
              cursor: pointer;

              img {
                float: right;
                width: 16px;
                height: 16px;
                margin-left: 8px;

                &:hover {
                  opacity: 0.8;
                }
              }
            }
          }
        }

        &.is-active {
          background: #EFF2F7;
        }

        &:hover {
          background: #EFF2F7;

          .p-box div {
            display: block;
          }
        }
      }
    }
  }
</style>
