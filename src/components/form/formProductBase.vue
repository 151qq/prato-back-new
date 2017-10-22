<template>
    <section class="product-base-box">
      <div class="form-box">
        <section class="baseInput">
            <span>名称</span>
            <el-input
              class="input-box"
              placeholder="请输入内容"
              v-model="base.name">
            </el-input>
        </section>
        <section class="baseInput rightF">
            <span>编码</span>
            <el-input
              class="input-box"
              placeholder="请输入内容"
              :disabled="true"
              v-model="base.code">
            </el-input>
        </section>
        <section class="baseInput">
            <span>价格</span>
            <el-input-number class="input-box" size="small" :min="0"
                v-model="base.price"></el-input-number>
        </section>
        <section class="baseInput rightF">
            <span>归类</span>
            <el-select class="input-box" v-model="base.type" placeholder="请选择">
                <el-option
                  v-for="item in types"
                  :key="item.id"
                  :label="item.text"
                  :value="item.id">
                </el-option>
            </el-select>
        </section>
        <section class="search-input">
            <span>目标客户</span>
            <el-autocomplete
              id="customB"
              class="inline-input"
              v-model="custom"
              :fetch-suggestions="customSearch"
              placeholder="请输入内容"
              :trigger-on-focus="false"
              @select="customSelect"
              size="small"
            >
              <template slot="append">
                <el-button type="primary" size="small" icon="search"
                    @click="searchFocus('customB')">搜索</el-button>
              </template>
            </el-autocomplete>
            <div class="tag-box">
              <el-tag
                v-for="(tag, index) in base.customs"
                :key="index"
                :closable="true"
                type="primary"
                @close="handleClose(base.customs, tag)"
              >
              {{tag.value}}
              </el-tag>
            </div>
        </section>
        <section class="search-input">
            <span>相关产品</span>
            <el-autocomplete
              id="productB"
              class="inline-input"
              v-model="product"
              :fetch-suggestions="productSearch"
              placeholder="请输入内容"
              :trigger-on-focus="false"
              @select="productSelect"
              size="small"
            >
              <template slot="append">
                <el-button type="primary" size="small" icon="search"
                    @click="searchFocus('productB')">搜索</el-button>
              </template>
            </el-autocomplete>
            <div class="tag-box">
              <el-tag
                v-for="(tag, index) in base.products"
                :key="index"
                :closable="true"
                type="primary"
                @close="handleClose(base.products, tag)"
              >
              {{tag.value}}
              </el-tag>
            </div>
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
export default {
    data () {
        return {
            base: {
              name: '',
              price: 0,
              type: '',
              code: '',
              customs: [],
              products: []
            },
            types: [],
            custom: '',
            customList: [
              { value: '客户一', id: 0 },
              { value: '客户二', id: 1 },
              { value: '客户三', id: 2 },
              { value: '客户四', id: 3 },
              { value: '客户五', id: 4 },
              { value: '客户六', id: 5 }
            ],
            product: '',
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
        handleClose (datas, item) {
          datas.splice(datas.indexOf(item), 1)
        },
        customSearch (key, cb) {
          var results = this.customList.filter((item) => {
            return item.value.indexOf(key) > -1
          })
          console.log(results, 'results')
          cb(results)
        },
        customSelect (item) {
          console.log(item, 'item')
          this.base.customs.push(item)
        },
        productSearch (key, cb) {
          var results = this.productList.filter((item) => {
            return item.value.indexOf(key) > -1
          })
          console.log(results, 'results')
          cb(results)
        },
        productSelect (item) {
          console.log(item, 'item')
          this.base.products.push(item)
        },
        searchFocus (id) {
          $('#' + id + ' input').focus()
        }
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