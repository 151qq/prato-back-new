<template>
    <div class="form-b">
        <el-collapse v-model="activeNames" @change="collChange">
          <el-collapse-item class="formStylePro" title="基本信息" name="0">
            <market-base></market-base>
          </el-collapse-item>
          <div class="line-bold"></div>

          <el-collapse-item class="formStylePro editShow" title="活动优惠" name="3">
            <discount></discount>
          </el-collapse-item>
        </el-collapse>          
    </div>
</template>
<script>
import util from '../../../assets/common/util'
import marketBase from './formAlist/marketBase'
import discount from './formAlist/discount'

export default {
    data () {
        return {
            id: 0,
            activeNames: ['1']
        }
    },
    mounted () {
        var houseColl = localStorage.getItem("houseColl")
        if (houseColl) {
            this.activeNames = houseColl.split(',')
        }
    },
    methods: {
        collChange () {
            localStorage.setItem("houseColl", this.activeNames)
        }
    },
    components: {
        marketBase,
        discount
    }
}
</script>