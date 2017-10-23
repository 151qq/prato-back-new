<template>
    <section class="add-box-market">
        <el-dialog title="添加方案" :visible.sync="isAdd.value">
            <div class="clear"></div>
            <section class="baseInput bigB">
                <span>标题</span>
                <el-input
                        class="input-box"
                        placeholder="请输入内容"
                        v-model="marketDatas.title">
                </el-input>
            </section>
            <section class="baseInput bigB">
                <span>标题</span>
                <el-select class="input-box" v-model="marketDatas.task" placeholder="请选择">
                    <el-option
                        v-for="item in tasks"
                        :key="item.id"
                        :label="item.text"
                        :value="item.id">
                    </el-option>
                </el-select>
            </section>
            <div class="clear"></div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isAdd.value = false">取 消</el-button>
                <el-button type="primary" @click="confirmHandle">确 定</el-button>
            </div>
        </el-dialog>
    </section>
</template>
<script>
import util from '../../assets/common/util'

export default {
    props: ['isAdd', 'addData'],
    data () {
        return {
            marketDatas: {
                title: '',
                task: ''
            },
            tasks: [
                {
                    id: 0,
                    text: '任务一'
                },
                {
                    id: 1,
                    text: '任务二'
                },
                {
                    id: 2,
                    text: '任务三'
                }
            ]
        }
    },
    methods: {
        confirmHandle () {
            if (this.marketDatas.title == '') {
                this.$message({
                  message: '楼盘名称不能为空！',
                  type: 'warning'
                })
                return false
            }
            if (this.marketDatas.title > 25) {
                this.$message({
                  message: '楼盘名称最多25个字！',
                  type: 'warning'
                })
                return false
            }

            if (this.marketDatas.task == '') {
                this.$message({
                  message: '请选择关联任务!',
                  type: 'warning'
                })
                return false
            }

            // var formData = {
            //     type: this.$route.name,
            //     areaTxt: '',
            //     html5TemplateCode: 'tpl_0003',
            //     html5PageTitle: this.reportDatas.title,
            //     id: '',
            //     html5CatalogCode: this.addData.code2
            // }

            // util.request({
            //     method: 'post',
            //     interface: 'draftArticle',
            //     data: formData
            // }).then(res => {
            //     if (res.result.success == '1') {
            //         this.isAdd.value = false
            //         var data = {
            //             code: res.result.result.html5PageCode
            //         }
            //         this.$emit('addSucess', data)

            //     } else {
            //         this.$message.error(res.result.message)
            //     }
                
            // })
            this.$emit('addSucess', {code: 27})
            this.isAdd.value = false
        }
    }
}
</script>
<style lang="scss">
.add-box-market {
    .el-dialog {
        width: 680px;
    }

    .baseInput {
        float: left;
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

    .clear {
        clear: both;
    }
}
</style>