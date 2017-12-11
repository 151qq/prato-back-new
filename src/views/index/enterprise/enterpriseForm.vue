<template>
    <div class="form-b">
        <el-collapse v-model="activeNames" @change="collChange">
          <!-- 基本信息 -->
          <el-collapse-item class="formStylePro" title="基本信息" name="1">
                <div class="form-box">
                    <div class="clear"></div>
                    <section class="baseInput bigB">
                        <span>企业工商名称</span>
                        <el-input
                                class="input-box"
                                placeholder="请输入内容"
                                :disabled="true"
                                v-model="base.enterpriseCname">
                        </el-input>
                    </section>
                    <section class="baseInput">
                        <span>企业简称</span>
                        <el-input
                                class="input-box"
                                placeholder="请输入内容,最多15个字"
                                :disabled="true"
                                v-model="base.enterpriseNameReg">
                        </el-input>
                    </section>
                    <section class="baseInput rightF">
                        <span>企业类型</span>
                        <el-select class="input-box"
                                   v-model="base.enterpriseType"
                                   name="investor"
                                   placeholder="请选择">
                            <el-option
                                    :label="'无'"
                                    :value="''">
                            </el-option>
                            <el-option
                                    v-for="(item, index) in enterpriseTypes"
                                    :key="index"
                                    :label="item.typeName"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </section>
                    <section class="baseInput">
                        <span>企业法人</span>
                        <el-input
                                class="input-box"
                                placeholder="请输入内容"
                                v-model="base.enterpriseCorporateRep">
                        </el-input>
                    </section>
                    <section class="baseInput rightF">
                        <span>微信公众号</span>
                        <el-input
                                class="input-box"
                                placeholder="请输入内容"
                                v-model="base.enterprisePubwechatAccount">
                        </el-input>
                    </section>
                    <section class="baseInput">
                        <span>结算银行</span>
                        <el-input
                                class="input-box"
                                placeholder="请输入内容"
                                v-model="base.enterpriseBank">
                        </el-input>
                    </section>
                    <section class="baseInput rightF">
                        <span>银行账号</span>
                        <el-input
                                class="input-box"
                                placeholder="请输入内容"
                                v-model="base.enterpriseBankAccount">
                        </el-input>
                    </section>
                  
                    <section class="baseInput">
                        <span>快递城市</span>
                        <el-select v-model="base.enterpriseAddrCity"
                                    class="input-box"
                                    @change="cityChange"
                                    filterable placeholder="请选择">
                            <el-option
                                    :label="'无'"
                                    :value="''">
                            </el-option>
                            <el-option
                              v-for="(item, index) in cityData"
                              :key="index"
                              :label="item"
                              :value="item">
                            </el-option>
                        </el-select>
                    </section>
                    <section class="baseInput rightF">
                        <span>邮政编码</span>
                        <el-input
                                class="input-box"
                                placeholder="请输入内容"
                                :disabled="true"
                                v-model="base.enterpriseLogisticZipcode">
                        </el-input>
                    </section>
                    <section class="baseInput">
                        <span>公司税号</span>
                        <el-input
                                class="input-box"
                                placeholder="请输入内容"
                                v-model="base.enterpriseTaxNo">
                        </el-input>
                    </section>
                    <section class="baseInput rightF">
                        <span>详细地址</span>
                        <el-input
                                class="input-box"
                                placeholder="请输入内容"
                                v-model="base.enterpriseAddrDetail">
                        </el-input>
                    </section>
                    <section class="baseInput bigB">
                        <span>公司图片</span>
                        <div class="input-box">
                            <upload :path="base.enterpriseLogoUrl"
                                    :is-operate="isOperate"
                                    :no-del="true"
                                    :bg-path="true"
                                    :is-house-id="true"
                                    @changeImg="changeImg"></upload>
                        </div>
                    </section>
                    <div class="clear"></div>
                </div>
                <el-button v-if="isOperate"
                            class="save-btn" type="info" :plain="true" size="small" icon="document"
                           @click="saveBase">保存</el-button>
                <div class="clear"></div>
            </el-collapse-item>
          <div class="line-bold"></div>

          <el-collapse-item class="formStylePro" title="公共账号" name="2">
              <section class="width-box">
                  <ewm-upload class="up-box"
                              :path="base.enterprisePubwechatLogo"
                              :title-name="'微信公众号LOGO'"
                              :id-name="'wxPulicLogo'"
                              :is-operate="isOperate"
                              @changeImg='wxPulicLogo'
                              :width="'160px'"></ewm-upload>

                  <ewm-upload class="up-box"
                              :path="base.enterprisePubwechatQrcode"
                              :title-name="'微信公众号二维码'"
                              :id-name="'wxPulicImg'"
                              :is-operate="isOperate"
                              @changeImg='wxPulicImg'
                              :width="'160px'"></ewm-upload>

                  <ewm-upload class="up-box"
                              :path="base.enterpriseWechatCouponLogo"
                              :title-name="'微信券LOGO'"
                              :id-name="'wxQuanLogo'"
                              :is-operate="isOperate"
                              @changeImg='wxQuanLogo'
                              :width="'160px'"></ewm-upload>

                  <color-select class="up-box"
                              :color="base.enterpriseWechatCouponColor"
                              :title-name="'微信券背景色'"
                              @colorChange="colorChange"
                              :width="'160px'"></color-select>
              </section>
              <div class="clear"></div>
              <el-button v-if="isOperate"
                          class="save-btn" type="info" :plain="true" size="small" icon="document"
                          @click="saveBase">保存</el-button>
              <div class="clear"></div>
          </el-collapse-item>
          <div class="line-bold"></div>
          <!-- 云服务 -->
          <el-collapse-item class="formStylePro" title="服务列表" name="3">
            <template>
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
                      </div>
                  </div>
              </section>
            </template>
          </el-collapse-item>
          <div class="line-bold"></div>
          <!-- 管理员 -->
          <!-- <el-collapse-item class="formStylePro editShow" title="管理员" name="5">
            <template v-if="!$route.query.from">
              <section class="baseInput">
                  <span>超级管理员</span>
                  <el-input
                    class="input-box"
                    placeholder="请输入内容"
                    :disabled = "true"
                    v-model="superManagement.name">
                  </el-input>
              </section>
              <section class="baseInput">
                  <span>注册手机</span>
                  <el-input
                    class="input-box"
                    placeholder="请输入内容"
                    :disabled = "true"
                    v-model="superManagement.phoneNum">
                  </el-input>
              </section>
              <section class="baseInput">
                  <el-button class="btn-a" type="primary" icon="edit" size="small">申请修改</el-button>
              </section>
              <div class="clear"></div>
              <section class="baseInput">
                  <span>产品发布员</span>
                  <el-input
                    class="input-box"
                    placeholder="请输入内容"
                    v-model="productPub.name">
                  </el-input>
              </section>
              <section class="baseInput">
                  <span>注册手机</span>
                  <el-input
                    class="input-box"
                    placeholder="请输入内容"
                    v-model="productPub.phoneNum">
                  </el-input>
              </section>
              <div class="clear"></div>
              <section class="baseInput">
                  <span>素材发布员</span>
                  <el-input
                    class="input-box"
                    placeholder="请输入内容"
                    v-model="marketExecutive.name">
                  </el-input>
              </section>
              <section class="baseInput">
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
          <div class="line-bold"></div> -->
          <!-- 角色授权 -->
          <!-- <el-collapse-item class="formStylePro" title="角色授权" name="6">
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
          </el-collapse-item> -->
        </el-collapse>
    </div>
