<template>
    <section class="item-mid-box">
        <section class="item-list-out">
            <router-link class="item-list-box"
                         v-for="(item, index) in marketList"
                         :to="{name: 'market-detail', query: {index: index, type: item.eventCode, enterpriseCode: item.enterpriseCode}}">
                <img class="item-img" :src="item.eventPlanCover">
                <div class="item-title">{{item.eventPlanTitle}}</div>
            </router-link>
        </section>
        <div class="more-load"
             v-if="total && marketList.length < total"
             @click="loadMore">加载更多...</div>
    </section>
</template>
<script>
import util from '../../../assets/common/util'

export default {
    data () {
        return {
            marketList: [],
            pageSize: 20,
            pageNumber: 1,
            total: 0
        }
    },
    mounted () {
        if (this.$route.query.enterpriseCode) {
            this.getList()
        }
    },
    watch: {
      $route () {
        this.pageNumber = 1
        this.marketList = []
        this.getList()
      }
    },
    methods: {
        getList (type) {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                pageSize: this.pageSize,
                pageNumber: this.pageNumber
            }

            util.request({
                method: 'get',
                interface: 'eventInfoList',
                data: formData
            }).then(res => {
                if (res.result.success == '0') {
                    this.$message.error(res.result.message)
                    return
                }

                this.total = res.result.total
                if (type) {
                    this.marketList = res.result.result
                } else {
                    this.marketList = this.marketList.concat(res.result.result)
                }
            })
        },
        loadMore () {
            this.pageNumber++
            this.getList()
        }
    }
}
</script>