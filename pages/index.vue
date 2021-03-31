<template>
    <div class="container">
        <div class="search-box">
            <div class="select">
                {{type}}
                <div class="select-items">
                    <div @click="type=item.title" class="item" v-for="(item, index) in search" :key="index">{{item.title}}</div>
                </div>
            </div>
            <input class="search-box-input" :placeholder="placeholder" type="text" v-model="searchStr" @keyup.enter="handleSubmit()" />
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
                placeholder: "搜索一下～",
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
        margin-top: 200px;
    }

    .select {
        width: 80px;
        position: relative;
        background: var(--ion-color-step-50, #fff);
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        .select-items {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            padding-top: 10px;
            width: 240px;

            .item {
                line-height: 40px;
                background: var(--ion-color-step, #fff);
                padding: 0 10px;
                display: inline-block;
                text-align: center;
                width: 80px;

                &:hover {
                    background-color: var(
                        --left-nav-active-background-color,
                        #f0f2fc
                    );
                }
            }
        }

        &:hover {
            .select-items {
                display: initial;
            }
        }
    }

    .search-box {
        display: flex;
        width: 50%;
        margin: 0 auto;
        //box-shadow: 4px 10px 9px 0 rgba(97, 150, 242, 0.03);

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
            background-color: var(--ion-color-step-100, #e1e6ea);
            cursor: pointer;
            line-height: 42px;
        }

        &-input {
            height: 42px;
            border: 0 solid var(--ion-color-step, #fff);
            border-radius: 3px 0 0 3px;
            display: block;
            outline: 0;
            flex: 1;
            padding: 0.375rem 0.75rem;
            font-size: 1rem;
            font-weight: 400;
            line-height: 1.5;
            color: var(--ion-color-step-950, #596275);
            background-color: var(--ion-color-step, #fff);
            background-clip: padding-box;
            transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        }
    }
</style>
