<template>
    <div class="source-box">
        <a class="set-btn" @click="setOpotion">设置</a>
        <section class="btns-op">
            <img v-show="!isCheck" src="../../../assets/images/select-icon.png" @click="setCheck">
            <img v-show="isCheck" src="../../../assets/images/select-now.png" @click="setCheck">
            <span></span>
            <img :class="isCheck ? '' : 'disable'" src="../../../assets/images/import-icon.png"
                    @click="setImport">
            <span></span>
            <img :class="isCheck ? '' : 'disable'" src="../../../assets/images/delete-icon-n.png"
                    @click="deleteImgs">
            <span></span>
            <div class="up-box">
                <img src="../../../assets/images/adds-icon.png">
                <input type="file" @change="upLoadImg($event)">
            </div>
        </section>

        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane v-for="(item, index) in sourceDatas" :label="item.label" :name="index + ''">
                <section v-if="item.imgs.length" class="sou-box">
                    <div v-for="(item1, index1) in item.imgs" :class="isCheck ? 'check' : ''"
                            @click="selectImg(item1.id)">
                        <span v-if="isCheck" :class="selectList.indexOf(item1.id) > -1 ? 'active' : ''"></span>
                        <img :src="item1.imgUrl">
                        <p v-if="!isCheck">
                            <a class="delete" @click="deleteImg(item1.id)"></a>
                            <a class="import" @click="importImg(item1.id)"></a>
                        </p>
                    </div>
                </section>
                <section v-else class="no-img">
                    当前无图，请上传图片！！！
                </section>
            </el-tab-pane>
        </el-tabs>


        <!-- 设置 -->
        <el-dialog title="设置" :visible.sync="issetVisible">
            <section class="dia-body">
                <div class="btns-b">
                    <img v-show="!isStragble" src="../../../assets/images/sort-icon.png"@click="sortLabel">
                    <img v-show="isStragble" src="../../../assets/images/sort-now.png"@click="sortLabel">
                    <span></span>
                    <img src="../../../assets/images/adds-icon.png" @click="addLabel">
                </div>
                
                <div class="con-box" id="sortArea">
                    <section  class="item-strag" v-if="!item.isDelete" v-for="(item, index) in labelList">
                        <input :id="'input' + index" v-if="item.isEdit && !isStragble" type="text"
                                v-model="item.text" placeholder="最少输入2个字，最多输入6个字"
                                @blur="editHandle(item)">
                        <div v-else>
                            <span v-if="item.text">{{item.text}}</span>
                            <span v-else>最少输入2个字，最多输入6个字</span>
                            <p v-if="!isStragble">
                                <img src="../../../assets/images/del-icon.png" @click="deleLabel(item, index)">
                                <img src="../../../assets/images/pen-icon.png"
                                        @click="editLabel(item, 'input' + index)">
                            </p>
                        </div>
                    </section>
                </div>

            </section>
          
            <div slot="footer" class="dialog-footer">
                <el-button @click="issetVisible = false">取 消</el-button>
                <el-button type="primary" @click="resetConfirm">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 移动 -->
        <el-dialog title="移动" :visible.sync="isselectVisible">
            <section class="dia-s-body">
                <el-checkbox-group 
                    v-model="checkedLabels"
                    :min="0"
                    :max="10">
                    <el-checkbox v-for="(item, index) in labelList" :label="index" :key="index">{{item.text}}</el-checkbox>
                </el-checkbox-group>
            </section>
          
            <div slot="footer" class="dialog-footer">
                <el-button @click="isselectVisible = false">取 消</el-button>
                <el-button type="primary" @click="selectConfirm">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 大图 -->
        <swiper-img :is-show="isShow" :index="index" :big-imgs="bigImgs"></swiper-img>
    </div>
</template>
<script>
import $ from 'Jquery'
import sortable from 'sortablejs'
import swiperImg from '../../../components/common/swiper-img.vue'
import util from '../../../assets/common/util'

