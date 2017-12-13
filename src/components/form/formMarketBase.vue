<template>
    <section class="product-base-box">
      <div class="form-box">
        <section class="baseInput bigB">
            <span>方案名称</span>
            <el-input
              class="input-box"
              placeholder="请输入内容"
              v-model="base.name">
            </el-input>
        </section>
        <section class="baseInput">
            <span>新增潜客</span>
            <el-input-number class="input-box" size="small" :min="0"
                v-model="base.customer"></el-input-number>
        </section>
        <section class="baseInput rightF">
            <span>新增体验</span>
            <el-input-number class="input-box" size="small" :min="0"
                v-model="base.experience"></el-input-number>
        </section>
        <section class="baseInput">
            <span>新增销售</span>
            <el-input-number class="input-box" size="small" :min="0"
                v-model="base.sale"></el-input-number>
        </section>
        <section class="baseInput rightF">
            <span>活动积分</span>
            <el-input-number class="input-box" size="small" :min="0"
                v-model="base.integral"></el-input-number>
        </section>
        <section class="baseInput bigB">
            <span>活动产品</span>
            <el-input
              type="textarea"
              :rows="4"
              :maxlength="70"
              placeholder="请输入内容"
              v-model="base.abstract">
            </el-input>
        </section>
        <section class="baseInput bigB">
          <span>标准照片</span>
          <div class="input-box">
            <upload :path="base.coverImg"
                :bg-path="true"
                @changeImg="changeImg"></upload>
          </div>
        </section>
        <section class="baseInput bigB">
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
import upload from '../../components/common/upload'
import selectBox from '../../components/common/select-box'
export default {
    data () {
        return {
            base: {
              name: '',
              experience: 0,
              sale: '',
              customer: '',
              integral: 0,
              abstract: '',
              coverImg: '',
              case: '',
              sex: [],
              age: [],
              level: [],
              job: [],
              habit: [],
              group: []
            },
            sexList: [
              {
                id: 0,
                label: '男'
              },
              {
                id: 1,
                label: '女'
              }
            ],
            ageList: [
              {
                id: 0,
                label: '年轻人'
              },
              {
                id: 1,
                label: '中年人'
              },
              {
                id: 2,
                label: '老年人'
              }
            ],
            levelList: [
              {
                id: 0,
                label: '屌丝'
              },
              {
                id: 1,
                label: '工薪'
              },
              {
                id: 2,
                label: '中产'
              },
              {
                id: 3,
                label: '富裕'
              },
              {
                id: 4,
                label: '财富'
              }
            ],
            jobList: [
              {
                id: 0,
                label: '老师'
              },
              {
                id: 1,
                label: '医生'
              },
              {
                id: 2,
                label: '公务员'
              },
              {
                id: 3,
                label: '国企干部'
              },
              {
                id: 4,
                label: '民企管理层'
              },
              {
                id: 5,
                label: '高收入民企员工'
              },
              {
                id: 6,
                label: '高收入自由职业'
              },
              {
                id: 7,
                label: '国企职工'
              },
              {
                id: 8,
                label: '民企职工'
              },
              {
                id: 9,
                label: '农民工'
              },
              {
                id: 10,
                label: '个体商户'
              },
              {
                id: 11,
                label: '离退休人员'
              }
            ],
            habitList: [
              {
                id: 0,
                label: '低价'
              },
              {
                id: 1,
                label: '高性价比'
              },
              {
                id: 2,
                label: '高品质'
              }
            ],
            groupList: [
              {
                id: 0,
                label: '新客户'
              },
              {
                id: 1,
                label: '老会员'
              }
            ],
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