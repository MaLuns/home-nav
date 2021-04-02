<template>
    <div>
        <com-nav :list="list"></com-nav>
    </div>
</template>

<script>
    export default {
        head: {
            title: '',
        },
        data() {
            return {
                list: [],
            };
        },
        async validate({ params }) {
            if (!params.pathMatch || params.pathMatch.indexOf('/') > -1) {
                return false;
            }
            let navinfo = await fetch(process.env.baseURL + '/api/nav?url=' + params.pathMatch).then(res => res.json())
            if (navinfo.length > 0) {
                this.head.title = navinfo[0].title
                this.navinfo = navinfo[0]
                return true;
            } else {
                return false;
            }
        },
        async fetch() {
            this.list = await this.$mock("/api/linkclass/childen?id=" + this.$options.navinfo._id);
        },
    };
</script>