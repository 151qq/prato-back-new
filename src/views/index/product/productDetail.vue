<template>
    <div class="form-discount">
        <el-collapse v-model="activeNames" @change="collChange">
          <!-- 基本信息 -->
          <el-collapse-item class="float-form-box" title="基本信息" name="1">
            <product-base></product-base>
          </el-collapse-item>
          <div class="line-bold"></div>

          <!-- 详细规格 -->
          <el-collapse-item class="float-form-box" title="产品规格" name="2">
            <spec-list ref="productSpec"></spec-list>
          </el-collapse-item>
          <div class="line-bold"></div>

          <!-- 产品图片 -->
          <el-collapse-item class="float-form-box" title="产品相册" name="3">
            <upload-dirs :dir-lists="dirList"
                          @changeDir="changeDir"
                          @deleteDir="deleteDir"></upload-dirs>
          </el-collapse-item>
          <div class="line-bold"></div>

          <!-- 介绍文章 -->
          <el-collapse-item class="float-form-box" title="产品介绍" name="4">
            <edit ref="formEdit"></edit>
          </el-collapse-item>
          <div class="line-bold"></div>

          <!-- 产品场景化推荐 -->
          <el-collapse-item class="float-form-box" title="产品场景化推荐" name="5">
            <user-scence></user-scence>
          </el-collapse-item>
        </el-collapse>
    </div>
</template>
<script>
import util from '../../../assets/common/util'
import productBase from './formAlist/productBase'
import specList from './formAlist/specList'
import userScence from './formAlist/userScence'
import edit from '../../../components/common/edit'
import uploadDirs from '../../../components/common/upload-dirs'

export default {
    data () {
        return {
            activeNames: ['1'],
            dirList: []
        }
    },
    mounted () {
        var productColl = localStorage.getItem("productColl")
        if (productColl) {
            this.activeNames = productColl.split(',')
        }
        this.getProDirs()
    },
    methods: {
        getProDirs () {
          util.request({
              method: 'get',
              interface: 'productAlbumList',
              data: {
                productCode: this.$route.query.productCode
              }
          }).then(res => {
              if (res.result.success == '1') {
                res.result.result.forEach((item) => {
                    item.docCreateTime = item.docCreateTime.split(' ')[0]
                })
                this.dirList = res.result.result
              } else {
                this.$message.error(res.result.message)
              }
          })
        },
        changeDir (data) {
          util.request({
              method: 'post',
              interface: 'productAlbumSave',
              data: {
                productCode: this.$route.query.productCode,
                enterpriseCode: this.$route.query.enterpriseCode,
                docCode: data.code
              }
          }).then(res => {
              if (res.result.success == '1') {
                this.getProDirs()
              } else {
                this.$message.error(res.result.message)
              }
          })
        },
        deleteDir (item) {
          util.request({
              method: 'post',
              interface: 'deleteProductAlbum',
              data: {
                productCode: this.$route.query.productCode,
                docCode: item.docCode,
                id: item.id
              }
          }).then(res => {
              if (res.result.success == '1') {
                this.getProDirs()
              } else {
                this.$message.error(res.result.message)
              }
          })
        },
        collChange () {
            localStorage.setItem("productColl", this.activeNames)
        }
    },
    components: {
        productBase,
        edit,
        specList,
        userScence,
        uploadDirs
    }
}
</script>