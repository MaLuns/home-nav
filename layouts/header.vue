<template>
    <header class="nav-container">
        <ul class="nav-container-content">
            <li v-for="(item,index) in nav" :key="index">
                <NuxtLink :to="item.url ==='/'?'/':'/nav/'+item.url" :target="item.blank?'_blank':''" :class="{active:(item.url ==='/'?'/':'/nav/'+item.url)===$route.path}">{{item.title}}</NuxtLink>
            </li>
            <li @click="handleOpen" class="switch-theme" :class="{active:isActive}"></li>
        </ul>
        <div class="bg" ref="bg">
            <div></div>
        </div>
    </header>
</template>

<script>
    export default {
        data() {
            return {
                isActive: false,
                nav: [],
            };
        },
        async fetch() {
            this.nav = await this.$mock("/api/nav");
        },
        mounted() {
            if (process.client) {
                this.init();
            }
        },
        methods: {
            init() {
                this.isActive = JSON.parse(
                    window.localStorage.getItem("theme") || "false"
                );
                if (this.isActive) document.documentElement.classList.add("dark");
            },
            handleOpen() {
                this.isActive = !this.isActive;
                let classList = document.documentElement.classList;
                if (this.isActive) {
                    classList.add("dark");
                } else {
                    if (classList.contains("dark")) classList.remove("dark");
                }
                window.localStorage.setItem("theme", this.isActive);
                this.$refs.bg.classList.add('active')
                setTimeout(() => {
                    this.$refs.bg.classList.remove('active')
                }, 500);
            },
        },
    };
</script>
<style lang="less" scoped>
    .nav-container {
        height: 100px;
        .nav-container-content {
            display: flex;
            list-style: none;
            height: 100px;
            align-items: center;
            justify-content: flex-end;
            position: fixed;
            padding-right: 60px;
            width: 100vw;
            -webkit-backdrop-filter: blur(20px);
            backdrop-filter: blur(20px);
            z-index: 999;

            li {
                display: inline-block;
                padding-left: 40px;

                a {
                    color: inherit;
                    position: relative;
                    display: block;
                    padding: 11px 0;
                    font-size: 16px;
                    font-family: quicksand, sans-serif;
                    text-transform: uppercase;
                    font-weight: 700;
                    letter-spacing: 2px;

                    &::after,
                    &::before {
                        position: absolute;
                        content: '';
                        display: block;
                        width: 40px;
                        height: 1px;
                        margin-right: -5px;
                        opacity: 0;
                        -webkit-transition: all 0.3s;
                        -moz-transition: all 0.3s;
                        -ms-transition: all 0.3s;
                        -o-transition: all 0.3s;
                        transition: all 0.3s;
                        -webkit-transform: scale(1) rotate(-30deg);
                        -moz-transform: scale(1) rotate(-30deg);
                        -ms-transform: scale(1) rotate(-30deg);
                        -o-transform: scale(1) rotate(-30deg);
                        transform: scale(1) rotate(-30deg);
                    }

                    &::before {
                        top: 0;
                        left: 50%;
                    }

                    &::after {
                        bottom: 0;
                        right: 50%;
                    }

                    &.active::before,
                    &.active::after {
                        background-color: var(--bodyColor, #515a6e);
                        opacity: 1;
                        height: 2px;
                        -webkit-transform: scale(0.5) rotate(-30deg);
                        -moz-transform: scale(0.5) rotate(-30deg);
                        -ms-transform: scale(0.5) rotate(-30deg);
                        -o-transform: scale(0.5) rotate(-30deg);
                        transform: scale(0.5) rotate(-30deg);
                    }

                    &:hover::before,
                    &:hover::after {
                        background-color: var(--bodyColor, #515a6e);
                        opacity: 1;
                        height: 2px;
                        -webkit-transform: scale(0.5) rotate(-30deg);
                        -moz-transform: scale(0.5) rotate(-30deg);
                        -ms-transform: scale(0.5) rotate(-30deg);
                        -o-transform: scale(0.5) rotate(-30deg);
                        transform: scale(0.5) rotate(-30deg);
                    }
                }
            }

            .switch-theme {
                margin-left: 40px;
                flex-shrink: 0;
                cursor: pointer;
                background: var(--ion-color-step-150, #d1d6dc);
                width: 54px;
                height: 24px;
                border-radius: 12px;
                position: relative;
                display: inline-block;
                transition: all 0.3s;

                &::after {
                    content: '';
                    width: 16px;
                    height: 16px;
                    background: var(--ion-color-step-800, #c9ccce);
                    position: absolute;
                    border-radius: 50%;
                    top: 4px;
                    left: 4px;
                    transition: all 0.3s;
                }

                &.active::after {
                    left: 34px;
                }
            }
        }
    }

    .bg {
        position: fixed;
        width: 100vw;
        height: 100vh;
        z-index: -1;

        div {
            position: fixed;
            width: 100px;
            height: 100px;
            right: 50px;
            top: 20px;
            border-radius: 50%;
            transform: scale(0);
        }

        &.active {
            background: var(--ion-color-step-50-reversal, #fff);

            div {
                background: var(--ion-color-step-50, #fff);
                transform: scale(40);
                transition: all 0.6s;
            }
        }
    }
</style>
