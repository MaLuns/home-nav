<template>
    <div>
        <List class="list">
            <ListItem>
                <ListItemMeta title="菜单列表"></ListItemMeta>
                <template slot="action">
                    <li>
                        <Button @click="handleUpdate('create')" type="dashed">新增</Button>
                    </li>
                </template>
            </ListItem>
            <ListItem v-for="item in list" :key="item._id">
                <ListItemMeta :title="item.title" :description="'路径: '+ item.url"></ListItemMeta>
                <template>
                    外部打开: {{ item.blank}}
                    排序: {{item.sort}}
                    <br />
                    更新时间: {{item.createtime}}
                </template>
                <template slot="action" class="action">
                    <li>
                        <Tag class="dot" type="dot" color="error" v-if="item.delete"></Tag>
                        <Tag class="dot" type="dot" color="success" v-else></Tag>
                    </li>
                    <li>
                        <a @click="handleSet(item)">配置分类</a>
                    </li>
                    <li>
                        <a @click="handleUpdate('update',item)">编辑</a>
                    </li>
                    <li>
                        <a @click="handleUpdateState(item)">{{item.delete?'启用':'停用'}}</a>
                    </li>
                </template>
            </ListItem>
        </List>
        <!-- 新增 -->
        <add-nav @change="getlist" v-if="update.show" :show.sync="update.show" :type="update.type" :data="update.data"></add-nav>
        <class-list @change="handleClassChange" v-if="addListShow" :show.sync="addListShow"></class-list>
    </div>
</template>

<script>
    import AddNav from './-components/add_nav';
    import ClassList from './-components/class_list';
    import { nav, linkclass } from "~/pages/api";
    import { regexp } from "~/pages/util";

    export default {
        components: { AddNav, ClassList },
        data() {
            return {
                list: [],
                update: {
                    show: false,
                    type: 'add',
                    data: {}
                },
                addListShow: false,
                ruleValidate: {
                    title: [{ required: true, message: '请输入名称', trigger: 'blur' }],
                    url: [
                        { required: true, message: '请输入路径', trigger: 'blur' },
                        { message: '路径只能是"/"或者字母', trigger: 'blur', pattern: regexp.path },
                    ]
                }
            };
        },
        created() {
            if (process.client) {
                this.getlist();
            }
        },
        methods: {
            getlist() {
                nav.get({ all: true }).then((res) => {
                    this.list = res;
                });
            },
            handleUpdateState(item) {
                nav.update({
                    id: item._id,
                    delete: !item.delete
                }).then(res => {
                    this.getlist();
                    this.$Message.success('修改成功');
                })
            },
            handleUpdate(type, data = {}) {
                this.update.data = { ...data }
                this.update.type = type;
                this.update.show = true;
            },
            handleSet(row) {
                this.currentRow = row
                this.addListShow = true
            },
            handleClassChange(ids) {
                linkclass.update({
                    navID: this.currentRow._id,
                    ids
                }).then(res => {
                    this.$Message.success('配置成功');
                })
            }
        },
    };
</script>

<style lang="less" scoped>
    .dot {
        border: none !important;
        background-color: transparent !important;
        padding: 0px !important;
    }

    .form {
        /deep/ .ivu-form-item {
            margin-bottom: 0px;
        }
    }
    .list {
        /deep/ .ivu-list-item-action {
            user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            -webkit-user-select: none;
            > li {
                font-size: 12px;
            }
        }
    }
</style>