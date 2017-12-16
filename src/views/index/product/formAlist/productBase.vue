<template>
    <section>
      <div class="formDiscount">
        <section class="formBox">
            <span>产品名称</span>
            <el-input
              class="input-box"
              placeholder="请输入内容"
              v-model="base.productCname">
            </el-input>
        </section>
        <section class="formBox">
            <span>产品编码</span>
            <el-input
              class="input-box"
              placeholder="请输入内容"
              v-model="base.productSku">
            </el-input>
        </section>
        <section class="formBox">
            <span>产品类型</span>
            <el-select
              class="input-box"
              v-model="base.productType"
              filterable
              placeholder="请选择">
              <el-option
                v-for="(item, index) in productTypes"
                :key="index"
                :label="item.value"
                :value="item.id">
              </el-option>
            </el-select>
        </section>
        <section class="formBox bigF">
          <span>标准图片</span>
          <div class="input-box">
            <upload :path="base.productCover"
                :bg-path="true"
                @changeImg="changeImg"></upload>
          </div>
        </section>
        <section class="formBox bigF">
            <span>产品摘要</span>
            <el-input
              type="textarea"
              :rows="4"
              :maxlength="140"
              placeholder="请输入内容"
              v-model="base.productDesc">
            </el-input>
        </section>
        <div class="clear"></div>
      </div>
      <el-button class="save-btn" type="info" :plain="true" size="small" icon="document"
            @click="saveBase">保存</el-button>
      <div class="clear"></div>
    </section>
</template>
<script>
import util from '../../../../assets/common/util'
import upload from '../../../../components/common/upload'
export default {
    data () {
        return {
            base: {
              productCname: '',
              productSku: '',
              productStatus: '',
              productType: '',
              productCover: '',
              productDesc: ''
            },
            productTypes: [
              { value: '产品一', id: 0 },
              { value: '产品二', id: 1 },
              { value: '产品三', id: 2 },
              { value: '产品四', id: 3 },
              { value: '产品五', id: 4 },
              { value: '产品六', id: 5 }
            ]
        }
    },
    mounted () {
      this.getBase()
    },
    methods: {
        getBase () {
          util.request({
              method: 'get',
              interface: 'productInfoGet',
              data: {
                productCode: this.$route.query.productCode
              }
          }).then(res => {
              if (res.result.success = '1') {
                this.base = res.result.result
              } else {
                this.$message.error(res.result.message)
              }
          })
        },
        getTypes () {
          util.request({
              method: 'get',
              interface: 'productInfoGet',
              data: {}
          }).then(res => {
              if (res.result.success = '1') {
                this.productTypes = res.result.result
              } else {
                this.$message.error(res.result.message)
              }
          })
        },
        changeImg (data) {
          this.base.productCover = data.url
        },
        saveBase () {
          util.request({
              method: 'post',
              interface: 'productInfoSave',
              data: {
                productCode: this.base.productCode
              }
          }).then(res => {
              if (res.result.success = '1') {
                this.getBase()
              } else {
                this.$message.error(res.result.message)
              }
          })
        }
    },
    components: {
      upload
    }
}
</script>
<style lang="scss">
.product-base-box {
  overflow: hidden;

  .form-box {
    overflow: hidden;
  }
}
</style>