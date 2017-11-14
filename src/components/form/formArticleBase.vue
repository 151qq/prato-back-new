<template>
    <section class="article-base-box">
      <div class="form-box">
        <section class="baseInput bigB">
            <span>文章标题</span>
            <el-input
                    :maxlength="25"
                    class="input-box"
                    @change="titleHandle"
                    placeholder="请输入内容"
                    v-model="baseData.title">
            </el-input>
            <div class="abstract-num">剩余<span>{{titleNum}}</span>个字</div>
        </section>
        <section class="baseInput bigB">
            <span>读者标签</span>
            <el-select
              class="input-box"
              v-model="baseData.customs"
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
            <span>文风特点</span>
            <el-select
              class="input-box"
              v-model="baseData.products"
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
            <upLoad :path="baseData.coverImg"
                :bg-path="true"
                @changeImg="changeImg"></upLoad>
          </div>
        </section>

        <section class="baseInput bigB">
            <span>文章摘要</span>
            <el-input
              type="textarea"
              :rows="4"
              :maxlength="70"
              @change="abstractHandle"
              placeholder="请输入内容"
              v-model="baseData.abstract">
            </el-input>
            <div class="abstract-num">剩余<span>{{abstractNum}}</span>个字</div>
        </section>

        <div class="clear"></div>
        <el-button class="save-btn" type="info" :plain="true" size="small" icon="document"
            @click="saveForm">保存</el-button>
        <div class="clear"></div>
      </div>
    </section>
</template>
<script>
import './common/form.scss'
import util from '../../assets/common/util'
import upLoad from '../../components/common/upLoad'

export default {
    props: ['baseData'],
    data () {
        return {
            investors: [],
            abstractNum: 70,
            titleNum: 25,
            customList: [],
            productList: []
        }
    },
    methods: {
        initData () {
          // this.getInvestors()
        },
        changeImg (data) {
          this.baseData.coverImg = data.url
        },
        getInvestors () {
            util.request({
                method: 'get',
                interface: 'getInvestors',
                data: {
                    roleCode: 'entadconsultant'
                }
            }).then(res => {
                this.investors = res.result.result
            })
        },
        abstractHandle () {
          this.abstractNum = 70 - this.abstract.length
        },
        titleHandle () {
          this.titleNum = 25 - this.title.length
        },
        saveForm () {
          this.$emit('saveData')
        }
    },
    components: {
      upLoad
    }
}
</script>
<style lang="scss">
.article-base-box {
  overflow: hidden;

  .form-box {
    overflow: hidden;
  }
}
</style>