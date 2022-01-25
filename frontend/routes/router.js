import Vue from "vue";
import VueRouter from 'vue-router'
import AdminLayout from "../components/layouts/AdminLayout";
import Home from "../components/Home";
import Users from "../components/users/Users";
import Movies from "../components/movies/Movies";
import Login from "../components/auth/Login";
import Register from "../components/auth/register";


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
                meta: {
                    auth: true
                }
            },
            {
                path: 'users',
                name: 'users',
                component: Users,
                meta: {
                    auth: true
                }
            },
            {
                path: 'movies',
                name: 'movies',
                component: Movies,
                meta: {
                    auth: true
                }
            },

        ],

    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    }
]


const router = new VueRouter({
    mode: 'history',
    linkExactActiveClass: 'bg-gray-800  shadow',
    routes: routes
})

router.beforeEach((to, from, next) => {
    const loggedInUser = localStorage.getItem("user");

    if (to.matched.some((record) => record.meta.auth) && !loggedInUser) {
        next('/login')
    } else if ((to.name === 'login' || to.name === 'register') && loggedInUser) {
        next('/');
    } else {
        next();
    }
})

export default router;