<template>
    <section class="activity-box">
        <el-button class="add-btn" type="primary" icon="plus" size="small" @click="addDiscount">增加</el-button>
        <el-table
          :data="discountData"
          border
          style="width: 100%">
          <el-table-column
            prop="date"
            width="120"
            label="发行时间">
          </el-table-column>
          <el-table-column
            prop="quanType"
            width="90"
            label="券类型">
          </el-table-column>
          <el-table-column
            prop="quanTitle"
            width="200"
            label="券标题">
          </el-table-column>
          <el-table-column
            prop="dateRange"
            width="210"
            label="有效期">
          </el-table-column>
          <el-table-column
            prop="useScene"
            width="110"
            label="券使用场景">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="70">
            <template scope="scope">
              <i class="el-icon-delete2" @click="deleteDiscount(scope.row)"></i>
              <i class="el-icon-document" @click="showDiscount(scope.row)"></i>
            </template>
          </el-table-column>
        </el-table>

        <form-add-discount :is-show="isShow"></form-add-discount>
    </section>
</template>
<script>
import './common/form.scss'
import formAddDiscount from './formAddDiscount'

export default {
    data () {
        return {
          discountData: [
            {
              id: 0,
              date: '2017-09-09',
              quanType: '礼品券',
              quanTitle: '我是礼品券啊礼品券',
              dateRange: '2017-09-09~2018-09-09',
              useScene: '购买'
            },
            {
              id: 1,
              date: '2017-09-09',
              quanType: '折扣券',
              quanTitle: '折扣券',
              dateRange: '2017-09-09~2018-09-09',
              useScene: '购买'
            },
            {
              id: 2,
              date: '2017-09-09',
              quanType: '代金券',
              quanTitle: '代金券',
              dateRange: '2017-09-09~2018-09-09',
              useScene: '传播'
            }
          ],
          isShow: {
            value: false
          }
        }
    },
    methods: {
      addDiscount () {
        this.isShow.value = true
      },
      deleteDiscount (row) {

      },
      showDiscount () {
        this.isShow.value = true
      }
    },
    components: {
      formAddDiscount
    }
}
</script>