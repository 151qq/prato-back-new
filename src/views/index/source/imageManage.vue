<template>
    <div class="image-su-box">
        <section class="btns-op">
            <img v-show="!isCheck" src="../../../assets/images/select-icon.png" @click="setCheck">
            <img v-show="isCheck" src="../../../assets/images/select-now.png" @click="setCheck">
            <span></span>
            <img :class="isCheck ? '' : 'disable'"
                    src="../../../assets/images/import-icon.png"
                    v-if="showType != 'dir'"
                    @click="setImport">
            <span></span>
            <img :class="isCheck ? '' : 'disable'" src="../../../assets/images/delete-icon-n.png"
                    @click="deleteImgs">
            <span></span>
            <div v-if="showType == 'dir'" class="up-box">
                <img @click="addDir" src="../../../assets/images/adds-icon.png">
            </div>
            <div v-else class="up-box">
                <img  @click="addItem" src="../../../assets/images/adds-icon.png">
            </div>
        </section>
        
        <!-- 目录 -->
        <div class="clear"></div>
        <template v-if="showType == 'dir'">
            <section v-for="(item, index) in dirDatas"
                        v-if="dirDatas.length"
                        class="check-box">

                <section v-if="isCheck" @click.stop="selectDir(item)"
                        class="select-box"
                        :class="selectDirList.indexOf(item.docCode) > -1 ? 'active' : ''"></section>
                <section class="sou-box">
                    <div class="cover-box" @click="showItems(item)">
                        <img :src="item.filePath">
                    </div>
                    <div class="title-box">
                        <div class="title" v-text="item.docTitle"></div>
                        <div class="time">
                            {{item.docCreateTime}}

                            <span class="btn-box">
                                <i @click.stop="editDir(item)" class="el-icon-document"></i>
                            </span>
                        </div>
                    </div>
                </section>
            </section>
            <section v-else class="no-img">
                当前暂无目录，请添加目录！！！
            </section>
            <div class="clear"></div>
            <el-pagination
                v-if="dirTotal"
                class="page-box"
                @current-change="dirPageChange"
                layout="prev, pager, next"
                :total="dirTotal">
            </el-pagination>
        </template>
        
        
        <!-- 内容 -->
        <template v-else>
            <el-button class="go-back" @click="showDir">返回</el-button>

            <section v-for="(item, index) in sourceDatas"
                        v-if="sourceDatas.length"
                        class="check-box">

                <section v-if="isCheck" @click.stop="selectItem(item)"
                            class="select-box"
                            :class="selectItemList.indexOf(item.docCode) > -1 ? 'active' : ''"></section>
                <section class="sou-box">
                    <div class="cover-box">
                        <img :src="item.filePath">
                    </div>
                    <div class="title-box">
                        <div class="title" v-text="item.docTitle"></div>
                        <span class="time">
                            {{item.docCreateTime}}

                            <span class="btn-box">
                                <i @click="editItem(item)" class="el-icon-document"></i>
                            </span>
                        </span>
                    </div>
                </section>
            </section>
            <section v-else class="no-img">
                当前无图，请上传图片！！！
            </section>
            
            <div class="clear"></div>
            <el-pagination
                v-if="itemTotal"
                class="page-box"
                @current-change="itemPageChange"
                layout="prev, pager, next"
                :total="itemTotal">
            </el-pagination>
        </template>
        <div class="clear"></div>
        
        <el-dialog title="目录" :visible.sync="isAddDir">
          <el-form :label-position="'left'" :model="addDirForm" label-width="80px">
            <el-form-item label="目录封面">
                <uploadFile :path="addDirForm.filePath"
                        :is-operate="true"
                        :bg-path="true"
                        :id-name="'dirCover' + fileType"
                        :file-type="'dir'"
                        :file-code="addDirForm.docCover"
                        :enterprise-code="$route.query.type"
                        @changeImg="changeDirImg"></uploadFile>
            </el-form-item>
            <el-form-item label="目录名称">
                <el-input v-model="addDirForm.docTitle" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="目录描述">
                <el-input
                    type="textarea"
                    :rows="3"
                    placeholder="请输入内容"
                    v-model="addDirForm.desc">
                </el-input>
            </el-form-item>
            
          </el-form>
          <div slot="footer" class="dialog-footer">
                <el-button @click="isAddDir = false">取 消</el-button>
                <el-button type="primary" @click="confirmDir">保 存</el-button>
          </div>
        </el-dialog>

        <el-dialog title="图片" :visible.sync="isAddItem">
          <el-form :label-position="'left'" :model="addItemForm" label-width="80px">
            <el-form-item v-if="!isNotImg" label="图片">
                <uploadFile :path="addDirForm.docCover"
                        :is-operate="true"
                        :bg-path="true"
                        :file-type="'pic'"
                        :id-name="'itemCover' + fileType"
                        :file-code="addDirForm.fileCode"
                        :enterprise-code="$route.query.type"
                        @changeImg="changeItemImg"></uploadFile>
            </el-form-item>
            <el-form-item label="图片标题">
                <el-input v-model="addItemForm.docTitle" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="图片描述">
                <el-input
                    type="textarea"
                    :rows="3"
                    placeholder="请输入内容"
                    v-model="addItemForm.docDesc">
                </el-input>
            </el-form-item>
            
          </el-form>
          <div slot="footer" class="dialog-footer">
                <el-button @click="isAddItem = false">取 消</el-button>
                <el-button type="primary" @click="confirmItem">保 存</el-button>
          </div>
        </el-dialog>

        <!-- 移动 -->
        <el-dialog title="移动" :visible.sync="isselectVisible">
            <section class="dia-s-body">
                <el-checkbox-group 
                    v-model="checkedLabels"
                    :min="0"
                    :max="10">
                    <el-checkbox v-for="(item, index) in dirDatas" :label="item.docCode" :key="index">
                        {{item.docTitle}}
                    </el-checkbox>
                </el-checkbox-group>
            </section>
          
            <div slot="footer" class="dialog-footer">
                <el-button @click="isselectVisible = false">取 消</el-button>
                <el-button type="primary" @click="selectConfirm">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import $ from 'Jquery'
