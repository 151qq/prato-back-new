<template>
    <section class="product-spec-box">
      <el-button class="add-btn" type="primary" icon="plus" size="small" @click="addSpec">增加</el-button>
      <div class="table-box">
        <section class="t-title">
          <span class="one">规格名称</span>
          <span class="two">规格说明</span>
        </section>
        <section class="t-cont" v-for="(item, index) in specs">
          <span class="one">
            <textarea placeholder="情输入规格名称">{{item.name}}</textarea>
          </span>
          <span class="two">
            <i class="el-icon-delete2 del-btn" @click="delSpec(index)"></i>
            <textarea placeholder="情输入规格说明">{{item.des}}</textarea>
          </span>
        </section>
      </div>
      <div class="clear"></div>
      <el-button class="save-btn" type="info" :plain="true" size="small" icon="document"
          @click="saveData('articleinfo')">保存</el-button>
      <div class="clear"></div>
    </section>
</template>
<script>
import './common/form.scss'
import util from '../../assets/common/util'
export default {
    data () {
        return {
            specs: [],
        }
    },
    methods: {
        initData () {
          this.getSpec()
        },
        getSpec () {
          util.request({
              method: 'get',
              interface: 'prospec',
              data: {
                id: localStorage.getItem("id")
              }
          }).then(res => {
              this.specs = res.result.result.specs
          })
        },
        addSpec () {
          var data = {
            name: '',
            des: ''
          }

          this.specs.push(data)
        },
        delSpec (index) {
          this.specs.splice(index, 1)
        }
    }
}
</script>
<style lang="scss">
.product-spec-box {
  overflow: hidden;

  .table-box {
      border: 1px solid #D3DCE6;
      border-bottom: none;

      .one {
        width: 160px;
        float: left;
        min-height: 40px;
        font-size: 14px;
        color: #000000;
        line-height: 40px;
        text-align: center;
      }

      .two {
        position: relative;
        width: 478px;
        float: left;
        min-height: 40px;
        border-left: 1px solid #D3DCE6;
        font-size: 14px;
        color: #000000;
        line-height: 40px;
        text-align: center;
      }

      .t-title {
        overflow: hidden;
        border-bottom: 1px solid #D3DCE6;
        background: #F0F0F0;
      }

      .t-cont {
        overflow: hidden;
        cursor: pointer;
        border-bottom: 1px solid #D3DCE6;

        &:nth-child(odd) {
          background: #f9f9f9;
        }
        
        .one {
          textarea {
            display: block;
            margin: 8px 22px;
            height: 24px;
            border: none;
            padding: 0;
            font-size: 14px;
            color: #000000;
            line-height: 24px;
            text-align: left;
            overflow: auto;
            background: transparent;
          }
        }

        .two {
          textarea {
            display: block;
            padding: 8px 22px;
            width: 380px;
            height: 24px;
            overflow: auto;
            border: none;
            font-size: 14px;
            color: #5E6D82;
            line-height: 24px;
            text-align: left;
            box-sizing: content-box;
            background: transparent;
          }

          .del-btn {
            display: none;
            width: 14px;
            height: 14px;
            position: absolute;
            right: 20px;
            top: 50%;
            margin-top: -7px;
            color: #20A0FF;
          }
        }

        &:hover {
          background: #EFF2F7;
          .two textarea {
            border-right: 1px solid #D3DCE6;
          }

          .del-btn {
            display: block;
          }
        }
      }
    }
}
</style>