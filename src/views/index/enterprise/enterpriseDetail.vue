<template>
    <div class="form-big">
        <el-collapse class="float-box" v-model="activeNames" @change="collChange">
          <!-- 基本信息 -->
          <el-collapse-item class="formStyleCom" title="基本信息" name="1">
            <section class="formBox bigF">
                <span>企业工商名称</span>
                <el-input
                  class="input-box"
                  placeholder="请输入标题，最多25个字"
                  v-model="base.longName">
                </el-input>
            </section>

            <section class="formBox">
                <span>企业简称</span>
                <el-input
                  class="input-box"
                  placeholder="请输入内容"
                  v-model="base.enterpriseCname">
                </el-input>
            </section>

            <section class="formBox">
                <span>企业类型</span>
                <el-select class="input-box" v-model="base.companyType" placeholder="请选择">
                    <el-option
                      v-for="item in enterpriseTypes"
                      :key="item.id"
                      :label="item.dictKeyValue"
                      :value="item.id">
                    </el-option>
                </el-select>
            </section>

            <section class="formBox">
                <span>企业法人</span>
                <el-input
                  class="input-box"
                  placeholder="请输入内容"
                  v-model="base.contact">
                </el-input>
            </section>

            <section class="formBox">
                <span>公司税号</span>
                <el-input
                  class="input-box"
                  placeholder="请输入内容"
                  v-model="base.taxNum">
                </el-input>
            </section>

            <section class="formBox">
                <span>结算银行</span>
                <el-input
                  class="input-box"
                  placeholder="请输入内容"
                  v-model="base.bankType">
                </el-input>
            </section>

            <section class="formBox">
                <span>银行账号</span>
                <el-input
                  class="input-box"
                  placeholder="请输入内容"
                  v-model="base.bankNum">
                </el-input>
            </section>

            <section class="formBox">
                <span>公司网站</span>
                <el-input
                  class="input-box"
                  placeholder="请输入内容"
                  v-model="base.webSite">
                </el-input>
            </section>

            <section class="formBox">
                <span>快递城市</span>
                <el-input
                  class="input-box"
                  placeholder="请输入内容"
                  v-model="base.city">
                </el-input>
            </section>

            <section class="formBox">
                <span>邮政编码</span>
                <el-input
                  class="input-box"
                  placeholder="请输入内容"
                  :disabled="true"
                  v-model="base.codeNum">
                </el-input>
            </section>

            <section class="formBox bigF">
                <span>具体地址</span>
                <el-input
                  class="input-box"
                  placeholder="请输入内容"
                  v-model="base.address">
                </el-input>
            </section>
            
            <div class="clear"></div>
            <el-button class="save-btn" type="info" :plain="true" size="small" icon="document"
            @click="saveBase">保存</el-button>
          </el-collapse-item>
          <div class="line-bold"></div>

          <el-collapse-item class="formStyleCom" title="公共账号" name="2">
              <section class="upload-list-box">
                  <ewm-upload class="up-box"
                              :path="wxPulicLogo.imgUrl"
                              :title-name="wxPulicLogo.titleName"
                              :width="'200px'"></ewm-upload>

                  <ewm-upload class="up-box"
                              :path="wxPulicEwm.imgUrl"
                              :title-name="wxPulicEwm.titleName"
                              :width="'200px'"></ewm-upload>

                  <ewm-upload class="up-box"
                              :path="wxQuanLogo.imgUrl"
                              :title-name="wxQuanLogo.titleName"
                              :width="'200px'"></ewm-upload>

                  <color-select class="up-box"
                              :color="wxQuanColor.color"
                              :title-name="wxQuanColor.titleName"
                              :width="'200px'"></color-select>
              </section>
          </el-collapse-item>
          <div class="line-bold"></div>
          <!-- 云服务 -->
          <el-collapse-item class="formStyleCom" title="服务列表" name="3">
            <template v-if="!$route.query.from">
              <section class="clouder-box">
                <div class="left">
                    <section class="f-box">
                        <span>社交营销</span>
                        <div class="input-box">
                            <el-switch
                              v-model="clouder.socialMarket.state"
                              on-value="1"
                              off-value="0">
                            </el-switch>
                        </div>
                    </section>
                </div>
                <div class="right" v-if="clouder.socialMarket.state == '1'">
                    <div class="row-box">
                        <section class="f-box">
                            <span>营销任务</span>
                            <div class="switch-box">
                                <el-switch
                                  v-model="clouder.socialMarket.weChat.state"
                                  on-value="0"
                                  off-value="1">
                                </el-switch>
                            </div>
                        </section>
                        <section class="f-box">
                            <span>计费方式</span>
                            <el-select class="input-box"
                                    v-model="clouder.socialMarket.weChat.countStyle" placeholder="请选择">
                                <el-option
                                  v-for="item in bankList"
                                  :key="item.id"
                                  :label="item.text"
                                  :value="item.id">
                                </el-option>
                            </el-select>
                        </section>
                        <section class="mess-box">
                          欠费1000元停止服务
                        </section>
                    </div>
                    <div class="row-box">
                        <section class="f-box">
                            <span>推广文章</span>
                            <div class="switch-box">
                                <el-switch
                                  v-model="clouder.socialMarket.grounSpreed.state"
                                  on-value="0"
                                  off-value="1">
                                </el-switch>
                            </div>
                        </section>
                        <section class="f-box">
                            <span>计费方式</span>
                            <el-select class="input-box"
                                    v-model="clouder.socialMarket.grounSpreed.countStyle" placeholder="请选择">
                                <el-option
                                  v-for="item in bankList"
                                  :key="item.id"
                                  :label="item.text"
                                  :value="item.id">
                                </el-option>
                            </el-select>
                        </section>
                    </div>
                    <div class="row-box">
                        <section class="f-box">
                            <span>产品中心</span>
                            <div class="switch-box">
                                <el-switch
                                  v-model="clouder.socialMarket.product.state"
                                  on-value="0"
                                  off-value="1">
                                </el-switch>
                            </div>
                        </section>
                        <section class="f-box">
                            <span>计费方式</span>
                            <el-select class="input-box"
                                    v-model="clouder.socialMarket.product.countStyle" placeholder="请选择">
                                <el-option
                                  v-for="item in bankList"
                                  :key="item.id"
                                  :label="item.text"
                                  :value="item.id">
                                </el-option>
                            </el-select>
                        </section>
                        <section class="mess-box">
                          欠费1000元停止服务
                        </section>
                    </div>
                    <div class="row-box">
                        <section class="f-box">
                            <span>推广加盟</span>
                            <div class="switch-box">
                                <el-switch
                                  v-model="clouder.socialMarket.activity.state"
                                  on-value="0"
                                  off-value="1">
                                </el-switch>
                            </div>
                        </section>
                        <section class="f-box">
                            <span>计费方式</span>
                            <el-select class="input-box"
                                    v-model="clouder.socialMarket.activity.countStyle" placeholder="请选择">
                                <el-option
                                  v-for="item in bankList"
                                  :key="item.id"
                                  :label="item.text"
                                  :value="item.id">
                                </el-option>
                            </el-select>
                        </section>
                    </div>
                    <div class="row-box">
                        <section class="f-box">
                            <span>外呼工作</span>
                            <div class="switch-box">
                                <el-switch
                                  v-model="clouder.socialMarket.outbound.state"
                                  on-value="0"
                                  off-value="1">
                                </el-switch>
                            </div>
                        </section>
                        <section class="f-box">
                            <span>计费方式</span>
                            <el-select class="input-box"
                                    v-model="clouder.socialMarket.outbound.countStyle" placeholder="请选择">
                                <el-option
                                  v-for="item in bankList"
                                  :key="item.id"
                                  :label="item.text"
                                  :value="item.id">
                                </el-option>
                            </el-select>
                        </section>
                        <section class="mess-box">
                          欠费1000元停止服务
                        </section>
                    </div>
                    <div class="row-box">
                        <section class="f-box">
                            <span>营销红包</span>
                            <div class="switch-box">
                                <el-switch
                                  v-model="clouder.socialMarket.redPacket.state"
                                  on-value="0"
                                  off-value="1">
                                </el-switch>
                            </div>
                        </section>
                        <section class="f-box">
                            <span>计费方式</span>
                            <el-select class="input-box"
                                    v-model="clouder.socialMarket.redPacket.countStyle" placeholder="请选择">
                                <el-option
                                  v-for="item in bankList"
                                  :key="item.id"
                                  :label="item.text"
                                  :value="item.id">
                                </el-option>
                            </el-select>
                        </section>
                        <section class="mess-box">
                          欠费0元停止服务
                        </section>
                    </div>
                    <div class="row-box">
                        <section class="f-box">
                            <span>在线预约</span>
                            <div class="switch-box">
                                <el-switch
                                  v-model="clouder.socialMarket.orderExperience.state"
                                  on-value="0"
                                  off-value="1">
                                </el-switch>
                            </div>
                        </section>
                        <section class="f-box">
                            <span>计费方式</span>
                            <el-select class="input-box"
                                    v-model="clouder.socialMarket.orderExperience.countStyle" placeholder="请选择">
                                <el-option
                                  v-for="item in bankList"
                                  :key="item.id"
                                  :label="item.text"
                                  :value="item.id">
                                </el-option>
                            </el-select>
                        </section>
                        <section class="mess-box">
                          欠费1000元停止服务
                        </section>
                    </div>
                    <div class="row-box">
                        <section class="f-box">
                            <span>券营销</span>
                            <div class="switch-box">
                                <el-switch
                                  v-model="clouder.socialMarket.integral.state"
                                  on-value="0"
                                  off-value="1">
                                </el-switch>
                            </div>
                        </section>
                        <section class="f-box">
                            <span>计费方式</span>
                            <el-select class="input-box"
                                    v-model="clouder.socialMarket.integral.countStyle" placeholder="请选择">
                                <el-option
                                  v-for="item in bankList"
                                  :key="item.id"
                                  :label="item.text"
                                  :value="item.id">
                                </el-option>
                            </el-select>
                        </section>
                        <section class="mess-box">
                          欠费1000元停止服务
                        </section>
                    </div>
                </div>
              </section>
              <section class="clouder-box">
                  <div class="left">
                      <section class="f-box">
                          <span>营销分析</span>
                          <div class="input-box">
                              <el-switch
                                v-model="clouder.marketingAnalysis.state"
                                on-value="1"
                                off-value="0">
                              </el-switch>
                          </div>
                      </section>
                  </div>
                  <div class="right" v-if="clouder.marketingAnalysis.state == '1'">
                      <div class="row-box">
                          <section class="f-box">
                              <span>营销月报</span>
                              <div class="switch-box">
                                  <el-switch
                                    v-model="clouder.marketingAnalysis.funnel.state"
                                    on-value="0"
                                    off-value="1">
                                  </el-switch>
                              </div>
                          </section>
                          <section class="f-box">
                              <span>计费方式</span>
                              <el-select class="input-box"
                                      v-model="clouder.marketingAnalysis.funnel.countStyle" placeholder="请选择">
                                  <el-option
                                    v-for="item in bankList"
                                    :key="item.id"
                                    :label="item.text"
                                    :value="item.id">
                                  </el-option>
                              </el-select>
                          </section>
                          <section class="mess-box">
                            欠费0元停止服务
                          </section>
                      </div>
                  </div>
              </section>
              <section class="clouder-box">
                  <div class="left">
                      <section class="f-box">
                          <span>在线客服</span>
                          <div class="input-box">
                              <el-switch
                                v-model="clouder.outsourcing.state"
                                on-value="1"
                                off-value="0">
                              </el-switch>
                          </div>
                      </section>
                  </div>
                  <div class="right" v-if="clouder.outsourcing.state == '1'">
                      <div class="row-box">
                          <section class="f-box">
                              <span>在线客服</span>
                              <div class="switch-box">
                                  <el-switch
                                    v-model="clouder.outsourcing.articleEdit.state"
                                    on-value="0"
                                    off-value="1">
                                  </el-switch>
                              </div>
                          </section>
                          <section class="f-box">
                              <span>计费方式</span>
                              <el-select class="input-box"
                                      v-model="clouder.outsourcing.articleEdit.countStyle"
                                      placeholder="请选择">
                                  <el-option
                                    v-for="item in bankList"
                                    :key="item.id"
                                    :label="item.text"
                                    :value="item.id">
                                  </el-option>
                              </el-select>
                          </section>
                          <section class="mess-box">
                            欠费1000元停止服务
                          </section>
                      </div>
                  </div>
              </section>
            </template>
          </el-collapse-item>
          <div class="line-bold"></div>
          <!-- 财务信息 -->
          <el-collapse-item class="formStyleCom" title="财务信息" name="4">
            <div class="btn-one">
              <el-button type="primary" icon="plus" size="small">付费</el-button>
              <el-button type="primary" icon="plus" size="small">开发票</el-button>
            </div>

            <el-table
              :data="moneyData"
              border
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                prop="orderNumber"
                label="订单号">
              </el-table-column>
              <el-table-column
                prop="serviceName"
                label="服务名称">
              </el-table-column>
              <el-table-column
                prop="serviceTime"
                label="时间">
              </el-table-column>
              <el-table-column
                label="费用总计">
                <template scope="scope">{{ scope.row.serviceMoney }}元</template>
              </el-table-column>
              <el-table-column
                label="已付">
                <template scope="scope">{{ scope.row.hasPay }}元</template>
              </el-table-column>
              <el-table-column
                label="欠费">
                <template scope="scope">{{ scope.row.lestPay }}元</template>
              </el-table-column>
              <el-table-column
                label="已开发票">
                <template scope="scope">{{ scope.row.hasInvoice ? '是' : '否' }}</template>
              </el-table-column>
            </el-table>
          </el-collapse-item>
          <div class="line-bold"></div>
          <!-- 管理员 -->
          <el-collapse-item class="formStyleCom editShow" title="管理员" name="5">
            <template v-if="!$route.query.from">
              <section class="formBox">
                  <span>超级管理员</span>
                  <el-input
                    class="input-box"
                    placeholder="请输入内容"
                    :disabled = "true"
                    v-model="superManagement.name">
                  </el-input>
              </section>
              <section class="formBox">
                  <span>注册手机</span>
                  <el-input
                    class="input-box"
                    placeholder="请输入内容"
                    :disabled = "true"
                    v-model="superManagement.phoneNum">
                  </el-input>
              </section>
              <section class="formBox">
                  <el-button class="btn-a" type="primary" icon="edit" size="small">申请修改</el-button>
              </section>
              <div class="clear"></div>
              <section class="formBox">
                  <span>产品发布员</span>
                  <el-input
                    class="input-box"
                    placeholder="请输入内容"
                    v-model="productPub.name">
                  </el-input>
              </section>
              <section class="formBox">
                  <span>注册手机</span>
                  <el-input
                    class="input-box"
                    placeholder="请输入内容"
                    v-model="productPub.phoneNum">
                  </el-input>
              </section>
              <div class="clear"></div>
              <section class="formBox">
                  <span>素材发布员</span>
                  <el-input
                    class="input-box"
                    placeholder="请输入内容"
                    v-model="marketExecutive.name">
                  </el-input>
              </section>
              <section class="formBox">
                  <span>注册手机</span>
                  <el-input
                    class="input-box"
                    placeholder="请输入内容"
                    v-model="marketExecutive.phoneNum">
                  </el-input>
              </section>
              <div class="clear"></div>
              <el-button class="save-btn" type="info" :plain="true" size="small" icon="document"
              @click="saveBase">保存</el-button>

            </template>
          </el-collapse-item>
          <div class="line-bold"></div>
          <!-- 角色授权 -->
          <el-collapse-item class="formStyleCom" title="角色授权" name="6">
            <div class="btn-one">
              <el-button type="primary" icon="delete2" size="small">删除</el-button>
              <el-button type="primary" icon="plus" size="small">增加</el-button>
            </div>

            <el-table
              :data="roleData"
              border
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleRolesChange">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                label="角色">
                <template scope="scope">
                  <el-select class="input-box" v-model="scope.row.role" placeholder="请选择">
                    <el-option
                      v-for="item in roles"
                      :key="item.id"
                      :label="item.label"
                      :value="item.id">
                    </el-option>
                </el-select>
                </template>
              </el-table-column>
              <el-table-column
                label="姓名">
                <template scope="scope">
                  <el-input
                    class="input-box"
                    placeholder="请输入内容"
                    v-model="scope.row.name">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column
                label="手机号">
                <template scope="scope">
                  <el-input
                    class="input-box"
                    placeholder="请输入内容"
                    v-model="scope.row.tel">
                  </el-input>
                </template>
              </el-table-column>
            </el-table>
            <div class="clear"></div>
            <el-button class="save-btn" type="info" :plain="true" size="small" icon="document"
            @click="saveBase">保存</el-button>
          </el-collapse-item>
        </el-collapse>
    </div>
