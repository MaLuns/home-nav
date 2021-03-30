<template>
    <div class="container">
        <div class="search-box">
            <select class="search-box-select" v-model="type">
                <option :label="item.title" :value="item.title" v-for="(item, index) in search" :key="index"></option>
            </select>
            <input class="search-box-input" type="text" v-model="searchStr" />
            <div class="search-box-btn" @click="handleSubmit">搜索</div>
        </div>
    </div>
</template>

<script>
    export default {
        head: {
            title: "主页",
        },
        data() {
            return {
                type: "",
                searchStr: "",
                search: [],
            };
        },
        async fetch() {
            this.search = await this.$mock("/mock/search.json");
            this.type = this.search[0].title;
        },
        methods: {
            handleSubmit() {
                if (this.searchStr) {
                    const type = this.search.find(
                        (item) => item.title === this.type
                    );
                    window.open(`${type.action}?${type.name}=${this.searchStr}`);
                }
            },
        },
    };
</script>
<style lang="less" scoped>
    .container {
        margin-top: 100px;
    }
    .search-box {
        display: flex;
        width: 50%;
        margin: 0 auto;
        box-shadow: 4px 10px 9px 0 rgba(97, 150, 242, 0.03);

        &-select {
            border: none;
            outline: 0;
            text-align: center;
            text-align-last: center;
        }

        &-btn {
            border: none;
            outline: 0;
            text-align: center;
            width: 80px;
            letter-spacing: 5px;
            background: #eaeaea;
            cursor: pointer;
            line-height: 42px;
        }

        &-input {
            height: 42px;
            border: 0 solid #fff;
            border-radius: 3px 0 0 3px;
            display: block;
            outline: 0;
            flex: 1;
            padding: 0.375rem 0.75rem;
            font-size: 1rem;
            font-weight: 400;
            line-height: 1.5;
            color: #495057;
            background-color: #fff;
            background-clip: padding-box;
            transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        }
    }
</style>
