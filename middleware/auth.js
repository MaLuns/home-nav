export default function ({ redirect, store }) {
    const isAuthenticated = store.state.user ? true : false
    console.log(store.state.user)
    //console.log(isAuthenticated)
    /* if (!isAuthenticated) {
        redirect({ path: '/admin' })
    } */
}