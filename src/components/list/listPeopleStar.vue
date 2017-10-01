<template>
    <section class="people-box">
      <el-table
        :data="peopleStar"
        border
        style="width: 100%">
        <el-table-column
          prop="starName"
          label="姓名"
          width="217">
        </el-table-column>
        <el-table-column
          prop="starPush"
          label="贡献"
          width="209">
        </el-table-column>
        <el-table-column
          prop="starPer"
          label="占比">
        </el-table-column>
      </el-table>
    </section>
</template>
<script>
import util from '../../assets/common/util'
export default {
    data () {
      return {
        peopleStar: [
          {
            starName: '张三',
            starPush: 234,
            starPer: '20%'
          },
          {
            starName: '张三',
            starPush: 234,
            starPer: '20%'
          },
          {
            starName: '张三',
            starPush: 234,
            starPer: '20%'
          }
        ]
      }
    },
    methods: {
      getEchartsM () {
        util.request({
            method: 'get',
            interface: 'monitorData',
            data: {
              id: localStorage.getItem("id")
            }
        }).then(res => {
            this.monitor = res.result.result
            setTimeout(() => {
              console.log(this.$refs, 'refs')
              this.$refs.echarts.setEcharts()
            }, 0)
        })
      }
    }
}
</script>
<style lang="scss">
.people-box {
  .cell {
    font-size: 14px;
    color: #475669;
    text-align: center;
  }
}
</style>