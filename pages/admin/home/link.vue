<template>
    <div>
        <div class="text-right mgb10">
            <Button @click="addShow=true;" type="dashed">新增</Button>
        </div>
        <i-table :loading="loading" ref="table" border size="small" :columns="columns" :data="list" :height="maxheight">
            <template slot-scope="{ row }" slot="title">
                <Input v-if="row.edit" type="text" v-model="row.title" maxlength="10" placeholder="标题" />
                <template v-else>
                    {{ row.title }}
                </template>
            </template>
            <template slot-scope="{ row }" slot="desc">
                <Input v-if="row.edit" type="text" v-model="row.desc" maxlength="20" placeholder="描述" />
                <span v-else>{{ row.desc }}</span> </template>
            <template slot-scope="{ row }" slot="menu"> {{ row.parentTitle }} </template>
            <template slot-scope="{ row }" slot="count"> {{ row.count }} </template>
            <template slot-scope="{ row }" slot="sort">
                <InputNumber v-if="row.edit" :max="100000" :min="1" v-model="row.sort"></InputNumber>
                <span v-else> {{ row.sort }}</span>
            </template>
            <template slot-scope="{ row }" slot="createTime"> {{ row.createTime }} </template>
            <template slot-scope="{ row }" slot="opt">
                <Tag class="dot" type="dot" color="error" v-if="row.delete"></Tag>
                <Tag class="dot" type="dot" color="success" v-else></Tag>
                <Divider type="vertical" />
                <a>配置网址</a>
                <Divider type="vertical" />
                <a @click="()=>{row.edit=true}" v-if="!row.edit">编辑</a>
                <a @click="handleSave(row)" v-else>保存</a>
                <Divider type="vertical" />
                <a @click="handleUpdateState(row)" v-if="!row.edit">{{row.delete?'启用':'停用'}}</a>
                <a @click="row.edit=false" v-else>取消</a>
            </template>
        </i-table>
        <div class="text-right page">
            <Page :total="count" :page-size="page.size" size="small" @on-page-size-change="e=>{page.size=e;getlist()}" :current.sync="page.index" @on-change="getlist()" show-total show-sizer />
        </div>
        <!-- 新增 -->
        <add-class v-if="addShow" :show.sync="addShow"></add-class>
    </div>
</template>

<script>
    import AddClass from './-components/add_class';
    import { link } from '~/pages/api';
    import mixins from './mixins';

    export default {
        mixins: [mixins],
        components: { AddClass },
        data() {
            return {
                loading: true,
                addShow: false,
                list: [],
                columns: [
                    { type: 'index', width: 50, align: 'center' },
                    { title: '标题', slot: 'title' },
                    { title: '描述', slot: 'desc' },
                    { title: '菜单', slot: 'menu' },
                    { title: '链接数', slot: 'count', width: 100, align: 'center' },
                    { title: '排序', slot: 'sort', width: 120, align: 'center' },
                    { title: '创建时间', slot: 'createTime', width: 160, align: 'center' },
                    { title: '操作', slot: 'opt', width: 240, align: 'center' }
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
            handleSave({ _id: id, desc, title, sort }) {
                link.update({ id, desc, title, sort })
                    .then(res => {
                        this.getlist();
                        this.$Message.success('保存成功');
                    });
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