<template>
    <section>
      <div class="jsons-box jsons-big">
        <section class="t-cont">
            <span class="one">微信阅读中位数</span>
            <div class="two">1</div>
        </section>
        <section class="t-cont">
            <span class="one">微信阅读领券中位数</span>
            <div class="two">1</div>
        </section>
        <section class="t-cont">
            <span class="one">微信分享领券中位数</span>
            <div class="two">1</div>
        </section>
        <section class="t-cont">
            <span class="one">微信新增潜客中位数</span>
            <div class="two">1</div>
        </section>
        <section class="t-cont">
            <span class="one">地推到场人数中位数</span>
            <div class="two">1</div>
        </section>
        <section class="t-cont">
            <span class="one">地推领优惠券中位数</span>
            <div class="two">1</div>
        </section>
        <section class="t-cont">
            <span class="one">地推领礼品中位数</span>
            <div class="two">1</div>
        </section>
        <section class="t-cont">
            <span class="one">地推新增潜客中位数</span>
            <div class="two">1</div>
        </section>
        <section class="t-cont">
            <span class="one">新增外呼中位数</span>
            <div class="two">1</div>
        </section>
        <section class="t-cont">
            <span class="one">实际外呼中位数</span>
            <div class="two">1</div>
        </section>
        <section class="t-cont">
            <span class="one">新增预约中位数</span>
            <div class="two">1</div>
        </section>
        <section class="t-cont">
            <span class="one">预约接待中位数</span>
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