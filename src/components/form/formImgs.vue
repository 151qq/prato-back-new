<template>
  <div class="imgs-box">
    <section class="img-box" v-for="(item, index) in imgLists">
      <img class="img-big" :src="item" @click="showImg(index)">
      <div>
        <img class="del-btn" src="../../assets/images/del-icon.png">
        <p>
          <img src="../../assets/images/pen-icon.png">
          <input type="file" class="pen-input" @change="postImg($event, index)">
        </p>
      </div>
    </section>
    <section class="img-btn">
      <img class="img-big" src="../../assets/images/add-img.jpg">
      <input type="file" name="file" class="img-input" @change="postImg($event)">
    </section>
    <swiper-img :is-show="isShow" :index="index" :big-imgs="bigList"></swiper-img>
  </div>
</template>
<script>
import util from '../../assets/common/util'
import swiperImg from '../../components/common/swiper-img.vue'

export default {
    props: ['imgLists', 'bigImgs'],
    data() {
      return {
        imgList: [],
        isShow: {
          value: false
        },
        index: 0,
        bigList: []
      }
    },
    mounted () {

    },
    watch: {
      bigImgs () {
        this.bigList = this.bigImgs.concat([])
      }
    },
    methods: {
      postImg (e, index) {
        util.upFile(e).then(res => {
          let imgUrl = res.result.result[0]
          if (index !== undefined) {
            this.imgLists.splice(index, 1, imgUrl)
          } else {
            this.imgLists.push(imgUrl)
          }
        })
      },
      showImg (index) {
        this.index = index
        this.isShow.value = true
      }
    },
    components: {
      swiperImg
    }
}
</script>

<style lang="scss">
  .imgs-box {
    width: 660px;
    margin-left: -10px;
    overflow: hidden;

    .img-btn {
      float: left;
      position: relative;
      width: 220px;
      height: 182px;
      box-sizing: border-box;
      padding: 7px 10px 11px;
      border-radius: 5px;
      background: #ffffff;
      overflow: hidden;

      .img-big {
        display: block;
        width: 200px;
        height: 140px;

        &:hover {
          opacity: 0.8;
        }
      }

      input {
        position: absolute;
        left: 10px;
        top: 7px;
        opacity: 0.01;
        width: 200px;
        height: 140px;
        cursor: pointer;
      }
    }

    .img-box {
      float: left;
      width: 220px;
      height: 182px;
      box-sizing: border-box;
      padding: 7px 10px 11px;
      border-radius: 5px;
      background: #ffffff;

      .img-big {
        display: block;
        width: 200px;
        height: 140px;
      }

      div {
        display: none;
        margin-top: 8px;
        overflow: hidden;
          
        .del-btn {
          float: right;
          width: 16px;
          height: 16px;
          cursor: pointer;

          &:hover {
            opacity: 0.8;
          }
        }

        p {
          float: right;
          width: 16px;
          height: 16px;
          margin-right: 13px;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          
          img {
            display: block;
            width: 16px;
            height: 16px;

            &:hover {
              opacity: 0.8;
            }
          }

          input {
            position: absolute;
            left: 0;
            top: 0;
            opacity: 0.01;
            width: 16px;
            height: 16px; 
          }
        }
      }

      &:hover {
        background: #EFF2F7;

        div {
          display: block;
        }
      }
    }
  }
</style>