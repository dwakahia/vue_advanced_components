import Vue from "vue";
import VueRouter from 'vue-router'
import AdminLayout from "./components/layouts/AdminLayout";
import Home from "./components/Home";
import Users from "./components/users/Users";
import Movies from "./components/movies/Movies";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: AdminLayout,
        children: [
            {
                path: '',
                name: 'home',
                component: Home,
            },
            {
                path: 'users',
                name: 'users',
                component: Users,
            },
            {
                path: 'movies',
                name: 'movies',
                component: Movies,
            },

        ],
    },
]


const router = new VueRouter({
    mode: 'history',
    linkExactActiveClasss: 'bg-gray-800  shadow',
    routes: routes
})

export default router;