<template>
    <div>
        <com-nav :list="list"></com-nav>
    </div>
</template>

<script>
    export default {
        head: {
            title: "热榜聚合",
        },
        data() {
            return {
                list: [],
            };
        },
        async fetch() {
            this.list = await this.$mock("/mock/hot.json");
        },
    };
</script>

<style>
</style>