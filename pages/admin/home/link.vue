<template>
    <div>
        <div class="text-right">
            <Form ref="formInline" class="search-from" :model="search" inline>
                <FormItem>
                    <Input type="text" v-model="search.title" placeholder="链接标题"></Input>
                </FormItem>
                <FormItem>
                    <Checkbox v-model="search.classID">未分配</Checkbox>
                    <Divider type="vertical" />
                    <Checkbox v-model="search.delete">已停用</Checkbox>
                    <Divider type="vertical" />
                    <Checkbox v-model="search.status" :true-value="0" :false-value="1">未审核</Checkbox>
                </FormItem>
                <FormItem>
                    <Button type="primary" icon="md-search" shape="circle"
                        @click="page.index = 1; getlist()">查询</Button>
                    <Divider type="vertical" />
                    <Button @click="handleUpdate('create')" icon="md-add" shape="circle">新增</Button>
                    <Divider type="vertical" />
                    <Button type="error" shape="circle" ghost icon="md-trash" :disabled="!checkList.length"
                        @click="_BatchUpdate({ classID: -1 })">取消分配</Button>
                    <Divider type="vertical" />
                    <Button type="error" shape="circle" ghost icon="md-trash" :disabled="!checkList.length"
                        @click="_BatchUpdate({ delete: true })">批量停用</Button>
                </FormItem>
            </Form>
        </div>
        <i-table @on-row-click="handleRowClick" @on-selection-change="handleSelectionChange" row-key="_id" stripe
            :loading="loading" ref="table" border size="small" :columns="columns" :data="list" :height="maxheight">
            <template slot-scope="{ row }" slot="opt">
                <Tag class="dot" type="dot" color="error" v-if="row.delete"></Tag>
                <Tag class="dot" type="dot" color="success" v-else></Tag>
                <Divider type="vertical" />
                <a @click="handleUpdate('update', row)">编辑</a>
                <Divider type="vertical" />
                <a @click="_Update({ id: row._id, delete: !row.delete }, '更新成功')">{{ row.delete ? '启用' : '停用' }}</a>
                <Divider type="vertical" />
                <a @click="handleDelete(row)" v-if="row.delete || row.status === 0">删除</a>
            </template>
            <template slot-scope="{ row }" slot="status">
                <template v-if="row.status === 0">
                    <Poptip confirm title="确定审核该条链接?" ok-text="通过" @on-ok="_Update({ id: row._id, status: 1 }, '审核成功')">
                        <a>待审核</a>
                    </Poptip>
                </template>
                <template v-else>已审核</template>
            </template>
            <template slot-scope="{ row }" slot="url">
                <a :href="row.url" target="_blank" rel="noopener noreferrer">{{ row.url }}</a>
            </template>
        </i-table>
        <div class="text-right page">
            <Page :total="count" :page-size-opts="pageSizeOpts" :page-size="page.size" size="small"
                @on-page-size-change="e => { page.size = e; getlist() }" :current.sync="page.index"
                @on-change="getlist()" show-total show-sizer />
        </div>
        <!-- 新增 -->
        <add-link @change="getlist" v-if="update.show" :show.sync="update.show" :type="update.type"
            :data="update.data"></add-link>
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
            search: {
                title: '',
                classID: false,
                delete: false,
                status: 1
            },
            loading: true,
            update: {
                show: false,
                type: 'add',
                data: {}
            },
            list: [],
            columns: [
                { type: 'selection', width: 55, align: 'center' },
                { type: 'index', width: 55, align: 'center' },
                { title: '标题', key: 'title', ellipsis: true, tooltip: true },
                { title: '描述', key: 'desc', ellipsis: true, tooltip: true },
                { title: 'url', key: 'url', ellipsis: true, tooltip: true, slot: 'url' },
                { title: 'logo', key: 'logo', ellipsis: true, tooltip: true },
                { title: '备注', key: 'remark', ellipsis: true, tooltip: true },
                { title: '排序', key: 'sort', width: 80, align: 'center' },
                { title: '创建时间', key: 'createTime', width: 160, align: 'center' },
                { title: '状态', key: 'status', width: 80, slot: 'status' },
                { title: '归属分类', key: 'parentTitle', width: 100, align: 'center' },
                { title: '分配状态', key: 'allocationStr', width: 100, align: 'center' },
                { title: '操作', slot: 'opt', width: 220 }
            ],
            checkList: []
        };
    },
    created() {
        if (process.client) {
            this.getlist();
        }
    },
    methods: {
        handleRowClick(row, index) {
            this.$refs.table.toggleSelect(index);
        },
        handleSelectionChange(rows) {
            this.checkList = rows
        },
        getlist() {
            this.loading = true;
            let search = { ...this.search }
            if (search.delete === false) delete search.delete
            if (search.status === 1) delete search.status
            if (search.classID) search.classID = ''
            else delete search.classID

            link
                .get({ ...search, ...this.page })
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
        // 删除
        handleDelete(row) {
            link.delete(row._id).then(res => {
                if (res) {
                    this.$Message.success('删除成功')
                    this.getlist()
                }
            })
        },
        _Update(par, title) {
            link.update(par).then(res => {
                if (res) {
                    this.$Message.success(title)
                    this.getlist()
                }
            })
        },
        _BatchUpdate(par) {
            if (this.checkList.length > 0) {
                const ids = this.checkList.map(item => item._id)
                link.update({
                    ...par,
                    ids
                }).then(res => {
                    if (res) {
                        this.$Message.success('修改成功')
                        this.getlist()
                    }
                })
            }
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