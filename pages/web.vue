<template>
    <div>
        <div class="header"></div>
        <com-nav :list="list" is-desc></com-nav>
    </div>
</template>

<script>
    export default {
        head: {
            title: "前端开发",
        },
        async fetch() {
            this.list = await this.$mock("/mock/web.json");
        },
        data() {
            return {
                list: [],
            };
        },
    };
</script>