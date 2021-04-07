<template>
    <div>分类</div>
</template>

<script>
    import { linkclass } from "~/pages/api";
    export default {
        data() {
            return {
                list: [],
                page: {
                    size: 20,
                    index: 1
                }
            }
        },
        created() {
            if (process.client) {
                this.getlist();
            }
        },
        methods: {
            getlist() {
                linkclass.get({ ...this.page }).then(res => {
                    console.log(res)
                })
            }
        }
    }
</script>

<style>
</style>