<template>
    <div>
        <com-nav :list="list"></com-nav>
    </div>
</template>

<script>
    export default {
        head: {
            title: "精选壁纸",
        },
        data() {
            return {
                list: [],
            };
        },
        async fetch() {
            this.list = await this.$mock("/mock/wallpaper.json");
        },
    };
</script>

<style>
</style>