<template>
    <section class="coments-box">
      <section class="comment-b" v-for="(item, index) in comments">
        <div class="avatar-box"> <img :src="item.userAvatar"></div>
        <div class="right-box">
          <p class="user-name">
            <span>{{index + 1}}楼</span>
            {{item.userName}}
          </p>
          <div class="content-box">
            <section v-if="item.commentCon.text" class="text-box">{{item.commentCon.text}}</section>
            <section v-if="item.commentCon.imgList && item.commentCon.imgList.length" class="imgs-box">
              <div>
                <img :src="urlC" v-for="(urlC, indexC) in item.commentCon.imgList" :key="indexC">
              </div>
            </section>
            <section v-if="item.commentCon.articleContent && item.commentCon.articleContent.length"
                class="articles-box">
                <a class="link-arc" v-for="(articleC, indexAC) in item.commentCon.articleContent" :key="indexAC">
                  <img :src="articleC.imgUrl" class="arc-img">
                  <div class="con-arc">
                    <p class="title-a">{{articleC.title}}</p>
                    <p class="content-a">{{articleC.des}}</p>
                  </div>
                </a>
            </section>
            <section class="com-time">{{item.commentCon.commentTime | strDate}}</section>
          </div>

          <section class="author-box" v-if="item.authorAnswer">
            <p class="des-title">作者回复:</p>
            <div class="content-box art-content-box">
              <section v-if="item.authorAnswer.text" class="text-box">{{item.authorAnswer.text}}</section>
              <section v-if="item.authorAnswer.imgList && item.authorAnswer.imgList.length" class="imgs-box">
                <div>
                  <img :src="urlA" v-for="(urlA, indexA) in item.authorAnswer.imgList" :key="indexA">
                </div>
              </section>
              <section v-if="item.authorAnswer.articleContent && item.authorAnswer.articleContent.length"
                  class="articles-box">
                  <a class="link-arc" v-for="(articleA, indexAA) in item.authorAnswer.articleContent"
                      :key="indexAA">
                    <img :src="articleA.imgUrl" class="arc-img">
                    <div class="con-arc">
                      <p class="title-a">{{articleA.title}}</p>
                      <p class="content-a">{{articleA.des}}</p>
                    </div>
                  </a>
              </section>
            </div>
            <section class="com-time">{{item.authorAnswer.anwerTime | strDate}}</section>

          </section>

        </div>
      </section>
    </section>
</template>
<script>
import commonJs from '../../assets/common/common.js'

export default {
    props: ['comments'],
    data () {
      return {
      }
    },
    filters: {
      strDate (value) {
        return commonJs.getDateDiff(value)
      }
    }
}
</script>
<style lang="scss">
.coments-box {
  .comment-b {
    margin-bottom: 20px;
    overflow: hidden;

    .avatar-box {
      float: left;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      overflow: hidden;

      img {
        display: block;
        width: 60px;
        height: 60px;
      }
    }

    .right-box {
      float: right;
      width: 560px;

      .user-name {
        font-size: 16px;
        color: #000000;
        line-height: 30px;
        margin-bottom: 10px;
        overflow: hidden;
        
        span {
          float: right;
          font-size: 14px;
        }
      }

      .content-box {
        .text-box {
          font-size: 14px;
          color: #000000;
          line-height: 30px;
          margin-bottom: 10px;
        }

        .imgs-box {
          div {
            width: 110%;
            overflow: hidden;
            margin-bottom: 10px;

            img {
              float: left;
              width: 175px;
              height: 120px;
              margin-right: 15px;
              margin-bottom: 8px;
            }
          }
        }

        .articles-box {
          .link-arc {
            padding: 10px;
            background: #EFF2F7;
            display: flex;
            margin-bottom: 10px;

            .arc-img {
              display: block;
              width: 140px;
              height: 100px;
            }

            .con-arc {
              flex: 1;
              margin-left: 10px;

              .title-a {
                font-size: 16px;
                color: #000000;
                line-height: 28px;
                margin-bottom: 10px;
              }

              .content-a {
                font-size: 14px;
                color: #475669;
                line-height: 28px;
                height: 56px;
                overflow: hidden;
              }
            }
          }
        }
      }

      .com-time {
        text-align: right;
        font-size: 14px;
        color: #5E6D82;
        margin-bottom: 10px;
      }

      .des-title {
        font-size: 14px;
        color: #20A0FF;
        line-height: 30px;
        margin: 10px 0;
      }

      .art-content-box {
        padding: 18px 10px 10px;
        background: #F9F9F9;
        margin-bottom: 10px;

        .imgs-box div img {
          margin-right: 8px;
        }
      }
    }
  }
}
</style>