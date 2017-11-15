<template>
    <section class="reward-box">
        <el-button class="add-btn" type="primary" icon="plus" size="small" @click="addReward">增加</el-button>

        <div class="table-box">
          <section class="t-title">
            <span class="one">行为</span>
            <span class="two">奖励</span>
            <span class="three">积分</span>
            <span class="four">操作</span>
          </section>
          <section class="t-cont" v-for="(item, index) in rewards">
            <span class="one">
              <el-select class="inp-box" v-model="item.type" size="small" placeholder="请选择">
                <el-option
                  v-for="item in rewardTypes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </span>
            <span class="two">
              <el-input-number class="inp-box" size="small" :min="0"
                    v-model="item.condition"></el-input-number>
            </span>
            <span class="three">
              <el-input-number class="inp-box" size="small" :min="0"
                    v-model="item.integral"></el-input-number>
            </span>
            <span class="four">
              <i class="el-icon-delete2 del-btn" @click="delReward(index)"></i>
            </span>
          </section>
        </div>
        <div class="clear"></div>
        <el-button class="save-btn" type="info" :plain="true" size="small" icon="document"
            @click="saveData('rewards')">保存</el-button>
        <div class="clear"></div>
    </section>
</template>
<script>
import './common/form.scss'
export default {
    data () {
        return {
            rewards: [
              {
                id: 0,
                type: '类型一',
                condition: 0,
                integral: 0
              },
              {
                id: 1,
                type: '类型二',
                condition: 0,
                integral: 0
              }
            ],
            rewardTypes: [
              { value: '类型一', id: 0 },
              { value: '类型二', id: 1 },
              { value: '类型三', id: 2 },
              { value: '类型四', id: 3 },
              { value: '类型五', id: 4 },
              { value: '类型六', id: 5 }
            ]
        }
    },
    methods: {
        addReward () {
          var data = {
            type: '',
            condition: 0,
            integral: 0
          }

          this.rewards.push(data)
        },
        delReward (index) {
          this.rewards.splice(index, 1)
        }
    }
}
</script>
<style lang="scss">
.reward-box {

  .table-box {
    border: 1px solid #D3DCE6;
    border-bottom: none;

    .one {
      width: 190px;
      float: left;
      min-height: 40px;
      font-size: 14px;
      color: #000000;
      line-height: 40px;
      text-align: center;
    }

    .two, .three {
      width: 190px;
      float: left;
      min-height: 40px;
      font-size: 14px;
      color: #000000;
      line-height: 40px;
      text-align: center;
    }

    .four {
      width: 68px;
      float: left;
      min-height: 40px;
      font-size: 14px;
      color: #000000;
      line-height: 40px;
      text-align: center;
      border-left: 1px solid #D3DCE6;
    }

    .t-title {
      overflow: hidden;
      border-bottom: 1px solid #D3DCE6;
      background: #F0F0F0;
    }

    .t-cont {
      overflow: hidden;
      cursor: pointer;
      border-bottom: 1px solid #D3DCE6;

      .inp-box {
        width: 180px;
      }

      &:nth-child(odd) {
        background: #f9f9f9;
      }

      &:hover {
        background: #EFF2F7;
      }
    }
  }
}
</style>