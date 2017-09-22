<template>
    <div class="form-b">
        <el-collapse v-model="activeNames" @change="collChange">
          <el-collapse-item class="formStyle" title="物业基本信息" name="1">
            <section v-if="$route.params.type === 'edit'" class="baseInput bigB">
                <span>楼盘名字</span>
                <el-input
                  class="input-box"
                  placeholder="请输入内容"
                  @blur="saveData"
                  :disabled="true"
                  v-model="formData.base.name">
                </el-input>
            </section>
            <search-box v-if="$route.params.type !== 'edit'" :is-page="true" @mapChange="drawMap"></search-box>
            <div id="container"></div>
            <div class="form-box">
                <div class="clear"></div>
                <section class="baseInput">
                    <span>所在城市</span>
                    <el-input
                      class="input-box"
                      placeholder="请输入内容"
                      @blur="saveData"
                      v-model="formData.base.city"
                      :disabled="true">
                    </el-input>
                </section>
                <section class="baseInput rightF">
                    <span>所属商圈</span>
                    <el-select class="input-box" @change="saveData" v-model="formData.base.mall" placeholder="请选择">
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
                    <el-select class="input-box" @change="saveData" v-model="formData.base.proType" placeholder="请选择">
                        <el-option
                          v-for="item in types.property"
                          :key="item"
                          :label="item"
                          :value="item">
                        </el-option>
                    </el-select>
                </section>
                <section class="baseInput rightF">
                    <span>楼盘等级</span>
                    <el-select class="input-box" @change="saveData" v-model="formData.base.level" placeholder="请选择">
                        <el-option
                          v-for="item in types.level"
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
                      @blur="saveData"
                      v-model="formData.base.massif">
                    </el-input>
                </section>
                <section class="baseInput">
                    <span>剩余年限</span>
                    <el-input-number class="input-box" @change="saveData" size="small" :min="0" v-model="formData.base.year"></el-input-number>
                </section>
                <section class="baseInput rightF">
                    <span>容积率</span>
                    <el-input-number class="input-box" @change="saveData" size="small" :step="0.01" :min="0" :max="1" v-model="formData.base.ratio"></el-input-number>
                </section>
                <section class="baseInput bigB">
                    <span>业主信息</span>
                    <el-input
                      class="input-box"
                      placeholder="请输入内容"
                      @blur="saveData"
                      v-model="formData.base.owner">
                    </el-input>
                </section>
                <section class="baseInput bigB">
                    <span>物业信息</span>
                    <el-input
                      class="input-box"
                      placeholder="请输入内容"
                      v-model="formData.base.property">
                    </el-input>
                </section>
                <section class="baseInput bigB">
                    <span>现在租户</span>
                    <el-input
                      class="input-box"
                      placeholder="请输入内容"
                      @blur="saveData"
                      v-model="formData.base.rent">
                    </el-input>
                </section>
                <section class="baseInput">
                    <span>物业面积</span>
                    <el-input-number class="input-box" @change="saveData" size="small" :min="0" v-model="formData.base.area"></el-input-number>
                </section>
                <section class="baseInput rightF">
                    <span>总层数</span>
                    <el-input-number class="input-box" @change="saveData" size="small" :min="1" v-model="formData.base.plies"></el-input-number>
                </section>
                <section class="baseInput">
                    <span>电梯数</span>
                    <el-input-number class="input-box" @change="saveData" size="small" :min="0" v-model="formData.base.elevator"></el-input-number>
                </section>
                <section class="baseInput rightF">
                    <span>空调数</span>
                    <el-input-number class="input-box" @change="saveData" size="small" :min="0" v-model="formData.base.conditioner"></el-input-number>
                </section>
                <section class="baseInput">
                    <span>地板类型</span>
                    <el-select class="input-box" @change="saveData" v-model="formData.base.floor" placeholder="请选择">
                        <el-option
                          v-for="item in types.floors"
                          :key="item"
                          :label="item"
                          :value="item">
                        </el-option>
                    </el-select>
                </section>
                <section class="baseInput rightF">
                    <span>物业持有</span>
                    <el-select class="input-box" @change="saveData" v-model="formData.base.holding" placeholder="请选择">
                        <el-option
                          v-for="item in types.hold"
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
                      @blur="saveData"
                      v-model="formData.base.traffic">
                    </el-input>
                </section>
                <section class="baseInput bigB">
                    <span>对标物业</span>
                    <div class="input-box">
                        <el-select
                            v-model="formData.base.benchmark"
                            multiple
                            filterable
                            allow-create
                            placeholder="请选择文章标签">
                            <el-option
                              v-for="item in benchList"
                              :key="item.title"
                              :label="item.title"
                              :value="item.title">
                            </el-option>
                        </el-select>
                    </div>
                </section>
                <div class="clear"></div>
            </div>
          </el-collapse-item>
          <div class="line-bold"></div>
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
                      @change="saveData"
                      :picker-options="pickerPre">
                    </el-date-picker>
                </section>
                <section class="baseInput rightF">
                    <span>交易价格</span>
                    <el-input-number class="input-box" @change="saveData" size="small" :min="0" v-model="item.price"></el-input-number>
                </section>
                <section class="baseInput">
                    <span>交易甲方</span>
                    <el-input
                      class="input-box"
                      placeholder="请输入内容"
                      @blur="saveData"
                      v-model="item.changeA">
                    </el-input>
                </section>
                <section class="baseInput rightF">
                    <span>交易乙方</span>
                    <el-input
                      class="input-box"
                      placeholder="请输入内容"
                      @blur="saveData"
                      v-model="item.changeB">
                    </el-input>
                </section>
                <section class="baseInput bigB">
                    <span>所属地块</span>
                    <el-input
                      class="input-box"
                      placeholder="请输入内容"
                      @blur="saveData"
                      v-model="item.block">
                    </el-input>
                </section>
                <div class="clear"></div>
                <el-button class="delete-btn" type="danger" :plain="true" size="small" icon="delete" @click="deleteChange(index)">删除</el-button>
            </div>
          </el-collapse-item>
          <div class="line-bold"></div>
          <el-collapse-item class="formStyle" title="物业租金历史" name="3">
            <el-button class="add-btn" type="primary" size="small" icon="plus" @click="addRent">增加</el-button>
            <div v-for="(item, index) in formData.rents" class="over-box">
                <section class="baseInput">
                    <span>交易日期</span>
                    <el-date-picker
                      class="input-box"
                      v-model="item.date"
                      type="date"
                      placeholder="选择日期"
                      @change="saveData"
                      :picker-options="pickerPre">
                    </el-date-picker>
                </section>
                <section class="baseInput rightF">
                    <span>高区租金</span>
                    <el-input-number class="input-box" @change="saveData" size="small" :min="0" v-model="item.priceT"></el-input-number>
                </section>
                <div class="clear"></div>
                <section class="baseInput rightF">
                    <span>中区租金</span>
                    <el-input-number class="input-box" @change="saveData" size="small" :min="0" v-model="item.priceM"></el-input-number>
                </section>
                <div class="clear"></div>
                <section class="baseInput rightF">
                    <span>低区租金</span>
                    <el-input-number class="input-box" @change="saveData" size="small" :min="0" v-model="item.priceB"></el-input-number>
                </section>
                <div class="clear"></div>
                <el-button class="delete-btn" type="danger" :plain="true" size="small" icon="delete" @click="deleteRent(index)">删除</el-button>
            </div>
          </el-collapse-item>
          <div class="line-bold"></div>
          <el-collapse-item class="formStyle editShow" title="物业评述" name="4">
            <edit-box :article-in="articleinfo" @saveHandle="saveData"></edit-box>
          </el-collapse-item>
          <div class="line-bold"></div>
          <el-collapse-item class="formStyle" title="物业外观图片" name="5">
            <upload-list :img-lists="formData.imgs.appearance" @showimg="showImg"></upload-list>
          </el-collapse-item>
          <div class="line-bold"></div>
          <el-collapse-item class="formStyle" title="物业公共区域图片" name="6">
            <upload-list :img-lists="formData.imgs.public" @showimg="showImg"></upload-list>
          </el-collapse-item>
          <div class="line-bold"></div>
          <el-collapse-item class="formStyle" title="物业周围环境图片" name="7">
            <upload-list :img-lists="formData.imgs.surround" @showimg="showImg"></upload-list>
          </el-collapse-item>
        </el-collapse>
  
        <swiper-img :is-show="isShow" :index="index" :big-imgs="bigImgs"></swiper-img>
    </div>
