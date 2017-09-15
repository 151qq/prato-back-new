<template>
    <div class="float-box flexBox" v-cloak>
        <!-- 左侧文章列表 -->
        <articles @getInfo="getInfo"></articles>
        <!-- 中间文章编辑区域 -->
        <div class="body-mid flexItem">
            <form-house></form-house>
            <!-- <edit-box ref="editFn" @getTemplates="getTemplates"></edit-box> -->
        </div>
    </div>
    
</template>
<script>
import articles from '../../../components/index/List.vue'
// import editBox from '../../../components/index/Edit'
import formHouse from '../../../components/index/formHouse'
import util from '../../../assets/common/util'

export default {
    data () {
        return {
            listInfo: {}
        }
    },
    methods: {
        getTemplates(tplCode){
            this.$refs.editFn.getTemplates(tplCode);
        },
        getInfo (id) {
            util.request({
                method: 'get',
                interface: 'reportDetail',
                data: {
                    type: this.$route.name
                }
            }).then(res => {
                this.listInfo = res.result.datas
                console.log(this.listInfo)
            })
        }
    },
    components: {
        // editBox,
        articles,
        formHouse
    }
}
</script>
<style lang="scss">
.el-collapse-item__header {
    font-size: 20px;
    color: #000000;
}
</style>