export default {
    data() {
        return {
            sourceDatas: [],
            labelList: [],
            activeName: '0',
            checkedLabels: [],
            issetVisible: false,
            isselectVisible: false,
            isStragble: false,
            isAdd: false,
            isCheck: false,
            isSingleO: false,
            // 选中的图片
            selectList: [],
            bigImgs: [],
            isShow: {
              value: false
            },
            index: 0
        }
    },
    mounted () {
        this.getImgs()
    },
    methods: {
        setSortable () {
            var _this = this

            var sortArea = document.getElementById('sortArea')
            this.sortable = sortable.create(sortArea, {
                handle: ".item-strag",
                animation: 100,
                group: {name: "sortArea", pull: false, put: false},
                filter: '.filter',
                sort: true,
                disabled: true,
                onUpdate ({oldIndex, newIndex}) {
                    let preData = _this.labelList[newIndex]
                    _this.labelList[newIndex] = _this.labelList[oldIndex]
                    _this.labelList[oldIndex] = preData
                    console.log(_this.labelList, 'ls')
                }
            })
        },
        sortLabel () {
            this.sortable.option('disabled', !this.sortable.option('disabled'))
            this.isStragble = !this.isStragble
            
            if (this.sortable.option('disabled')) {
                this.articleSave = this.labelList.concat([])
                this.labelList = []
                setTimeout(() => {
                    this.labelList = this.articleSave
                }, 0)
            }
        },
        addLabel () {
            var data = {
                text: '',
                isNew: true,
                isEdit: true,
                isDelete: false
            }
            this.labelList.unshift(data)
        },
        handleClick(tab, event) {
            console.log(this.activeName)
            this.isCheck = false
        },
        getImgs () {
            util.request({
                method: 'get',
                interface: 'getSource',
                data: {}
            }).then(res => {
                this.sourceDatas = res.result.datas
                this.initSet()
            })       
        },
        getBigImgs () {
            util.request({
                method: 'get',
                interface: 'getSourceBig',
                data: {}
            }).then(res => {
                this.bigImgs = res.result.datas.imgs
                this.initSet()
            })
        },
        upLoadImg (e) {
            var tabIndex = Number(this.activeName)
            util.upFile(e).then(res => {
                if (!res.result) {
                    return false
                }

                var formData = {
                    id: this.sourceDatas[tabIndex].id,
                    imgs: [res.result.result.id]
                }

                util.request({
                    method: 'post',
                    interface: 'addImgs',
                    data: formData
                }).then(res => {
                    this.getImgs()
                })
            })
        },
        uploadSource (data) {
            util.request({
                method: 'post',
                interface: 'putSource',
                data: data
            }).then(res => {
                this.getImgs()
            })
        },
        createTab (data) {
            util.request({
                method: 'post',
                interface: 'createTab',
                data: data
            }).then(res => {
                this.getImgs()
            })
        },
        deleteTab (data) {
            util.request({
                method: 'post',
                interface: 'deleteTab',
                data: data
            }).then(res => {
                this.getImgs()
            })
        },
        deleteImg (index) {
            this.selectList = [index]
            this.isSingleO = true
            this.deleteImgs()
        },
        importImg (index) {
            this.selectList = [index]
            this.isSingleO = true
            this.setImport()
        },
        setOpotion () {
            this.sortable && this.sortable.destroy()
            this.initSet()
            this.isCheck = false
            this.isStragble = false
            this.issetVisible = true
            this.$nextTick(() => {
                this.setSortable()
            })
        },
        deleLabel (item, index) {
            // 新添的直接删除，原有的添加删除状态
            if (item.isNew) {
                this.labelList.splice(index, 1)
            } else {
                if (this.sourceDatas[item.ids].imgs.length) {
                    this.$notify({
                      title: '警告',
                      message: '该分类下有图片存在，不能删除',
                      type: 'warning'
                    })
                    return false
                }
                item.isDelete = true
            }
        },
        editLabel (item, id) {
            item.isEdit = true
            setTimeout(() => {
                $('#' + id).focus()
            }, 0)
        },
        editHandle (item) {
            if (item.text === '') {
                return false
            } else {
                item.isEdit = false
            }
        },
        resetConfirm () {
            var editList = []

            this.labelList.forEach((item) => {
                // 新添tab,添加imgs,原有的看是否删除状态,tab以labelList为准
                if (item.isNew) {
                    var data = {
                        label: item.text,
                        imgs: []
                    }

                    editList.push(data)

                    var formData = {
                        name: item.text
                    }

                    this.createTab(formData)
                } else if (!item.isDelete) {
                    var data = {
                        id: this.sourceDatas[item.ids].id,
                        label: item.text,
                        imgs: this.sourceDatas[item.ids].imgs
                    }

                    editList.push(data)

                    if (item.text !== this.sourceDatas[item.ids].label) {
                        var formData = {
                            id: this.sourceDatas[item.ids].id,
                            label: item.text,
                        }

                        this.uploadSource(formData)
                    }
                    
                } else if (item.isDelete) {
                    var data = {
                        id: this.sourceDatas[item.ids].id,
                    }

                    this.deleteTab(data)
                }
            })

            this.sourceDatas = editList
            this.issetVisible = false
        },
        setFormData (imgs) {
            var data = []
            imgs.forEach((item) => {
                data.push(item.id)
            })
            return data
        },
        setCheck () {
            this.isCheck = !this.isCheck
            this.selectList = []
        },
        setImport () {
            if (!this.isCheck && !this.isSingleO) {
                return false
            }

            this.isselectVisible = true
            this.checkedLabels = []
            this.isSingleO = false
        },
        deleteImgs () {
            if (!this.isCheck && !this.isSingleO) {
                return false
            }

            // 划分选中于为选中图片
            var tabIndex = Number(this.activeName)

            var imgs = this.sourceDatas[tabIndex].imgs

            var data = {
                id: this.sourceDatas[tabIndex].id,
                imgs: this.selectList
            }

            this.$confirm('此操作将永久删除该图片, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                util.request({
                    method: 'post',
                    interface: 'deleteImgs',
                    data: data
                }).then(res => {
                    this.getImgs()
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                })
                
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })     
            })

            this.isSingleO = false
        },
        initSet () {
            var data = []
            this.sourceDatas.forEach((item, index) => {
                var obj = {
                    isEdit: false,
                    isNew: false,
                    isDelete: false,
                    ids: index,
                    text: item.label
                }
                data.push(obj)
            })
            this.labelList = data
        },
        selectImg (index) {
            if (!this.isCheck && this.isSingleO) {
                this.getBigImgs()
                this.index = index
                this.isShow.value = true
                return false
            }

            var ids = this.selectList.indexOf(index)

            if (ids < 0) {
                this.selectList.push(index)
            } else {
                this.selectList.splice(ids, 1)
            }
        },
        selectConfirm () {
            // 划分选中于为选中图片
            var tabIndex = Number(this.activeName)

            // 是否选中自己
            var isSelf = this.checkedLabels.indexOf(tabIndex) > -1

            var imgs = this.sourceDatas[tabIndex].imgs
            
            if (!isSelf) {
                var data = {
                    id: this.sourceDatas[tabIndex].id,
                    imgs: this.selectList
                }
                util.request({
                    method: 'post',
                    interface: 'deleteImgs',
                    data: data
                }).then(res => {
                    this.getImgs()
                })
            }

            this.checkedLabels.forEach((item) => {
                if (tabIndex !== item) {
                    var data = {
                        id: this.sourceDatas[item].id,
                        imgs: this.selectList
                    }
                    util.request({
                        method: 'post',
                        interface: 'addImgs',
                        data: data
                    }).then(res => {
                        this.getImgs()
                    })
                }
            })

            this.isCheck = false
            this.isselectVisible = false
        }
    },
    components: {
        swiperImg
    }
}
</script>
<style lang="scss">
    .source-box {
        position: relative;
        width: 1160px;
        margin: 40px auto;

        .el-dialog--small {
            width: 490px;
        }

        .set-btn {
            position: absolute;
            right: 8px;
            top: 7px;
            width: 72px;
            height: 28px;
            text-align: center;
            line-height: 28px;
            font-size: 14px;
            color: #20A0FF;
            border: 1px solid #20A0FF;
            border-radius: 3px;
            cursor: pointer;
            z-index: 9999;

            &:hover {
                opacity: 0.8;
            }
        }

        .btns-op {
            position: absolute;
            right: -45px;
            top: 73px;
            width: 43px;
            border: 1px solid #D3DCE6;
            border-radius: 3px;
            background: #F8FBFF;
            box-sizing: border-box;
            padding: 0 5px;
            text-align: center;
            line-height: 0;

            img {
                display: inline-block;
                margin: 13px 0;
                cursor: pointer;
                padding: 0 5px;

                &:hover {
                    opacity: 0.7;
                }
            }

            .up-box {
                position: relative;
                height: 27px;

                img {
                    display: block;
                    width: 14px;
                    height: 14px;
                    margin: 13px auto;
                    padding: 0;
                }

                input {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 27px;
                    opacity: 0.01;
                }
            }

            .disable {
                opacity: 0.5;
                cursor: no-drop;
            }

            span {
                display: block;
                height: 1px;
                background: #D3DCE6;
            }
        }

        .dia-body {
            .btns-b {
                display: inline-block;
                height: 36px;
                border: 1px solid #D3DCE6;
                border-radius: 3px;
                background: #F8FBFF;
                box-sizing: border-box;
                padding: 1px 0;
                margin-bottom: 12px;

                img {
                    float: left;
                    margin: 0 13px;
                    cursor: pointer;
                    margin-top: 10px;

                    &:hover {
                        opacity: 0.8;
                    }
                }

                span {
                    float: left;
                    width: 1px;
                    height: 32px;
                    background: #D3DCE6;
                }
            }
            section {
                height: 40px;
                box-sizing: border-box;

                input {
                    float: left;
                    width: 100%;
                    height: 30px;
                    margin-top: 5px;
                    box-sizing: border-box;
                    font-size: 12px;
                    line-height: 30px;
                    border: 1px solid #D3DCE6;
                    border-radius: 3px;
                    padding: 0 12px;
                    color: #8492A6;
                }

                div {
                    height: 40px;
                    cursor: pointer;

                    span {
                        float: left;
                        width: 300px;
                        line-height: 30px;
                        font-size: 14px;
                        color: #5E6D82;
                        margin-left: 8px;
                        margin-top: 5px;
                    }

                    p {
                        float: right;
                        display: none;
                        height: 16px;
                        margin-top: 12px;
                        margin-right: 13px;

                        img {
                            float: right;
                            margin-left: 18px;
                            cursor: pointer;

                            &:hover {
                                opacity: 0.8;
                            }
                        }
                    }

                    &:hover {
                        background: #EFF2F7;

                        p {
                            display: block;
                        }
                    }
                }
            }
        }

        .dia-s-body {
            .el-checkbox {
                display: block;
                margin: 0 0 20px;

                .el-checkbox__inner {
                    margin-right: 7px;
                }
            }
        }

        .el-tabs__header {
            border: none;
        }

        .el-tabs__item {
            color: #000000;

            &:hover {
                color: #20A0FF;
            }
        }

        .is-active {
            color: #20A0FF;
        }

        .no-img {
            text-align: center;
            line-height: 300px;
            font-size: 20px;
            color: #999999;
        }

        .sou-box {
            width: 110%;
            padding-top: 10px;
            overflow: hidden;

            div {
                position: relative;
                float: left;
                width: 286px;
                height: 226px;
                box-sizing: border-box;
                cursor: pointer;
                padding: 8px;
                border-radius: 3px;
                margin: 0 5px 4px 0;

                span {
                    position: absolute;
                    left: 20px;
                    top: 20px;
                    width: 16px;
                    height: 16px;
                    background: url(../../../assets/images/check-icon.png) center no-repeat;

                    &.active {
                        background: url(../../../assets/images/check-now.png) center no-repeat;
                    }
                }

                img {
                    display: block;
                    width: 270px;
                    height: 180px;
                }

                p {
                    display: none;
                    height: 16px;
                    margin-top: 10px;

                    a {
                        &:hover {
                            opacity: 0.8;
                        }
                    }

                    .import {
                        width: 18px;
                        height: 16px;
                        float: right;
                        margin-right: 11px;
                        background: url(../../../assets/images/import-icon.png) center no-repeat;
                    }
                    .delete {
                        width: 16px;
                        height: 16px;
                        float: right;
                        background: url(../../../assets/images/delete-icon-n.png) center no-repeat;
                    }
                }

                &.check {
                    height: 200px;
                    margin-bottom: 30px;
                }

                &:hover {
                    background: #EFF2F7;

                    p {
                        display: block;
                    }
                }
            }
        }
    }
</style>