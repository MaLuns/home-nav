<template>
    <div>
        <com-nav :list="list"></com-nav>
    </div>
</template>

<script>
    export default {
        head: {
            title: "UI设计",
        },
        data() {
            return {
                list: [],
            };
        },
        async fetch() {
            this.list = await this.$mock("/mock/design.json");
        },
    };
</script>