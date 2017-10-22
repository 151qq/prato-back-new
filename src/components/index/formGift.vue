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
<style lang="scss">
.form-b {
    margin-top: 30px;
}

.formStylePro {
    position: relative;
    width: 640px;
    margin: 0 auto;

    .ewm-b {
      display: block;
      width: 200px;
      height: 200px;
      margin: auto;
      cursor: pointer;
    }

    &:last-child {
        margin-bottom: 30px;
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

.clear {
    clear: both;
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