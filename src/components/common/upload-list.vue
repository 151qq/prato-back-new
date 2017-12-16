<template>
  <div class="imgs-box">
    <section class="img-box" v-for="(item, index) in imgLists" :key="index">
      <img class="img-big" :src="item" @click="showImg(index)">
      <div class="delete-box">
        <i class="el-icon-close" @click="deleteImg(index)"></i>
      </div>
    </section>
    <label class="img-box" :for="idName">
      <img class="img-big" src="../../assets/images/add-img.jpg">
    </label>
    <input :id="idName" type="file" class="img-input" @change="postImg($event)">

    <!-- 大图 -->
    <swiper-img :is-show="isShow" :index="nowIndex" :big-imgs="imgLists"></swiper-img>
  </div>
</template>
<script>
import util from '../../assets/common/util'
import swiperImg from './swiper-img.vue'

export default {
    props: ['imgLists', 'idName'],
    data() {
      return {
        imgList: [],
        nowIndex: 0,
        isShow: {
          value: false
        }
      }
    },
    mounted () {
    },
    methods: {
      postImg (e) {
        var opotion = {
          url: 'uploadFile',
          event: e,
          data: {
            enterpriseCode: this.$route.query.enterpriseCode,
            fileType: 'pic',
            oldFilePath: ''
          }
        }

        util.uploadFile(opotion).then(res => {

          this.imgLists.push(res.result.result.filePath)
          this.$emit('saveImgs', this.imgLists)
        })
      },
      showImg (index) {
        this.nowIndex = index
        this.isShow.value = true
      },
      deleteImg (index) {
        this.imgLists.splice(index, 1)
        this.$emit('saveImgs', this.imgLists)
      }
    },
    components: {
      swiperImg
    }
}
</script>

<style lang="scss">
.imgs-box {
  width: 110%;
  overflow: hidden;

  .img-box {
    float: left;
    margin-right: 20px;
    position: relative;
    cursor: pointer;

    .img-big {
      display: block;
      width: 240px;
      height: 160px;
    }

    .delete-box {
      display: none;
      position: absolute;
      right: 10px;
      top: 10px;
      font-size: 14px;
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }
    }

    .img-input {
      display: none;
    }

    &:hover {
      .delete-box {
        display: block;
      }
    }
  }
}
</style>