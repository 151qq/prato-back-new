<template>
    <section class="statistics-box">
      <div class="form-box">
        <section class="baseList">
            <span>阅读总数：</span>
            <div class="input-box">1</div>
        </section>
        <section class="baseList">
            <span>潜客阅读：</span>
            <div class="input-box">1</div>
        </section>
        <section class="baseList">
            <span>会员总数：</span>
            <div class="input-box">1</div>
        </section>
        <section class="baseList">
            <span>分享总数：</span>
            <div class="input-box">1</div>
        </section>
        <section class="baseList">
            <span>分享朋友圈：</span>
            <div class="input-box">1</div>
        </section>
        <section class="baseList">
            <span>分享朋友：</span>
            <div class="input-box">1</div>
        </section>
        <section class="baseList">
            <span>评论总数：</span>
            <div class="input-box">1</div>
        </section>
        <section class="baseList">
            <span>正面评论：</span>
            <div class="input-box">1</div>
        </section>
        <section class="baseList">
            <span>负面评论：</span>
            <div class="input-box">1</div>
        </section>
      </div>
    </section>
</template>
<script>
import './common/list.scss'
import util from '../../assets/common/util'

export default {
    props: ['baseData'],
    data () {
        return {
        }
    },
    methods: {
        initData () {
          
        },
        getInvestors () {
            util.request({
                method: 'get',
                interface: 'getInvestors',
                data: {
                    roleCode: 'entadconsultant'
                }
            }).then(res => {
                this.investors = res.result.result
            })
        }
    }
}
</script>
<style lang="scss">
.statistics-box {
  overflow: hidden;

  .form-box {
    overflow: hidden;
  }
}
</style>