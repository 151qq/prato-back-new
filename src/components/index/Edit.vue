<template>
    <div class="box editBoxBody">
        <div class="box editBoxBody editZone">
            <!--文章编辑区-->
            <div class="box box-edit">

                <div class="flexItem">
                    <div class="editTitle">
                        <textarea rows="1" placeholder="请输入标题，最长标题不能超过26个字" v-model="html5PageTitle"></textarea>
                        <input type="hidden" v-model="id"/>
                        <input type="hidden" v-model="html5PageCode"/>
                    </div>

                    <div class="editTime">
                        <input type="text" id="laydater-editor" placeholder="请输入日期" :value="html5PageTimer">
                    </div>

                    <div :class="['editBox','list-group','edit-group',isDragging?'dragging':''] ">
                        <ul id="articleArea" v-model="articleAreaList">
                            <li v-for="(element,index) in articleAreaList" class="liIndex" :data-idx="index"
                                @click="clickLi(index,$event)">
                                <div class="myEdit">
                                    <a href="javascript:;" v-if="isDragging" class="close"
                                       @click="delModl(index,$event)"></a></div>
                                <!--编辑器-->
                                <div class="list-group-item" v-if="element.type=='editor'">
                                    <ueditor :defaultMsg="element.editHtml" :editor-id="'editor'+index"
                                             :ref="'ue'+index"></ueditor>
                                </div>

                                <!--表单区-->
                                <div class="list-group-item" v-else-if="element.type=='discount'">
                                    <form-discounts @upEdit="upEdit" ref="formDiscounts"></form-discounts>
                                </div>
                                <!--图文&视频区-->
                                <div class="list-group-item" v-else v-html="element.editHtml"></div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <!--文章模板区-->
            <div class="box eidt-btn">

                <div class="flexItem">
                    <div class="list-group">
                        <ul id="templateArea">
                            <li v-for="(element,index) in list" @click="clickLiTpl(index,$event)">
                                <div class="list-group-item" v-html="element.html"></div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!--操作弹出层-->
        <modal :show="isShow" :width="alertBody.width?alertBody.width:'600px'" :title="alertTitle"
               :alertBody="alertBody" @closAlert="closAlert" @showImgList="showImgList" @upEdit="upEdit"
               @tplNextPage="tplNextPage"
               @getTemplates="getTemplates" @upImg="upImg" :curIndexEdit="curIndexEdit" :isInputChange="true"
               ref="modal">

        </modal>
    </div>
