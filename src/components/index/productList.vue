<template>
  <div class="allBoxA">
    <section class="head-part">
        <el-input
          class="search-title"
          placeholder="输入关键字进行过滤"
          v-model="filterText">
        </el-input>

        <span class="add-dir" @click="setOneData">+</span>
    </section>

    <el-menu :default-active="activeName" :default-openeds="openeds" class="el-menu-vertical-demo">
        <template
            v-for="(item1, index1) in treeData">
            <!-- 一级列表 -->
            <template v-if="item1.nodeType == 'list'">
                <el-menu-item
                    class="one-list"
                    v-for="(item, index) in item1.children"
                    :index="index1 + '+' + index">
                    <div class="lists-box"
                        :data-active="index1 + '+' + index"
                        :id="'list' + item.nodeCode"
                        @click="getInfo(item.nodeCode)">

                        <img class="img-box" :src="item.imgUrl">

                        <div class="p-box">

                            <span class="title">{{item.label}}</span>

                            <div>
                                <img v-if="!item.status"
                                    @click.stop="submitItem(item.nodeCode)"
                                    src="../../assets/images/yfb.png">

                                <img v-if="!item.status"
                                    @click.stop="delItem(item.nodeCode)"
                                    src="../../assets/images/delete-icon.png">
                            </div>
                        </div>
                    </div>
                </el-menu-item>
            </template>
            
            <!-- 一级目录 -->
            <el-submenu
                    v-if="item1.nodeType == 'dir'"
                    :id="'dir' + item1.nodeCode"
                    :data-opens="index1 + ''"
                    :index="index1 + ''">
                    <template slot="title">
                        {{item1.label}}
                        <span @click.stop="setTwoData(item1.nodeCode)" class="add-box">
                        +
                        </span>
                    </template>

                    <template v-for="(item2, index2) in item1.children">
                        <!-- 二级列表 -->
                        <template v-if="item2.nodeType == 'list'">
                            <el-menu-item
                                v-for="(item, index) in item2.children"
                                :index="index1 + '+' + index2 + '+' + index">
                                <div class="lists-box"
                                    :data-active="index1 + '+' + index2 + '+' + index"
                                    :data-parent="item1.nodeCode"
                                    :data-opens="index1 + ''"
                                    :id="'list' + item.nodeCode"
                                    @click="getInfo(item.nodeCode, item1.nodeCode)">

                                    <img class="img-box" :src="item.imgUrl">

                                    <div class="p-box">

                                        <span class="title">{{item.label}}</span>

                                        <div>
                                            <img v-if="!item.status"
                                                @click.stop="submitItem(item.nodeCode)"
                                                src="../../assets/images/yfb.png">

                                            <img v-if="!item.status"
                                                @click.stop="delItem(item.nodeCode)"
                                                src="../../assets/images/delete-icon.png">
                                        </div>
                                    </div>
                                </div>
                            </el-menu-item>
                        </template>
                        <!-- 二级目录 -->
                        <el-submenu
                                class="two-list"
                                v-if="item2.nodeType == 'dir'"
                                :id="'dir' + item2.nodeCode"
                                :data-parent="item1.nodeCode"
                                :data-opens="index1 + '' + '_' + index1 + '-' + index2"
                                :index="index1 + '-' + index2">
                            <template slot="title">
                                {{item2.label}}
                                <span @click.stop="setData(item1.nodeCode, item2.nodeCode)" class="add-box">
                                +
                                </span>
                            </template>
                            <!-- 三级列表 -->
                            <el-menu-item
                                    v-for="(item3, index3) in item2.children"
                                    :index="index1 + '-' + index2 + '-' + index3">

                                    <div class="lists-box"
                                        :data-active="index1 + '-' + index2 + '-' + index3"
                                        :data-parent="item2.nodeCode"
                                        :data-opens="index1 + '' + '_' + index1 + '-' + index2 + '_' + index1 + '-' + index2 + '-' + index3"
                                        :id="'list' + item3.nodeCode"
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
                    </template>
            </el-submenu>
        </template>
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

    <el-dialog title="添加一级" :visible.sync="isAddTreeOne">
      <el-form :label-position="'left'" :model="addFormOne" label-width="80px">
        <el-form-item label="标题">
            <el-input v-model="addFormOne.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="addFormOne.isSelect" label="类型选择">
            <el-radio-group v-model="addFormOne.nodeType">
                <el-radio class="radio" :label="'list'">产品</el-radio>
                <el-radio class="radio" :label="'dir'">目录</el-radio>
            </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
            <el-button @click="isAddTreeOne = false">取 消</el-button>
            <el-button type="primary" @click="addProductOne">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加二级" :visible.sync="isAddTreeTwo">
      <el-form :label-position="'left'" :model="addFormTwo" label-width="80px">
        <el-form-item label="标题">
            <el-input v-model="addFormTwo.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="addFormTwo.isSelect" label="类型选择">
            <el-radio-group v-model="addFormTwo.nodeType">
                <el-radio class="radio" :label="'list'">产品</el-radio>
                <el-radio class="radio" :label="'dir'">目录</el-radio>
            </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
            <el-button @click="isAddTreeTwo = false">取 消</el-button>
            <el-button type="primary" @click="addProductTwo">确 定</el-button>
      </div>
    </el-dialog>

    <add-product :is-add="isAdd" :add-data="addData" @addSucess="reLoadList"></add-product>

  </div>
