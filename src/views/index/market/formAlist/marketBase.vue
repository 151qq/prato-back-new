<template>
    <section class="product-base-box">
      <div class="form-box">
        <section class="baseInput bigB">
            <span>方案名称</span>
            <el-input
              class="input-box"
              placeholder="请输入内容"
              v-model="base.eventPlanTitle">
            </el-input>
        </section>
        <section class="baseInput">
            <span>方案状态</span>
            <el-select class="input-box"
                       v-model="base.eventPlanStatus"
                       name="investor"
                       placeholder="请选择">
                <el-option
                        :label="'无'"
                        :value="''">
                </el-option>
                <el-option
                        v-for="(item, index) in statusTypes"
                        :key="index"
                        :label="item.typeName"
                        :value="item.id">
                </el-option>
            </el-select>
        </section>
        <section class="baseInput rightF">
            <span>新增潜客</span>
            <el-input type="number" class="input-box" size="small" :min="0"
                v-model="base.eventLeads"></el-input>
        </section>
        <section class="baseInput">
            <span>新增预约</span>
            <el-input type="number" class="input-box" size="small" :min="0"
                v-model="base.eventHotLeads"></el-input>
        </section>
        <section class="baseInput rightF">
            <span>新增销售</span>
            <el-input type="number" class="input-box" size="small" :min="0"
                v-model="base.eventSalesOpp"></el-input>
        </section>
        <section class="baseInput bigB">
            <span>活动方案</span>
            <el-input
              type="textarea"
              :rows="4"
              :maxlength="70"
              placeholder="请输入内容"
              v-model="base.eventPlanDesc">
            </el-input>
        </section>
        <section class="baseInput bigB">
          <span>标准照片</span>
          <div class="input-box">
            <upload :path="base.eventPlanCover"
                :bg-path="true"
                @changeImg="changeImg"></upload>
          </div>
        </section>
        <!-- <section class="baseInput bigB">
            <span>客户性别</span>
            <div class="input-box">
              <select-box :select-data="sexList" :check-list="base.sex"></select-box>
            </div>
        </section>
        <section class="baseInput bigB">
            <span>客户年龄</span>
            <div class="input-box">
              <select-box :select-data="ageList" :check-list="base.age"></select-box>
            </div>
        </section>
        <section class="baseInput bigB">
            <span>客户阶层</span>
            <div class="input-box">
              <select-box :select-data="levelList" :check-list="base.level"></select-box>
            </div>
        </section>
        <section class="baseInput bigB">
            <span>客户职业</span>
            <div class="input-box">
              <select-box :select-data="jobList" :check-list="base.job"></select-box>
            </div>
        </section>
        <section class="baseInput bigB">
            <span>消费习惯</span>
            <div class="input-box">
              <select-box :select-data="habitList" :check-list="base.habit"></select-box>
            </div>
        </section>
        <section class="baseInput bigB">
            <span>客户群体</span>
            <div class="input-box">
              <select-box :select-data="groupList" :check-list="base.group"></select-box>
            </div>
        </section>
        <section class="baseInput bigB">
            <span>活动方案</span>
            <el-input
              type="textarea"
              :rows="4"
              :maxlength="70"
              placeholder="请输入内容"
              v-model="base.case">
            </el-input>
        </section> -->
      </div>
      <el-button class="save-btn" type="info" :plain="true" size="small" icon="document"
          @click="saveBase()">保存</el-button>
      <div class="clear"></div>
    </section>
</template>
<script>
import util from '../../../../assets/common/util'
import upload from '../../../../components/common/upload'
import selectBox from '../../../../components/common/select-box'
export default {
    data () {
        return {
            base: {
              eventPlanTitle: '',
              eventPlanStatus: '',
              eventLeads: '',
              eventHotLeads: '',
              eventSalesOpp: '',
              eventPlanDesc: '',
              eventPlanCover: ''
            },
            statusTypes: []
        }
    },
    mounted () {
      this.getBase()
    },
    watch: {
      $route () {
        this.getBase()
      }
    },
    methods: {
        getBase () {
          util.request({
              method: 'get',
              interface: 'eventInfoGet',
              data: {
                eventCode: this.$route.query.type
              }
          }).then(res => {
              this.base = res.result.result
          })
        },
        changeImg (data) {
          this.base.eventPlanCover = data.url
        },
        saveBase () {
            if (!this.base.eventPlanTitle) {
                this.$message({
                    message: '请填写方案名称！',
                    type: 'warning'
                })
                return false
            }
            
            util.request({
                method: 'post',
                interface: 'eventInfoUpdate',
                data: this.base
            }).then(res => {
                if (res.result.success == '1') {
                    this.$parent.$parent.$refs.listBox.loadList('reload')
                } else {
                    this.$message.error(res.result.message)
                }
            })
        }
    },
    components: {
      upload,
      selectBox
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