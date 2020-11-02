import Axios from "axios";

require('./bootstrap');
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import {routes} from "./routes";
import StoreData from "./store"
import MainApp from './components/MainApp.vue'

Vue.use(VueRouter);
Vue.use(Vuex);

const store = new Vuex.Store(StoreData);

const router = new VueRouter({
    routes,
    mode: 'history'
});

router.beforeEach((to, from, next) => {
    const mustAuth = to.matched.some(record => record.meta.mustAuth);
    const loggedUser = store.state.loggedUser;
    if (mustAuth && !loggedUser) {
        next('/login');
    } else if (to.path == '/login' && loggedUser) {
        next('/');
    } else {
        next();
    }
});

Axios.interceptors.response.use(null, (error) => {
    if (error.response.status == 401) {
        store.commit('logout');
        router.push('/login');
    }

    return Promise.reject(error);
})


if (store.getters.getLoggedUser) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + store.getters.getLoggedUser.token;
}

const app = new Vue({
    el: '#app',
    router,
    store,
    components: {
        MainApp
    }
});