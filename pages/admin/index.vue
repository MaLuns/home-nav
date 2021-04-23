<template>
    <div class="login">
        <div class="login-container">
            <div class="login-container-top">
                <!--  Home-Nav 后台管理 -->
            </div>
            <Form ref="formInline" :model="form">
                <FormItem prop="user">
                    <Input size="large" prefix="ios-person-outline" type="text" v-model="form.name" placeholder="账号" />
                </FormItem>
                <FormItem prop="password">
                    <Input size="large" prefix="ios-lock-outline" type="password" v-model="form.password" placeholder="密码" />
                </FormItem>
                <FormItem>
                    <Button size="large" v-if="isInit" long type="primary" @click="handleLogin">登录</Button>
                    <Button size="large" v-else long type="primary" @click="handleCreate">创建</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
    import { user } from '../api'
    export default {
        head: {
            title: '登录'
        },
        layout: 'admin',
        data() {
            return {
                isInit: false,
                ruleInline: {
                    user: [
                        { required: true, message: 'Please fill in the user name', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: 'Please fill in the password.', trigger: 'blur' },
                        { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
                    ]
                },
                form: {
                    name: '',
                    password: ''
                }
            }
        },
        async fetch() {
            let { data } = await this.$mock('/api/user/init')
            this.isInit = data
        },
        methods: {
            handleCreate() {
                user.add({
                    ...this.form
                }).then(res => {
                    this.setToken(res.data)
                })
            },
            handleLogin() {
                user.login({
                    ...this.form
                }).then(res => {
                    this.setToken(res.data)
                })
            },
            setToken(user) {
                // this.$store.commit('setUser', user)
                this.$router.push('/admin/home/nav')
            }
        }
    }
</script>
<style lang="less" scoped>
    .login {
        background-image: url(../../assets/body.svg);
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: 100%;
        background-color: #f7f7f7;
        height: 100vh;

        &-container {
            padding: 100px 0 24px 0;
            text-align: center;
            width: 384px;
            margin: 0 auto 0;

            &-top {
                height: 60px;
                font-size: 20px;
                font-weight: 600;
                line-height: 50px;
            }
        }
    }
</style>