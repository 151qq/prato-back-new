<template>
    <section class="gifts-box">
      <section class="search-input">
          <span>试用商品</span>
          <el-autocomplete
            id="giftB"
            class="inline-input"
            v-model="gift"
            :fetch-suggestions="giftSearch"
            placeholder="请输入内容"
            :trigger-on-focus="false"
            @select="giftSelect"
            size="small"
          >
            <template slot="append">
              <el-button type="primary" size="small" icon="search"
                  @click="searchFocus('giftB')">搜索</el-button>
            </template>
          </el-autocomplete>
          <div class="tag-box">
            <el-tag
              v-for="(tag, index) in gifts"
              :key="index"
              :closable="true"
              type="primary"
              @close="handleClose(gifts, tag)"
            >
            {{tag.value}}
            </el-tag>
          </div>
      </section>

      <el-button class="save-btn" type="info" :plain="true" size="small" icon="document"
      @click="saveData('activities')">保存</el-button>
    </section>
</template>
<script>
import './common/form.scss'
export default {
    data () {
        return {
            gifts: [],
            gift: '',
            giftList: [
              { value: '礼物一', id: 0 },
              { value: '礼物二', id: 1 },
              { value: '礼物三', id: 2 },
              { value: '礼物四', id: 3 },
              { value: '礼物五', id: 4 },
              { value: '礼物六', id: 5 }
            ]
        }
    },
    methods: {
        handleClose (datas, item) {
          datas.splice(datas.indexOf(item), 1)
        },
        giftSearch (key, cb) {
          var results = this.giftList.filter((item) => {
            return item.value.indexOf(key) > -1
          })
          cb(results)
        },
        giftSelect (item) {
          this.gifts.push(item)
        },
        searchFocus (id) {
          $('#' + id + ' input').focus()
        }
    }
}
</script>
<style lang="scss">
.gifts-box {
  overflow: hidden;
}
</style>