<template>
    <Modal v-model="shows" title="Common Modal dialog box title" @on-ok="ok" @on-cancel="cancel">
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
    </Modal>
</template>

<script>
    export default {
        data() {
            return {

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
            ok() {

            },
            cancel() {

            }
        }
    }
</script>

<style>
</style>