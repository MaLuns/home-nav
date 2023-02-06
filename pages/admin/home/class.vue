<template>
    <div>
        <div class="text-right">
            <Form ref="formInline" class="search-from" :model="search" inline>
                <FormItem>
                    <Input type="text" v-model="search.title" placeholder="分类标题"></Input>
                </FormItem>
                <FormItem>
                    <Checkbox v-model="search.navID">未分配</Checkbox>
                    <Divider type="vertical" />
                    <Checkbox v-model="search.delete">已停用</Checkbox>
                    <Divider type="vertical" />
                    <Button type="primary" icon="md-search" shape="circle"
                        @click="page.index = 1; getlist()">查询</Button>
                    <Divider type="vertical" />
                    <Button @click="handleUpdate('create')" icon="md-add" shape="circle">新增</Button>
                    <Divider type="vertical" />
                    <Button type="error" shape="circle" ghost icon="md-trash" :disabled="!checkList.length"
                        @click="_BatchUpdate({ navID: -1 })">取消分配</Button>
                    <Divider type="vertical" />
                    <Button type="error" shape="circle" ghost icon="md-trash" :disabled="!checkList.length"
                        @click="_BatchUpdate({ delete: true })">批量停用</Button>
                </FormItem>
            </Form>
        </div>
        <i-table @on-row-click="handleRowClick" @on-selection-change="handleSelectionChange" :loading="loading"
            ref="table" border size="small" :columns="columns" :data="list" :height="maxheight">
            <template slot-scope="{ row }" slot="opt">
                <Tag class="dot" type="dot" color="error" v-if="row.delete"></Tag>
                <Tag class="dot" type="dot" color="success" v-else></Tag>
                <Divider type="vertical" />
                <a @click="handleSet(row)">配置</a>
                <Divider type="vertical" />
                <a @click="handleUpdate('update', row)">编辑</a>
                <Divider type="vertical" />
                <a @click="_Update({ id: row._id, delete: !row.delete }, '更新成功')">{{ row.delete ? '启用' : '停用' }}</a>
                <Divider type="vertical" v-if="row.delete && row.count == 0" />
                <a @click="handleDelete(row)" v-if="row.delete || row.status === 0">删除</a>
            </template>
        </i-table>
        <div class="text-right page">
            <Page :total="count" :page-size-opts="pageSizeOpts" :page-size="page.size" size="small"
                @on-page-size-change="e => { page.size = e; getlist() }" :current.sync="page.index"
                @on-change="getlist()" show-total show-sizer />
        </div>
        <!-- 新增 -->
        <add-class @change="getlist" v-if="update.show" :show.sync="update.show" :type="update.type"
            :data="update.data"></add-class>
        <link-list v-if="addListShow" :show.sync="addListShow" :classID="currentRow._id"
            :title="currentRow.title"></link-list>
    </div>
</template>

<script>
import AddClass from './-components/add_class';
import LinkList from './-components/link_list';
import { linkclass } from '~/pages/api';
import mixins from './mixins';

export default {
    mixins: [mixins],
    components: { AddClass, LinkList },
    data() {
        return {
            search: {
                title: '',
                navID: false,
                delete: false
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
                { title: '标题', key: 'title' },
                { title: '描述', key: 'desc' },
                { title: '链接数', key: 'count', width: 100, align: 'center' },
                { title: '排序', key: 'sort', width: 100, align: 'center' },
                { title: '创建时间', key: 'createTime', width: 160, align: 'center' },
                { title: '归属菜单', key: 'parentTitle', width: 100, align: 'center' },
                { title: '分配状态', key: 'allocationStr', width: 100, align: 'center' },
                { title: '操作', slot: 'opt', width: 260 }
            ],
            checkList: [],
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
            if (search.navID) search.navID = ''
            else delete search.navID

            linkclass
                .get({ ...search, ...this.page })
                .then(res => {
                    this.list = res.list;
                    this.count = res.count;
                    this.loading = false;
                });
        },
        // 删除
        handleDelete(row) {
            linkclass.delete(row._id).then(res => {
                if (res) {
                    this.$Message.success('删除成功')
                    this.getlist()
                }
            })
        },
        _Update(par, title) {
            linkclass.update(par).then(res => {
                if (res) {
                    this.$Message.success(title)
                    this.getlist()
                }
            })
        },
        _BatchUpdate(par) {
            if (this.checkList.length > 0) {
                const ids = this.checkList.map(item => item._id)
                linkclass.update({
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