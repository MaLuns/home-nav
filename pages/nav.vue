<template>
    <div>
        <div class="header"></div>
        <com-nav :list='list' is-desc></com-nav>
    </div>
</template>

<script>
export default {
    head: {
        title: "导航聚合",
    },
    async fetch() {
        this.list = await this.$mock('/mock/nav.json');
    },
    data() {
        return {
            list: []
        };
    },
};
</script>