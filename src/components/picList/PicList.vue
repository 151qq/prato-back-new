<template>
    <div class="picBox">
        <div class="piclist">
            <div class="iBox" v-for="(item,idx) in alertBody.list">
                <img :src="'http://'+item.link" @click="selPic(item.id,item.link,$event)">
            </div>
        </div>
        <div class="more" @click="tplNextPage">加载更多</div>
    </div>
</template>
<script>
    import './picList.scss';

    export default{
        props: {
            alertBody: {
                type: Object,
                default: ''
            }
        },
        components: {},
        data(){
            return {}
        },
        methods: {
            selPic(id, link, ev){
                this.$emit('close');
                this.$emit('upImg', id, 'http://' + link);
            },
            tplNextPage(){
                this.$emit('tplNextPage');
            }
        },
        mounted (){
        }

    }
</script>
<style lang="scss">
.picBox {
  max-height: 500px;
  overflow: scroll;
}

.piclist {
  height: auto;
  overflow: hidden;
  text-align: center;
  .iBox {
    width: 169px;
    height: 169px;
    overflow: hidden;
    margin-top: 10px;
    display: inline-block;
    vertical-align: top;
    box-sizing: border-box;
    padding: 10px;
    img {
      width: 100%;
      height: 100%;
      vertical-align: top;
      &:hover, &:active {
        border: 2px solid #3c3c3c;
        cursor: pointer;
      }
    }
  }

}

.more {
  height: auto;
  overflow: hidden;
  font: 14px/30px $f-yahei;
  background: #eeeeee;
  color: #3c3c3c;
  text-align: center;
  cursor: pointer;
}
</style>
