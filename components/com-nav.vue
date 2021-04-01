<template>
    <div>
        <div class="header"></div>
        <ul :id="item.title" class="container" v-for="(item, index) in navList" :key="index">
            <div class="class-title">{{ item.title }}</div>
            <ul class="row">
                <li class="col" v-for="(element, idx) in item.children" :key="idx">
                    <a class="card-link" :href="element.url" target="_blank">
                        <div class="card-tit">
                            <img :src="element.logo || notLogo" alt @error="handleError(element)" />
                            <div class="name">{{ element.title }}</div>
                        </div>
                        <div class="card-desc" v-if="isDesc">{{ element.desc }}</div>
                    </a>
                </li>
            </ul>
        </ul>
        <ul class="left-nav" v-if="list.length>3 && count>0">
            <!--  <span class="left-nav-tag" :style="{top:checkIndex*60+30+'px'}"></span> -->
            <span class="left-nav-tag" :style="{top:top*60+30+'px'}"></span>
            <li @click="handleScroll(item,item.index)" class="left-nav-title" :class="{active:checkIndex===item.index}" v-for="item in leftNavList" :key="item.index">{{ item.title }}</li>
        </ul>
    </div>
</template>

<script>
    import notLogo from "~/assets/notlogo.png";
    export default {
        data() {
            return {
                notLogo,
                checkIndex: 0,
                count: 4,
            };
        },
        computed: {
            navList({ list }) {
                return Object.freeze(
                    list.map((item, index) => ({
                        ...item,
                        index,
                    }))
                );
            },
            leftNavList({ navList = [], checkIndex, count }) {
                let arr = [];
                if (checkIndex + count < navList.length) {
                    arr = navList.slice(checkIndex, checkIndex + count);
                } else if (count >= navList.length) {
                    arr = navList;
                } else {
                    arr = navList.slice(navList.length - count, navList.length);
                }
                return arr;
            },
            top({ navList = [], checkIndex, count }) {
                if (count >= navList.length) {
                    return checkIndex;
                } else if (checkIndex + count > navList.length) {
                    return checkIndex + count - navList.length;
                } else {
                    return 0;
                }
            },
        },
        props: {
            list: {
                type: Array,
                require: true,
                default() {
                    return [];
                },
            },
            isDesc: {
                type: Boolean,
                default: false,
            },
        },
        mounted() {
            const scroll = () => {
                let root = document.documentElement;
                var scrollTop = document.body.scrollTop || root.scrollTop;
                if (!this._list) {
                    this._list = this.list.map(
                        (item) =>
                            document.getElementById(item.title).offsetTop +
                            document.getElementById(item.title).offsetHeight
                    );
                }
                let _list = this._list;
                for (let index = 0; index < _list.length; index++) {
                    if (_list[index] - 120 - scrollTop > 0) {
                        this.checkIndex = index;
                        return;
                    }
                }
            };

            const _count = () => {
                this.count = parseInt((window.innerHeight - 400) / 61);
            };
            _count();
            window.addEventListener("scroll", scroll);
            window.addEventListener("resize", _count);
            this.$once("hook:beforeDestroy", () => {
                window.removeEventListener("scroll", scroll);
                window.removeEventListener("resize", _count);
            });
        },
        methods: {
            handleScroll(item, index) {
                this.checkIndex = index;
                window.scroll({
                    top: document.getElementById(item.title).offsetTop - 120,
                    behavior: "smooth",
                });
            },
            handleError(item) {
                item.logo = notLogo;
            },
        },
    };
</script>

<style lang="less" scoped>
    .container {
        margin: 0 auto;
        list-style: none;

        .class-title {
            height: 45px;
            color: var(--ion-color-step-900, #616a7c);
            font-weight: 600;
            font-size: 18px;
            line-height: 45px;
            padding-left: 20px;
        }

        .row {
            list-style: none;

            .col {
                display: inline-block;
                width: 200px;
                padding: 0 7px;
                margin: 0 0 14px;

                .card-link {
                    display: block;
                    overflow: hidden;
                    padding: 10px 10px;
                    border-radius: 5px;
                    background-color: var(--nav-card-bg-color, #fff);
                    -webkit-transition: all 0.2s ease-out;
                    -moz-transition: all 0.2s ease-out;
                    -o-transition: all 0.2s ease-out;
                    transition: all 0.2s ease-out;

                    &:hover {
                        -moz-box-shadow: 4px 4px 10px
                            var(--ion-color-step-50, #e9edf1);
                        box-shadow: 4px 4px 10px var(--ion-color-step-50, #e9edf1);
                        -webkit-transform: translateY(-5px);
                        -moz-transform: translateY(-5px);
                        -o-transform: translateY(-5px);
                        transform: translateY(-5px);
                        -ms-transform: translateY(-5px);
                    }
                }

                .card-tit {
                    height: 40px;
                    color: var(--ion-color-step-700, #818997);
                    font-weight: 700;
                    font-size: 14px;

                    img {
                        float: left;
                        display: block;
                        margin-right: 5px;
                        width: 40px;
                        height: 40px;
                        border-radius: 5px;
                    }

                    .name {
                        float: left;
                        display: block;
                        overflow: hidden;
                        padding: 10px 3px 3px 3px;
                        max-width: 62%;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }

                .card-desc {
                    overflow: hidden;
                    margin-top: 3px;
                    height: 25px;
                    max-width: 99.5%;
                    color: var(--ion-color-step-500, #a1a8b3);
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-size: 12px;
                    line-height: 25px;
                }
            }
        }
    }

    .left-nav {
        position: fixed;
        top: 200px;
        transform: translateX(50vw);
        background: var(--ion-color-step, #fff);
        box-shadow: 0 0 10px 0 var(--left-nav-active-background-color, #f0f2fc);

        &-title {
            height: 60px;
            width: 60px;
            border-bottom: 1px solid var(--ion-color-step-100, #e1e6ea);
            color: var(--ion-color-step-600, #9198a5);
            line-height: 20px;
            letter-spacing: 1px;
            position: relative;
            font-size: 14px;
            padding: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            cursor: pointer;
            &.active {
                color: var(--left-nav-active-text-color, #3f51b5);
                transition: color 0.2s 0.2s;
            }
        }

        &-tag {
            display: block;
            height: 30px;
            width: 3px;
            position: absolute;
            right: 0;
            z-index: -1;
            transform: translateY(-50%);
            transition: top 0.3s;

            &::before {
                content: '';
                height: 60px;
                width: 60px;
                background-color: var(--left-nav-active-background-color, #f0f2fc);
                position: absolute;
                left: -57px;
                top: -15px;
                z-index: -2;
            }
            &::after {
                content: '';
                height: 30px;
                width: 3px;
                background-color: #3f51b5;
                position: absolute;
                left: 0px;
                top: 0px;
                z-index: -2;
            }
        }
    }

    @media (max-width: 800px) {
        .container {
            max-width: 400px;
        }
        .left-nav {
            left: -280px;
        }
    }

    @media (min-width: 800px) {
        .container {
            max-width: 600px;
        }
        .left-nav {
            left: -380px;
        }
    }

    @media (min-width: 1000px) {
        .container {
            max-width: 800px;
        }
        .left-nav {
            left: -480px;
        }
    }

    @media (min-width: 1200px) {
        .container {
            max-width: 1000px;
        }
        .left-nav {
            left: -580px;
        }
    }

    @media (min-width: 1400px) {
        .container {
            max-width: 1200px;
        }
        .left-nav {
            left: -680px;
        }
    }
</style>