<template>
    <section class="article-base-box">
      <div class="form-box">
        <section class="baseInput bigB">
            <span>报告标题</span>
            <el-input
                    :maxlength="25"
                    class="input-box"
                    @change="titleHandle"
                    placeholder="请输入内容"
                    v-model="baseData.title">
            </el-input>
            <div class="abstract-num">剩余<span>{{titleNum}}</span>个字</div>
        </section>
        <section class="baseInput">
            <span>投资顾问</span>
            <el-select class="input-box" v-model="baseData.investor" placeholder="请选择">
                <el-option
                v-for="item in investors"
                :key="item.id"
                :label="item.userLoginName"
                :value="item.userCode">
              </el-option>
            </el-select>
        </section>
        <section class="baseInput rightF">
            <span>创作时间</span>
            <el-input
                    class="input-box"
                    placeholder="请输入内容"
                    v-model="baseData.createTime"
                    :disabled="true">
            </el-input>
        </section>

        <section class="baseInput bigB">
            <span>报告摘要</span>
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
export default {
    props: ['baseData'],
    data () {
        return {
            investors: [],
            abstractNum: 70,
            titleNum: 25
        }
    },
    methods: {
        initData () {
          this.getInvestors()
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