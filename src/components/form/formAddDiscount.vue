<template>
    <div class="form-discount" v-if="isShow.value">
        <section class="float-box">
          <!-- 基本信息 -->
          <div class="formDiscount">
            <section class="formBox">
                <span>券标题</span>
                <el-input
                  class="input-box"
                  placeholder="请输入标题，最多9个字"
                  v-model="quanData.quanTitle">
                </el-input>
            </section>

            <section class="formBox">
                <span>券类型</span>
                <el-select class="input-box" v-model="quanData.quanType" placeholder="请选择">
                    <el-option
                      v-for="(item, index) in quanTypes"
                      :key="index"
                      :label="item"
                      :value="item">
                    </el-option>
                </el-select>
            </section>

            <section class="formBox">
                <span>有效期</span>
                <el-date-picker
                  class="input-box"
                  v-model="quanData.dateRange"
                  type="daterange"
                  placeholder="选择日期范围">
                </el-date-picker>
            </section>

            <section class="formBox bigF">
                <span>适用产品</span>
                <el-select
                  class="input-box"
                  v-model="quanData.productType"
                  multiple
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
            <section class="formBox bigF">
                <span>使用须知</span>
                <el-input
                  type="textarea"
                  :rows="4"
                  :maxlength="140"
                  placeholder="请输入内容"
                  v-model="quanData.description">
                </el-input>
            </section>
            <section class="formBox bigF">
              <span>券封面</span>
              <div class="input-box">
                <upLoad :path="quanData.coverImg"
                    :bg-path="true"
                    @changeImg="changeImg"></upLoad>
              </div>
            </section>
            <section class="formBox bigF">
                <span>封面标题</span>
                <el-input
                  class="input-box"
                  placeholder="请输入券封面标题"
                  v-model="quanData.coverTitle">
                </el-input>
            </section>
            <section class="formBox">
                <span>使用场景</span>
                <el-select class="input-box" v-model="quanData.useScene" placeholder="请选择">
                    <el-option
                      v-for="(item, index) in useSceneList"
                      :key="index"
                      :label="item"
                      :value="item">
                    </el-option>
                </el-select>
            </section>
            <section class="formBox">
                <span>券数量</span>
                <el-input
                  class="input-box"
                  type="number"
                  min="0"
                  placeholder="请输入"
                  v-model="quanData.quanNum">
                </el-input>
            </section>
            <section class="formBox">
                <span>核销提示</span>
                <el-input
                  class="input-box"
                  placeholder="请输入标题，最多9个字"
                  v-model="quanData.saleNum">
                </el-input>
            </section>
          
          <template v-if="quanData.quanType == '代金券'">
            <section class="formBox">
              <span>消费满</span>
              <el-input
                class="input-box"
                type="number"
                min="0"
                step="0.01"
                placeholder="请输入"
                v-model="quanData.consumptionFull">
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
                v-model="quanData.reduction">
              </el-input>
            </section>
          </template>

          <template v-if="quanData.quanType == '折扣券'">
            <section class="formBox">
              <span>折扣</span>
              <el-input
                class="input-box"
                type="number"
                min="0"
                step="0.01"
                placeholder="请输入"
                v-model="quanData.discountPer">
              </el-input>
            </section>
          </template>

          <template v-if="quanData.quanType == '礼品券'">
              <section class="formBox">
                  <span>礼品名称</span>
                  <el-input
                    class="input-box"
                    placeholder="请输入标题"
                    v-model="quanData.giftTitle">
                  </el-input>
              </section>

              <section class="formBox">
                  <span>礼品类型</span>
                  <el-select class="input-box" v-model="quanData.giftType" placeholder="请选择">
                      <el-option
                        v-for="(item, index) in giftTypes"
                        :key="index"
                        :label="item.label"
                        :value="item.id">
                      </el-option>
                  </el-select>
              </section>

              <section class="formBox">
                  <span>消费条件</span>
                  <el-input
                    class="input-box"
                    placeholder="请输入"
                    v-model="quanData.giftCondition">
                  </el-input>
              </section>

              <section class="formBox bigF">
                  <span>礼品说明</span>
                  <el-input
                    type="textarea"
                    :rows="4"
                    :maxlength="140"
                    placeholder="请输入内容"
                    v-model="quanData.giftDescription">
                  </el-input>
              </section>
              <section class="formBox bigF">
                <span>礼品图片</span>
                <div class="input-box">
                  <upLoad :path="quanData.giftImg"
                      :bg-path="true"
                      @changeImg="changeGiftImg"></upLoad>
                </div>
              </section>
          </template>

            <div class="clear"></div>
            <el-button class="save-btn" type="info" :plain="true" size="small" icon="document"
            @click="saveQuan">保存</el-button>
            <el-button class="back-btn" type="info" :plain="true" size="small" icon="document"
            @click="hiddenQuan">返回</el-button>
          </div>
        </section>
    </div>
