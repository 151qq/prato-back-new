<template>
    <section class="article-template-box">
        <section class="left-content form-b">
            <div class="formStylePro">
                <div class="form-box">
                    <div class="clear"></div>
                    <section class="block-title">模版信息</section>
                    <section class="baseInput">
                        <span>模板标题</span>
                        <el-input
                                class="input-box"
                                placeholder="请输入内容"
                                v-model="base.templateTitle">
                        </el-input>
                    </section>
                    <section class="baseInput rightF">
                        <span>模板类型</span>
                        <el-select class="input-box"
                                   v-model="base.templateType"
                                   name="investor"
                                   placeholder="请选择">
                            <el-option
                                    v-for="(item, index) in templateTypes"
                                    :key="index"
                                    :label="item.typeName"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </section>
                    <!-- 大标题样式 -->
                    <section class="block-title">大标题样式</section>
                    <section class="baseInput">
                        <span>区域高度</span>
                        <el-input
                                class="input-box"
                                type="number"
                                :min="0"
                                v-model="base.titleBlockHeight">
                        </el-input>
                    </section>
                    <section class="baseInput rightF">
                        <span>最大字数</span>
                        <el-input
                                class="input-box"
                                type="number"
                                :min="0"
                                v-model="base.titleMaxInput">
                        </el-input>
                    </section>
                    <section class="baseInput">
                        <span>字体大小</span>
                        <el-input
                                class="input-box"
                                type="number"
                                :min="0"
                                v-model="base.titleFontSize">
                        </el-input>
                    </section>
                    <section class="baseInput rightF">
                        <span>行间距</span>
                        <el-input
                                class="input-box"
                                type="number"
                                :min="0"
                                v-model="base.titleLineHeight">
                        </el-input>
                    </section>
                    <section class="baseInput">
                        <span>字体颜色</span>
                        <el-color-picker v-model="base.titleFontColor"></el-color-picker>
                    </section>
                    <section class="baseInput rightF">
                        <span>字体样式</span>
                        <el-select class="input-box"
                                   v-model="base.titleFontStyle"
                                   name="investor"
                                   placeholder="请选择">
                            <el-option
                                    v-for="(item, index) in fontStyles"
                                    :key="index"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </section>
                    <section class="baseInput">
                        <span>对齐方式</span>
                        <el-select class="input-box"
                                   v-model="base.titleAlignment"
                                   name="investor"
                                   placeholder="请选择">
                            <el-option
                                    v-for="(item, index) in alignmentStyles"
                                    :key="index"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </section>
                    <section class="baseInput rightF">
                        <span>顶部空隙</span>
                        <el-input
                                class="input-box"
                                type="number"
                                :min="0"
                                v-model="base.titleTopHeight">
                        </el-input>
                    </section>
                    <section class="baseInput">
                        <span>顶部间距</span>
                        <el-input
                                class="input-box"
                                type="number"
                                :min="0"
                                v-model="base.titleMarginTop">
                        </el-input>
                    </section>
                    <section class="baseInput bigB">
                        <span>背景图片</span>
                        <div class="input-box">
                            <upload :path="base.titleBackground"
                                    :is-operate="isOperate"
                                    :bg-path="true"
                                    @changeImg="changeTitleBg"></upload>
                        </div>
                    </section>

                    <!-- 日期作者 -->
                    <section class="block-title">日期作者样式</section>
                    <section class="baseInput">
                        <span>区域高度</span>
                        <el-input
                                class="input-box"
                                type="number"
                                :min="0"
                                v-model="base.editorDateBlockHeight">
                        </el-input>
                    </section>
                    <section class="baseInput rightF">
                        <span>字体大小</span>
                        <el-input
                                class="input-box"
                                type="number"
                                :min="0"
                                v-model="base.editorDateFontSize">
                        </el-input>
                    </section>
                    <section class="baseInput">
                        <span>行间距</span>
                        <el-input
                                class="input-box"
                                type="number"
                                :min="0"
                                v-model="base.editorDateLineHeight">
                        </el-input>
                    </section>
                    <section class="baseInput rightF">
                        <span>字体颜色</span>
                        <el-color-picker v-model="base.editorDateFontColor"></el-color-picker>
                    </section>
                    <section class="baseInput">
                        <span>字体样式</span>
                        <el-select class="input-box"
                                   v-model="base.editorDateFontStyle"
                                   name="investor"
                                   placeholder="请选择">
                            <el-option
                                    v-for="(item, index) in fontStyles"
                                    :key="index"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </section>
                    <section class="baseInput rightF">
                        <span>对齐方式</span>
                        <el-select class="input-box"
                                   v-model="base.editorDateStyle"
                                   name="investor"
                                   placeholder="请选择">
                            <el-option
                                    v-for="(item, index) in alignmentDateStyles"
                                    :key="index"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </section>
                    <section class="baseInput">
                        <span>日期作者间距</span>
                        <el-input
                                class="input-box"
                                type="number"
                                :min="0"
                                v-model="base.editorDateSpace">
                        </el-input>
                    </section>
                    <section class="baseInput rightF">
                        <span>作者链接</span>
                        <el-input
                                class="input-box"
                                placeholder="eg:http://www.xxxx.com"
                                v-model="base.editorLink">
                        </el-input>
                    </section>
                    <section class="baseInput">
                        <span>日期风格</span>
                        <el-select class="input-box"
                                   v-model="base.dateStyle"
                                   name="investor"
                                   placeholder="请选择">
                            <el-option
                                    v-for="(item, index) in dateStyles"
                                    :key="index"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </section>
                    <section class="baseInput rightF">
                        <span>作者最大字数</span>
                        <el-input
                                class="input-box"
                                type="number"
                                :min="0"
                                v-model="base.editorMaxInput">
                        </el-input>
                    </section>

                    <!-- 内标题样式 -->
                    <section class="block-title">内标题样式</section>
                    <section class="baseInput">
                        <span>区域高度</span>
                        <el-input
                                class="input-box"
                                type="number"
                                :min="0"
                                v-model="base.innerTitleBlockHeight">
                        </el-input>
                    </section>
                    <section class="baseInput rightF">
                        <span>最大字数</span>
                        <el-input
                                class="input-box"
                                type="number"
                                :min="0"
                                v-model="base.innerTitleMaxInput">
                        </el-input>
                    </section>
                    <section class="baseInput">
                        <span>字体大小</span>
                        <el-input
                                class="input-box"
                                type="number"
                                :min="0"
                                v-model="base.innerTitleFontSize">
                        </el-input>
                    </section>
                    <section class="baseInput rightF">
                        <span>行间距</span>
                        <el-input
                                class="input-box"
                                type="number"
                                :min="0"
                                v-model="base.innerinnerTitleLineHeight">
                        </el-input>
                    </section>
                    <section class="baseInput">
                        <span>字体颜色</span>
                        <el-color-picker v-model="base.innerTitleFontColor"></el-color-picker>
                    </section>
                    <section class="baseInput rightF">
                        <span>字体样式</span>
                        <el-select class="input-box"
                                   v-model="base.innerTitleFontStyle"
                                   name="investor"
                                   placeholder="请选择">
                            <el-option
                                    v-for="(item, index) in fontStyles"
                                    :key="index"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </section>
                    <section class="baseInput">
                        <span>对齐方式</span>
                        <el-select class="input-box"
                                   v-model="base.innerTitleAlignment"
                                   name="investor"
                                   placeholder="请选择">
                            <el-option
                                    v-for="(item, index) in alignmentStyles"
                                    :key="index"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </section>
                    <section class="baseInput rightF">
                        <span>顶部空隙</span>
                        <el-input
                                class="input-box"
                                type="number"
                                :min="0"
                                v-model="base.innerTitleTopHeight">
                        </el-input>
                    </section>
                    <section class="baseInput">
                        <span>顶部间距</span>
                        <el-input
                                class="input-box"
                                type="number"
                                :min="0"
                                v-model="base.innerTitleMarginTop">
                        </el-input>
                    </section>
                    <section class="baseInput bigB">
                        <span>背景图片</span>
                        <div class="input-box">
                            <upload :path="base.innerTitleBackground"
                                    :is-operate="isOperate"
                                    :bg-path="true"
                                    @changeImg="changeInnerTitleBg"></upload>
                        </div>
                    </section>


                    <!-- 文本区域样式 -->
                    <section class="block-title">文本区域样式</section>
                    <section class="baseInput rightF">
                        <span>最大字数</span>
                        <el-input
                                class="input-box"
                                type="number"
                                :min="0"
                                v-model="base.fileTaxtMaxInput">
                        </el-input>
                    </section>
                    <section class="baseInput">
                        <span>字体大小</span>
                        <el-input
                                class="input-box"
                                type="number"
                                :min="0"
                                v-model="base.fileFontSize">
                        </el-input>
                    </section>
                    <section class="baseInput rightF">
                        <span>行间距</span>
                        <el-input
                                class="input-box"
                                type="number"
                                :min="0"
                                v-model="base.fileTaxtLineHeight">
                        </el-input>
                    </section>
                    <section class="baseInput">
                        <span>字体颜色</span>
                        <el-color-picker v-model="base.fileTaxtFontColor"></el-color-picker>
                    </section>
                    <section class="baseInput rightF">
                        <span>字体样式</span>
                        <el-select class="input-box"
                                   v-model="base.fileFontType"
                                   name="investor"
                                   placeholder="请选择">
                            <el-option
                                    v-for="(item, index) in fontStyles"
                                    :key="index"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </section>
                    <section class="baseInput">
                        <span>对齐方式</span>
                        <el-select class="input-box"
                                   v-model="base.fileFaxtAlignment"
                                   name="investor"
                                   placeholder="请选择">
                            <el-option
                                    v-for="(item, index) in alignmentStyles"
                                    :key="index"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </section>
                    <section class="baseInput rightF">
                        <span>顶部空隙</span>
                        <el-input
                                class="input-box"
                                type="number"
                                :min="0"
                                v-model="base.fileBlcokTopHeight">
                        </el-input>
                    </section>
                    <section class="baseInput">
                        <span>顶部间距</span>
                        <el-input
                                class="input-box"
                                type="number"
                                :min="0"
                                v-model="base.fileMarginTop">
                        </el-input>
                    </section>
                    <section class="baseInput bigB">
                        <span>文章背景</span>
                        <div class="input-box">
                            <upload :path="base.fileBackground"
                                    :is-operate="isOperate"
                                    :bg-path="true"
                                    @changeImg="changeFileBackground"></upload>
                        </div>
                    </section>
                    <section class="baseInput bigB">
                        <span>文章结尾图片</span>
                        <div class="input-box">
                            <upload :path="base.fileEndPic"
                                    :is-operate="isOperate"
                                    :bg-path="true"
                                    @changeImg="changeFileEndPic"></upload>
                        </div>
                    </section>
                    <div class="clear"></div>
                </div>
                <el-button v-if="isOperate"
                            class="save-btn" type="info" :plain="true" size="small" icon="document"
                           @click="saveBase">保存</el-button>
                <div class="clear"></div>
            </div>
        </section>
        <section class="right-content">
            <div class="ar-title" :style="arTitle">
                Sagmeister & Walsh 这次又搞了个大新闻！24小时全球直播工作室状态
            </div>
            <div class="ar-author-date" :style="arAuthorDate">
                <span class="ar-date">2019-10-10</span>
                <a  class="ar-author"
                    target="_blank" 
                    :style="arAuthor"
                    :href="base.editorLink">
                        Sagmeister & Walsh杂志
                </a>
            </div>
            <img class="ar-img" :style="arImg" src="/static/images/bench1.png">
            <div class="ar-in-title" :style="arInTitle">
                Sagmeister & Walsh 搞事
            </div>
            <div class="ar-content" :style="arContent">
                Sagmeister & Walsh 最近把网站和办公室都全新改版了，网站变得很酷，首页是他们办公室的24小时动态录像直播（中国内地可能需要翻墙才能观看）！听起来是不是很有创意呢？这可是前无古人后无来者事儿！
            </div>
            <img class="ar-img" :style="arImg" src="/static/images/detial1.png">
            <div class="ar-in-title" :style="arInTitle">
                凉州词(王翰)
            </div>
            <div class="ar-content" :style="arContent">
                <div style="text-align: center;">
                    葡萄美酒夜光杯，欲饮琵琶马上催。 <br>
                    醉卧沙场君莫笑，古来征战几人回？ <br>
                    葡萄美酒夜光杯，欲饮琵琶马上催。 <br>
                    醉卧沙场君莫笑，古来征战几人回？ 
                </div>
            </div>
            <img class="ar-img" :style="arImg" src="/static/images/img1.png">
            <div class="ar-in-title" :style="arInTitle">
                产品详细规格参数
            </div>
            <div class="ar-content" :style="arContent">
                Sagmeister & Walsh 最近把网站和办公室都全新改版了，网站变得很酷，首页是他们办公室的24小时动态录像直播（中国内地可能需要翻墙才能观看）！
            </div>
            <img class="ar-img" :style="arImg" :src="base.fileEndPic">
        </section>
    </section>
