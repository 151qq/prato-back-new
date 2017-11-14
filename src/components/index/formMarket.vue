<template>
    <div class="form-b">
        <el-collapse v-model="activeNames" @change="collChange">
          <el-collapse-item class="formStylePro" title="基本信息" name="0">
            <form-market-base></form-market-base>
          </el-collapse-item>
          <div class="line-bold"></div>

          <el-collapse-item class="formStylePro" title="活动排期" name="1">
            <form-date-click></form-date-click>
          </el-collapse-item>
          <div class="line-bold"></div>

          <!-- <el-collapse-item class="formStylePro editShow" title="营销活动方案说明" name="2">
            <form-edit ref="formEdit"></form-edit>
          </el-collapse-item>
          <div class="line-bold"></div> -->

          <el-collapse-item class="formStylePro editShow" title="优惠活动" name="3">
            <form-activity></form-activity>
          </el-collapse-item>
          <div class="line-bold"></div>

          <el-collapse-item class="formStylePro editShow" title="活动实际进程" name="4">
            <section class="date-monitor-box">
              <section class="date-b-left">
                <date-pq
                  :year="dateLeft.year"
                  :month="dateLeft.month"
                  :no-click="true"
                  :select-data="activeDate"></date-pq>
              </section>
              <section class="date-b-right">
                <date-pq
                  :year="dateRight.year"
                  :month="dateRight.month"
                  :no-click="true"
                  :select-data="activeDate"></date-pq>
              </section>
            </section>
          </el-collapse-item>

          <template>
            <div class="line-bold"></div>

            <el-collapse-item class="formStylePro" title="活动文章列表" name="5">
              <list-article></list-article>
            </el-collapse-item>
            <div class="line-bold"></div>

            <el-collapse-item class="formStylePro" title="活动红包详情" name="6">
              <el-table
                :data="paketData"
                stripe
                style="width: 100%">
                <el-table-column
                  prop="name"
                  label="姓名">
                </el-table-column>
                <el-table-column
                  prop="date"
                  sortable
                  label="日期">
                </el-table-column>
                <el-table-column
                  prop="paket"
                  sortable
                  label="红包">
                </el-table-column>
                <el-table-column
                  prop="integral"
                  sortable
                  label="积分">
                </el-table-column>
              </el-table>
            </el-collapse-item>

            <div class="line-bold"></div>

            <el-collapse-item class="formStylePro" title="微信推广统计" name="7">
              <el-table
                :data="wxSpreed"
                border
                show-summary
                style="width: 100%">
                <el-table-column
                  prop="channelName"
                  label="渠道名">
                </el-table-column>
                <el-table-column
                  prop="reedNum"
                  sortable
                  label="阅读数">
                </el-table-column>
                <el-table-column
                  prop="reedRecive"
                  sortable
                  label="阅读领券">
                </el-table-column>
                <el-table-column
                  prop="shareRevice"
                  sortable
                  label="分享领券">
                </el-table-column>
                <el-table-column
                  prop="newNum"
                  sortable
                  label="新增潜客">
                </el-table-column>
              </el-table>
            </el-collapse-item>

            <div class="line-bold"></div>

            <el-collapse-item class="formStylePro" title="地面推广统计" name="8">
              <el-table
                :data="pushSpreed"
                border
                show-summary
                style="width: 100%">
                <el-table-column
                  prop="date"
                  width="120"
                  fixed
                  label="活动时间">
                </el-table-column>
                <el-table-column
                  prop="address"
                  width="200"
                  label="活动地点">
                </el-table-column>
                <el-table-column
                  prop="peoNum"
                  sortable
                  width="120"
                  label="到场人数">
                </el-table-column>
                <el-table-column
                  prop="quanRevice"
                  sortable
                  width="100"
                  label="领券">
                </el-table-column>
                <el-table-column
                  prop="giftRevice"
                  sortable
                  width="120"
                  label="领礼品">
                </el-table-column>
                <el-table-column
                  prop="newNum"
                  sortable
                  width="120"
                  label="新增潜客">
                </el-table-column>
              </el-table>
            </el-collapse-item>

            <div class="line-bold"></div>

            <el-collapse-item class="formStylePro" title="外呼销售统计" name="9">
              <el-table
                :data="outSale"
                border
                show-summary
                style="width: 100%">
                <el-table-column
                  prop="name"
                  width="120"
                  label="姓名">
                </el-table-column>
                <el-table-column
                  prop="outNum"
                  label="外呼机会">
                </el-table-column>
                <el-table-column
                  prop="realNum"
                  sortable
                  label="实际外呼">
                </el-table-column>
                <el-table-column
                  prop="newCall"
                  sortable
                  label="新增预约">
                </el-table-column>
                <el-table-column
                  prop="callRecive"
                  sortable
                  label="预约接待">
                </el-table-column>
              </el-table>
            </el-collapse-item>

            <div class="line-bold"></div>

            <el-collapse-item class="formStylePro" title="营销中位数" name="10">
              <list-mid></list-mid>
            </el-collapse-item>

            <div class="line-bold"></div>

            <el-collapse-item class="formStylePro" title="营销转换率" name="11">
              <list-rate></list-rate>
            </el-collapse-item>

          </template>
        </el-collapse>          
    </div>
