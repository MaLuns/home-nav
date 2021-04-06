<template>
    <Layout class="layout">
        <Header>
            <Menu mode="horizontal" theme="dark" :active-name="$route.path">
                <div class="layout-logo"></div>
                <div class="layout-nav">
                    <nuxt-link to="/admin/home/nav">
                        <MenuItem name="/admin/home/nav">导航管理</MenuItem>
                    </nuxt-link>
                    <nuxt-link to="/admin/home/class">
                        <MenuItem name="/admin/home/class">分类管理</MenuItem>
                    </nuxt-link>
                    <nuxt-link to="/admin/home/link">
                        <MenuItem name="/admin/home/link">网址管理</MenuItem>
                    </nuxt-link>
                    <nuxt-link to="/admin/home/count">
                        <MenuItem name="/admin/home/count">统计</MenuItem>
                    </nuxt-link>
                </div>
            </Menu>
        </Header>
        <Content :style="{padding: '20px 50px'}">
            <nuxt-child keep-alive></nuxt-child>
        </Content>
        <Footer class="layout-footer-center">2021 &copy; 白云苍狗</Footer>
    </Layout>
</template>

<script>
    export default {
        middleware: "auth",
        layout: "admin",
    };
</script>

<style>
    .layout {
        position: relative;
        overflow: hidden;
        height: 100vh;
    }
    .layout-logo {
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }
    .layout-nav {
        width: 420px;
        margin: 0 auto;
        margin-right: 20px;
    }
    .layout-footer-center {
        text-align: center;
    }
</style>