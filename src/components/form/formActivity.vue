<template>
    <section class="activity-box">
        <el-button class="add-btn" type="primary" icon="plus" size="small" @click="addActivity">增加</el-button>
        <div class="yh-box" v-for="(activity, index) in activities" @click="acIndex = index">
          <div class="clear"></div>
            <section class="baseInput bigB">
                <span>券标题</span>
                <el-input
                  class="input-box"
                  placeholder="请输入内容"
                  v-model="activity.name">
                </el-input>
            </section>
            <section class="baseInput">
                <span>生效时间</span>
                <el-date-picker
                  class="input-box"
                  v-model="activity.startDate"
                  type="date"
                  placeholder="选择日期"
                  >
                </el-date-picker>
            </section>
            <section class="baseInput rightF">
                <span>失效时间</span>
                <el-date-picker
                  class="input-box"
                  v-model="activity.stopDate"
                  type="date"
                  placeholder="选择日期"
                  >
                </el-date-picker>
            </section>
            <section class="baseInput">
                <span>券类型</span>
                <el-select class="input-box" v-model="activity.type" placeholder="请选择">
                    <el-option
                      v-for="item in activityTypes"
                      :key="item.id"
                      :label="item.value"
                      :value="item.id">
                    </el-option>
                </el-select>
            </section>
            <section class="baseInput rightF">
                <span>券金额</span>
                <el-input-number class="input-box" size="small" :min="0"
                    v-model="activity.price"></el-input-number>
            </section>

            <div class="clear"></div>

            <section class="basetable">
              <span>券封面</span>
              <div class="table-right">
                <img class="bg-box" src="../../assets/images/activity-bg.jpg">
                <input type="file" name="" class="hidden-input">
                <div class="black-bg"></div>
                <input type="text" class="title-input" v-model="activity.quanTitle" placeholder="编辑标题">
              </div>
            </section>

            <section class="basetable">
              <span>券封面</span>
              <div class="table-right">
                <textarea class="t-box">{{activity.quan.des}}</textarea>
              </div>
            </section>

            <section class="baseInput">
                <span>优惠叠加</span>
                <el-select class="input-box" v-model="activity.favo" placeholder="请选择">
                    <el-option
                      v-for="item in activityFavos"
                      :key="item.id"
                      :label="item.value"
                      :value="item.id">
                    </el-option>
                </el-select>
            </section>
            <section class="baseInput rightF">
                <span>最低消费</span>
                <el-input-number class="input-box" size="small" :min="0"
                    v-model="activity.lowPrice"></el-input-number>
            </section>

            <section class="search-input">
                <span>试用商品</span>
                <el-autocomplete
                  id="goodB"
                  class="inline-input"
                  v-model="goods"
                  :fetch-suggestions="goodSearch"
                  placeholder="请输入内容"
                  :trigger-on-focus="false"
                  @select="goodSelect"
                  size="small"
                >
                  <template slot="append">
                    <el-button type="primary" size="small" icon="search"
                        @click="searchFocus('goodB')">搜索</el-button>
                  </template>
                </el-autocomplete>
                <div class="tag-box">
                  <el-tag
                    v-for="(tag, index) in activity.goods"
                    :key="index"
                    :closable="true"
                    type="primary"
                    @close="handleClose(activity.goods, tag)"
                  >
                  {{tag.value}}
                  </el-tag>
                </div>
            </section>

            <el-button class="save-btn" type="info" :plain="true" size="small" icon="document"
            @click="saveData('activities')">保存</el-button>
            
            <el-button class="save-btn" type="danger" :plain="true" size="small" icon="delete"
                @click="deleteActivity(index)">删除</el-button>
        </div>
    </section>
