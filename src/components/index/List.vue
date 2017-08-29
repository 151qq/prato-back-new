<template>
  <div class="allBox">
    <div class="header">
      <p class="name">{{showTimer}}</p>
      <span class="icon icon2" id="laydater-icon"></span>
      <span class="icon icon1" @click="selectTpl"></span>
    </div>
    <div class="listBox">
      <div class="ulBox">
        <ul class="list">
          <li v-for="(item,idx) in list">
            <div class="iBox">
              <a :href="item.html5Path?item.html5Path:'javascript:;'">
                <img :src="item.html5PageindexImg||'./../../../static/images/default.jpg'" alt="">
              </a>
            </div>
            <div class="cListBox">
              <div class="lBox">
                <h5><a :href="item.html5Path?item.html5Path:'javascript:;'" >{{item.html5PageTitle}}</a></h5>
                <p><a :href="item.html5Path?item.html5Path:'javascript:;'" style="color:#999;">{{item.updateTime}}</a></p>
              </div>
              <div class="rBox">
                <div class="box" v-if="item.state-0!=1"><a href="javascript:;" @click="catTpl(item.html5PageCode,item.id,$event)"><img src="./images/ico-draft.png" alt=""></a></div>
                <div class="box" style="margin-top: 10px;"><a href="javascript:;" @click="del(idx,$event)"><img src="./images/ico-delete.png" alt=""></a></div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="nextlist" v-if="!isEnd" @click="nextList">{{nextCon}}</div>
      <div v-if="hasList" class="noData">当前没有文章</div>
    </div>
    <modal :show="isShow" :width="alertBody.ishtml?'':'600px'" :title="alertTitle" :alertBody="alertBody" @closAlert="closAlert" @confirm="confirm" @getTemplates="getTemplates"></modal>
  </div>
</template>
<script>
  import './scss/list.scss';
  import util from './../../assets/js/util';
  import interfaces from './../../assets/js/interfaces';
  import modal from './../../components/assembly/Modal';
  export default{
    components: {
      modal
    },
    data(){
      return {
        pageNumber: 1,
        pageSize: 8,
        list: [],
        nextCon: '加载更多',
        hasList: false,
        isEnd: false,
        curList: 0,
        curEv: null,
        isShow: false,
        alertTitle: '删除',
        alertBody: {
          html: '<div>您确定要删除吗？</div>',
          type: 'html'
        },
        timer: null,
        showTimer:''
      }
    },
    mounted(){
      var _this=this;
      _this.loadList();
      laydate.render({
		  elem: '#laydater-icon'
		  ,range: true
		  ,done: function(value, date, endDate){
		  	_this.timer=value;
		  	_this.loadList();
		  	var elem=this.elem[0];
		  	setTimeout(function(){
		  		elem.innerHTML="";
		  	},1);
		  }
	  });
    },
    methods: {
		//获取时间		
		getTime(data){		
			this.timer = data?data:'';		
			this.list = [];		
			this.pageNumber = 1;		
			this.loadList();		
		},
      loadList(){
        util.request({
          method: 'get',
          interface: 'html5PageSearch',
          data: {
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,
            data: this.timer ? this.timer : ''
          }
        }).then(res => {
          if (res.result.result.data.length < this.pageSize) {
            this.isEnd = true;
          }
          this.list = this.list.concat(res.result.result.data);
          this.hasList = this.list.length > 0 ? false : true;
          this.showTimer=res.result.result.updateTime;
        })
      },
      nextList(){
        if (!this.isEnd) {
          this.pageNumber++;
          this.loadList();
        }
      },
      //关闭弹出框
      closAlert(key){
        this[key] = false;
      },
      del(idx, ev){
        this.curList = idx;
        this.curEv = 'del';
        this.isShow = true;
        this.alertTitle = '提示';
        this.alertBody = {
          html: '<div class="box">您确定要删除吗？</div>',
          type: 'html'
        };
      },
      confirm(){
        this.isShow = false;
        switch (this.curEv) {
          case 'del':
            util.request({
              method: 'get',
              interface: 'deleteDraftFile',
              data: {
                html5PageCode: this.list[this.curList]['html5PageCode'],
                id: this.list[this.curList]['id']
              }
            }).then(res => {
              this.list.splice(this.curList, 1);
            })
            break;
        }
      },
      selectTpl(){
        this.isShow = true;
        this.alertTitle = '挑选模版';
        this.alertBody = {
          html: '',
          type: 'tplList'
        };
      },
      getTemplates(tplCode){
        this.$emit('getTemplates',tplCode);
      },
      catTpl(code,id,ev){
        this.$emit('catTpl',code,id);
      }
    }
  }
</script>
