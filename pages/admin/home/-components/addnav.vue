<template>
    <div>
        <Modal v-model="shows" title="新增菜单" @on-ok="handleSubmit" draggable>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="名称" prop="title">
                    <Input v-model="formValidate.title" placeholder="名称" maxlength="10"></Input>
                </FormItem>
                <FormItem label="路径" prop="url">
                    <Input v-model="formValidate.url" placeholder="路径" maxlength="15"></Input>
                </FormItem>
                <FormItem label="排序" prop="sort">
                    <InputNumber style="width:100%" :max="100000" :min="1" v-model="formValidate.sort"></InputNumber>
                </FormItem>
                <FormItem label="blank" prop="blank">
                    <i-switch v-model="formValidate.blank"></i-switch>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="handleSubmit">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import { nav } from "~/pages/api";
    import { regexp } from "~/pages/util";

    export default {
        data() {
            return {
                formValidate: {
                    url: '',
                    title: '',
                    blank: false,
                    sort: 0
                },
                ruleValidate: {
                    title: [{ required: true, message: '请输入名称', trigger: 'blur' }],
                    url: [
                        { required: true, message: '请输入路径', trigger: 'blur' },
                        { message: '路径只能是"/"或者字母', trigger: 'blur', pattern: regexp.path },
                    ]
                }
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
        methods: {
            handleSubmit() {
                this.$refs.formValidate.validate((valid) => {
                    if (valid) {
                        nav.create({
                            ...this.formValidate
                        }).then(res => {
                            console.log(res)
                        })
                    }
                })
            }
        }
    }
</script>

<style>
</style>