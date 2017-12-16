<template>
    <div class="form-discount">
        <section class="float-form-box">
          <!-- 基本信息 -->
          <div class="formDiscount">
            <section class="formBox">
                <span>券标题</span>
                <el-input
                  class="input-box"
                  placeholder="请输入标题"
                  v-model="quanData.couponTitle">
                </el-input>
            </section>
            <section class="formBox">
                <span>券类型</span>
                <el-select class="input-box"
                            v-model="quanData.couponType"
                            :disabled="true"
                            placeholder="请选择">
                    <el-option
                      v-for="(item, index) in couponTypes"
                      :key="index"
                      :label="item.label"
                      :value="item.type">
                    </el-option>
                </el-select>
            </section>

            <section class="formBox">
                <span>使用场景</span>
                <el-select class="input-box"
                            v-model="quanData.couponScenario"
                            placeholder="请选择">
                    <el-option
                      v-for="(item, index) in useSceneList"
                      :key="index"
                      :label="item.typeName"
                      :value="item.id">
                    </el-option>
                </el-select>
            </section>

            <section class="formBox">
                <span>适用产品</span>
                <el-select
                  class="input-box"
                  v-model="couponProduct.productCode"
                  filterable
                  allow-create
                  placeholder="请选择">
                  <el-option
                    v-for="item in products"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id">
                  </el-option>
                </el-select>
            </section>
            <section class="formBox">
                <span>发行时间</span>
                <el-date-picker
                  class="input-box"
                  v-model="quanData.couponPublishTime"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
            </section>

            <section class="formBox">
                <span>结束时间</span>
                <el-date-picker
                  class="input-box"
                  v-model="quanData.couponEndTime"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
            </section>
            <section class="formBox bigF">
                <span>使用须知</span>
                <el-input
                  type="textarea"
                  :rows="4"
                  :maxlength="140"
                  placeholder="请输入内容"
                  v-model="quanData.couponExchangeRule">
                </el-input>
            </section>
            <section class="formBox bigF">
              <span>券封面</span>
              <div class="input-box">
                <upload :path="quanData.couponCover"
                    :bg-path="true"
                    @changeImg="changeImg"></upload>
              </div>
            </section>
            <section class="formBox">
                <span>封面标题</span>
                <el-input
                  class="input-box"
                  placeholder="请输入券封面标题"
                  v-model="quanData.couponCoverTxt">
                </el-input>
            </section>
            <section class="formBox">
                <span>券数量</span>
                <el-input
                  class="input-box"
                  type="number"
                  min="0"
                  placeholder="请输入"
                  v-model="quanData.couponTotalInventory">
                </el-input>
            </section>
            <section class="formBox">
                <span>核销提示</span>
                <el-input
                  class="input-box"
                  placeholder="请输入标题，最多9个字"
                  v-model="quanData.couponExchangeTxt">
                </el-input>
            </section>
          
          <template v-if="quanData.couponType == 'cashCoupon'">
            <section class="formBox">
              <span>消费满</span>
              <el-input
                class="input-box"
                type="number"
                min="0"
                step="0.01"
                placeholder="请输入"
                v-model="couponDeducationRule.couponConsumeAmount">
              </el-input>
            </section>
            <section class="formBox">
              <span>减免</span>
              <el-input
                class="input-box"
                type="number"
                min="0"
                step="0.01"
                placeholder="请输入"
                v-model="couponDeducationRule.couponDeducationNumber">
              </el-input>
            </section>
          </template>

          <template v-if="quanData.couponType == 'giftCoupon'">
            <section class="formBox">
                <span>礼品</span>
                <el-select class="input-box" v-model="couponGifeRule.giftCode" placeholder="请选择">
                    <el-option
                      v-for="(item, index) in giftLists"
                      :key="index"
                      :label="item.label"
                      :value="item.id">
                    </el-option>
                </el-select>
            </section>
          </template>

          <div class="clear"></div>
        </div>
        <el-button class="save-btn" type="info" :plain="true" size="small" icon="document"
            @click="saveQuan">保存</el-button>
        <div class="clear"></div>
      </section>
    </div>
</template>
<script>
import util from '../../../assets/common/util'
import upload from '../../../components/common/upload'

