<template>
    <div class="source-box">
        <a class="set-btn">设置</a>
        <section class="btns-op">
            <img src="../../../assets/images/select-icon.png">
            <span></span>
            <img src="../../../assets/images/import-icon.png">
            <span></span>
            <img src="../../../assets/images/delete-icon-n.png">
            <span></span>
            <img src="../../../assets/images/adds-icon.png">
        </section>

        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane v-for="(item, index) in sourceDatas" :label="item.label" :name="index">
                <section class="sou-box">
                    <div v-for="item1 in item.imgs">
                        <span class="active"></span>
                        <img :src="item1">
                        <p>
                            <a class="delete"></a>
                            <a class="import"></a>
                        </p>
                    </div>
                </section>
            </el-tab-pane>
        </el-tabs>


        <!-- 设置 -->
        <el-dialog title="设置" :visible.sync="issetVisible">
            <section class="dia-body">
                <div class="btns-b">
                    <img src="../../../assets/images/sort-icon.png" @click="sortLabel">
                    <span></span>
                    <img src="../../../assets/images/adds-icon.png" @click="addLabel">
                </div>
                
                <div class="con-box">
                    <section v-for="(item, index) in labelList">
                        <input v-if="item.isEdit && !isStragble" type="text"
                                v-model="item.text" placeholder="最少输入2个字，最多输入6个字">
                        <div v-else>
                            <span>{{item.text}}</span>
                            <p v-if="!isStragble">
                                <img src="../../../assets/images/del-icon.png" @click="deleLabel(item.id, index)">
                                <img src="../../../assets/images/pen-icon.png" @click="editLabel(item.id, index)">
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
                    <el-checkbox v-for="(item, index) in labelList" :label="item.text" :key="index">{{item.text}}</el-checkbox>
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
export default {
    data() {
        return {
            sourceDatas: [
                {
                    label: '产品图片',
                    imgs: [
                        '/static/images/sc1.jpg',
                        '/static/images/sc1.jpg',
                        '/static/images/sc1.jpg',
                        '/static/images/sc1.jpg',
                        '/static/images/sc1.jpg',
                        '/static/images/sc1.jpg',
                        '/static/images/sc1.jpg',
                        '/static/images/sc1.jpg'
                    ]
                },
                {
                    label: '公司形象',
                    imgs: [
                        '/static/images/sc1.jpg',
                        '/static/images/sc1.jpg',
                        '/static/images/sc1.jpg',
                        '/static/images/sc1.jpg',
                        '/static/images/sc1.jpg',
                        '/static/images/sc1.jpg'
                    ]
                },
                {
                    label: '客户上传',
                    imgs: [
                        '/static/images/sc1.jpg',
                        '/static/images/sc1.jpg',
                        '/static/images/sc1.jpg',
                        '/static/images/sc1.jpg',
                        '/static/images/sc1.jpg',
                        '/static/images/sc1.jpg'
                    ]
                }
            ],
            labelList: [
                {
                    text: '产品图片',
                    isEdit: false,
                },
                {
                    text: '公司形象',
                    isEdit: false,
                },
                {
                    text: '客户上传',
                    isEdit: false,
                }
            ],
            activeName: 0,
            checkedLabels: [],
            issetVisible: false,
            isselectVisible: true,
            isStragble: false,
            isAdd: false
        }
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event)
        },
        sortLabel () {
            this.isStragble = !this.isStragble
        },
        addLabel () {
            var data = {
                text: '',
                isEdit: true
            }
            this.labelList.unshift(data)
        }
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

                &:hover {
                    opacity: 0.8;
                }
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
                    margin-top: 11px;

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