<template>
    <div>
        <com-nav :list='list'></com-nav>
    </div>
</template>

<script>
export default {
    head: {
        title: "工具合集",
    },
    data() {
        return {
            list: []
        }
    },
    async fetch() {
        this.list = await this.$mock('/mock/tool.json')
    }
}
</script>

<style>
</style>