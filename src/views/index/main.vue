<template>
    <section>
        <web-header @loadPage="loadPage"></web-header>
        <section class="mid-body-box">
            <router-view v-if="isPage"></router-view>
        </section>
        
        <web-footer></web-footer>
    </section>
</template>
<script>
import webHeader from '../../components/common/header.vue'
import webFooter from '../../components/common/footer.vue'

export default {
    data () {
        return {
            isPage: false
        }
    },
    methods: {
        loadPage () {
            this.isPage = true
        }
    },
    components: {
        webHeader,
        webFooter
    }
}
</script>
<style lang="scss">
.mid-body-box {
    min-height: 500px;
}
</style>