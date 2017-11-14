<template>
    <section class="product-base-box">
      <div class="form-box">
        <section class="baseInput bigB">
            <span>产品名称</span>
            <el-input
              class="input-box"
              placeholder="请输入内容"
              v-model="base.name">
            </el-input>
        </section>
        <section class="baseInput">
            <span>产品编码</span>
            <el-input
              class="input-box"
              placeholder="请输入内容"
              :disabled="true"
              v-model="base.code">
            </el-input>
        </section>
        <section class="baseInput rightF">
            <span>产品价格</span>
            <el-input-number class="input-box" size="small" :min="0"
                v-model="base.price"></el-input-number>
        </section>
        
        <section class="baseInput bigB">
            <span>产品标签</span>
            <el-select
              class="input-box"
              v-model="base.customs"
              multiple
              filterable
              allow-create
              placeholder="请选择目标客户">
              <el-option
                v-for="item in customList"
                :key="item.id"
                :label="item.value"
                :value="item.id">
              </el-option>
            </el-select>
        </section>
        <section class="baseInput bigB">
            <span>相关产品</span>
            <el-select
              class="input-box"
              v-model="base.products"
              multiple
              filterable
              allow-create
              placeholder="请选择目标客户">
              <el-option
                v-for="item in productList"
                :key="item.id"
                :label="item.value"
                :value="item.id">
              </el-option>
            </el-select>
        </section>
        <section class="baseInput bigB">
          <span>标准图片</span>
          <div class="input-box">
            <upLoad :path="base.coverImg"
                :bg-path="true"
                @changeImg="changeImg"></upLoad>
          </div>
        </section>
        <section class="baseInput bigB">
            <span>产品摘要</span>
            <el-input
              type="textarea"
              :rows="4"
              :maxlength="70"
              placeholder="请输入内容"
              v-model="base.abstract">
            </el-input>
        </section>
      </div>
      <el-button class="save-btn" type="info" :plain="true" size="small" icon="document"
          @click="saveData('base')">保存</el-button>
      <div class="clear"></div>
    </section>
</template>
<script>
import './common/form.scss'
import util from '../../assets/common/util'
import upLoad from '../../components/common/upLoad'
export default {
    data () {
        return {
            base: {
              name: '',
              price: 0,
              type: '',
              code: '',
              abstract: '',
              coverImg: '',
              customs: [],
              products: []
            },
            types: [],
            customList: [
              { value: '客户一', id: 0 },
              { value: '客户二', id: 1 },
              { value: '客户三', id: 2 },
              { value: '客户四', id: 3 },
              { value: '客户五', id: 4 },
              { value: '客户六', id: 5 }
            ],
            productList: [
              { value: '产品一', id: 0 },
              { value: '产品二', id: 1 },
              { value: '产品三', id: 2 },
              { value: '产品四', id: 3 },
              { value: '产品五', id: 4 },
              { value: '产品六', id: 5 }
            ]
        }
    },
    methods: {
        initData () {
          this.getBase()
        },
        getBase () {
          util.request({
              method: 'get',
              interface: 'probase',
              data: {
                id: localStorage.getItem("id")
              }
          }).then(res => {
              this.base = res.result.result.base
          })
        },
        changeImg (data) {
          this.baseData.coverImg = data.url
        }
    },
    components: {
      upLoad
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