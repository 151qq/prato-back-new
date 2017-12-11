<template>
    <div class="form-b">
        <el-collapse v-model="activeNames" @change="collChange">
          <!-- 基本信息 -->
          <el-collapse-item class="formStylePro" title="基本信息" name="1">
            <form-gift-base ref="productBase"></form-gift-base>
          </el-collapse-item>
          <div class="line-bold"></div>
          <!-- 介绍文章 -->
          <el-collapse-item class="formStylePro editShow" title="介绍文章" name="2">
            <form-edit ref="formEdit"></form-edit>
          </el-collapse-item>
          <div class="line-bold"></div>
          <!-- 产品图片 -->
          <el-collapse-item class="formStylePro" title="礼品图片" name="4">
            <upload-list :img-lists="productImgs" @showimg="showImg"></upload-list>
            <div class="clear"></div>
            <el-button class="save-btn" type="info" :plain="true" size="small" icon="document"
                @click="saveData('productImgs')">保存</el-button>
            <div class="clear"></div>
          </el-collapse-item>
          <div class="line-bold"></div>
          <!-- 宣传推广图片 -->
          <el-collapse-item class="formStylePro" title="宣传推广图片" name="5">

            <upload-list :img-lists="publishImgs" @showimg="showImg"></upload-list>
            <div class="clear"></div>
            <el-button class="save-btn" type="info" :plain="true" size="small" icon="document"
                @click="saveData('publishImgs')">保存</el-button>
            <div class="clear"></div>

          </el-collapse-item>
          
          <!-- 编辑独有 -->
          <template>
            <div class="line-bold"></div>
            <!-- 二维码 -->
            <el-collapse-item class="formStylePro" title="二维码" name="6">
              <img class="ewm-b" :src="ewm" @click="showBigEwm">
            </el-collapse-item>
            <div class="line-bold"></div>
            <!-- 更新日志 -->
            <el-collapse-item class="formStylePro" title="更新日志" name="7">
              <list-logs :logs="logs"></list-logs>
            </el-collapse-item>
          </template>
        </el-collapse>
  
        <swiper-img :is-show="isShow" :index="index" :big-imgs="bigImgs"></swiper-img>
        <show-ewm :dialog-visible="isEwm" :path="ewm"></show-ewm>
    </div>
</template>
<script>
import util from '../../assets/common/util'
import formGiftBase from '../../components/form/formGiftBase'
import formEdit from '../../components/form/formEdit'
import uploadList from '../../components/index/upload-list'
import swiperImg from '../../components/common/swiper-img.vue'
import showEwm from '../../components/common/show-ewm'
import listLogs from '../../components/list/listLogs'
import $ from 'Jquery'

export default {
    data () {
        return {
            id: 0,
            ewm: '',
            logs: [],
            isEwm: {
              value: false
            },
            activeNames: ['1'],
            isShow: {
              value: false
            },
            index: 0,
            bigImgs: [],
            articleinfo: [],
            productImgs: [],
            publishImgs: [],
            surround: [],
            type: ''
        }
    },
    mounted () {
        var houseColl = localStorage.getItem("houseColl")
        if (houseColl) {
            this.activeNames = houseColl.split(',')
        }
    },
    methods: {
        showBigEwm () {
          this.isEwm.value = true
        },
        getAllData () {
          this.getInfo()
          this.$refs.productBase.initData()
          // this.$refs.formEdit.getArticle('articleHouse')
          this.$refs.productSpec.initData()
          this.getProImgs()
          this.getPubImgs()
          this.getTypes()
        },
        getProImgs () {
          util.request({
              method: 'get',
              interface: 'proimgs',
              data: {
                id: localStorage.getItem("id")
              }
          }).then(res => {
              this.productImgs = res.result.result.imgs
          })
        },
        getPubImgs () {
          util.request({
              method: 'get',
              interface: 'pubimgs',
              data: {
                id: localStorage.getItem("id")
              }
          }).then(res => {
              this.publishImgs = res.result.result.imgs
          })
        },
        getInfo () {
          util.request({
              method: 'get',
              interface: 'proinfo',
              data: {
                id: localStorage.getItem("id")
              }
          }).then(res => {
              this.code = res.result.result.code
              this.ewm = res.result.result.ewm
              this.logs = res.result.result.logs
          })
        },
        showImg (index) {
          util.request({
              method: 'get',
              interface: 'bigImgs',
              data: {
                id: localStorage.getItem("id")
              }
          }).then(res => {
              this.bigImgs = res.result.datas
              console.log(this.bigImgs)
              this.index = index
              this.isShow.value = true
          })
        },
        collChange () {
            localStorage.setItem("houseColl", this.activeNames)
        },
        saveData (type, index) {
            var formData = {
              id: localStorage.getItem("id"),
              type: type,
              data: this[type],
            }

            if (index !== undefined) {
              formData.index = index
            }

            if (type === 'articleinfo') {
              formData.investor = this.investor
            }

            util.request({
                method: 'post',
                interface: 'draftArticle',
                data: formData
            }).then(res => {
                console.log(res)
            })
        },
        getTypes () {
            util.request({
                method: 'get',
                interface: 'protype',
                data: {}
            }).then(res => {
                this.types = res.result.result.type
            })
        }
    },
    components: {
        formGiftBase,
        formEdit,
        uploadList,
        swiperImg,
        showEwm,
        listLogs
    }
}
</script>