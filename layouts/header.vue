<template>
    <header class="nav-container">
        <ul class="nav-container-content">
            <li v-for="(item,index) in nav" :key="index">
                <NuxtLink :to="item.url" :class="{active:item.url===$route.path}">{{item.title}}</NuxtLink>
            </li>
            <li @click="handleOpen" class="switch-theme" :class="{active:isActive}"></li>
        </ul>
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
            this.nav = await this.$mock("/mock/index-nav.json");
        },
        methods: {
            handleOpen() {
                let classList = document.documentElement.classList;
                if (classList.contains("dark")) classList.remove("dark");
                else classList.add("dark");
                this.isActive = !this.isActive
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
                width: 60px;
                height: 24px;
                border-radius: 12px;
                position: relative;
                display: inline-block;
                transition: all 0.3s;

                &::after {
                    content: '';
                    width: 20px;
                    height: 20px;
                    background: var(--ion-color-step-800, #c9ccce);
                    position: absolute;
                    border-radius: 10px;
                    top: 2px;
                    left: 2px;
                    transition: all 0.3s;
                }

                &.active::after {
                    left: 36px;
                }
            }
        }
    }
</style>
