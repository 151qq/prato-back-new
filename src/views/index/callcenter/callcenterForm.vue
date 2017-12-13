<template>
    <div class="form-b callcenter">
        <el-collapse v-model="activeNames" @change="collChange">
          <!-- 基本信息 -->
          <el-collapse-item class="formStylePro" title="客服基本配置" name="1">
                <div class="form-box">
                    <div class="clear"></div>
                    <section class="baseInput bigB">
                        <span>客户接入欢迎词</span>
                        <el-input
                                class="input-box"
                                placeholder="您好，您的客户经理正在赶来......"
                                v-model="callcenterData.sessionOpenInfo">
                        </el-input>
                        <div class="mess-box">
                          *当客户通过微信小程序联系客服时，客户将收到的第一个欢迎消息，最长不超过15
                        </div>
                    </section>
                    <section class="baseInput bigB">
                        <span>等候致歉语</span>
                        <el-input
                                class="input-box"
                                placeholder="抱歉，您的客户经理在忙碌中！请您稍后！您可以选择留言或继续等待！"
                                v-model="callcenterData.reponseDelayInfo">
                        </el-input>
                        <div class="mess-box">
                          *当客户通过微信小程序联系客服后，客服人员未能在X秒内响应，客户将收到等候提醒消息
                        </div>
                    </section>
                    <section class="baseInput bigB">
                        <span>客服结束问候语</span>
                        <el-input
                                class="input-box"
                                placeholder="您好！如果您没有其他服务需求，我们将结束本次服务。"
                                v-model="callcenterData.sessionCloseInfo">
                        </el-input>
                        <div class="mess-box">
                          *当客户通过微信小程序内超过X秒没有输入消息，客户将受到结束问候
                        </div>
                    </section>
                    <section class="baseInput bigB">
                        <span>等候致歉时间(min)</span>
                        <el-input
                                class="input-box"
                                type="number"
                                v-model="callcenterData.inbandResonseTime">
                        </el-input>
                    </section>
                    <div class="clear"></div>
                </div>
                <el-button v-if="isOperate"
                            class="save-btn" type="info" :plain="true" size="small" icon="document"
                           @click="saveCallcenter">保存</el-button>
                <div class="clear"></div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>
<script>
import util from '../../../assets/common/util'

export default {
    data () {
        return {
            isOperate: true,
            activeNames: [],
            callcenterData: {
              enterpriseCode: '',
              sessionOpenInfo: '',
              reponseDelayInfo: '',
              sessionCloseInfo: '',
              inbandResonseTime: ''
            }
        }
    },
    mounted () {
        var houseColl = localStorage.getItem("houseColl")
        if (houseColl) {
            this.activeNames = houseColl.split(',')
        }

        this.getTypes()
        this.getCallcenter()
    },
    watch: {
      $route () {
        this.getCallcenter()
      }
    },
    methods: {
        collChange () {
            localStorage.setItem("houseColl", this.activeNames)
        },
        getCallcenter () {
            util.request({
                method: 'get',
                interface: 'findCallCenterConfig',
                data: {
                    enterpriseCode: this.$route.query.type
                }
            }).then(res => {
                if (res.result.success == '0') {
                    this.$message.error(res.result.message)
                    return
                }

                if (res.result.result) {
                  this.callcenterData = res.result.result
                } else {
                  this.callcenterData = {
                    enterpriseCode: '',
                    sessionOpenInfo: '',
                    reponseDelayInfo: '',
                    sessionCloseInfo: '',
                    inbandResonseTime: ''
                  }
                }
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
        saveCallcenter () {          
          if (this.callcenterData.enterpriseCode) {
            this.updateCallCenter()
          } else {
            this.callcenterData.enterpriseCode = this.$route.query.type
            this.insertCallCenter()
          }
          
        },
        insertCallCenter () {
          util.request({
              method: 'post',
              interface: 'insertCallCenterConfig',
              data: this.callcenterData
          }).then(res => {
              if (res.result.success == '1') {
                  this.getCallcenter()
              } else {
                  this.$message.error(res.result.message)
              }
          })
        },
        updateCallCenter () {
          util.request({
              method: 'post',
              interface: 'updateCallCenterConfig',
              data: this.callcenterData
          }).then(res => {
              if (res.result.success == '1') {
                  this.getCallcenter()
              } else {
                  this.$message.error(res.result.message)
              }
          })
        }
    }}
</script>
<style lang="scss">
.callcenter {
  .mess-box {
    line-height: 24px;
    font-size: 12px;
    padding-left: 120px;
    color: #333333;
  }

  .baseInput {
      &>span {
          width: 120px;
      }

      .input-box {
          width: 180px;
      }
  }

  .bigB {
      .input-box {
          width: 520px;

          .el-select {
              width: 520px;
          }
      }

      .el-textarea {
        width: 520px;
      }
  }
}
</style>