</template>
<script>
import util from '../../assets/common/util'
import formMarketBase from '../../components/form/formMarketBase'
import formDateClick from '../../components/form/formDateClick'
import formEdit from '../../components/form/formEdit'
import formActivity from '../../components/form/formActivity'
import listArticle from '../../components/list/listArticle'
import listMid from '../../components/list/listMid'
import listRate from '../../components/list/listRate'
import upLoad from '../../components/common/upLoad'
import datePq from '../../components/common/date-pq'

import $ from 'Jquery'

export default {
    data () {
        return {
            id: 0,
            activeNames: ['1'],
            index: 0,
            articleinfo: [],
            type: '',
            dateLeft: {
              year: '2017',
              month: '10'
            },
            dateRight: {
              year: '2017',
              month: '11'
            },
            activeDate: [
              {
                date: '2017-10-20',
                isHold: 1
              },
              {
                date: '2017-10-19',
                isHold: 0
              },
              {
                date: '2017-10-22',
                isHold: 0
              },
              {
                date: '2017-11-16',
                isHold: 0
              }
            ],
            paketData: [
              {
                id: 0,
                name: '王珞丹',
                date: '2017-09-08',
                paket: 10,
                integral: 100
              },
              {
                id: 1,
                name: '王珞丹',
                date: '2017-09-08',
                paket: 10,
                integral: 100
              }
            ],
            wxSpreed: [
              {
                id: 0,
                channelName: '朋友圈',
                reedNum: 100,
                reedRecive: 20,
                shareRevice: 30,
                newNum: 40
              },
              {
                id: 1,
                channelName: '朋友圈',
                reedNum: 100,
                reedRecive: 20,
                shareRevice: 30,
                newNum: 40
              }
            ],
            pushSpreed: [
              {
                id: 0,
                date: '2018-09-20',
                address: '好望角大厦',
                peoNum: 10,
                quanRevice: 10,
                giftRevice: 20,
                newNum: 30
              }
            ],
            outSale: [
              {
                id: 0,
                name: '王小虎',
                outNum: 10,
                realNum: 10,
                newCall: 20,
                callRecive: 30
              }
            ]
        }
    },
    mounted () {
        var houseColl = localStorage.getItem("houseColl")
        if (houseColl) {
            this.activeNames = houseColl.split(',')
        }
    },
    methods: {
        getAllData () {
          // this.$refs.formEdit.getArticle('articleHouse')
        },
        collChange () {
            localStorage.setItem("houseColl", this.activeNames)
        }
        // 线下
    },
    components: {
        formMarketBase,
        formDateClick,
        formActivity,
        formEdit,
        listArticle,
        listMid,
        listRate,
        datePq
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

    .date-monitor-box {
      overflow: hidden;
      border: 1px solid #D3DCE6;
      position: relative;

      .date-b-left {
        width: 319px;
        padding: 30px 0;
        text-align: center;
        box-sizing: border-box;
        float: left;
        border-right: 1px solid #D3DCE6;
      }

      .date-b-right {
        width: 320px;
        position: absolute;
        right: 0;
        top: 0;
        padding: 30px 0;
        text-align: center;
        box-sizing: border-box;
        border-left: 1px solid #D3DCE6;
      }
    }

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