</template>
<script>
  import util from '../../assets/common/util'
  import addProduct from './addProduct'
  import $ from 'Jquery'
  export default{
    data(){
      return {
        isAdd: {
          value: false
        },
        filterText: '',
        treeData: [],
        activeName: '',
        openeds: [],
        addData: {},
        roleList: [],
        checkedRoles: [],
        dialogFormVisible: false,
        isAddTreeOne: false,
        isAddTreeTwo: false,
        addFormOne: {
            nodeType: '',
            isSelect: true,
            title: ''
        },
        addFormTwo: {
            nodeType: '',
            isSelect: true,
            title: ''
        },
        currentData: {},
        pageSize: 21,
        pageNumber: 1,
        total: 0,
        addType: ''
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
          interface: 'productTree',
          data: {}
        }).then(res => {
          this.treeData = res.result.result
          console.log(this.treeData)

          // 一级列表显示
          if (this.treeData.length && this.treeData[0].nodeType == 'list' && this.treeData[0].children.length) {
            console.log(1)
            var data = {
              code: this.treeData[0].children[0].nodeCode
            }
            this.addFormOne.nodeType = 'list'
            this.addFormOne.isSelect = false
            setTimeout(() => {
                this.setNowState(data.code, 'list')
                this.$emit('getInfo', data)
            }, 0)
            return
          }
          // 二级列表显示
          if (this.treeData.length && this.treeData[0].nodeType == 'dir' && this.treeData[0].children.length && this.treeData[0].children[0].nodeType == 'list' && this.treeData[0].children[0].children.length) {
            console.log(2)
            var data = {
              code: this.treeData[0].children[0].nodeCode
            }
            this.addFormOne.nodeType = 'dir'
            this.addFormOne.isSelect = false
            this.addFormTwo.nodeType = 'list'
            this.addFormTwo.isSelect = false
            setTimeout(() => {
                this.setNowState(data.code, 'list')
                this.$emit('getInfo', data)
            }, 0)
            return
          }
          // 三级列表显示
          if (this.treeData.length && this.treeData[0].children.length && this.treeData[0].children[0].children.length) {
            console.log(3)
            if (this.treeData[0].nodeType == 'dir' && this.treeData[0].children[0].nodeType == 'dir') {
                var data = {
                  code: this.treeData[0].children[0].children[0].nodeCode
                }
                this.addFormOne.nodeType = 'dir'
                this.addFormOne.isSelect = false
                this.addFormTwo.nodeType = 'dir'
                this.addFormTwo.isSelect = false
                setTimeout(() => {
                    this.setNowState(data.code, 'list')
                    this.$emit('getInfo', data)
                }, 0)
            }
            return
          }
        })
      },
      reLoadList (data) {
        util.request({
          method: 'get',
          interface: 'productTree',
          data: {}
        }).then(res => {
          this.treeData = res.result.result
          setTimeout(() => {
            if (data.nodeType) {
                this.setNowState(data, nodeType)
            } else {
                this.setNowState(data, 'list')
            }
            this.$emit('getInfo', data)
          }, 0)
        })
      },
      setNowState (code, type) {
        var element = document.getElementById(type + code)
        var activeName = element.getAttribute('data-active')
        var treeList = element.getAttribute('data-opens')
        var parentCode = element.getAttribute('data-parent')
        localStorage.setItem('code', code)

        if (activeName) {
            this.activeName = activeName
        } else {
            this.activeName = ''
        }
        
        if (treeList) {
            this.openeds = treeList.split('_')
        } else {
            this.openeds = []
        }
        
        if (parentCode) {
            localStorage.setItem('dirCode', parentCode)
        } else {
            localStorage.setItem('dirCode', '')
        }
        console.log(this.activeName, this.openeds)
      },
      setOneData () {
        this.isAddTreeOne = true
      },
      setTwoData (dirCode) {
        this.isAddTreeTwo = true
      },
      setData (code1, code2) {
        this.addData = {
          code1: code1,
          code2: code2
        }
        this.isAdd.value = true
      },
      addProductOne () {
        if (this.addFormOne.nodeType == 'list') {
            this.addOneList()
        } else {
            this.addOneDir()
        }
      },
      addProductTwo () {
        if (this.addFormTwo.nodeType == 'list') {
            this.addTwoList()
        } else {
            this.addTwoDir()
        }
      },
      addOneList () {
        alert(this.addFormOne.nodeType)
      },
      addOneDir () {
        alert(this.addFormOne.nodeType)
      },
      addTwoList () {
        alert(this.addFormTwo.nodeType)
      },
      addTwoDir () {
        alert(this.addFormTwo.nodeType)
      },
      getInfo (code, dirCode) {
        this.addType = ''
        var data = {
          code: code
        }
        localStorage.setItem('code', code)
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
      addProduct
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

    .head-part {
        margin: 10px 0;
        padding: 0 10px;
        box-sizing: border-box;
        display: flex;

        .search-title {
          flex: 1;
        }

        .add-dir {
            display: block;
            width: 36px;
            height: 36px;
            font-size: 30px;
            color: #000000;
            text-align: right;
            line-height: 36px;
            margin-top: -3px;
            cursor: pointer;
        }
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

    .add-box {
        float: right;
        font-size: 30px;
        margin-right: 30px;
        line-height: 56px;
        margin-top: -4px;
        color: #000000;
    }
  
    .two-list {
        .el-submenu__title {
            font-size: 14px;
            color: #000000;
            background: #F9F9F9;
            border-bottom: 1px solid #E0E0E0;

            &:hover {
              background: #EFF2F7;
            }
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

    .one-list {
        padding-right: 40px !important;
    }
  }
</style>
