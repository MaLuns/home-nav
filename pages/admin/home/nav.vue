<template>
    <div>
        <List class="list">
            <ListItem>
                <ListItemMeta title="菜单列表"></ListItemMeta>
                <template slot="action">
                    <li>
                        <a @click="addShow=true;">新增</a>
                    </li>
                </template>
            </ListItem>
            <ListItem v-for="item in list" :key="item.info._id">
                <ListItemMeta :title="item.info.title" :description="'路径: '+ item.info.url">
                    <template slot="avatar">
                        <Tag class="dot" type="dot" color="error" v-if="item.info.delete"></Tag>
                        <Tag class="dot" type="dot" color="success" v-else></Tag>
                    </template>
                </ListItemMeta>
                <template v-if="!item._edit">
                    外部打开: {{ item.info.blank}}
                    排序: {{item.info.sort}}
                    <br />
                    更新时间: {{item.info.createTime}}
                </template>
                <template v-else>
                    <Form ref="formInline" class="form" :rules="ruleValidate" :model="item._deep" inline>
                        <FormItem prop="title">
                            <Input type="text" v-model="item._deep.title" maxlength="10" placeholder="请输入标题" />
                        </FormItem>
                        <FormItem prop="url">
                            <Input type="text" v-model="item._deep.url" placeholder="请输入地址" maxlength="15" />
                        </FormItem>
                        <FormItem prop="blank">
                            <i-switch size="large" v-model="item._deep.blank">
                                <span slot="open">blank</span>
                                <span slot="close">no</span>
                            </i-switch>
                        </FormItem>
                        <FormItem prop="sort">
                            <InputNumber :max="100000" :min="1" v-model="item._deep.sort"></InputNumber>
                        </FormItem>
                    </Form>
                </template>
                <template slot="action" class="action">
                    <li>
                        <a>配置分类</a>
                    </li>
                    <li>
                        <a @click="()=>{item._edit=true;item._deep={...item.info}}" v-if="!item._edit">编辑</a>
                        <a @click="handleSave(item._deep)" v-else>保存</a>
                    </li>
                    <li>
                        <a @click="handleUpdateState(item.info)" v-if="!item._edit">{{item.info.delete?'启用':'停用'}}</a>
                        <a @click="item._edit=false" v-else>取消</a>
                    </li>
                </template>
            </ListItem>
        </List>
        <!-- 新增 -->
        <add-nav v-if="addShow" :show.sync="addShow"></add-nav>
    </div>
</template>

<script>
    import AddNav from './-components/addnav';
    import { nav } from "../../api";
    import { regexp } from "~/pages/util";

    export default {
        components: { AddNav },
        data() {
            return {
                list: [],
                addShow: false,
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
                nav.get({
                    all: true
                }).then((res) => {
                    this.list = res.map(item => ({
                        info: {
                            ...item,
                        },
                        _edit: false,
                        _deep: {
                            ...item
                        }
                    }));
                });
            },
            handleSave({ _id: id, blank, title, url, sort }) {
                nav.update({
                    id, blank, title, url, sort
                }).then(res => {
                    this.getlist()
                    this.$Message.success('保存成功');
                })
            },
            handleUpdateState(item) {
                nav.update({
                    id: item._id,
                    delete: !item.delete
                }).then(res => {
                    this.getlist();
                    this.$Message.success('修改成功');
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
        }
    }
</style>