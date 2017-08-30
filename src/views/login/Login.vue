<template>
  <div class="loginBox">
      <div class="l">
        <swiper :swiperData="swiperData"></swiper>
      </div>
      <div class="r">
        <div class="login-form">
          <div class="form-horizontal">

            <div class="form-group">
              <label class="col-sm-3 control-label">用户名</label>
              <div class="col-sm-9">
                <input type="text" class="form-control" v-model="userLoginAccount">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label">密码</label>
              <div class="col-sm-9">
                <input type="password" class="form-control" v-model="userPassword">
              </div>
            </div>
                <input class="form-control" type="hidden" v-model="corpId"/>
                <input class="form-control" type="hidden" v-model="wechatName"/>
            <div class="form-group">
              <label class="col-sm-3 control-label"></label>
              <div class="col-sm-9 text-center">
                <button type="button" id="loginButton" class="btn btn-info" @click="subBtn">登录</button>
              </div>
            </div>

          </div>
        </div>



        <div class="login-form" style="border-top: 1px dashed #999999;padding-top:15px;">
          <div class="form-horizontal">

            <div class="form-group">
              <label class="col-sm-3 control-label">公司名称</label>
              <div class="col-sm-9">
                <input type="text" class="form-control"  id="enterpriseCname" name="enterpriseCname" v-model="enterpriseCname">
              </div>
            </div>
            
            <div class="form-group">
              <label class="col-sm-3 control-label">公司类型</label>
              <div class="col-sm-9">
                <select id="type" name="enterpriseIndustry" class="form-control" v-model="enterpriseIndustry">
				 	<option value="enterprise_industry_internetfinance">互联网金融</option>
                    <option value="enterprise_industry_house">新房销售</option>
		 			<option value="enterprise_industry_entertainment">美容美发SPA、瑜伽健身俱乐部、夜总会KTV、桑拿洗浴</option>
		 			<option value="enterprise_industry_customization">高端家具、家庭装修、高端定制</option>
		 			<option value="enterprise_industry_luxury">黄金首饰、珠宝玉器、古玩字画、乐器</option>
		 			<option value="enterprise_industry_immigrationagency">移民留学等出国中介</option>
		 			<option value="enterprise_industry_education">教育培训</option>
		 			<option value="enterprise_industry_car">汽车销售</option>
		 			<option value="enterprise_industry_lifeinsurance">寿险</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label class="col-sm-3 control-label">申请人</label>
              <div class="col-sm-9">
                <input type="text" class="form-control" name="userCname" v-model="userCname"/>
              </div>
            </div>

            <div class="form-group">
              <label class="col-sm-3 control-label">注册手机</label>
              <div class="col-sm-9">
                <input type="text" class="form-control" name="userPhone" v-model="userPhone">
              </div>
            </div>

            <div class="form-group">
              <label class="col-sm-3 control-label"></label>
              <div class="col-sm-9 text-center">
                <button type="button" id="loginButton" class="btn btn-info" @click="regBtn">申请体验</button>
              </div>
            </div>

          </div>
        </div>
      </div>
  </div>
</template>
<script>
  import Swiper from './../../components/swiper/Swiper.vue';
  import util from './../../assets/js/util';
  export default {
    name: 'index',
    components: {
      Swiper
    },
    data() {
      return {
        userLoginAccount: '',
        userPassword: '',
        corpId:'wxf46be8b189e7d78f',
        wechatName:'张力阳企业号',
        curNav: 1,
        enterpriseCname:'',
        enterpriseIndustry:'',
        userCname:'',
        userPhone:'',
        swiperData: {
          imgs: [
            {picUrl:'static/images/ip_big1.jpg'},
            {picUrl:'static/images/ip_big2.jpg'},
            {picUrl:'static/images/ip_big4.jpg'},
            {picUrl:'static/images/ip_big3.jpg'},
          ]
        },
      }
    },
    mounted() {

    },
    methods: {
      subBtn() {

        if(this.userLoginAccount==''){
        	alert('请输入用户名');
        	return;
        }
        if(this.userPassword==''){
        	alert('请输入密码');
        	return;
        }
        
          var data={
            userLoginAccount: this.userLoginAccount,
            userPassword: this.userPassword,
            corpId:this.corpId,
            wechatName:this.wechatName
          }
          console.log(data);

          util.request({
            method: 'post',
            interface: 'authentication',
            data: data
          }).then((res) => {
        	    console.log(res);
              window.location.href='/index.html';
          });
      },
      regBtn(){
      	
        if(this.enterpriseCname==''){
        	alert('请输入公司名称');
        	return;
        }
        if(this.enterpriseIndustry==''){
        	alert('请选择公司类型');
        	return;
        }
        if(this.userCname==''){
        	alert('请输入申请人');
        	return;
        }
        if(this.userPhone=='' || !(/^1[3|4|5|8][0-9]\d{4,8}$/).test(this.userPhone.trim())){
        	alert('请输入11位注册手机号');
        	return;
        }

        	var data={
            enterpriseCname: this.enterpriseCname,
            enterpriseIndustry: this.enterpriseIndustry,
            userCname:this.userCname,
            userPhone:this.userPhone
          }
          console.log(data);

          util.request({
            method: 'post',
            interface: 'authentication',
            data: data
          }).then((res) => {
        	    console.log(res);
              window.location.href='/login.html';
          });
        
      }
    }
  }
</script>
