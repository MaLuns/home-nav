<template>
    <div>
        <Modal v-model="shows" title="配置菜单分类" width="80%">
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
                    { title: '标题', key: 'title', width: 260 },
                    { title: '描述', key: 'desc' },
                    { title: '菜单', key: 'parentTitle', width: 100, align: 'center' },
                    { title: '链接数', key: 'count', width: 100, align: 'center' },
                    { title: '排序', key: 'sort', width: 120, align: 'center' },
                    { title: '创建时间', key: 'createTime', width: 160, align: 'center' }
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
                linkclass
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