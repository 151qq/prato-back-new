<template>
    <div>
        <div :id="editorId" type="text/plain"></div>
    </div>
</template>
<script>
    export default {
        name: 'ueditor',
        props: {
            defaultMsg: {type: String},
            editorId: {type: String}
        },
        data () {
            return {
                config: {
                    initialFrameWidth: null,
                    initialFrameHeight: null,
                    zIndex: 0,
                    toolbars: [[
                        'undo', 'redo', '|',
                        'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
                        'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
                        'fontfamily', 'fontsize', '|',
                        'indent', '|',
                        'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
                        'emotion', 'map', 'pagebreak', '|',
                        'horizontal', 'date', 'time', 'spechars', '|',
                        'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts'

                    ]]
                },
                editor: null
            }
        },

        mounted() {
            const _this = this;
            this.editor = UE.getEditor(this.editorId, this.config); // 初始化UE
            this.editor.addListener("ready", function () {
                _this.editor.setContent(_this.defaultMsg); // 确保UE加载完成后，放入内容。
            });
        },
        methods: {
            getUEContent() { // 获取内容方法
                return this.editor.getContent();
            }
        },
        destroyed() {
            this.editor.destroy();
        }
    }
</script>