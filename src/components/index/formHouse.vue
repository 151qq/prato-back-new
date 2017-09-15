<template>
    <div>
        <el-collapse v-model="activeNames">
          <el-collapse-item class="formStyle" title="物业基本信息" name="1">
            <search-box :is-page="true" @mapChange="drawMap"></search-box>
            <div id="container"></div>
            <div class="clear"></div>
            <div class="form-box">
                <section class="baseInput">
                    <span>所在城市</span>
                    <el-input
                      class="input-box"
                      placeholder="请输入内容"
                      v-model="formData.base.city"
                      :disabled="true">
                    </el-input>
                </section>
                <section class="baseInput rightF">
                    <span>所属商圈</span>
                    <el-select class="input-box" v-model="formData.base.mall" placeholder="请选择">
                        <el-option
                          v-for="item in malls"
                          :key="item"
                          :label="item"
                          :value="item">
                        </el-option>
                    </el-select>
                </section>
                <section class="baseInput">
                    <span>物业类型</span>
                    <el-select class="input-box" v-model="formData.base.type" placeholder="请选择">
                        <el-option
                          v-for="item in malls"
                          :key="item"
                          :label="item"
                          :value="item">
                        </el-option>
                    </el-select>
                </section>
                <section class="baseInput rightF">
                    <span>楼盘等级</span>
                    <el-select class="input-box" v-model="formData.base.level" placeholder="请选择">
                        <el-option
                          v-for="item in malls"
                          :key="item"
                          :label="item"
                          :value="item">
                        </el-option>
                    </el-select>
                </section>
                <section class="baseInput bigB">
                    <span>所属地块</span>
                    <el-input
                      class="input-box"
                      placeholder="请输入内容"
                      v-model="formData.base.block">
                    </el-input>
                </section>
                <section class="baseInput">
                    <span>剩余年限</span>
                    <el-input-number class="input-box" size="small" :min="0" v-model="formData.base.year"></el-input-number>
                </section>
                <section class="baseInput rightF">
                    <span>容积率</span>
                    <el-input-number class="input-box" size="small" :step="0.01" :min="0" :max="1" v-model="formData.base.rates"></el-input-number>
                </section>
                <section class="baseInput bigB">
                    <span>业主信息</span>
                    <el-input
                      class="input-box"
                      placeholder="请输入内容"
                      v-model="formData.base.block">
                    </el-input>
                </section>
                <section class="baseInput bigB">
                    <span>物业信息</span>
                    <el-input
                      class="input-box"
                      placeholder="请输入内容"
                      v-model="formData.base.block">
                    </el-input>
                </section>
                <section class="baseInput bigB">
                    <span>现在租户</span>
                    <el-input
                      class="input-box"
                      placeholder="请输入内容"
                      v-model="formData.base.block">
                    </el-input>
                </section>
                <section class="baseInput">
                    <span>物业面积</span>
                    <el-input-number class="input-box" size="small" :min="0" v-model="formData.base.year"></el-input-number>
                </section>
                <section class="baseInput rightF">
                    <span>总层数</span>
                    <el-input-number class="input-box" size="small" :min="1" v-model="formData.base.rates"></el-input-number>
                </section>
                <section class="baseInput">
                    <span>电梯数</span>
                    <el-input-number class="input-box" size="small" :min="0" v-model="formData.base.year"></el-input-number>
                </section>
                <section class="baseInput rightF">
                    <span>空调数</span>
                    <el-input-number class="input-box" size="small" :min="0" v-model="formData.base.rates"></el-input-number>
                </section>
                <section class="baseInput">
                    <span>地板类型</span>
                    <el-select class="input-box" v-model="formData.base.type" placeholder="请选择">
                        <el-option
                          v-for="item in malls"
                          :key="item"
                          :label="item"
                          :value="item">
                        </el-option>
                    </el-select>
                </section>
                <section class="baseInput rightF">
                    <span>物业持有</span>
                    <el-select class="input-box" v-model="formData.base.level" placeholder="请选择">
                        <el-option
                          v-for="item in malls"
                          :key="item"
                          :label="item"
                          :value="item">
                        </el-option>
                    </el-select>
                </section>
                <section class="baseInput bigB">
                    <span>交通状况</span>
                    <el-input
                      class="input-box"
                      placeholder="请输入内容"
                      v-model="formData.base.block">
                    </el-input>
                </section>
                <section class="baseInput bigB">
                    <span>对标物业</span>
                    <el-select
                        class="input-box"
                        v-model="formData.base.benchmark"
                        multiple
                        filterable
                        allow-create
                        placeholder="请选择文章标签">
                        <el-option
                          v-for="item in malls"
                          :key="item"
                          :label="item"
                          :value="item">
                        </el-option>
                    </el-select>
                </section>
                <div class="clear"></div>
            </div>
          </el-collapse-item>
          <el-collapse-item class="formStyle" title="物业交易历史" name="2">
            <el-button class="add-btn" type="primary" size="small" icon="plus" @click="addChange">增加</el-button>
            <div v-for="(item, index) in formData.changes" class="over-box">
                <section class="baseInput">
                    <span>交易日期</span>
                    <el-date-picker
                      class="input-box"
                      v-model="item.date"
                      type="date"
                      placeholder="选择日期"
                      :picker-options="pickerPre">
                    </el-date-picker>
                </section>
                <section class="baseInput rightF">
                    <span>交易价格</span>
                    <el-input-number class="input-box" size="small" :min="0" v-model="item.price"></el-input-number>
                </section>
                <section class="baseInput">
                    <span>交易甲方</span>
                    <el-input
                      class="input-box"
                      placeholder="请输入内容"
                      v-model="item.changeA">
                    </el-input>
                </section>
                <section class="baseInput rightF">
                    <span>交易乙方</span>
                    <el-input
                      class="input-box"
                      placeholder="请输入内容"
                      v-model="item.changeB">
                    </el-input>
                </section>
                <section class="baseInput bigB">
                    <span>所属地块</span>
                    <el-input
                      class="input-box"
                      placeholder="请输入内容"
                      v-model="item.block">
                    </el-input>
                </section>
                <div class="clear"></div>
                <el-button class="delete-btn" type="danger" :plain="true" size="small" icon="delete" @click="deleteChange(index)">删除</el-button>
            </div>
          </el-collapse-item>
          <el-collapse-item class="formStyle" title="物业租金历史" name="3">
            <div>简化流程：设计简洁直观的操作流程；</div>
            <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
            <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
          </el-collapse-item>
        </el-collapse>
    </div>
