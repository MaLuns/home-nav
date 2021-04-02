<template>
    <div @click="handleLogin">login</div>
</template>

<script>
    export default {
        layout: 'admin',
        methods: {
            handleLogin() {
                fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: "admin",
                        password: '123456'
                    })
                }).then(res => {
                    let s = res.json();
                    console.log(s)
                })
            }
        }
    }
</script>

<style>
</style>