</template>
<script>
import util from '../../assets/common/util'
import upLoad from '../../components/common/upLoad'

export default {
    props: ['isShow'],
    data () {
        return {
            quanData: {
                quanTitle: '',
                quanType: '',
                dateRange: '',
                productType: '',
                description: '',
                coverImg: '',
                coverTitle: '',
                quanNum: '',
                saleNum: '' ,
                // 代金券
                consumptionFull: '',
                reduction: '',
                // 折扣券
                discountPer: '',
                // 礼品券
                giftTitle: '',
                giftType: '',
                giftCondition: '',
                giftDescription: '',
                giftImg: ''

            },
            quanTypes: ['代金券', '礼品券', '折扣券'],
            useSceneList: ['购买', '传播'],
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
            giftTypes: [
              {
                id: 0,
                label: '礼品品一'
              },
              {
                id: 1,
                label: '礼品品二'
              },
              {
                id: 2,
                label: '礼品品三'
              }
            ]
        }
    },
    mounted () {
    },
    methods: {
        getData () {
          
        },
        getBase () {
          util.request({
              method: 'get',
              interface: 'companyBase',
              data: {
                userCode: 'sef'
              }
          }).then((res) => {
              if (res.result.success == '0') {
                  this.base = res.result.result
                  this.enterpriseTypes = this.base.enterpriseTypes
              } else {
                  this.$message.error(res.result.msg)
              }
          });
        },
        changeImg (data) {
          this.quanData.coverImg = data.url
        },
        changeGiftImg (data) {
          this.quanData.giftImg = data.url
        },
        hiddenQuan () {
          this.isShow.value = false
        },
        saveQuan () {
          this.isShow.value = false
        }
    },
    components: {
      upLoad
    }
}
</script>
<style lang="scss">
.form-discount {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding-top: 80px;
    background: #ffffff;
    z-index: 2000;
    overflow: auto;

    .float-box {
        width: 1000px;
        margin: auto;

        .line-bold {
            width: 200%;
            height: 9px;
            border-top: 1px solid #99A9BF;
            background: #F9F9F9;
            margin: 30px 0 30px -30%;
        }
    }

    .clear {
        clear: both;
    }
}

.formDiscount {
    position: relative;
    width: 110%;
    overflow: hidden;

    .formBox {
        float: left;
        margin: 0 20px 20px 0;

        &>span {
            float: left;
            width: 100px;
            font-size: 14px;
            color: #1F2D3D;
            line-height: 30px;
            height: 30px;
        }

        .btn-a {
          height: 30px;
        }

        .input-box {
            float: left;
            width: 220px;

            input {
                height: 30px;
            }
        }
    }

    .bigF {
        .input-box {
            width: 900px;

            .el-select {
                width: 900px;
            }
        }

        .el-textarea {
          width: 900px;
        }
    }

    .save-btn {
        float: right;
        margin-top: 10px;
        margin-left: 15px;
        margin-right: 100px;
    }

    .back-btn {
      float: right;
      margin-top: 10px;
      margin-left: 15px;
    }

    &:last-child {
        margin-bottom: 30px;
    }
}


</style>