<template>
    <Layout class="layout">
        <Header>
            <Menu mode="horizontal" theme="dark" :active-name="$route.path">
                <div class="layout-logo"></div>
                <div class="layout-nav">
                    <nuxt-link to="/admin/home/">
                        <MenuItem name="/admin/home/">首页</MenuItem>
                    </nuxt-link>
                    <nuxt-link to="/admin/home/nav">
                        <MenuItem name="/admin/home/nav">菜单管理</MenuItem>
                    </nuxt-link>
                    <nuxt-link to="/admin/home/class">
                        <MenuItem name="/admin/home/class">分类管理</MenuItem>
                    </nuxt-link>
                    <nuxt-link to="/admin/home/link">
                        <MenuItem name="/admin/home/link">网址管理</MenuItem>
                    </nuxt-link>
                </div>
            </Menu>
        </Header>
        <Content :style="{ padding: '20px 50px' }">
            <nuxt-child keep-alive></nuxt-child>
        </Content>
        <Footer class="layout-footer-center">2021 &copy; 白云苍狗</Footer>
    </Layout>
</template>

<script>
export default {
    layout: "admin",
};
</script>

<style>
.layout {
    position: relative;
    min-height: 100vh;
    background: #fff;
}

.layout-logo {
    width: 50px;
    height: 50px;
    /* background-image: url(/favicon.png); */
    background-size: 100%;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 5px;
    left: 0;
}

.layout-nav {
    width: 420px;
    margin: 0 auto;
    margin-right: 0px;
}

.layout-footer-center {
    text-align: center;
}
</style>