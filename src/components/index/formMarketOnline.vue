<template>
    <div class="form-b">
        <el-collapse v-model="activeNames" @change="collChange">
          <el-collapse-item class="formStylePro" title="营销活动管理" name="0">
            <section class="status-box">
                <div class="left">
                  <a class="stop-box" @click="changeOp('stop')">终止活动</a>
                  <a class="time-box" @click="changeOp('time')">延长活动</a>
                  <a class="clone-box" @click="changeOp('clone')">克隆活动</a>
                  <a class="del-box" @click="changeOp('del')">草稿删除</a>
                </div>
                <div class="right">
                  产品状态
                  <span>{{status[code]}}</span>
                </div>
            </section>
          </el-collapse-item>
          <div class="line-bold"></div>

          <el-collapse-item class="formStylePro" title="营销活动排期" name="1">
            <form-date-click></form-date-click>
          </el-collapse-item>
          <div class="line-bold"></div>

          <el-collapse-item class="formStylePro editShow" title="营销活动方案说明" name="2">
            <form-edit ref="formEdit"></form-edit>
          </el-collapse-item>
          <div class="line-bold"></div>

          <el-collapse-item class="formStylePro editShow" title="营销活动优惠" name="3">
            <form-activity></form-activity>
          </el-collapse-item>
          <div class="line-bold"></div>

          <el-collapse-item class="formStylePro" title="营销活动激励" name="4">
            <from-reward></from-reward>
          </el-collapse-item>

          <template v-if="type !== 'add'">
            <div class="line-bold"></div>

            <el-collapse-item class="formStylePro" title="营销活动监控" name="5">
              <list-monitor></list-monitor>
            </el-collapse-item>
            <div class="line-bold"></div>

            <el-collapse-item class="formStylePro" title="推广明星" name="6">
              <list-people-star></list-people-star>
            </el-collapse-item>
            <div class="line-bold"></div>

            <el-collapse-item class="formStylePro" title="文章排行" name="7">
              <list-article></list-article>
            </el-collapse-item>

            <div class="line-bold"></div>

            <el-collapse-item class="formStylePro" title="活动文章" name="8">
              <list-activity-article></list-activity-article>
            </el-collapse-item>
          </template>
        </el-collapse>          
    </div>
</template>
<script>
import util from '../../assets/common/util'
import formDateClick from '../../components/form/formDateClick'
import formEdit from '../../components/form/formEdit'
import formActivity from '../../components/form/formActivity'
import fromReward from '../../components/form/fromReward'
import listMonitor from '../../components/list/listMonitor'
import listPeopleStar from '../../components/list/listPeopleStar'
import listArticle from '../../components/list/listArticle'
import listActivityArticle from '../../components/list/listActivityArticle'
import upLoad from '../../components/common/upLoad'

import $ from 'Jquery'

export default {
    data () {
        return {
            id: 0,
            code: 'down',
            status: {
              stop: '终止',
              time: '延时',
              clone: '克隆',
              del: '草稿'
            },
            activeNames: ['1'],
            index: 0,
            articleinfo: [],
            type: ''
            // 线下
        }
    },
    mounted () {
        this.type = this.$route.params.type
        if (this.type !== 'add') {
            var houseColl = localStorage.getItem("houseColl")
            if (houseColl) {
                this.activeNames = houseColl.split(',')
            }
            // this.getAllData()
        }
    },
    methods: {
        changeOp (type) {
          this.code = type
        },
        handleClose (datas, item) {
          datas.splice(datas.indexOf(item), 1)
        },
        getAllData () {
          this.$refs.formEdit.getArticle('articleHouse')
        },
        collChange () {
            localStorage.setItem("houseColl", this.activeNames)
        }
        // 线下
    },
    components: {
        formDateClick,
        formActivity,
        fromReward,
        formEdit,
        listMonitor,
        listPeopleStar,
        listArticle,
        listActivityArticle
    }
}
</script>
<style lang="scss">
.form-b {
    margin-top: 30px;
}

.formStylePro {
    position: relative;
    width: 640px;
    margin: 0 auto;

    &:last-child {
        margin-bottom: 30px;
    }

    .echar-b {
      padding: 15px;
      border: 1px solid #D3DCE6;
      border-radius: 3px;
      margin-top: 20px;
      padding-bottom: 0;
    }
    

    .abstract-box {
      display: block;
      width: 100%;
      height: 120px;
      box-sizing: border-box;
      padding: 10px 20px;
      font-size: 14px;
      color: #475669;
      line-height: 30px;
      border-radius: 4px;
      border: none;
      background: #F9F9F9;
    }

    .abstract-least {
      display: block;
      font-size: 12px;
      color: #8492A6;
      line-height: 30px;
      text-align: right;
    }
}

.status-box {
    overflow: hidden;

    .left {
      float: left;
      width: 500px;

      a {
        float: left;
        width: 100px; 
        height: 28px;
        font-size: 14px;
        color: #ffffff;
        border-radius: 4px;
        box-sizing: border-box;
        padding-left: 34px;
        line-height: 28px;
        margin-right: 10px;
        cursor: pointer;
      }

      .stop-box {
        background: url(../../assets/images/stop-icon.png) 11px center no-repeat;
        background-color: #20A0FF;
      }

      .time-box {
        background: url(../../assets/images/time-icon.png) 11px center no-repeat;
        background-color: #20A0FF;
      }

      .clone-box {
        background: url(../../assets/images/clone-icon.png) 11px center no-repeat;
        background-color: #20A0FF;
      }

      .del-box {
        background: url(../../assets/images/del-w-icon.png) 11px center no-repeat;
        background-color: #20A0FF;
      }
    }

    .right {
      float: right;
      height: 28px;
      text-align: right;
      font-size: 14px;
      line-height: 28px;
      color: #475669;

      span {
        float: right;
        height: 20px;
        padding: 0 8px;
        background: #7790B1;
        font-size: 12px;
        color: #ffffff;
        line-height: 20px;
        margin: 4px 0 0 8px;
        border-radius: 3px;
      }
    }
}

.line-bold {
    height: 9px;
    border-top: 1px solid #99A9BF;
    background: #F9F9F9;
    margin: 30px 0;
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
}

#container {
    width: 640px;
    height: 140px;
    margin: 15px 0;
}
</style>