</template>
<script>
import util from '../../../assets/common/util'
import $ from 'Jquery'
import ewmUpload from '../../../components/common/ewm-upload'
import colorSelect from '../../../components/common/color-select'

export default {
    data () {
        return {
            activeNames: [],
            base: {
                enterpriseCname: '',
                companyType: '',
                contact: '',
                longName: '',
                city: '',
                codeNum: '',
                address: '',
                webSite: '',
                taxNum: '',
                bankType: '',
                bankNum: ''
            },
            wxPulicLogo: {
                titleName: '微信公众号LOGO',
                imgUrl: ''
            },
            wxPulicEwm: {
                titleName: '微信公众号二维码',
                imgUrl: ''
            },
            wxQuanLogo: {
                titleName: '微信券LOGO',
                imgUrl: ''
            },
            wxQuanColor: {
                titleName: '微信券背景色',
                color: ''
            },
            enterpriseTypes: [],
            bankList: [
              {
                id: 0,
                text: '默认计费方式'
              },
              {
                id: 1,
                text: '第二种计费方式'
              }
            ],
            clouder: {
                socialMarket: {
                    state: '1',
                    weChat: {
                        state: '1',
                        countStyle: 0,
                    },
                    grounSpreed: {
                        state: '1',
                        countStyle: 0,
                    },
                    outbound: {
                        state: '1',
                        countStyle: 0,
                    },
                    orderExperience: {
                        state: '1',
                        countStyle: 0,
                    },
                    activity: {
                        state: '1',
                        countStyle: 0,
                    },
                    redPacket: {
                        state: '1',
                        countStyle: 0,
                    },
                    integral: {
                        state: '1',
                        countStyle: 0,
                    },
                    product: {
                        state: '1',
                        countStyle: 0,
                    }
                },
                knowledge: {
                    state: '1',
                    knowledgeBase: {
                        state: '1',
                        countStyle: 0,
                    }
                },
                marketingAnalysis: {
                    state: '1',
                    funnel: {
                        state: '1',
                        countStyle: 0,
                    },
                    activityOnline: {
                        state: '1',
                        countStyle: 0,
                    },
                    activityGround: {
                        state: '1',
                        countStyle: 0,
                    },
                    outboundAnalysis: {
                        state: '1',
                        countStyle: 0,
                    },
                    customerAnalysis: {
                        state: '1',
                        countStyle: 0,
                    },
                    storAnalysis: {
                        state: '1',
                        countStyle: 0,
                    }
                },
                outsourcing: {
                    state: '1',
                    articleEdit: {
                        state: '1',
                        countStyle: 0,
                    },
                    grounSpreed: {
                        state: '1',
                        countStyle: 0,
                    },
                    onlineSpreed: {
                        state: '1',
                        countStyle: 0,
                    }
                }
            },
            moneyData: [
              {
                id: 0,
                orderNumber: '234234234234',
                serviceName: '☝️服务',
                serviceTime: '2019-09-09',
                serviceMoney: '2999',
                hasPay: '1999',
                lestPay: '1000',
                hasInvoice: 0
              },
              {
                id: 1,
                orderNumber: '234234234234',
                serviceName: '☝️服务',
                serviceTime: '2019-09-09',
                serviceMoney: '2999',
                hasPay: '1999',
                lestPay: '1000',
                hasInvoice: 0
              }
            ],
            multipleSelection: [],
            superManagement: {
              name: '',
              phoneNum: ''
            },
            productPub: {
              name: '',
              phoneNum: ''
            },
            marketExecutive: {
              name: '',
              phoneNum: ''
            },
            roleData: [
              {
                id: 0,
                role: 0,
                name: '我是谁',
                tel: '1654452672'
              },
              {
                id: 1,
                role: 1,
                name: '我是谁',
                tel: '1654433672'
              }
            ],
            roles: [
              {
                id: 0,
                label: '编辑'
              },
              {
                id: 1,
                label: '券营销方案设计者'
              }
            ],
            cityData: [],
            companyData: {}
        }
    },
    mounted () {
    },
    methods: {
        getData () {
          this.getBase()
          this.getCity()
        },
        handleSelectionChange(val) {
          this.multipleSelection = val;
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
        collChange () {
            localStorage.setItem("houseColl", this.activeNames)
        },
        saveBase () {
          sessionStorage.removeItem('companyName')
          sessionStorage.removeItem('userCname')
          sessionStorage.removeItem('userPhone')
        }
    },
    components: {
      ewmUpload,
      colorSelect
    }
}
</script>
<style lang="scss">
.form-big {
    width: 100%;
    margin: auto;
    margin-top: 30px;
    overflow: hidden;

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
}

.formStyleCom {
    position: relative;
    width: 110%;
    overflow: hidden;

    .el-table__row {
      .input-box {
        width: 100%;

        input {
            height: 30px;
        }
      }
    }

    .btn-one {
        position: absolute;
        right: 0;
        top: 7px;
    }

    .upload-list-box {
      .up-box {
        margin-right: 10px;
      }
    }

    .clouder-box {
        overflow: hidden;

        .left {
            float: left;

            .f-box {
                height: 30px;

                &>span {
                    float: left;
                    width: 100px;
                    font-size: 14px;
                    color: #1F2D3D;
                    line-height: 30px;
                    height: 30px;
                }

                .input-box {
                    float: left;
                    width: 140px;

                    input {
                        height: 30px;
                    }
                }
            }
        }

        .right {
            float: left;

            .row-box {
                height: 30px;
                margin-bottom: 20px;
            }

            .f-box {
                float: left;

                &>span {
                    float: left;
                    width: 100px;
                    font-size: 14px;
                    color: #1F2D3D;
                    line-height: 30px;
                    height: 30px;
                }

                .switch-box {
                    float: left;
                    width: 120px;

                    input {
                        height: 30px;
                    }
                }

                .input-box {
                    float: left;
                    width: 220px;

                    input {
                        height: 30px;
                    }
                }
            }

            .mess-box {
              width: 200px;
              margin-left: 20px;
              float: left;
              font-size: 14px;
              color: #999999;
              line-height: 30px;
            }

            .mess-box:before {
              content: '*'
            } 
        }
    }

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

    &:last-child {
        margin-bottom: 30px;
    }
}

.clear {
    clear: both;
}

.el-collapse, .el-collapse-item__header, .el-collapse-item__wrap {
    background: #ffffff;
    border: none;
}

.el-collapse-item__wrap {
    padding-top: 20px;
    overflow: visible;
}

.el-collapse-item__content {
    padding: 0;
}

.el-collapse-item__header {
    padding: 0;
    font-size: 20px;
    color: #000000;
}
</style>