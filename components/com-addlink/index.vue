<template>
    <Modal v-model="show" title="提交网址" @on-visible-change="change">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="导航分类" prop="classID">
                <Cascader v-model="formValidate.classID" @on-change="aaaaa" :data="navs" :load-data="loadData">
                </Cascader>
            </FormItem>
            <FormItem label="网址名称" prop="title">
                <Input v-model="formValidate.title" placeholder="网址名称" maxlength="10" />
            </FormItem>
            <FormItem label="网址地址" prop="url">
                <Input v-model="formValidate.url" placeholder="网址地址" maxlength="100"></Input>
            </FormItem>
            <FormItem label="Logo">
                <Input v-model="formValidate.logo" placeholder="网址LOGG" maxlength="100"></Input>
            </FormItem>
            <FormItem label="描述">
                <Input v-model="formValidate.desc" type="textarea" :autosize="{ minRows: 2, maxRows: 5 }"
                    placeholder="描述" maxlength="125" />
            </FormItem>
        </Form>
        <div slot="footer">
            <Button type="primary" @click="handleSubmit">提交</Button>
        </div>
    </Modal>
</template>
<script>
import { regexp } from "~/pages/util";
import { linkclass, link } from '~/pages/api'

export default {
    name: 'comAddlink',
    data() {
        return {
            formValidate: {
                classID: [],
                title: '',
                url: '',
                logo: '',
                desc: '',
            },
            ruleValidate: {
                classID: [{ type: 'array', required: true, message: '请选择分类', trigger: 'change' }],
                title: [{ required: true, message: '请输入名称', trigger: 'blur' }],
                url: [
                    { required: true, message: '请输入路径', trigger: 'blur' },
                    { message: '请输入网址', trigger: 'blur', pattern: regexp.url },
                ]
            },
            navs: this.$store.state.nav.map(item => {
                return {
                    value: item._id,
                    label: item.title,
                    children: [],
                    loading: false
                }
            })
        }
    },
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        aaaaa() {
            console.log(this.formValidate);
        },
        async loadData(item, callback) {
            item.loading = true;
            let id = item.value
            let data = this.$store.state.linkclass[id]
            if (!data) {
                data = await linkclass.childen({ id })
                this.$store.commit('addNavClass', { id, list: data })
            }
            item.children = data.map(item => {
                return {
                    value: item._id,
                    label: item.title
                }
            })
            item.loading = false;
            callback();
        },
        change(value) {
            this.$emit('update:show', value)
        },
        handleSubmit() {
            this.$refs.formValidate.validate((valid) => {
                if (valid) {
                    let { desc, logo, url, title, classID } = this.formValidate
                    link
                        .create({ desc, title, logo, url, classID: classID[1] })
                        .then(_ => {
                            this.$emit('update:show', false);
                            this.$Message.success('提交成功')
                        })
                }
            })
        }
    }
}
</script>