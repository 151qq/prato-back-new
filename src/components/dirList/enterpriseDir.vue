<template>
  <div class="leftBoxList">
    <section class="head-part">
        <span class="add-dir" @click="addItem">添加企业</span>
    </section>
    <el-menu :default-active="activeName" class="el-menu-vertical-demo">
        <el-menu-item
            class="one-list"
            v-for="(item, index) in treeData"
            :index="index + ''">
            <router-link
                class="lists-box"
                :to="{name: pathName, query: {index: index, type: item.enterpriseCode}}">
                
                <div class="img-box">
                  <img v-if="item.enterpriseLogoUrl" :src="item.enterpriseLogoUrl">
                </div>

                <div class="p-box">
                    <span class="title">{{item.enterpriseNameReg}}</span>

                    <div  class="btn-box">
                        <i class="el-icon-circle-close btn-icon"
                            @click.stop="deleteItem(item.enterpriseCode, index)"></i>
                    </div>
                </div>
            </router-link>
        </el-menu-item>
    </el-menu>
    <section class="page-box">
      <span v-if="pageNumber > 1" class="page-up" @click="loadUp">上一页</span>
      <span v-if="pageNumber < maxPage" class="page-down" @click="loadDown">下一页</span>
    </section>

    <el-dialog title="添加企业" :visible.sync="isAddEnterprise">
      <el-form :label-position="'left'" :model="addEnterpriseForm" label-width="80px">
        <el-form-item label="企业名称">
            <el-input v-model="addEnterpriseForm.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="企业简称">
            <el-input v-model="addEnterpriseForm.reg" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
            <el-button @click="isAddEnterprise = false">取 消</el-button>
            <el-button type="primary" @click="confirmEnterprise">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import util from '../../assets/common/util'
  import $ from 'Jquery'
  export default{
    props: ['pathName'],
    data(){
      return {
        treeData: [],
        activeName: '',
        openeds: [],
        isAddEnterprise: false,
        addEnterpriseForm: {
            title: '',
            reg: ''
        },
        pageSize: 20,
        pageNumber: 1,
        maxPage: 1,
        total: 0
      }
    },
    mounted(){
      this.loadList()
    },
    watch: {
      $route () {
        setTimeout(() => {
          this.activeName = String(this.$route.query.index)
        }, 0)
      }
    },
    methods: {
      loadList(type){
        var formData = {
          pageSize: this.pageSize,
          pageNumber: this.pageNumber
        }

        util.request({
          method: 'get',
          interface: 'showAllEnt',
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
              this.activeName = String(this.$route.query.index)
            }, 0)
            return
          }

          var pathObj = {
            name: this.pathName,
            query: {
              index: 0,
              type: this.treeData[0].enterpriseCode
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
        this.isAddEnterprise = true
      },
      confirmEnterprise () {
        if (!this.addEnterpriseForm.title) {
          this.$message.error('企业机构名称不能为空！')
          return
        }

        if (!this.addEnterpriseForm.reg) {
          this.$message.error('企业机构简称不能为空！')
          return
        }

        var formData = {
            enterpriseCname: this.addEnterpriseForm.title,
            enterpriseNameReg: this.addEnterpriseForm.reg
        }

        util.request({
            method: 'post',
            interface: 'manageEnterpriseInfo',
            data: formData
        }).then(res => {
            if (res.result.success == '1') {
              this.isAddEnterprise = false
              this.pageNumber = 1
              this.loadList()
            } else {
              this.$message.error(res.result.message)
            }
        })
      },
      deleteItem (code, index) {
        this.$confirm('此操作将永久删除该企业, 是否继续?', '提示', {
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
          interface: 'removeEnterpriseInfo',
          data: {
            enterpriseCode: code
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
    }
  }
</script>
