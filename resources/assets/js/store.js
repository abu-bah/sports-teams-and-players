import {getLoggedUser} from "./helpers/auth";

const user = getLoggedUser();

export default {
    state: {
        loggedUser: user,
        isLogged: !!user,
        loading: false,
        auth_exception: null,
        teams: null,
        players: null,
    },
    getters: {
        checkLoading(state) {
            return state.loading;
        },
        checkIsLogged(state) {
            return state.isLogged;
        },
        getLoggedUser(state) {
            return state.loggedUser;
        },
        getAuthException(state) {
            return state.auth_exception;
        },
        getTeams(state) {
            return state.teams;
        },
        getPlayers(state) {
            return state.players;
        },
    },
    mutations: {
        login(state) {
            state.loading = true;
            state.auth_exception = null;
        },
        successfulLogin(state, payload) {
            state.auth_exception = null;
            state.loading = false;
            state.isLogged = true;
            state.loggedUser = Object.assign({}, payload.user, {token: payload.access_token});
            localStorage.setItem("user", JSON.stringify(state.loggedUser));

            axios.defaults.headers.common["Authorization"] = "Bearer " + payload.access_token;
        },
        errorLogin(state, payload) {
            state.auth_exception = payload.exception;
            state.loading = false;
        },
        logout(state) {
            localStorage.removeItem("user");
            state.isLogged = false;
            state.loading = false;
            state.loggedUser = null;
        },
        setTeams(state, payload) {
            state.teams = payload;
        },
        setPlayers(state, payload) {
            state.players = payload;
        }
    },
    actions: {
        loginAction(context) {
            context.commit("login");
        },
        getTeams(context) {
            axios.get('/api/teams')
                .then((response) => {
                    context.commit('setTeams', response.data.teams);
                })
        },
        getPlayers(context) {
            axios.get('/api/players')
                .then((response) => {
                    context.commit('setPlayers', response.data.players);
                })
        },


    }
}