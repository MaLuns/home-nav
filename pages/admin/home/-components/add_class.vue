<template>
    <div>
        <Modal v-model="shows" title="新增菜单" @on-ok="handleSubmit">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="名称" prop="title">
                    <Input v-model="formValidate.title" placeholder="名称" maxlength="10" />
                </FormItem>
                <FormItem label="描述" prop="desc">
                    <Input v-model="formValidate.desc" placeholder="描述" maxlength="15" />
                </FormItem>
                <FormItem label="排序" prop="sort">
                    <InputNumber style="width:100%" :max="100000" :min="1" v-model="formValidate.sort"></InputNumber>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="handleSubmit">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import { linkclass } from "~/pages/api";

    export default {
        data() {
            return {
                formValidate: {
                    desc: '',
                    title: '',
                    sort: 0
                },
                ruleValidate: {
                    title: [{ required: true, message: '请输入名称', trigger: 'blur' }],
                }
            }
        },
        props: {
            show: {
                type: Boolean,
                required: true,
                default: false
            },
            type: {
                type: String,
                default: 'create',
            },
            data: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        created() {
            this.formValidate = {
                ...this.formValidate,
                ...this.data
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
        methods: {
            handleSubmit() {
                this.$refs.formValidate.validate((valid) => {
                    if (valid) {
                        let { _id: id, desc, title, sort } = this.formValidate
                        linkclass[this.type]({
                            id, desc, title, sort
                        }).then(res => {
                            this.$emit('change')
                            this.shows = false
                        })
                    }
                })
            }
        }
    }
</script>

<style>
</style>