<template>
    <div class="source-box">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane :label="'图片'" :name="'e2_pic'">
                <image-manage :file-type="'e2_pic'"></image-manage>
            </el-tab-pane>
            <el-tab-pane :label="'文件'" :name="'e2_doc'">
                <file-manage></file-manage>
            </el-tab-pane>
            <el-tab-pane :label="'媒体'" :name="'e2_media'">
                <media-manage></media-manage>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import $ from 'Jquery'
import util from '../../../assets/common/util'
import imageManage from './imageManage'
import fileManage from './fileManage'
import mediaManage from './mediaManage'

export default {
    data() {
        return {
            activeName: 'e2_pic'
        }
    },
    mounted () {
        this.getImgs()
    },
    methods: {
        handleClick () {}
    },
    components: {
        imageManage,
        fileManage,
        mediaManage
    }
}
</script>
<style lang="scss">
.source-box {
    position: relative;
    width: 800px;
    min-height: 600px;
    margin: 30px auto 40px;

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
        position: fixed;
        right: 10px;
        top: 160px;
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
}
</style>