import sortable from 'sortablejs'
import uploadFile from '../../../components/common/uploadFile.vue'
import util from '../../../assets/common/util'

export default {
    props: ['fileType'],
    data() {
        return {
            dirDatas: [],
            sourceDatas: [
                {   
                    docCode: 'sdfsdfsdfsdf',
                    docTitle: '第一图片',
                    docCreateTime: '2017-09-29',
                    filePath: '/static/images/bench1.png',
                    docType: 'pic',
                    docFolder: ''
                },
                {   
                    docCode: 'sdfsdfsdfsdf',
                    docTitle: '第一图片',
                    docCreateTime: '2017-09-29',
                    filePath: '/static/images/bench1.png',
                    docType: 'dir'
                }
            ],
            isCheck: false,
            showType: 'dir',
            isAddDir: false,
            addDirForm: {
                docType: 'dir',
                docTitle: '',
                docCover: '',
                docDesc: '',
                filePath: ''
            },
            isNotImg: false,
            isAddItem: false,
            addItemForm: {
                docType: 'pic',
                docTitle: '',
                fileCode: '',
                docDesc: '',
                filePath: ''
            },
            checkedLabels: [],
            isselectVisible: false,
            // 选中的图片
            selectDirList: [],
            selectItemList: [],
            bigImgs: [],
            dirPageNumber: 1,
            dirPageSize: 12,
            dirTotal: 0,
            itemPageNumber: 1,
            itemPageSize: 12,
            itemTotal: 0
        }
    },
    mounted () {
        this.getDirs()
    },
    methods: {
        setCheck () {
            this.isCheck = !this.isCheck
            this.selectDirList = []
            this.selectItemList = []
        },
        addDir () {
            this.addDirForm = {
                docTitle: '',
                docCover: '',
                docDesc: ''
            }

            this.isAddDir = true
        },
        addItem () {
            this.isNotImg = false
            this.addItemForm = {
                docTitle: '',
                docCover: '',
                docDesc: ''
            }

            this.isAddItem = true
        },
        editDir (item) {
            this.addDirForm = Object.assign({}, item)
            this.isAddDir = true
        },
        editItem (item) {
            this.isNotImg = true
            this.addItemForm = Object.assign({}, item)
            this.isAddItem = true
        },
        changeDirImg (data) {
            this.addDirForm.filePath = data.url
            this.addDirForm.docCover = data.fileCode
        },
        changeItemImg (data) {
            this.addItemForm.filePath = data.url
            this.addItemForm.fileCode = data.fileCode
        },
        confirmDir () {
            if (!this.addDirForm.docTitle) {
                this.$message({
                    message: '请填写目录名称！',
                    type: 'warning'
                })
                return false
            }

            if (!this.addDirForm.filePath) {
                this.$message({
                    message: '请添加目录封面！',
                    type: 'warning'
                })
                return false
            }

            this.addDirForm.enterpriseCode = this.$route.query.type
            this.insterDir()
        },
        confirmItem () {
            if (!this.addItemForm.docTitle) {
                this.$message({
                    message: '请填写图片标题！',
                    type: 'warning'
                })
                return false
            }

            if (!this.addItemForm.filePath) {
                this.$message({
                    message: '请添加图片面！',
                    type: 'warning'
                })
                return false
            }

            this.addItemForm.enterpriseCode = this.$route.query.type
            this.insterItem()
        },
        selectDir (item) {
            var index = this.selectDirList.indexOf(item.docCode)
            if (index > -1) {
                this.selectDirList.splice(index, 1)
            } else {
                this.selectDirList.push(item.docCode)
            }
        },
        selectItem (item) {
            var index = this.selectItemList.indexOf(item.docCode)
            if (index > -1) {
                this.selectItemList.splice(index, 1)
            } else {
                this.selectItemList.push(item.docCode)
            }
        },
        showItems (item) {
            this.isCheck = false
            this.showType = 'pic'
            this.getItems(item.docCode)
        },
        showDir () {
            this.isCheck = false
            this.showType = 'dir'
        },
        itemPageChange (size) {
            this.itemPageNumber = size
            this.getItems()
        },
        getItems (parentCode) {
            util.request({
                method: 'get',
                interface: 'listPage',
                data: {
                    enterpriseCode: this.$route.query.type,
                    docType: this.fileType,
                    pageNumber: this.itemPageNumber,
                    pageSize: this.itemPageSize
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.itemTotal = res.result.total
                    res.result.result.forEach((item) => {
                        item.docCreateTime = item.docCreateTime.split(' ')[0]
                    })

                    this.sourceDatas = res.result.result
                } else {
                    this.$message.error(res.result.message)
                }
            })       
        },
        insterItem () {
            util.request({
                method: 'post',
                interface: 'materialFolderInsert',
                data: {
                    enterpriseCode: this.$route.query.type,
                    docType: this.fileType,
                    pageNumber: this.pageNumber,
                    pageSize: this.pageSize
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.dirPageNumber = 1
                    this.getDirs()
                } else {
                    this.$message.error(res.result.message)
                }
            })       
        },
        updateItem () {
            util.request({
                method: 'post',
                interface: 'materialFolderUpdate',
                data: {
                    enterpriseCode: this.$route.query.type,
                    docType: this.fileType,
                    pageNumber: this.pageNumber,
                    pageSize: this.pageSize
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.getDirs()
                } else {
                    this.$message.error(res.result.message)
                }
            })       
        },
        deleteItems () {
            util.request({
                method: 'post',
                interface: 'materialFolderDelete',
                data: {
                    enterpriseCode: this.$route.query.type,
                    docType: this.fileType,
                    pageNumber: this.pageNumber,
                    pageSize: this.pageSize
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.getDirs()
                } else {
                    this.$message.error(res.result.message)
                }
            })       
        },
        dirPageChange (size) {
            this.dirPageNumber = size
            this.getDirs()
        },
        getDirs () {
            util.request({
                method: 'get',
                interface: 'listPage',
                data: {
                    enterpriseCode: this.$route.query.type,
                    docFolder: this.fileType,
                    pageNumber: this.dirPageNumber,
                    pageSize: this.dirPageSize
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.dirTotal = Number(res.result.totalPages)

                    res.result.result.forEach((item) => {
                        item.docCreateTime = item.docCreateTime.split(' ')[0]
                    })

                    this.dirDatas = res.result.result
                } else {
                    this.$message.error(res.result.message)
                }
            })       
        },
        insterDir () {
            util.request({
                method: 'post',
                interface: 'materialFolderInsert',
                data: this.addDirForm
            }).then(res => {
                if (res.result.success == '1') {
                    this.dirPageNumber = 1
                    this.getDirs()
                } else {
                    this.$message.error(res.result.message)
                }
            })       
        },
        updateDir () {
            util.request({
                method: 'post',
                interface: 'materialFolderUpdate',
                data: this.addDirForm
            }).then(res => {
                if (res.result.success == '1') {
                    this.getDirs()
                } else {
                    this.$message.error(res.result.message)
                }
            })       
        },
        deleteDirs () {
            util.request({
                method: 'post',
                interface: 'materialFolderDelete',
                data: this.selectDirList
            }).then(res => {
                if (res.result.success == '1') {
                    this.getDirs()
                } else {
                    this.$message.error(res.result.message)
                }
            })       
        },
        setImport () {
            if (!this.isCheck || this.showType == 'dir') {
                return false
            }
            this.isselectVisible = true
            this.checkedLabels = []
        },
        deleteImgs () {
            if (!this.isCheck) {
                return false
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
        },
        selectConfirm () {
            this.isselectVisible = false
        }
    },
    components: {
        uploadFile
    }
}
</script>
<style lang="scss">
.el-tabs__content {
    overflow: visible;
}

.image-su-box {
    position: relative;

    .page-box {
        margin-top: 10px;
    }

    .go-back {
        height: 30px;
        position: absolute;
        right: -30px;
        top: -38px;
        padding: 0 15px;
    }

    .check-box {
        position: relative;
        float: left;
        width: 170px;
        margin-right: 20px;
        margin-bottom: 20px;

        .select-box {
            position: absolute;
            left: 15px;
            top: 15px;
            width: 16px;
            height: 16px;
            cursor: pointer;
            background: url(../../../assets/images/check-icon.png) center no-repeat;

            &.active {
                background: url(../../../assets/images/check-now.png) center no-repeat;
            }
        }
    }

    .sou-box {
        border: 1px solid #D3DCE6;
        border-radius: 3px;

        .cover-box {
            height: 170px;
            overflow: hidden;
            cursor: pointer;
            
            img {
                display: block;
                width: 100%;
                min-height: 170px;
            }
        }

        .title-box {
            padding: 5px 10px;
            border-top: 1px solid #D3DCE6;
            
            .title {
                display: block;
                font-size: 14px;
                line-height: 20px;
                border: none;
                color: #000000;
            }

            .time {
                display: block;
                font-size: 12px;
                line-height: 20px;
                color: #999999;
            }

            .btn-box {
               float: right;
               font-size: 14px;
               color: #333333;

               i, label {
                    cursor: pointer;
               }
            }
        }
    }
}
</style>