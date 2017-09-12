<template>

  <div class="row .container-fluid" style="position: fixed;left: 0;width: 100%;top:42px;z-index:99999;background:#ffffff">

      <div class="col-lg-4 col-md-4 col-sm-4 flexBox">
        <div class="header">
          <p class="name">{{showTimer}}</p>
          <span class="icon icon2" id="laydater-icon"></span>
          <span class="icon icon1" @click="selectTpl"></span>
        </div>
      </div>

      <div class="col-lg-4 col-md-4 col-sm-4 flexBox">

        <div class="header">
          <p class="name">文章编辑</p>
          <span class="icon icon5" @click="saveManuscript"></span>
          <span class="icon icon4" @click="release"></span>
          <span class="icon icon3" @click="preview"></span>
          <span :class="['icon','icon6',isDragging?'on':'']" @click="switchDragging"></span>
        </div>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-4 flexBox">
        <div class="header">
          <p class="name">文章模版</p>
          <span class="icon icon7" @click="selectTpl"></span>
        </div>

      </div>
    </div>
</template>
<script>

  export default {

      props: ['showTimer'],

      data(){
        return {
            isDragging: false
        }
      },

      methods:{
          selectTpl(){
              this.$emit("selectTpl");
          },
          saveManuscript(){
              this.$emit("saveManuscript");
          },
          release(){
              this.$emit("release");
          },
          preview(){
              this.$emit("preview");

          },
          switchDragging(){
              this.isDragging = !this.isDragging;
              this.$emit("switchDragging",this.isDragging);
          },
      }
  }

</script>
