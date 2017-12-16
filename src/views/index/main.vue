<template>
    <section>
        <web-header></web-header>
        <section class="mid-body-box">
            <router-view></router-view>
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
.mid-body-box {
    min-height: 500px;
}
</style>