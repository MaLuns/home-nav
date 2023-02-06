<template>
    <div class="container">
        <div class="search-box">
            <div class="select">
                {{ type }}
                <div class="select-items">
                    <div @click="type = item.title" class="item" v-for="(item, index) in search" :key="index">
                        {{ item.title }}</div>
                </div>
            </div>
            <input class="search-box-input" :placeholder="placeholder" type="text" v-model="searchStr"
                @keyup.enter="handleSubmit()" />
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
            type: "百度",
            searchStr: "",
            search: [
                {
                    "title": "百度",
                    "name": "wd",
                    "action": "https://www.baidu.com/s"
                },
                {
                    "title": "搜狗",
                    "name": "query",
                    "action": "https://www.sogou.com/web"
                },
                {
                    "title": "必应",
                    "name": "q",
                    "action": "https://cn.bing.com/search"
                },
                {
                    "title": "谷歌",
                    "name": "q",
                    "action": "https://www.google.com/search"
                },
                {
                    "title": "有道",
                    "name": "q",
                    "action": "https://dict.youdao.com/search"
                },
                {
                    "title": "百度学术",
                    "name": "wd",
                    "action": "https://xueshu.baidu.com/s"
                },
                {
                    "title": "淘宝",
                    "name": "q",
                    "action": "https://s.taobao.com/search"
                },
                {
                    "title": "京东",
                    "name": "keyword",
                    "action": "https://search.jd.com/Search"
                },
                {
                    "title": "天猫",
                    "name": "q",
                    "action": "https://list.tmall.com/search_product.htm"
                },
                {
                    "title": "知乎",
                    "name": "q",
                    "action": "https://www.zhihu.com/search"
                },
                {
                    "title": "微信",
                    "name": "query",
                    "action": "https://weixin.sogou.com/weixin"
                },
                {
                    "title": "微博",
                    "name": "q",
                    "action": "https://s.weibo.com/weibo"
                },
                {
                    "title": "花瓣",
                    "name": "q",
                    "action": "https://huaban.com/search"
                },
                {
                    "title": "酷狗",
                    "name": "searchKeyWord",
                    "action": "https://www.kugou.com/yy/html/search.html"
                },
                {
                    "title": "b站",
                    "name": "keyword",
                    "action": "https://search.bilibili.com/all"
                }
            ],
            placeholder: "搜索一下～",
        };
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
                background-color: var(--left-nav-active-background-color,
                        #f0f2fc);
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
