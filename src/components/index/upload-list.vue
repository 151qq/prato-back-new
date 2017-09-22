<template>
  <div class="imgs-box">
    <section class="img-box" v-for="(item, index) in imgLists">
      <img class="img-big" :src="item" @click="showImg">
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
  </div>
</template>
<script>
import $ from 'Jquery'
import interfaces from '../../assets/common/interfaces'
import util from '../../assets/common/util'

export default {
    props: ['imgLists'],
    data() {
      return {
        imgList: []
      }
    },
    mounted () {
    },
    methods: {
      postImg (e, index) {
        util.upFile(e).then(res => {
          console.log(res)
          let imgUrl = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1506154209&di=f50b243177f531b731d02a43fb098405&imgtype=jpg&er=1&src=http%3A%2F%2Ffun.youth.cn%2Fds%2F201708%2FW020170828356276420779.jpg'
          if (index !== undefined) {
            this.imgLists.splice(index, 1, imgUrl)
          } else {
            this.imgLists.push(imgUrl)
          }
        })
      },
      showImg (e) {
        let index = $('body .img-big').index($(e.target))
        this.$emit('showimg', index)
      }
    }
}
</script>

<style lang="scss">
  .imgs-box {
    width: 660px;
    margin-left: -10px;
    overflow: hidden;

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
  }
</style>