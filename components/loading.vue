<template>
    <div v-if="loading" class="loading-page">
        loading
    </div>
</template>

<script>
    export default {
        data: () => ({
            loading: false
        }),
        methods: {
            start() {
                this.loading = true
            },
            finish() {
                this.loading = false
            }
        }
    }
</script>

<style>
    .loading-page {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        text-align: center;
        padding-top: 200px;
        font-size: 30px;
        font-family: sans-serif;
        -webkit-backdrop-filter: blur(20px);
        backdrop-filter: blur(20px);
        z-index: 1000;
    }
</style>