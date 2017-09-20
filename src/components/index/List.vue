<template>
  <div class="allBox">

    <div class="listBox">
      <section v-if="list.length">
        <div class="lists-box" :class="index === curIndex ? 'active' : ''" v-for="(item, index) in list" @click="getInfo(item.id, index)">
          <img class="img-box" :src="item.imgUrl">
          <div class="p-box">
            <span class="title">{{item.title}}</span>
            <span class="des">{{item.address}}</span>
            <div>
              <img @click.stop="delItem(item.id, index)" src="../../assets/images/delete-icon.png">
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
  import util from '../../assets/common/util'
  export default{
    data(){
      return {
        list: [],
        curIndex: 0,
        isfirst: true
      }
    },
    mounted(){
      this.loadList()
    },
    methods: {
  		//获取时间		
  		getTime(data){		
  			this.timer = data?data:'';		
  			this.list = [];		
  			this.pageNumber = 1;		
  			this.loadList();		
  		},
      loadList(){
        var formData = {}
        if (this.$route.params.type === 'detail') {
          formData.key = this.$route.query.key
        }
        util.request({
          method: 'get',
          interface: this.$route.name + 'List',
          data: formData
        }).then(res => {
          this.list = res.result.datas
          if (this.list.length && this.isfirst) {
            this.$emit('getInfo', this.list[0].id)
            // 设置页面ID，公编辑展示使用，防止直接输入地址相应错误
            localStorage.setItem("id", this.list[0].id)
            this.isfirst = false
          }
        })
      },
      delItem (id, index) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteById(id, index)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })       
        })
      },
      getInfo (id, index) {
        if (this.curIndex === index) {
          return false
        }
        this.curIndex = index
        this.$emit('getInfo', id)
        // 设置页面ID，公编辑展示使用，防止直接输入地址相应错误
        localStorage.setItem("id", id)
      },
      deleteById (id, index) {
        util.request({
          method: 'post',
          interface: 'delete' + this.$route.name,
          data: {
            id: id
          }
        }).then(res => {
          this.list.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }
    }
  }
</script>
<style lang="scss">
  .allBox {
    width: 400px;
    background: #F9F9F9;

    .lists-box {
      width: 400px;
      height: 120px;
      border-bottom: 1px solid #F0F0F0;
      box-sizing: border-box;
      padding: 20px 22px;
      cursor: pointer;

      &.active {
        background: #EFF2F7;
      }

      .img-box {
        float: left;
        width: 105px;
        height: 80px;
        margin-right: 22px;
      }

      .p-box {
        float: right;
        width: 228px;

        .title {
          display: block;
          font-size: 16px;
          color: #000000;
          margin-bottom: 3px;
          margin-top: -2px;
        }

        .des {
          display: block;
          height: 40px;
          font-size: 12px;
          color: #475669;
          overflow: hidden;
          line-height: 20px;
        }

        div {
          height: 16px;
          line-height: 16px;
          text-align: right;

          img {
            margin-left: 8px;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
