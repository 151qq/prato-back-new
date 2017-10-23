<template>
    <section>
        <web-header></web-header>
        <section class="body-box">
            <router-view ref="showBox"></router-view>
        </section>
        <web-footer></web-footer>
    </section>
</template>
<script>
import webHeader from '../../components/common/header.vue'
import webFooter from '../../components/common/footer.vue'

export default {
    components: {
        webHeader,
        webFooter
    }
}
</script>
<style lang="scss">
html, body {
    height: auto;

    #app {
        height: auto;
    }
}

.body-box {
  padding: 50px 0 0;
  min-height: 600px;
}
</style>