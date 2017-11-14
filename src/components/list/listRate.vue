<template>
    <section>
      <div class="jsons-box jsons-big">
        <section class="t-cont">
            <span class="one">阅读领券/阅读总数</span>
            <div class="two">1</div>
        </section>
        <section class="t-cont">
            <span class="one">分享领券/阅读总数</span>
            <div class="two">1</div>
        </section>
        <section class="t-cont">
            <span class="one">新增潜客/阅读总数</span>
            <div class="two">1</div>
        </section>
        <section class="t-cont">
            <span class="one">外呼机会/微信新增潜客</span>
            <div class="two">1</div>
        </section>
        <section class="t-cont">
            <span class="one">新增预约/微信新增潜客</span>
            <div class="two">1</div>
        </section>
        <section class="t-cont">
            <span class="one">预约接待/微信新增潜客</span>
            <div class="two">1</div>
        </section>
        <section class="t-cont">
            <span class="one">外呼机会/地推新增潜客</span>
            <div class="two">1</div>
        </section>
        <section class="t-cont">
            <span class="one">新增预约/地推新增潜客</span>
            <div class="two">1</div>
        </section>
        <section class="t-cont">
            <span class="one">预约接待/地推新增潜客</span>
            <div class="two">1</div>
        </section>
        <section class="t-cont">
            <span class="one">实际外呼/新增外呼机会</span>
            <div class="two">1</div>
        </section>
        <section class="t-cont">
            <span class="one">新增预约/实际外呼</span>
            <div class="two">1</div>
        </section>
        <section class="t-cont">
            <span class="one">预约接待/新增预约</span>
            <div class="two">1</div>
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