</template>
<script>
import searchBox from '../common/search-box.vue'
import util from '../../assets/common/util'
import uploadList from '../../components/index/upload-list'
import swiperImg from '../../components/common/swiper-img.vue'
import editBox from '../../components/common/edit'

export default {
    props: ['listInfo', 'articleInfo'],
    data () {
        return {
            formData: {
                base: {
                    name: '',
                    point: {
                        lng: '',
                        lat: ''
                    },
                    city: '',
                    mall: '',
                    proType: '',
                    level: '',
                    massif: '',
                    year: 0,
                    ratio: 1,
                    owner: '',
                    property: '',
                    rent: '',
                    area: '',
                    plies: '',
                    elevator: '',
                    conditioner: '',
                    floor: '',
                    benchmark: [],
                    holding: '',
                    traffic: ''
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
                rents: [
                    {
                        date: '',
                        priceT: '',
                        priceM: '',
                        priceB: ''
                    }
                ],
                imgs: {
                  appearance: [
                    '/static/images/img1.png',
                    '/static/images/img1.png',
                    '/static/images/img1.png',
                    '/static/images/img1.png'
                  ],
                  public: [
                    '/static/images/img1.png',
                    '/static/images/img1.png',
                    '/static/images/img1.png',
                    '/static/images/img1.png'
                  ],
                  surround: [
                    '/static/images/img1.png',
                    '/static/images/img1.png',
                    '/static/images/img1.png',
                    '/static/images/img1.png'
                  ]
                }
            },
            malls: [],
            types: {
                property: [],
                level: [],
                rent: [],
                floors: [],
                hold: [],
                measure: []
            },
            benchList: [],
            activeNames: ['1'],
            pickerPre: {
                disabledDate(time) {
                    return time.getTime() > Date.now() - 8.64e7;
                }
            },
            isShow: {
              value: false
            },
            index: 0,
            bigImgs: [],
            isCanSaved: false,
            articleinfo: []
        }
    },
    mounted () {
        var map = new window.BMap.Map('container')
        this.map = map
        var point = new window.BMap.Point(116.409, 39.918)
        map.centerAndZoom(point, 15)

        this.getTypes()

        this.type = this.$route.params.type
        if (this.type !== 'add') {
            var houseColl = localStorage.getItem("houseColl")
            if (houseColl) {
                this.activeNames = houseColl.split(',')
            }
        }
    },
    watch: {
        listInfo () {
            if (this.type === 'add') {
                this.getBenchList()
                this.isCanSaved = true
            } else {
                this.formData = this.listInfo
                this.drawMap()
                this.getBenchList()
                setTimeout(() => {
                  this.isCanSaved = true
                }, 300)
            }
        },
        articleInfo () {
          this.articleinfo = this.articleInfo
        }
    },
    methods: {
        showImg (index) {
          util.request({
              method: 'get',
              interface: 'bigImgs',
              data: {
                id: localStorage.getItem("id")
              }
          }).then(res => {
              this.bigImgs = res.result.datas
              this.index = index
              this.isShow.value = true
          })
        },
        collChange () {
            localStorage.setItem("houseColl", this.activeNames)
        },
        saveData () {
            console.log(this.isCanSaved)
            // 防止初始formData保存
            if (!this.isCanSaved) {
                return false
            }
            if (this.type !== 'add') {
              this.formData.id = localStorage.getItem("id")
            }

            this.formData.article = this.articleinfo

            util.request({
                method: 'post',
                interface: 'savehouse',
                data: this.formData
            }).then(res => {
                console.log(res)
            })
        },
        getTypes () {
            util.request({
                method: 'get',
                interface: 'typeMap',
                data: {}
            }).then(res => {
                this.types = res.result.datas
            })
        },
        getBenchList () {
            util.request({
                method: 'get',
                interface: 'benchList',
                data: {
                    id: localStorage.getItem("id")
                }
            }).then(res => {
                this.benchList = res.result.datas
            })
        },
        drawMap (mapInfo) {
            if (mapInfo) {
                this.formData.base.city = mapInfo.city
                this.formData.base.point = {
                    lng: mapInfo.point.lng,
                    lat: mapInfo.point.lat
                }
                var point = new window.BMap.Point(mapInfo.point.lng, mapInfo.point.lat)
            } else {
                var point = new window.BMap.Point(this.formData.base.point.lng, this.formData.base.point.lat)
            }
            
            this.getMalls()
            this.map.clearOverlays()
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
        },
        addRent () {
            var data = {
                date: '',
                priceT: '',
                priceM: '',
                priceB: ''
            }
            this.formData.rents.push(data)
        },
        deleteRent (index) {
            if (this.formData.rents.length === 1) {
                this.$message({
                  message: '至少要保留一条租金记录',
                  type: 'warning'
                })
                return false
            }
            this.formData.rents.splice(index, 1)
        }
    },
    components: {
        searchBox,
        uploadList,
        swiperImg,
        editBox
    }
}
</script>
<style lang="scss">
.form-b {
    margin-top: 30px;
}

.formStyle {
    width: 640px;
    margin: 0 auto;

    .add-btn {
        position: absolute;
        right: 0;
        top: 23px;
    }

    &:last-child {
        margin-bottom: 30px;
    }
}

.clear {
    clear: both;
}

.line-bold {
    height: 9px;
    border-top: 1px solid #99A9BF;
    background: #F9F9F9;
    margin: 30px 0;
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

    &>span {
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

        .el-select {
            width: 575px;
        }
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