export default {
    data () {
        return {
            quanData: {
                couponTitle: '',
                couponType: '',
                couponScenario: '',
                couponExchangeRule: '',
                couponPublishTime: '',
                couponEndTime: '',
                couponCover: '',
                couponCoverTxt: '' ,
                couponTotalInventory: '',
                couponExchangeTxt: ''
            },
            couponProduct: {
              productCode: ''
            },
            couponDeducationRule: {
              couponConsumeAmount: '',
              couponDeducationNumber: ''
            },
            couponGifeRule: {
              giftCode: ''
            },
            useSceneList: [],
            couponTypes: [],
            products: [
              {
                id: 0,
                label: '产品一'
              },
              {
                id: 1,
                label: '产品二'
              },
              {
                id: 2,
                label: '产品三'
              }
            ],
            giftLists: [
              {
                id: 10,
                label: '礼品品一'
              },
              {
                id: 11,
                label: '礼品品二'
              },
              {
                id: 12,
                label: '礼品品三'
              }
            ]
        }
    },
    mounted () {
      this.getBase()
      this.getTypes()
      this.getCouponTypes()
    },
    methods: {
        getBase () {
          util.request({
              method: 'get',
              interface: 'couponInfoGet',
              data: {
                couponCode: this.$route.query.code
              }
          }).then((res) => {
              if (res.result.success == '1') {
                var result = res.result.result
                this.quanData = result.couponInfo

                if (result.couponProduct) {
                  this.couponProduct = result.couponProduct
                }

                if (result.couponDeducationRule) {
                  this.couponDeducationRule = result.couponDeducationRule
                }

                if (result.couponGifeRule) {
                  this.couponGifeRule = result.couponGifeRule
                }
              } else {
                this.$message.error(res.result.msg)
              }
          })
        },
        getTypes () {
            util.request({
                method: 'get',
                interface: 'disOfEnterpriseInfo',
                data: {
                  types: 'coupon_scenario'
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.useSceneList = res.result.result.coupon_scenario
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        getCouponTypes () {
            util.request({
                method: 'get',
                interface: 'getCouponType',
                data: {}
            }).then(res => {
                if (res.result.success == '1') {
                    this.couponTypes = res.result.result
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        changeImg (data) {
          this.quanData.couponCover = data.url
        },
        saveQuan () {
          if (!this.quanData.couponTitle) {
            this.$message({
                message: '请填写券名称！',
                type: 'warning'
            })
            return false
          }

          if (!this.quanData.couponType) {
            this.$message({
                message: '请选择券类型！',
                type: 'warning'
            })
            return false
          }

          if (!this.quanData.couponScenario) {
            this.$message({
                message: '请选择使用场景！',
                type: 'warning'
            })
            return false
          }

          if (this.quanData.couponPublishTime) {
            this.quanData.couponPublishTime = util.formDataDate(this.quanData.couponPublishTime)
          }

          if (this.quanData.couponEndTime) {
            this.quanData.couponEndTime = util.formDataDate(this.quanData.couponEndTime)
          }

          var codeData = {
            enterpriseCode: this.$route.query.enterpriseCode,
            eventCode: this.$route.query.market
          }

          var formData = {
            couponInfo: this.quanData
          }

          if (this.couponProduct.productCode) {
            formData.couponProduct = Object.assign(this.couponProduct, codeData)
          } else {
            delete formData.couponProduct
          }

          if (this.couponDeducationRule.couponConsumeAmount || this.couponDeducationRule.couponDeducationNumber) {
            formData.couponDeducationRule = Object.assign(this.couponDeducationRule, codeData)
          } else {
            delete formData.couponDeducationRule
          }

          if (this.couponGifeRule.giftCode) {
            formData.couponGifeRule = Object.assign(this.couponGifeRule, codeData)
          } else {
            delete formData.couponGifeRule
          }

          util.request({
              method: 'post',
              interface: 'couponInfoUpdate',
              data: formData
          }).then((res) => {
              if (res.result.success == '1') {
                var pathObj = {
                  name: 'market-detail',
                  query: {
                    index: this.$route.query.index,
                    enterprise: this.$route.query.enterpriseCode,
                    type: this.$route.query.market,
                    page: this.$route.query.page
                  }
                }

                this.$router.push(pathObj)
              } else {
                this.$message.error(res.result.msg)
              }
          })
        }
    },
    components: {
      upload
    }
}
</script>