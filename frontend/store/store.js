import Vue from 'vue'
import Vuex from 'vuex'
import http from "../utils/http";
import router from '../routes/router'

Vue.use(Vuex)


const store = new Vuex.Store({
    state: {
        all_users: [],
        userdata: null,
    },
    getters: {
        all_users: (state) => state.all_users,
        is_logged: state => !!state.userdata,
    },
    mutations: {
        addUser(state, user) {
            state.all_users.unshift(user);
        },
        addAllUsers
            (state, users) {
            state.all_users = users;
        }
        ,
        updateUser(state, newUser) {
            state.all_users = state.all_users.map((user) => {
                if (user.id == newUser.id) {
                    return newUser;
                }
                return user;
            })
        }
        ,
        deleteUser(state, deletedUser) {
            state.all_users = this.state.all_users.filter((user) => user.id != deletedUser.id)
        }
        ,
        saveUserData(state, userData) {
            state.userdata = userData;
            localStorage.setItem('user', JSON.stringify(userData));
            Vue.$toast.success('Logged in successfully.', {
                position: 'top-right'
            })
            location.reload();
        }
        ,
        clearUserData() {
            localStorage.removeItem('user');
            router.push({name: 'login'});
        }
    },
    actions: {
        getAllUsers({dispatch, commit}, payload) {
            Vue.$toast.clear();

            let url = `/users`;
            if (payload) {
                url = `/users?querytxt=${payload}`
            }
            http.get(url).then((response) => {
                if (response.status === 200) {
                    commit('addAllUsers', response.data.users);

                    Vue.$toast.success('Fetched users.', {
                        position: 'top-right'
                    })
                }
            }).catch((error) => {
                Vue.$toast.error(`${error.response.data.message}`, {
                    position: 'top-right'
                })
            })
        },
        deleteUser({dispatch, commit}, payload) {
            http.delete(`/users/delete/${payload.user.id}`).then((response) => {
                if (response.status === 200) {
                    commit('deleteUser', response.data.user)

                    Vue.$toast.success('User Added successfully.', {
                        position: 'top-right'
                    })
                }
            }).catch((error) => {
                Vue.$toast.error(`${error.response.data.message}`, {
                    position: 'top-right'
                })
            })
        },
        logout({dispatch, commit}) {
            commit('clearUserData')
            Vue.$toast.success('Logged Out successfully.', {
                position: 'top-right'
            })
        }
    }
})

export default store;