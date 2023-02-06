<template>
    <div>
        <Modal v-model="shows" :title="`配置【${title}】分类`" width="80%" footer-hide>
            <Form ref="formInline" class="search-from" :model="search" inline>
                <FormItem>
                    <RadioGroup v-model="search.type" @on-change="getlist()">
                        <Radio label="current">当前菜单 </Radio>
                        <Radio label="unallocated">未分配 </Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem style="float: right;">
                    <Button v-if="search.type === 'current'" type="error" @click="handleDelete">批量取消分配</Button>
                    <Button v-if="search.type === 'unallocated'" type="primary" @click="handleSubmit">批量分配</Button>
                </FormItem>
            </Form>
            <i-table @on-row-click="handleRowClick" @on-selection-change="handleSelectionChange" :loading="loading"
                ref="table" border size="small" :columns="columns" :data="list" :height="maxheight - 300">
            </i-table>
            <div class="text-right page">
                <Page :total="count" :page-size-opts="pageSizeOpts" :page-size="page.size" size="small"
                    @on-page-size-change="e => { page.size = e; getlist() }" :current.sync="page.index"
                    @on-change="getlist()" show-total show-sizer />
            </div>
        </Modal>
    </div>
</template>

<script>
import { linkclass } from "~/pages/api";
import mixins from '../mixins';
export default {
    mixins: [mixins],
    data() {
        return {
            list: [],
            checkList: [],
            columns: [
                { type: 'selection', width: 55, align: 'center' },
                { type: 'index', width: 55, align: 'center' },
                { title: '标题', key: 'title' },
                { title: '描述', key: 'desc' },
                { title: '链接数', key: 'count', width: 100, align: 'center' },
                { title: '排序', key: 'sort', width: 120, align: 'center' },
                { title: '创建时间', key: 'createTime', width: 160, align: 'center' }
            ],
            search: {
                type: 'current'
            }
        }
    },
    props: {
        title: {
            type: String,
            default: ''
        },
        navID: {
            type: String,
            default: ''
        },
        show: {
            type: Boolean,
            required: true,
            default: false
        },
    },
    computed: {
        shows: {
            get() {
                return this.show;
            },
            set(newValue) {
                this.$emit('update:show', newValue);
            }
        }
    },
    created() {
        this.getlist()
    },
    methods: {
        handleDelete() {
            if (this.checkList.length > 0) {
                const ids = this.checkList.map(item => item._id)
                linkclass.update({
                    navID: -1,
                    ids
                }).then(res => {
                    if (res) {
                        this.$Message.success('取消分配成功')
                        this.getlist()
                    }
                })
            }
        },
        handleSubmit() {
            if (this.checkList.length > 0) {
                const ids = this.checkList.map(item => item._id)
                linkclass.update({
                    navID: this.navID,
                    ids
                }).then(res => {
                    if (res) {
                        this.$Message.success('分配成功')
                        this.getlist()
                    }
                })
            }
        },
        handleRowClick(row, index) {
            this.$refs.table.toggleSelect(index);
        },
        handleSelectionChange(rows) {
            this.checkList = rows
        },
        getlist() {
            this.loading = true;
            let par = { ...this.page }
            if (this.search.type === 'current') {
                par.navID = this.navID
            } else {
                par.navID = ''
            }
            linkclass
                .get(par)
                .then(res => {
                    this.list = res.list.map(item => ({ ...item, _checked: false }));
                    this.count = res.count;
                    this.loading = false;
                });
        },
    }
}
</script>

<style>

</style>