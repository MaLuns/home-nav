import Vue from 'vue';

const componentsContext = require.context('../components/', true, /index.vue$/);
componentsContext.keys().forEach(component => {
    const componentConfig = componentsContext(component);
    const ctrl = componentConfig.default || componentConfig;
    Vue.component(ctrl.name, ctrl);
});