</template>
<script>
import './common/form.scss'
export default {
    data () {
        return {
            activeDate: '',
            activities: [
              {
                name: '',
                price: 0,
                type: '',
                startDate: '',
                stopDate: '',
                quanTitle: '',
                quan: {
                  des: '佳程广场总占地面积17690平方米，总建筑面积141075平方米，楼体高度：103.8米。紧临东三环，交通方便。由两栋甲级写字楼、裙楼配套商业(现建为俱乐部)及大型地下停车库组成，为国际建筑师公司——巴马丹拿(P&T GROUP)的灵感代表之作。外墙采用高级反光玻璃幕墙配置铝板及石材的组合表现出建筑的现代感，汲取中国古代建筑美学之灵感，造就中西融汇的独特性格。佳程广场总体布局气势磅礴，双塔凌云耸立，以"掌开而合"的形态，表达对世界的拥抱。6000平方米入口广场上设有巨型水景园林，形成辉耀北京东区的新地标。'
                },
                favo: 0,
                lowPrice: 0,
                goods: []
              }
            ],
            types: [],
            goods: '',
            acIndex: 0,
            activityTypes: [
              { value: '客户一', id: 0 },
              { value: '客户二', id: 1 },
              { value: '客户三', id: 2 },
              { value: '客户四', id: 3 },
              { value: '客户五', id: 4 },
              { value: '客户六', id: 5 }
            ],
            activityFavos: [
              { value: '产品一', id: 0 },
              { value: '产品二', id: 1 },
              { value: '产品三', id: 2 },
              { value: '产品四', id: 3 },
              { value: '产品五', id: 4 },
              { value: '产品六', id: 5 }
            ],
        }
    },
    methods: {
        addActivity () {
          var data = {
            name: '',
            price: 0,
            type: '',
            startDate: '',
            stopDate: '',
            quan: {
              des: ''
            },
            favo: 0,
            lowPrice: 0,
            goods: []
          }

          this.activities.push(data)
        },
        deleteActivity (index) {
          this.activities.splice(index, 1)
        },
        handleClose (datas, item) {
          datas.splice(datas.indexOf(item), 1)
        },
        goodSearch (key, cb) {
          console.log(key, 'ik')
          var results = this.activityFavos.filter((item) => {
            return item.value.indexOf(key) > -1
          })
          console.log(results, 'results')
          cb(results)
        },
        goodSelect (item) {
          console.log(item, 'item')
          this.activities[this.acIndex].goods.push(item)
        },
        searchFocus (id) {
          $('#' + id + ' input').focus()
        }
    }
}
</script>
<style lang="scss">
.activity-box {
  .yh-box {
    width: 670px;
    box-sizing: border-box;
    margin-left: -15px;
    padding: 20px 15px;
    background: #EFF2F7;
    overflow: hidden;
    margin-bottom: 30px;
  }
  .basetable {
      overflow: hidden;
      margin-bottom: 20px;
      &>span {
        float: left;
        width: 65px;
        font-size: 14px;
        color: #1F2D3D;
        line-height: 30px;
      }

      .table-right {
        position: relative;
        float: right;
        width: 575px;

        .bg-box {
          display: block;
          width: 100%;
          height: auto;
        }

        .hidden-input {
          position: absolute;
          width: 100%;
          height: 285px;
          left: 0;
          top: 0;
          opacity: 0.01;
        }

        .black-bg {
          position: absolute;
          width: 100%;
          height: 40px;
          left: 0;
          bottom: 0;
          opacity: 0.5;
          background: #000000;
        }

        .title-input {
          position: absolute;
          width: 500px;
          height: 20px;
          left: 10px;
          bottom: 10px;
          border: none;
          background: transparent;
          padding: 0;
          border-left: 1px solid #20A0FF;
          padding-left: 10px;
          font-size: 12px;
          color: #ffffff;
          line-height: 20px;
        }

        .t-box {
          display: block;
          width: 100%;
          height: 180px;
          font-size: 14px;
          line-height: 30px;
          color: #475669;
          padding: 0;
          border: none;
          background: transparent;
        }
      }
    }
}
</style>