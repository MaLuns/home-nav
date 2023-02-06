<template>
    <div>
        <Modal v-model="shows" :title="`配置【${title}】链接`" width="80%" footer-hide>
            <Form ref="formInline" class="search-from" :model="search" inline>
                <FormItem>
                    <RadioGroup v-model="search.type" @on-change="getlist()">
                        <Radio label="current">当前分类</Radio>
                        <Radio label="unallocated">未分配</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem style="float: right;">
                    <Button v-if="search.type === 'current'" type="error" @click="handleDelete">批量取消分配</Button>
                    <Button v-if="search.type === 'unallocated'" type="primary" @click="handleSubmit">批量分配</Button>
                </FormItem>
            </Form>
            <i-table @on-row-click="handleRowClick" @on-selection-change="handleSelectionChange" :loading="loading"
                ref="table" border size="small" :columns="columns" :data="list" :height="maxheight - 200">
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
import { link } from "~/pages/api";
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
                { title: '标题', key: 'title', ellipsis: true, tooltip: true },
                { title: '描述', key: 'desc', ellipsis: true, tooltip: true },
                { title: 'url', key: 'url', ellipsis: true, tooltip: true },
                { title: 'logo', key: 'logo', ellipsis: true, tooltip: true },
                { title: '备注', key: 'remark', ellipsis: true, tooltip: true },
                { title: '分类', key: 'parentTitle', width: 120, align: 'center' },
                { title: '状态', key: 'status', width: 80, align: 'center' },
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
        classID: {
            type: String,
            default: ''
        },
        show: {
            type: Boolean,
            required: true,
            default: false
        }
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
                link.update({
                    classID: -1,
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
                link.update({
                    classID: this.classID,
                    ids
                }).then(res => {
                    if (res) {
                        this.$Message.success('配置成功')
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
                par.classID = this.classID
            } else {
                par.classID = ''
            }
            link
                .get({ ...par, ...this.page })
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