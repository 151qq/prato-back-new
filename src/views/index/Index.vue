<template>
    <div class="body" @click.stop="clickBody">

        <header-box @handleLogin="handleLogin" @selUserTpl="selUserTpl" ref="headFn"></header-box>

        <!--button 按扭组-->
        <button-group :showTimer="showTimer"
                      @saveManuscript="saveManuscript" @release="release" @preview="preview"
                      @switchDragging="switchDragging" @selectTpl="selectTpl">
        </button-group>

        <div class="row container-fluid s_container" style="padding-top:118px;width: 100%">
            <div class="list col-lg-4 col-md-4 col-sm-4 editBoxBody">
                <article-list @getList="getList" @catTpl="catTpl" @getShowTimer="getShowTimer"
                              ref="listFn"></article-list>
            </div>
            <div class="edit col-lg-8 col-md-8 col-sm-8 editBoxBody">
                <edit-box ref="editFn" @getTemplates="getTemplates"></edit-box>
            </div>
        </div>

        <footer-box></footer-box>
        <login-box :isLogin="isLogin" @handleLogin="handleLogin"></login-box>
    </div>
</template>
<script>
    import headerBox from './../../components/header/Header';
    import buttonGroup from './../../components/index/buttonGroup';
    import articleList from './../../components/index/List';
    import editBox from './../../components/index/Edit';
    import footerBox from './../../components/footer/Footer';
    import loginBox from '../../components/profile/profile.vue';
    import './scss/index.scss';
    export default {
        name: 'index',
        components: {
            headerBox, buttonGroup, articleList, editBox, footerBox, loginBox
        },
        data() {
            return {
                tplCode: '', isLogin: false, showTimer: ''
            }
        },

        methods: {
            getTemplates(tplCode){
                this.$refs.editFn.getTemplates(tplCode);
            },

            saveManuscript(){
                this.$refs.editFn.saveManuscript();
            },
            release(){
                this.$refs.editFn.release();
            },

            preview(){
                this.$refs.editFn.preview();

            },
            switchDragging(isDragging){
                this.$refs.editFn.switchDragging(isDragging);
            },

            getList(){
                this.$refs.listFn.getTime();  //件初始化子组
            },

            selectTpl(){
                this.$refs.listFn.selectTpl();
            },
            getShowTimer(data){
                this.showTimer = data;
            },

            catTpl(code, id){
                this.$refs.editFn.catTpl(code, id);
            },

            handleLogin(bool){
                this.isLogin = bool;
            },

            selUserTpl(){
                this.$refs.listFn.selectTpl();
            },

            clickBody(ev){
                this.$refs.headFn.hiddTask();
            }
        }
    }
</script>
