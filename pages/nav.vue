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

<style lang="less" scoped>
    @media (min-width: 500px) {
        .container {
            max-width: 400px;
        }
    }

    @media (min-width: 800px) {
        .container {
            max-width: 600px;
        }
    }

    @media (min-width: 1000px) {
        .container {
            max-width: 800px;
        }
    }

    @media (min-width: 1200px) {
        .container {
            max-width: 1000px;
        }
    }

    @media (min-width: 1400px) {
        .container {
            max-width: 1200px;
        }
    }

    .footer {
        height: 100px;
        background: url(http://guozhivip.com/lab/images/tbg.png) no-repeat;
        background-size: 100% 100%;
        transform: rotate(180deg);
        margin-top: 30px;
    }

    .container {
        margin: 0 auto;
        list-style: none;

        .class-title {
            height: 45px;
            color: #444;
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
                    background-color: #fff;
                    -webkit-transition: all 0.2s ease-out;
                    -moz-transition: all 0.2s ease-out;
                    -o-transition: all 0.2s ease-out;
                    transition: all 0.2s ease-out;

                    &:hover {
                        -moz-box-shadow: 4px 4px 10px rgba(180, 195, 255, 0.35);
                        box-shadow: 4px 4px 10px rgba(180, 195, 255, 0.35);
                        -webkit-transform: translateY(-5px);
                        -moz-transform: translateY(-5px);
                        -o-transform: translateY(-5px);
                        transform: translateY(-5px);
                        -ms-transform: translateY(-5px);
                    }
                }

                .card-tit {
                    height: 40px;
                    color: #555;
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
                    color: #777;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-size: 12px;
                    line-height: 25px;
                }
            }
        }
    }
</style>