</template>
<script>
    import './scss/edit.scss';
    import './scss/template.scss';
    import util from '../../assets/common/util';
    import strap from 'vue-strap';
    import jquery from 'jquery';
    import formDiscounts from './../../components/index/FormDiscounts';
    import modal from './../../components/assembly/Modal';
    import ueditor from './../../components/assembly/ueditor.vue';

    export default{
        name: 'app',
        components: {
            formDiscounts,
            ueditor,
            modal
        },
        data (){
            return {
                id: '',
                html5PageCode: '',
                defaultMsg: 'this is editor',
                isPicker: false,
                html5PageTitle: '',
                html5PageTimer: '',
                list: [],
                articleAreaList: [],
                listData: [],
                editable: true,
                isDragging: false,
                delayedDragging: false,
                curIndexEdit: null,
                isShow: false,
                alertTitle: '',
                alertBody: {
                    html: '',
                    type: 'html'
                },
                content: "",
                showModuleName: false,
                tplSize: 12,
                tplNumber: 1,
                discount: {},
                tplCode: '',
                curEv: null
            }
        },
        mounted(){
            var _self = this;
            this.getTemplates('tpl_003');
            var articleArea = document.getElementById('articleArea');
            var templateArea = document.getElementById('templateArea');

            Sortable.create(articleArea, {
                animation: 100,
                handle: '.myEdit',
                group: {name: "templateArea", pull: false, put: ['articleArea']},
                filter: '.filter',
                sort: true,
                onAdd: function (/**Event*/evt) {
                    var itemEl = evt.item;
                    articleArea.removeChild(itemEl);
                    _self.articleAreaList.splice(evt.newIndex, 0, {});
                    var row = _self.list[evt.oldIndex];
                    _self.$set(_self.articleAreaList, evt.newIndex, {
                        "code": row.code,
                        "name": row.name,
                        "order": row.order,
                        "html": row.html,
                        "editHtml": row.editHtml,
                        "fixed": row.fixed,
                        "type": row.type,
                        "areaType": row.areaType
                    });
                    if (row.type == "editor") {

                        _self.defaultMsg = row.editHtml;
                    }
                    for (var i = 0, m = _self.articleAreaList.length; i < m; i++) {
                        var row2 = _self.articleAreaList[i];
                        if (row2.areaType == 'head') {
                            _self.articleAreaList.splice(i, 1);
                            _self.articleAreaList.splice(0, 0, row2);
                        }
                    }
                }
            });

            Sortable.create(templateArea, {
                group: {name: "articleArea", pull: 'clone',},
                sort: false
            });

            laydate.render({
                elem: '#laydater-editor'
                , type: 'datetime'
                , format: 'yyyy-MM-dd HH-mm-ss'
            });
        },
        methods: {

            getUEContent(index) {
                var ue = "ue" + index
                let content = this.$refs[ue][0].getUEContent();
                console.log(content);
                return content;
            },

            //获取时间
            getTime(data){
                this.html5PageTimer = data ? data : '';
            },

            switchDragging(isDragging){
                this.isDragging = isDragging;
            },
            clickLi(idx, ev){
                this.curIndexEdit = idx;
                this.curEv = ev;
                switch (ev.target.dataset.operation) {
                    case 'uploader':
                        this.isShow = true;
                        this.alertBody = {
                            html: '',
                            btnTxt: '本地图片',
                            type: 'upload'
                        };
                        break;
                    case 'proLink':
                        this.isShow = true;
                        this.alertTitle = '输入外链地址';
                        this.alertBody = {
                            html: '<div class="box"><input type="text" class="form-control"></div>',
                            type: 'html'
                        };
                        break;
                    case 'uploader-video':
                        this.isShow = true;
                        this.alertBody = {
                            html: '',
                            btnTxt: '本地视频',
                            type: 'upload'
                        };
                        break;
                }
            },
            //编辑确定后修改数据
            upEdit(type, data){
                var _self = this;
                this.closAlert('isShow');
                switch (type) {
                    case 'list':
                        if (_self.articleAreaList[_self.curIndexEdit].areaType == 'head') {
                            _self.thumbnail = data.src;
                        }
                        _self.articleAreaList[_self.curIndexEdit].editHtml = '<div class="uploader"><img src="' + data.src + '" data-operation="uploader"></div>';
                        break;
                    case 'discount':
                        this.discount = data;
                        break;
                }
            },
            //点击模版-》添加模版
            clickLiTpl(index, ev){
                switch (ev.target.dataset.operation) {
                    case 'addTpl':
                        this.articleAreaList.push(this.list[index]);
                        break;
                }
            },
            tplNextPage(){
                this.tplNumber++;
                this.showImgList();
            },
            //关闭弹出框
            closAlert(key){
                this[key] = false;
            },
            //显示模板列表
            showImgList(){
                util.request({
                    method: 'get',
                    interface: 'mediaList',
                    data: {
                        pageSize: this.tplSize,
                        pageNumber: this.tplNumber
                    }
                }).then((res) => {
                    this.alertBody = {
                        type: 'list',
                        list: this.tplNumber > 1 ? this.alertBody.list.concat(res.result.result) : res.result.result
                    }
                });
            },
            //选择模版
            selectTpl(){
                this.isShow = true;
                this.alertTitle = '模版列表';
                this.alertBody = {
                    html: '',
                    type: 'tplList'
                };
            },
            delModl(index, ev){
                this.articleAreaList.splice(index, 1);
            },
            updateData(data, ev){
                this.articleAreaList[this.curIndexEdit].editHtml = data;
            },
            //获取、更新模板
            getTemplates(tplCode){
                var _self = this;
                this.tplCode = tplCode;
                util.request({
                    method: 'get',
                    interface: 'getTemplateBytplCode',
                    data: {
                        tplCode: tplCode
                    }
                }).then(res => {
                    var tplList = res.result.result.areaList;
                    var temp = [];
                    for (var i = 0, m = tplList.length; i < m; i++) {
                        var row = tplList[i];


                        if (row.areaType == 'head') {
                            var newRow = {
                                "code": row.areaCode,
                                "name": row.areaName,
                                "order": i,
                                "html": row.areaTxt,
                                "editHtml": row.areaDefault,
                                "fixed": false,
                                "type": row.remark,
                                "areaType": row.areaType
                            };
                            this.html5PageTitle = '';
                            this.articleAreaList = [newRow];

                        } else {

                            var newRow2 = {
                                "code": row.areaCode,
                                "name": row.areaName,
                                "order": i,
                                "html": row.areaTxt,
                                "editHtml": row.areaDefault,
                                "fixed": false,
                                "type": row.remark,
                                "areaType": row.areaType
                            };
                            newRow2.areaType = 'content';
                            temp.push(newRow2);

                        }
                    }
                    console.log(temp);
                    this.list = temp;

                });
            },
            //上传图片返回地址
            upImg(curIndex, img){
                this.closAlert('isShow');
                this.curEv.target.src = img;
                this.articleAreaList[curIndex].editHtml = jquery(this.curEv.target).parents('div.list-group-item').html();
                if (this.articleAreaList[curIndex].areaType == 'head') {
                    this.thumbnail = img;
                }
            },
            //保存稿件
            saveManuscript(){
                return new Promise((resolve, reject) => {
                    var _self = this;
                    jquery('#articleArea').find('li.liIndex').each(function () {
                        var index = jquery(this).index();
                        _self.articleAreaList[index].vals = {};
                        jquery(this).find('input').each(function (e) {
                            var idx = jquery(this).index();
                            //var index = jquery(this).parents('li.liIndex').attr('data-idx');
                            var val = jquery(this).val();
                            _self.articleAreaList[index].vals['val' + idx] = val;
                            jquery(this).attr('data-val', val);
                            jquery(this).attr('value', val);
                            _self.articleAreaList[index].editHtml = jquery(this).parents('li.liIndex div.list-group-item').html();
                        });
                        jquery(this).find('textarea').each(function (ev) {
                            if (jquery(this).attr('data-type') != 'noEach') {
                                var idx = jquery(this).index();
                                //var index = jquery(this).parents('li.liIndex').attr('data-idx');
                                var val = jquery(this).val();
                                _self.articleAreaList[index].vals['val' + idx] = val;
                                jquery(this).attr('data-val', val);
                                jquery(this).attr('value', val);
                                _self.articleAreaList[index].editHtml = jquery(this).parents('li.liIndex div.list-group-item').html();
                            }
                        });
                    })

                    util.request({
                        method: 'post',
                        interface: 'draftArticle',
                        data: {
                            id: this.id,
                            html5PageTitle: _self.html5PageTitle,
                            htnl5TemplateCode: _self.tplCode,
                            html5PageindexImg: _self.thumbnail,
                            html5PageCode: _self.html5PageCode

                        }
                    }).then(res => {
                        var html5PageCode = res.result.result.html5PageCode;
                        var html5Appid = res.result.result.html5Appid;
                        var id = res.result.result.id;

                        var temp = 0;
                        var len = _self.articleAreaList.length;
                        console.log(_self.articleAreaList);
                        for (var i = 0; i < len; i++) {
                            var row = this.articleAreaList[i];


                            if (row.type == "editor") {
                                this.articleAreaList[i].editHtml = _self.getUEContent(i);
                                row.editHtml = _self.getUEContent(i);
                            }

                            if (row.type == 'discount') {
                                var discountsCur = this.$refs.formDiscounts[0].discountsCur;
                                var discounts = this.$refs.formDiscounts[0].discounts[discountsCur];
                                _self.articleAreaList[i].discounts = discounts;
                                !function (rowData, index) {
                                    util.request({
                                        method: 'post',
                                        interface: 'saveArticleArea',
                                        data: {
                                            id: id,
                                            fileCode: html5PageCode,
                                            sequence: index,
                                            areaCode: rowData.code,
                                            areaFrom: JSON.stringify(discounts)
                                        }
                                    }).then(res => {
                                        temp++;
                                        if (temp == len) {
                                            _self.$emit('getList');
                                            _self.isShow = true;
                                            _self.alertBody = {
                                                html: '<div>保存成功</div>',
                                                btnTxt: '',
                                                type: 'html'
                                            };
                                            resolve({
                                                status: 0,
                                                result: {html5PageCode: html5PageCode, html5Appid: html5Appid}
                                            });
                                        }
                                    })
                                }(row, i);
                            } else {
                                !function (rowData, index) {

                                    util.request({
                                        method: 'post',
                                        interface: 'saveArticleArea',
                                        data: {
                                            id: id,
                                            fileCode: html5PageCode,
                                            sequence: index,
                                            areaCode: rowData.code,
                                            areaTxt: JSON.stringify(rowData)
                                        }
                                    }).then(res => {
                                        temp++;
                                        if (temp == len) {
                                            _self.$emit('getList');
                                            _self.isShow = true;
                                            _self.alertBody = {
                                                html: '<div>保存成功</div>',
                                                btnTxt: '',
                                                type: 'html'
                                            };
                                            resolve({
                                                status: 0,
                                                result: {html5PageCode: html5PageCode, html5Appid: html5Appid}
                                            });
                                        }
                                    })
                                }(row, i);

                            }

                        }


                    });
                });

            },
            release(){
                this.saveManuscript().then(res => {
                    util.request({
                        method: 'post',
                        interface: 'publishArticle',
                        data: {
                            id: res.result.id,
                            html5PageCode: res.result.html5PageCode,
                            html5Appid: res.result.html5Appid
                        }
                    }).then(res => {
                        console.log(res);
                    })
                });
                window.location.reload();

            },
            preview(){
                var _self = this;
                jquery('#articleArea').find('li.liIndex').each(function () {
                    var index = jquery(this).index();
                    jquery(this).find('input').each(function (e) {
                        var idx = jquery(this).index();
                        //var index = jquery(this).parents('li.liIndex').attr('data-idx');
                        var val = jquery(this).val();
                        jquery(this).attr('data-val', val);
                        jquery(this).attr('value', val);
                        _self.articleAreaList[index].editHtml = jquery(this).parents('li.liIndex div.list-group-item').html();

                    });
                    jquery(this).find('textarea').each(function (ev) {
                        if (jquery(this).attr('data-type') != 'noEach') {
                            var idx = jquery(this).index();
                            //var index = jquery(this).parents('li.liIndex').attr('data-idx');
                            var val = jquery(this).val();
                            jquery(this).attr('data-val', val);
                            jquery(this).attr('value', val);
                            _self.articleAreaList[index].editHtml = jquery(this).parents('li.liIndex div.list-group-item').html();
                        }
                    });
                })
                for (var i = 0, m = this.articleAreaList.length; i < m; i++) {
                    var row = this.articleAreaList[i];
                    if (row.type == 'discount') {
                        var discountsCur = this.$refs.formDiscounts[0].discountsCur;
                        var discounts = this.$refs.formDiscounts[0].discounts[discountsCur];
                        this.articleAreaList[i].discounts = discounts;
                    }
                    if (row.type == "editor") {
                        this.articleAreaList[i].editHtml = _self.getUEContent(i);
                    }
                }


                this.alertBody = {
                    width: '377px',
                    isShowBtn: true,
                    html: '',
                    data: this.articleAreaList,
                    title: this.html5PageTitle,
                    type: 'preview'
                };
                this.isShow = true;
                this.alertTitle = '文件预览';
                //this.$refs.modal.previewModalFn();
            },
            catTpl(code, id){
                util.request({
                    method: 'get',
                    interface: 'findArticleByFileCode',
                    data: {
                        fileCode: code,
                        id: id
                    }
                }).then(res => {
                    this.html5PageTitle = res.result.result.html5PageTitle;
                    this.id = res.result.result.id;
                    this.html5PageCode = res.result.result.html5PageCode;
                    this.html5PageTimer = res.result.result.updateTime;
                    var temp = [];
                    for (var i = 0, m = res.result.result.fileAreaList.length; i < m; i++) {
                        var row = res.result.result.fileAreaList[i];
                        if (row.areaTxt != null && row.areaTxt != "") temp.push(JSON.parse(row.areaTxt));
                    }
                    this.articleAreaList = temp;
                })
            }
        },
        computed: {
            listString(){
                return JSON.stringify(this.list, null, 2);
            },
            list2String(){
                return JSON.stringify(this.articleAreaList, null, 2);
            }
        },
        watch: {
            isDragging (newValue) {
                if (newValue) {
                    this.delayedDragging = true
                    return
                }
                this.$nextTick(() => {
                    this.delayedDragging = false
                })
            }
        }
    }
</script>
<style lang="scss">
    .box-edit {
        float: left;
        width: 400px;
    }

    .edit-btn {
        float: left;
        width: 400px;
    }
</style>
