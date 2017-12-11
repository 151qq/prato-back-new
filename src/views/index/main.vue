<template>
    <section>
        <web-header></web-header>
        <router-view></router-view>
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