</template>
<script>
import util from '../../../assets/common/util'
import upload from '../../../components/common/upload'
import ueditor from '../../../components/common/ueditor'
import ewmUpload from '../../../components/common/ewm-upload'
import colorSelect from '../../../components/common/color-select'

export default {
    data () {
        return {
            isOperate: true,
            isBase: false,
            activeNames: [],
            base: {
              enterpriseCname: '',
              enterpriseNameReg: '',
              enterpriseType: '',
              enterpriseCorporateRep: '',
              enterprisePubwechatAccount: '',
              enterpriseBank: '',
              enterpriseBankAccount: '',
              enterpriseAddrCity: '',
              enterpriseLogisticZipcode: '',
              enterpriseTaxNo: '',
              enterpriseAddrDetail: '',
              enterpriseLogoUrl: '',
              enterpriseDesc: '',
              enterprisePubwechatQrcode: '',
              enterprisePubwechatLogo: '',
              enterpriseWechatCouponLogo: '',
              enterpriseWechatCouponColor: ''
            },
            enterpriseTypes: [],
            cityData: [],
            postList: [],
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
            companyData: {}
        }
    },
    mounted () {
        var houseColl = localStorage.getItem("houseColl")
        if (houseColl) {
            this.activeNames = houseColl.split(',')
        }
        this.getCitys()
        this.getTypes()

        this.getBase()
    },
    watch: {
      $route () {
        this.isBase = false
        this.getBase()
      }
    },
    methods: {
        collChange () {
            localStorage.setItem("houseColl", this.activeNames)
        },
        cityChange () {
            for (var i = 0, len = this.cityData.length; i < len; i++) {
                if (this.cityData[i] == this.base.enterpriseLogisticCity) {
                    this.base.enterpriseLogisticZipcode = this.postList[i]
                    break
                }
            }
        },
        getBase () {
            util.request({
                method: 'get',
                interface: 'showEnterpriseInfo',
                data: {
                    enterpriseCode: this.$route.query.type
                }
            }).then(res => {
                if (res.result.success == '0') {
                    setTimeout(() => {
                        this.isBase = true
                    }, 0)
                    this.$message.error(res.result.message)
                    return
                }

                this.hisUser = res.result.request
                this.base = res.result.result

                setTimeout(() => {
                    this.isBase = true
                }, 0)
            })
        },
        getTypes () {
            util.request({
                method: 'get',
                interface: 'disOfEnterpriseInfo',
                data: {
                  types: 'enterprise_type'
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.enterpriseTypes = res.result.result.enterprise_type
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        getCitys () {
            util.request({
                method: 'get',
                interface: 'getCitys',
                data: {}
            }).then(res => {
                if (res.result.success == '1') {
                    var citys = []
                    var posts = []

                    res.result.results.forEach((item) => {
                        citys = citys.concat(item.citys)
                        posts = posts.concat(item.posts)
                    })

                    this.cityData = citys
                    this.postList = posts
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        saveBase () {
          if (!this.base.enterpriseType) {
              this.$message({
                  message: '请选选择企业类型！',
                  type: 'warning'
              })
              return false
          }
          
          util.request({
              method: 'post',
              interface: 'manageEnterpriseInfo',
              data: this.base
          }).then(res => {
              if (res.result.success == '1') {
                  this.$parent.$refs.listBox.loadList('reload')
              } else {
                  this.$message.error(res.result.message)
              }
          })
        },
        changeImg () {
          this.base.enterpriseLogoUrl = data.url
        },
        setContent (data) {
          this.base.enterpriseDesc = data.content
        },
        wxPulicLogo (data) {
          this.base.enterprisePubwechatLogo = data.url
        },
        wxPulicImg (data) {
          this.base.enterprisePubwechatQrcode = data.url
        },
        wxQuanLogo (data) {
          this.base.enterpriseWechatCouponLogo = data.url
        },
        colorChange (data) {
          this.base.enterpriseWechatCouponColor = data.color
        }
    },
    components: {
      ewmUpload,
      colorSelect,
      ueditor,
      upload
    }
}
</script>
<style lang="scss">
.clouder-box {
    overflow: hidden;

    .left {
        float: left;

        .f-box {
            height: 30px;

            &>span {
                float: left;
                width: 80px;
                font-size: 14px;
                color: #1F2D3D;
                line-height: 30px;
                height: 30px;
            }

            .input-box {
                float: left;
                width: 100px;

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
                width: 80px;
                font-size: 14px;
                color: #1F2D3D;
                line-height: 30px;
                height: 30px;
            }

            .switch-box {
                float: left;
                width: 100px;

                input {
                    height: 30px;
                }
            }

            .input-box {
                float: left;
                width: 200px;

                input {
                    height: 30px;
                }
            }
        }

        .mess-box:before {
          content: '*'
        } 
    }
}
</style>