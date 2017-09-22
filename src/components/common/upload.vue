<template>
  <div>
    <section class="upload-box">
      <img v-if="!curPath" class="img-big" src="../../assets/images/img-default.jpg" @click="showSelect">
      <img v-else class="img-big" :src="curPath">
      <div>
        <img class="del-btn" src="../../assets/images/del-icon.png" @click="deleImg">
        <p>
          <img src="../../assets/images/pen-icon.png">
          <input type="file" class="pen-input" @change="postImg($event)">
        </p>
        <img class="del-btn" src="../../assets/images/del-icon.png" @click="resetPath">
      </div>
    </section>
    
    <!-- 本地或素材库选择框 -->
    <el-dialog title="文件上传" :visible.sync="isShow" size="tiny">
      <div class="btn-sel">
        <p>
          <button class="ben-btn">本地文件</button>
          <input type="file" class="ben-input" @change="postImg($event)">
        </p>

        <button class="su-btn" @click="showFile">素材库</button>
      </div>
    </el-dialog>

    <file-lists :select-data="selectData" @suSelect="suSelect"></file-lists>
  </div>
</template>
<script>
import $ from 'Jquery'
import interfaces from '../../assets/common/interfaces'
import util from '../../assets/common/util'
import fileLists from '../../components/common/fileLists'

export default {
    props: ['path', 'num'],
    data() {
      return {
        isShow: false,
        selectData: {
          isShow: false,
          url: ''
        },
        curPath: ''
      }
    },
    mounted () {
      this.curPath = this.path
    },
    methods: {
      suSelect (datas) {
        this.curPath = datas.url
        var data = {
          index: this.num,
          url: datas.url
        }
        this.$emit('changeImg', data)
      },
      deleImg () {
        this.$emit('delImg', this.num)
      },
      postImg (e) {
        util.upFile(e).then(res => {
          console.log(res)
          let imgUrl = res.result.result[0]
          this.curPath = imgUrl
          var data = {
            index: this.num,
            url: this.curPath
          }
          this.isShow = false
          this.$emit('changeImg', data)
        })
      },
      showSelect () {
        this.isShow = true
      },
      showFile () {
        this.isShow = false
        this.selectData.isShow = true
      },
      resetPath () {
        this.curPath = ''
        var data = {
          index: this.num,
          url: ''
        }
        this.$emit('changeImg', data)
      }
    },
    components: {
      fileLists
    }
}
</script>

<style lang="scss">
.el-dialog--tiny {
  width: 380px;
}

.upload-box {
  position: relative;
  cursor: pointer;

  .img-big {
    display: block;
    width: 100%;
    height: auto;
  }

  .img-input {
    position: absolute;
    left: 10px;
    top: 7px;
    opacity: 0.01;
    width: 200px;
    height: 140px;
    cursor: pointer;
  }

  div {
    display: none;
    margin-top: 20px;
    overflow: hidden;
      
    .del-btn {
      float: right;
      width: 16px;
      height: 16px;
      cursor: pointer;
      margin-right: 13px;

      &:hover {
        opacity: 0.8;
      }
    }

    .reset-btn {
      float: right;
      width: 16px;
      height: 16px;
      cursor: pointer;
      margin-right: 13px;
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
      padding-bottom: 20px;
    }
  }
}

.btn-sel {
  overflow: hidden;
  margin-bottom: 10px;

  p {
    position: relative;
    float: left;
    width: 120px;
    height: 30px;
    overflow: hidden;
    margin-left: 20px;
    cursor: pointer;

    .ben-btn {
      display: block;
      width: 120px;
      height: 30px;
      background: #20A0FF;
      font-size: 12px;
      color: #ffffff;
      line-height: 30px;
      text-align: center;
      border: none;
      padding: 0;
      border-radius: 3px;
      overflow: hidden;
    }

    .ben-input {
      position: absolute;
      left: 0;
      top: 0;
      width: 120px;
      height: 30px;
      opacity: 0.01;
    }
  }

  .su-btn {
    float: right;
    width: 120px;
    height: 30px;
    background: #20A0FF;
    font-size: 12px;
    color: #ffffff;
    line-height: 30px;
    text-align: center;
    border: none;
    padding: 0;
    border-radius: 3px;
    overflow: hidden;
    margin-right: 20px;
    cursor: pointer;
  }
}
</style>