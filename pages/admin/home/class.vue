<template>
    <div>
        <div class="text-right">
            <Form ref="formInline" class="search-from" :model="search" inline>
                <FormItem>
                    <Input type="text" v-model="search.keywords">
                    </Input>
                </FormItem>
                <FormItem>
                    <Button type="primary">查询</Button>
                    <Button @click="handleUpdate('create')" type="dashed">新增</Button>
                </FormItem>
            </Form>
        </div>
        <i-table :loading="loading" ref="table" border size="small" :columns="columns" :data="list" :height="maxheight">
            <template slot-scope="{ row }" slot="opt">
                <Tag class="dot" type="dot" color="error" v-if="row.delete"></Tag>
                <Tag class="dot" type="dot" color="success" v-else></Tag>
                <Divider type="vertical" />
                <a @click="handleSet(row)">配置网址</a>
                <Divider type="vertical" />
                <a @click="handleUpdate('update',row)">编辑</a>
                <Divider type="vertical" />
                <a @click="handleUpdateState(row)">{{row.delete?'启用':'停用'}}</a>
            </template>
        </i-table>
        <div class="text-right page">
            <Page :total="count" :page-size-opts="pageSizeOpts" :page-size="page.size" size="small" @on-page-size-change="e=>{page.size=e;getlist()}" :current.sync="page.index" @on-change="getlist()" show-total show-sizer />
        </div>
        <!-- 新增 -->
        <add-class @change="getlist" v-if="update.show" :show.sync="update.show" :type="update.type" :data="update.data"></add-class>
        <link-list @change="handleLinkChange" v-if="addListShow" :show.sync="addListShow"></link-list>
    </div>
</template>

<script>
    import AddClass from './-components/add_class';
    import LinkList from './-components/link_list';
    import { linkclass, link } from '~/pages/api';
    import mixins from './mixins';

    export default {
        mixins: [mixins],
        components: { AddClass, LinkList },
        data() {
            return {
                search: {
                    keywords: ''
                },
                loading: true,
                update: {
                    show: false,
                    type: 'add',
                    data: {}
                },
                list: [],
                columns: [
                    { type: 'index', width: 55, align: 'center' },
                    { title: '标题', key: 'title', width: 260 },
                    { title: '描述', key: 'desc' },
                    { title: '菜单', key: 'menu', width: 100, align: 'center' },
                    { title: '链接数', key: 'count', width: 100, align: 'center' },
                    { title: '排序', key: 'sort', width: 120, align: 'center' },
                    { title: '创建时间', key: 'createTime', width: 160, align: 'center' },
                    { title: '操作', slot: 'opt', width: 240, align: 'center' }
                ],
                addListShow: false,
            };
        },
        created() {
            if (process.client) {
                this.getlist();
            }
        },
        methods: {
            handleUpdate(type, data = {}) {
                this.update.data = { ...data }
                this.update.type = type;
                this.update.show = true;
            },
            handleSet(row) {
                this.currentRow = row
                this.addListShow = true
            },
            getlist() {
                this.loading = true;
                linkclass
                    .get({ ...this.page })
                    .then(res => {
                        this.list = res.list;
                        this.count = res.count;
                        this.loading = false;
                    });
            },
            handleUpdateState(item) {
                linkclass
                    .update({
                        id: item._id,
                        delete: !item.delete
                    })
                    .then(res => {
                        this.getlist();
                        this.$Message.success('修改成功');
                    });
            },
            handleLinkChange(ids) {
                link.update({
                    classID: this.currentRow._id,
                    ids
                }).then(res => {
                    this.$Message.success('配置成功');
                })
            }
        }
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
</style>