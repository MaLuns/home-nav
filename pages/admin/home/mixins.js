export default {
    data() {
        return {
            maxheight: 0,
            count: 0,
            pageSizeOpts: [20, 50, 100],
            page: {
                size: 20,
                index: 1
            }
        }
    },
    mounted() {
        this.maxheight = window.innerHeight - this.$refs.table.$el.getBoundingClientRect().top - 130
    },
}