<template>
    <div>
        <List>
            <ListItem v-for="item in list" :key="item._id">
                <ListItemMeta avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar" :title="item.title" :description="'路径: '+ item.url" />
                <template slot="action">
                    <li>
                        <a>编辑</a>
                    </li>
                    <li>
                        <a>停用</a>
                    </li>
                </template>
            </ListItem>
        </List>
    </div>
</template>

<script>
    import { nav } from "../../api";
    export default {
        data() {
            return {
                list: [],
            };
        },
        created() {
            if (process.client) {
                this.getlist();
            }
        },
        methods: {
            getlist() {
                nav.get().then((res) => {
                    this.list = res;
                });
            },
        },
    };
</script>

<style>
</style>