</template>
<script>
import searchBox from '../common/search-box.vue'
import util from '../../assets/common/util'

export default {
    data () {
        return {
            formData: {
                base: {
                    city: '',
                    mall: '',
                    type: '',
                    level: '',
                    block: '',
                    year: 0,
                    rates: 1,
                    benchmark: ''
                },
                changes: [
                    {
                        date: '',
                        price: '',
                        changeA: '',
                        changeB: '',
                        block: ''
                    }
                ],
                rents: []
            },
            malls: [],
            activeNames: ['2'],
            pickerPre: {
                disabledDate(time) {
                    return time.getTime() > Date.now() - 8.64e7;
                }
            }
        }
    },
    mounted () {
        this.$nextTick(() => {
          var map = new window.BMap.Map('container')
          this.map = map
          var point = new window.BMap.Point(116.409, 39.918)
          map.centerAndZoom(point, 15)
          this.drawMap()
        })
    },
    methods: {
        drawMap (mapInfo) {
            this.formData.base.city = mapInfo.city
            this.getMalls()
            this.map.clearOverlays()
            var point = new window.BMap.Point(mapInfo.point.lng, mapInfo.point.lat)
            this.map.panTo(point)
            var marker = new BMap.Marker(point)
            this.map.addOverlay(marker)
        },
        getMalls () {
            util.request({
                method: 'get',
                interface: 'malls',
                data: {
                    city: this.formData.base.city
                }
            }).then(res => {
                this.malls = res.result.datas
            })
        },
        addChange () {
            var data = {
                date: '',
                price: '',
                changeA: '',
                changeB: '',
                block: ''
            }
            this.formData.changes.push(data)
        },
        deleteChange (index) {
            if (this.formData.changes.length === 1) {
                this.$message({
                  message: '至少要保留一条交易记录',
                  type: 'warning'
                })
                return false
            }
            this.formData.changes.splice(index, 1)
        }
    },
    components: {
        searchBox
    }
}
</script>
<style lang="scss">
.formStyle {
    position: relative;
    padding-top: 15px;
    width: 640px;
    margin-left: 120px;

    .add-btn {
        position: absolute;
        right: 0;
        top: 23px;
    }
}

.el-collapse, .el-collapse-item__header, .el-collapse-item__wrap {
    background: #ffffff;
    border: none;
}

.el-collapse-item__wrap {
    padding-top: 20px;
    overflow: visible;
}

.el-collapse-item__content {
    padding: 0;
}

.el-collapse-item__header {
    padding: 0;
}

#container {
    width: 640px;
    height: 140px;
    margin: 15px 0;
}

.baseInput {
    float: left;
    height: 30px;
    margin-bottom: 20px;

    span {
        float: left;
        width: 65px;
        font-size: 14px;
        color: #1F2D3D;
        line-height: 30px;
    }

    .input-box {
        float: left;
        width: 235px;
        height: 30px;

        input {
            height: 30px;
        }
    }
}

.bigB {
    .input-box {
        width: 575px;
    }
}

.rightF {
    float: right;
}

.over-box {
    width: 670px;
    padding: 15px 15px 0;
    box-sizing: border-box;
    overflow: hidden;
    margin-left: -15px;

    &:nth-of-type(2n) {
        background: #F9F9F9;
    }

    .delete-btn {
        float: right;
        display: none;
        margin-bottom: 20px;
        cursor: pointer;
    }

    &:hover {
        background: #EFF2F7;

        .delete-btn {
            display: block;
        }
    }
}
</style>