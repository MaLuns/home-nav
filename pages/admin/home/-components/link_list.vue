<template>
    <div>
        <Modal v-model="shows" title="配置分类链接" width="80%">
            <i-table @on-row-click="handleRowClick" @on-selection-change="handleSelectionChange" :loading="loading" ref="table" border size="small" :columns="columns" :data="list" :height="maxheight-200">
            </i-table>
            <div class="text-right page">
                <Page :total="count" :page-size-opts="pageSizeOpts" :page-size="page.size" size="small" @on-page-size-change="e=>{page.size=e;getlist()}" :current.sync="page.index" @on-change="getlist()" show-total show-sizer />
            </div>
            <div slot="footer">
                <Button type="primary" @click="handleSubmit">确定</Button>
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
            }
        },
        props: {
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
            handleSubmit() {
                if (this.checkList.length > 0) {
                    this.shows = false
                    this.$emit("change", this.checkList.map(item => item._id))
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
                link
                    .get({ ...this.page })
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