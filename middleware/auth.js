export default function ({ redirect, store }) {
    const isAuthenticated = store.state.user ? true : false
    console.log(isAuthenticated)
    /* if (!isAuthenticated) {
        redirect({ path: '/admin' })
    } */
}