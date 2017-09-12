import Vue from 'vue'
import App from './Index'
import VueHtml5Editor from 'vue-html5-editor'

import '../../../static/plugin/ueditor/ueditor.config'
import '../../../static/plugin/ueditor/ueditor.all'
import '../../../static/plugin/ueditor/lang/zh-cn/zh-cn'
import '../../../static/plugin/ueditor/ueditor.parse'

Vue.use(VueHtml5Editor, {
    showModuleName: true,
    language: "zh-cn",
    image: {
        sizeLimit: 512 * 1024,
        compress: true,
        width: 320,
        height: 300,
        quality: 80,
    },
    modules: [{
        name: "bold",
        icon: "fa fa-bold",
        i18n: "加粗",
        title: "加粗",
        show: true,
        handler: function (editor) {
            editor.execCommand("bold");
        }
    }],
    visibleModules: [
        "bold",
        "color",
        "font",
        "align",
        "list",
    ]
})

new Vue({
    el: '#app',
    template: '<App/>',
    components: {App}
})
