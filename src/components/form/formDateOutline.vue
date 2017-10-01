<template>
    <section class="date-outline-box">
      <el-button class="add-btn" type="primary" icon="plus" size="small" @click="addOutlineDate">增加</el-button>
      <div class="form-box" v-for="(item, index) in outlineDates">
        <section class="baseInput">
            <span>交易日期</span>
            <el-date-picker
              class="input-box"
              v-model="item.date"
              type="date"
              placeholder="选择日期"
              @change="saveData"
              :picker-options="pickerPre">
            </el-date-picker>
        </section>
        <section class="baseInput rightF">
          <span>负责人</span>
          <div class="input-box">
              <el-select
                  v-model="item.people"
                  multiple
                  filterable
                  allow-create
                  :multiple-limit="3"
                  placeholder="请选择文章标签">
                  <el-option
                    v-for="item in peoples"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id">
                  </el-option>
              </el-select>
          </div>
        </section>
        <div class="clear"></div>
        <el-button class="del-btn" type="info" :plain="true" size="small" icon="delete2"
          @click="delOutlineDate(index)">删除</el-button>
      </div>
      <div class="clear"></div>
      <el-button class="save-btn" type="info" :plain="true" size="small" icon="document"
          @click="saveData('articleinfo')">保存</el-button>
      <div class="clear"></div>
    </section>
</template>
<script>
import './common/form.scss'
import util from '../../assets/common/util'
export default {
    data () {
        return {
            outlineDates: [
              {
                id: 0,
                date: '2015-09-08',
                people: 1
              },
              {
                id: 1,
                date: '2015-09-08',
                people: 3
              },
              {
                id: 2,
                date: '2015-09-08',
                people: 2
              }
            ],
            peoples: [
              {
                id: 1,
                value: '章三'
              },
              {
                id: 2,
                value: '里斯'
              },
              {
                id: 3,
                value: '王五'
              }
            ],
        }
    },
    methods: {
        initData () {
          this.getSpec()
        },
        getSpec () {
          util.request({
              method: 'get',
              interface: 'prospec',
              data: {
                id: localStorage.getItem("id")
              }
          }).then(res => {
              this.specs = res.result.result.specs
          })
        },
        addOutlineDate () {
          var data = {
            date: '',
            people: ''
          }

          this.outlineDates.push(data)
        },
        delOutlineDate (index) {
          this.specs.splice(index, 1)
        }
    }
}
</script>
<style lang="scss">
.date-outline-box {
  .form-box {
    width: 670px;
    box-sizing: border-box;
    margin-left: -15px;
    padding: 15px;
    overflow: hidden;
    cursor: pointer;

    .el-select {
      width: 235px;
    }

    .baseInput {
      margin-bottom: 12px;
    }

    .del-btn {
      float: right;
      display: none;
    }

    &:hover {
      background: #EFF2F7;

      .del-btn {
        display: block;
      }
    }
  }
}
</style>