</template>
<script>
import upload from '../../../components/common/upload'

export default {
    data () {
        return {
            isOperate: true,
            base: {
                templateTitle: '',
                templateType: '',
                titleBackground: '/static/images/ar-title-top.jpg',
                titleBlockHeight: 76,
                titleMaxInput: 30,
                titleFontSize: 18,
                titleLineHeight: 30,
                titleFontColor: '#000000',
                titleFontStyle: 'normal',
                titleAlignment: 'center',
                titleTopHeight: 3,
                titleMarginTop: 0,
                editorDateBlockHeight: '36',
                editorDateFontSize: '14',
                editorDateLineHeight: '36',
                editorDateFontColor: '#999999',
                editorDateFontStyle: 'normal',
                editorDateStyle: 'space-between',
                editorDateSpace: '',
                editorLink: '',
                dateStyle: '',
                editorMaxInput: 30,
                innerTitleBackground: '/static/images/ar-title-bg.jpg',
                innerTitleBlockHeight: 60,
                innerTitleMaxInput: 30,
                innerTitleFontSize: 16,
                innerinnerTitleLineHeight: 30,
                innerTitleFontColor: '#000000',
                innerTitleFontStyle: 'normal',
                innerTitleAlignment: 'center',
                innerTitleTopHeight: 15,
                innerTitleMarginTop: 20,
                fileTaxtMaxInput: 500,
                fileFontSize: 14,
                fileTaxtLineHeight: 24,
                fileFaxtFontColor: '#333333',
                fileFontType: 'normal',
                fileFaxtAlignment: 'justify',
                fileBlcokTopHeight: 0,
                fileBackground: '',
                fileMarginTop: 20,
                fileEndPic: '/static/images/end-img.jpg'
            },
            templateTypes: [],
            fontStyles: [
                {
                    label: '标准',
                    value: 'normal'
                },
                {
                    label: '斜体',
                    value: 'italic'
                },
                {
                    label: '倾斜',
                    value: 'oblique'
                }
            ],
            alignmentStyles: [
                {
                    label: '左对齐',
                    value: 'left'
                },
                {
                    label: '居中',
                    value: 'center'
                },
                {
                    label: '右对齐',
                    value: 'right'
                },
                {
                    label: '两端对齐',
                    value: 'justify'
                }
            ],
            alignmentDateStyles: [
                {
                    label: '左对齐',
                    value: 'flex-start'
                },
                {
                    label: '居中',
                    value: 'center'
                },
                {
                    label: '右对齐',
                    value: 'flex-end'
                },
                {
                    label: '两端对齐',
                    value: 'space-between'
                },
                {
                    label: '间隔对齐',
                    value: 'space-around'
                }
            ],
            dateStyles: [],
            arImg: {
                'display': 'block',
                'width': '100%',
                'margin-top': '15px'
            }
        }
    },
    computed: {
        arTitle () {
            var styleData = {
                'display': 'block',
                'box-sizing': 'border-box',
                'background-position': 'center',
                'background-size': '100% 100%',
                'overflow': 'hidden',
                'height': this.base.titleBlockHeight + 'px',
                'background-image': 'url(' + this.base.titleBackground + ')',
                'font-size': this.base.titleFontSize + 'px',
                'text-align': this.base.titleAlignment,
                'font-style': this.base.titleFontStyle,
                'color': this.base.titleFontColor,
                'line-height': this.base.titleLineHeight + 'px',
                'padding-top': this.base.titleTopHeight + 'px',
                'margin-top': this.base.titleMarginTop + 'px'
            }

            return styleData
        },
        arAuthorDate () {
            var styleData = {
                'display': 'flex',
                'box-sizing': 'border-box',
                'justify-content': this.base.editorDateStyle,
                'overflow': 'hidden',
                'height': this.base.editorDateBlockHeight + 'px',
                'font-size': this.base.editorDateFontSize + 'px',
                'font-style': this.base.editorDateFontStyle,
                'color': this.base.editorDateFontColor,
                'line-height': this.base.editorDateLineHeight + 'px'
            }

            return styleData
        },
        arAuthor () {
            var styleData = {
                'color': this.base.editorLink ? '#368ccd' : this.base.editorDateFontColor,
                'margin-left': this.base.editorDateSpace + 'px'
            }

            return styleData
        },
        arInTitle () {
            var styleData = {
                'display': 'block',
                'box-sizing': 'border-box',
                'background-position': 'center',
                'background-size': '100% 100%',
                'overflow': 'hidden',
                'height': this.base.innerTitleBlockHeight + 'px',
                'background-image': 'url(' + this.base.innerTitleBackground + ')',
                'font-size': this.base.innerTitleFontSize + 'px',
                'text-align': this.base.innerTitleAlignment,
                'font-style': this.base.innerTitleFontStyle,
                'color': this.base.innerTitleFontColor,
                'line-height': this.base.innerinnerTitleLineHeight + 'px',
                'padding-top': this.base.innerTitleTopHeight + 'px',
                'margin-top': this.base.innerTitleMarginTop + 'px'
            }

            return styleData
        },
        arContent () {
            var styleData = {
                'display': 'block',
                'box-sizing': 'border-box',
                'background-position': 'center',
                'background-size': '100% 100%',
                'overflow': 'hidden',
                'background-image': 'url(' + this.base.fileBackground + ')',
                'font-size': this.base.fileFontSize + 'px',
                'text-align': this.base.fileFaxtAlignment,
                'font-style': this.base.fileFontType,
                'color': this.base.fileFaxtFontColor,
                'line-height': this.base.fileTaxtLineHeight + 'px',
                'padding-top': this.base.fileBlcokTopHeight + 'px',
                'margin-top': this.base.fileMarginTop + 'px'
            }

            return styleData
        }
    },
    methods: {
        saveBase () {

        },
        changeTitleBg (data) {
            this.base.titleBackground = data.url
        },
        changeInnerTitleBg () {
            this.base.innerTitleBackground = data.url
        },
        changeFileBackground () {
            this.base.fileBackground = data.url
        },
        changeFileEndPic () {
            this.base.fileEndPic = data.url
        }
    },
    components: {
        upload
    }
}
</script>
<style lang="scss">
.article-template-box {
    width: 1060px;
    margin: 80px auto 30px;
    overflow: hidden;

    .el-color-picker {
        width: 200px;

        .el-color-picker__trigger {
            height: 30px;
            padding: 3px;
        }
    }

    .block-title {
        clear: both;
        font-size: 16px;
        color: #000000;
        line-height: 30px;
        font-weight: bold;
        margin-bottom: 20px;
    }

    .left-content {
        float: left;
        width: 640px;
    }

    .right-content {
        box-sizing: border-box;
        padding: 15px;
        border: 1px solid #bfcbd9;
        border-radius: 5px;
        float: right;
        width: 350px;
        margin-top: 180px;
    }
}
</style>