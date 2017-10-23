<template>
    <section class="product-base-box">
      <div class="form-box">
        <section class="baseInput bigB">
            <span>活动名称</span>
            <el-input
              class="input-box"
              placeholder="请输入内容"
              v-model="base.name">
            </el-input>
        </section>
        <section class="baseInput bigB">
            <span>相关任务</span>
            <el-input
              class="input-box"
              :disabled="true"
              placeholder="请输入内容"
              v-model="base.task">
            </el-input>
        </section>
        <section class="baseInput">
            <span>新增体验</span>
            <el-input-number class="input-box" size="small" :min="0"
                v-model="base.experience"></el-input-number>
        </section>
        <section class="baseInput rightF">
            <span>活动积分</span>
            <el-input-number class="input-box" size="small" :min="0"
                v-model="base.integral"></el-input-number>
        </section>
        <section class="baseInput bigB">
            <span>活动目标</span>
            <el-input
              type="textarea"
              :rows="4"
              :maxlength="70"
              placeholder="请输入内容"
              v-model="base.abstract">
            </el-input>
        </section>
        <section class="baseInput bigB">
          <span>活动宣传</span>
          <div class="input-box">
            <upLoad :path="base.coverImg"
                :bg-path="true"
                @changeImg="changeImg"></upLoad>
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
import upLoad from '../../components/common/upLoad'
export default {
    data () {
        return {
            base: {
              name: '',
              experience: 0,
              task: '',
              integral: 0,
              abstract: '',
              coverImg: ''
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
          // this.getBase()
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