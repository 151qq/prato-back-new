<template>
    <div class="float-box flexBox" v-cloak>
        <!-- 左侧文章列表 -->
        <section class="leftBox" v-if="$route.params.type !== 'add'">
            <articles @getInfo="getInfo"></articles>
        </section>
        <!-- 中间文章编辑区域 -->
        <div class="body-mid flexItem">
            <form-house ref="editBox" :list-info="listInfo"></form-house>
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
            if (this.$route.params.type === 'add') {
                return false
            }
            util.request({
                method: 'get',
                interface: 'info',
                data: {
                    type: this.$route.name,
                    id: id
                }
            }).then(res => {
                this.listInfo = res.result.datas
                console.log(this.listInfo, 'info')
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
.leftBox {
    width: 400px;
}
.el-collapse-item__header {
    font-size: 20px;
    color: #000000;
}
</style>