<template>
    <div class="form-big">
        <el-collapse class="float-box" v-model="activeNames" @change="collChange">
          <!-- 基本信息 -->
          <el-collapse-item class="formStyleCom" title="基本信息" name="1">
            <section class="formBox">
                <span>企业简称</span>
                <el-input
                  class="input-box"
                  placeholder="请输入内容"
                  v-model="base.shortName">
                </el-input>
            </section>

            <section class="formBox">
                <span>企业类型</span>
                <el-select class="input-box" v-model="base.companyType" placeholder="请选择">
                    <el-option
                      v-for="item in companyTypes"
                      :key="item.id"
                      :label="item.text"
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

            <section class="formBox bigF">
                <span>企业正式名称</span>
                <el-input
                  class="input-box"
                  placeholder="请输入标题，最多25个字"
                  v-model="base.longName">
                </el-input>
            </section>

            <section class="formBox">
                <span>通讯地址(城市)</span>
                <el-select class="input-box" v-model="base.city" placeholder="请选择">
                    <el-option
                      v-for="item in cityList"
                      :key="item.id"
                      :label="item.text"
                      :value="item.id">
                    </el-option>
                </el-select>
            </section>

            <section class="formBox">
                <span>通讯地址(区县)</span>
                <el-select class="input-box" v-model="base.area" placeholder="请选择">
                    <el-option
                      v-for="item in areaList"
                      :key="item.id"
                      :label="item.text"
                      :value="item.id">
                    </el-option>
                </el-select>
            </section>

            <section class="formBox">
                <span>邮政编码</span>
                <el-input
                  class="input-box"
                  placeholder="请输入内容"
                  v-model="base.codeNum">
                </el-input>
            </section>

            <section class="formBox bigF">
                <span>详细通讯地址</span>
                <el-input
                  class="input-box"
                  placeholder="请输入内容"
                  v-model="base.address">
                </el-input>
            </section>

            <section class="formBox">
                <span>发票类型</span>
                <el-select class="input-box" v-model="base.invoiceType" placeholder="请选择">
                    <el-option
                      v-for="item in invoiceTypes"
                      :key="item.id"
                      :label="item.text"
                      :value="item.id">
                    </el-option>
                </el-select>
            </section>

            <section class="formBox">
                <span>企业税号</span>
                <el-input
                  class="input-box"
                  placeholder="请输入内容"
                  v-model="base.taxNum">
                </el-input>
            </section>

            <section class="formBox">
                <span>电子发票</span>
                <div class="input-box">
                    <el-switch
                      v-model="base.invoiceState"
                      on-value="1"
                      off-value="0">
                    </el-switch>
                </div>
            </section>

            <section class="formBox bigF">
                <span>发票抬头</span>
                <el-input
                  class="input-box"
                  placeholder="请输入内容"
                  v-model="base.invoiceName">
                </el-input>
            </section>

            <section class="formBox">
                <span>开户银行</span>
                <el-select class="input-box" v-model="base.bankType" placeholder="请选择">
                    <el-option
                      v-for="item in bankList"
                      :key="item.id"
                      :label="item.text"
                      :value="item.id">
                    </el-option>
                </el-select>
            </section>

            <section class="formBox">
                <span>账号</span>
                <el-input
                  class="input-box"
                  placeholder="请输入内容"
                  v-model="base.bankNum">
                </el-input>
            </section>
            
            <div class="clear"></div>
            <el-button class="save-btn" type="info" :plain="true" size="small" icon="document"
            @click="saveBase">保存</el-button>
          </el-collapse-item>
          <div class="line-bold"></div>
          <!-- 云服务 -->
          <el-collapse-item class="formStyleCom" title="云服务" name="2">
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
                            <span>微信推广管理</span>
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
                            <span>地面推广管理</span>
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
                            <span>外呼销售管理</span>
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
                            <span>预约体验管理</span>
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
                            <span>营销活动管理</span>
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
                            <span>营销红包管理</span>
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
                            <span>营销积分管理</span>
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
                </div>
            </section>
            <section class="clouder-box">
                <div class="left">
                    <section class="f-box">
                        <span>知识管理</span>
                        <div class="input-box">
                            <el-switch
                              v-model="clouder.knowledge.state"
                              on-value="1"
                              off-value="0">
                            </el-switch>
                        </div>
                    </section>
                </div>
                <div class="right" v-if="clouder.knowledge.state == '1'">
                    <div class="row-box">
                        <section class="f-box">
                            <span>知识库</span>
                            <div class="switch-box">
                                <el-switch
                                  v-model="clouder.knowledge.knowledgeBase.state"
                                  on-value="0"
                                  off-value="1">
                                </el-switch>
                            </div>
                        </section>
                        <section class="f-box">
                            <span>计费方式</span>
                            <el-select class="input-box"
                                    v-model="clouder.knowledge.knowledgeBase.countStyle" placeholder="请选择">
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
                            <span>营销漏斗分析</span>
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
                    <div class="row-box">
                        <section class="f-box">
                            <span>在线营销活动分析</span>
                            <div class="switch-box">
                                <el-switch
                                  v-model="clouder.marketingAnalysis.activityOnline.state"
                                  on-value="0"
                                  off-value="1">
                                </el-switch>
                            </div>
                        </section>
                        <section class="f-box">
                            <span>计费方式</span>
                            <el-select class="input-box"
                                    v-model="clouder.marketingAnalysis.activityOnline.countStyle"
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
                    <div class="row-box">
                        <section class="f-box">
                            <span>地面推广活动分析</span>
                            <div class="switch-box">
                                <el-switch
                                  v-model="clouder.marketingAnalysis.activityGround.state"
                                  on-value="0"
                                  off-value="1">
                                </el-switch>
                            </div>
                        </section>
                        <section class="f-box">
                            <span>计费方式</span>
                            <el-select class="input-box"
                                    v-model="clouder.marketingAnalysis.activityGround.countStyle"
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
                    <div class="row-box">
                        <section class="f-box">
                            <span>外呼分析</span>
                            <div class="switch-box">
                                <el-switch
                                  v-model="clouder.marketingAnalysis.outboundAnalysis.state"
                                  on-value="0"
                                  off-value="1">
                                </el-switch>
                            </div>
                        </section>
                        <section class="f-box">
                            <span>计费方式</span>
                            <el-select class="input-box"
                                    v-model="clouder.marketingAnalysis.outboundAnalysis.countStyle"
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
                    <div class="row-box">
                        <section class="f-box">
                            <span>客服分析</span>
                            <div class="switch-box">
                                <el-switch
                                  v-model="clouder.marketingAnalysis.customerAnalysis.state"
                                  on-value="0"
                                  off-value="1">
                                </el-switch>
                            </div>
                        </section>
                        <section class="f-box">
                            <span>计费方式</span>
                            <el-select class="input-box"
                                    v-model="clouder.marketingAnalysis.customerAnalysis.countStyle"
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
                    <div class="row-box">
                        <section class="f-box">
                            <span>门店接待分析</span>
                            <div class="switch-box">
                                <el-switch
                                  v-model="clouder.marketingAnalysis.storAnalysis.state"
                                  on-value="0"
                                  off-value="1">
                                </el-switch>
                            </div>
                        </section>
                        <section class="f-box">
                            <span>计费方式</span>
                            <el-select class="input-box"
                                    v-model="clouder.marketingAnalysis.storAnalysis.countStyle"
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
            <section class="clouder-box">
                <div class="left">
                    <section class="f-box">
                        <span>运营外包</span>
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
                            <span>文章编辑</span>
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
                    <div class="row-box">
                        <section class="f-box">
                            <span>地面推广助手</span>
                            <div class="switch-box">
                                <el-switch
                                  v-model="clouder.outsourcing.grounSpreed.state"
                                  on-value="0"
                                  off-value="1">
                                </el-switch>
                            </div>
                        </section>
                        <section class="f-box">
                            <span>计费方式</span>
                            <el-select class="input-box"
                                    v-model="clouder.outsourcing.grounSpreed.countStyle"
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
                    <div class="row-box">
                        <section class="f-box">
                            <span>在线推广推荐</span>
                            <div class="switch-box">
                                <el-switch
                                  v-model="clouder.outsourcing.onlineSpreed.state"
                                  on-value="0"
                                  off-value="1">
                                </el-switch>
                            </div>
                        </section>
                        <section class="f-box">
                            <span>计费方式</span>
                            <el-select class="input-box"
                                    v-model="clouder.outsourcing.onlineSpreed.countStyle"
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

            <div class="clear"></div>
            <el-button class="save-btn" type="info" :plain="true" size="small" icon="document"
            @click="saveBase">保存</el-button>
          </el-collapse-item>
          <div class="line-bold"></div>
          <!-- 详细规格 -->
          <el-collapse-item class="formStyleCom editShow" title="权限管理" name="3">
            <section class="formBox">
                <span>超级管理员</span>
                <el-input
                  class="input-box"
                  placeholder="请输入内容"
                  disabled = "true"
                  v-model="superManagement.name">
                </el-input>
            </section>
            <section class="formBox">
                <span>手机号</span>
                <el-input
                  class="input-box"
                  placeholder="请输入内容"
                  disabled = "true"
                  v-model="superManagement.phoneNum">
                </el-input>
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
                <span>手机号</span>
                <el-input
                  class="input-box"
                  placeholder="请输入内容"
                  v-model="productPub.phoneNum">
                </el-input>
            </section>
            <div class="clear"></div>
            <section class="formBox">
                <span>营销主管</span>
                <el-input
                  class="input-box"
                  placeholder="请输入内容"
                  v-model="marketExecutive.name">
                </el-input>
            </section>
            <section class="formBox">
                <span>手机号</span>
                <el-input
                  class="input-box"
                  placeholder="请输入内容"
                  v-model="marketExecutive.phoneNum">
                </el-input>
            </section>
            <div class="clear"></div>
            <section class="formBox">
                <span>客服主管</span>
                <el-input
                  class="input-box"
                  placeholder="请输入内容"
                  v-model="customExecutive.name">
                </el-input>
            </section>
            <section class="formBox">
                <span>手机号</span>
                <el-input
                  class="input-box"
                  placeholder="请输入内容"
                  v-model="customExecutive.phoneNum">
                </el-input>
            </section>
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

export default {
    data () {
        return {
            activeNames: [],
            base: {
                shortName: '',
                companyType: '',
                contact: '',
                longName: '',
                city: '',
                area: '',
                codeNum: '',
                address: '',
                invoiceType: '',
                taxNum: '',
                invoiceState: '0',
                invoiceName: '',
                bankType: '',
                bankNum: ''
            },
            companyTypes: [],
            cityList: [],
            areaList: [],
            invoiceTypes: [],
            bankList: [],
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
            customExecutive: {
              name: '',
              phoneNum: ''
            }
        }
    },
    mounted () {
        var houseColl = localStorage.getItem("houseColl")
        if (houseColl) {
            this.activeNames = houseColl.split(',')
        }

        if (sessionStorage.getItem('companyName')) {
          this.base.shortName = sessionStorage.getItem('companyName')
          this.superManagement.name = sessionStorage.getItem('userCname')
          this.superManagement.phoneNum = sessionStorage.getItem('userPhone')
        } else {
          this.getData()
        }
    },
    methods: {
        getData () {

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
                    width: 220px;

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