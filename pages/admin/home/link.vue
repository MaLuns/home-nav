<template>
    <div>
        <div class="text-right mgb10">
            <Button @click="handleUpdate('create')" type="dashed">新增</Button>
        </div>
        <i-table row-key="_id" stripe :loading="loading" ref="table" border size="small" :columns="columns" :data="list" :height="maxheight">
            <template slot-scope="{ row }" slot="opt">
                <Tag class="dot" type="dot" color="error" v-if="row.delete"></Tag>
                <Tag class="dot" type="dot" color="success" v-else></Tag>
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
        <add-link @change="getlist" v-if="update.show" :show.sync="update.show" :type="update.type" :data="update.data"></add-link>
    </div>
</template>

<script>
    import AddLink from './-components/add_link';
    import { link } from '~/pages/api';
    import mixins from './mixins';

    export default {
        mixins: [mixins],
        components: { AddLink },
        data() {
            return {
                loading: true,
                update: {
                    show: false,
                    type: 'add',
                    data: {}
                },
                list: [],
                columns: [
                    { type: 'index', width: 55, align: 'center' },
                    { title: '标题', key: 'title', ellipsis: true, tooltip: true },
                    { title: '描述', key: 'desc', ellipsis: true, tooltip: true },
                    { title: 'url', key: 'url', ellipsis: true, tooltip: true },
                    { title: 'logo', key: 'logo', ellipsis: true, tooltip: true },
                    { title: '备注', key: 'remark', ellipsis: true, tooltip: true },
                    { title: '分类', key: 'parentTitle', width: 120, align: 'center' },
                    { title: '排序', key: 'sort', width: 80, align: 'center' },
                    { title: '状态', key: 'status', width: 80, align: 'center' },
                    { title: '创建时间', key: 'createTime', width: 160, align: 'center' },
                    { title: '申请信息', key: '状态', width: 120, align: 'center' },
                    { title: '操作', slot: 'opt', width: 180, align: 'center' }
                ],
            };
        },
        created() {
            if (process.client) {
                this.getlist();
            }
        },
        methods: {
            getlist() {
                this.loading = true;
                link.get({ ...this.page })
                    .then(res => {
                        this.list = res.list;
                        this.count = res.count;
                        this.loading = false;
                    });
            },
            handleUpdate(type, data = {}) {
                this.update.data = { ...data }
                this.update.type = type;
                this.update.show = true;
            },
            handleUpdateState(item) {
                link.update({
                    id: item._id,
                    delete: !item.delete
                }).then(res => {
                    this.getlist();
                    this.$Message.success('修改成功');
                });
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