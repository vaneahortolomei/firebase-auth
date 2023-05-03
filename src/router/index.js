import { createRouter } from "vue-router";
import { createWebHashHistory } from "vue-router";
import { auth } from "../../src/includes/firebase.js";

import Home from "../pages/HomePage.vue";
import Auth from "../pages/AuthPage.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/login",
        name: "login",
        component: Auth,
    },
];

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes,
    linkExactActiveClass: "",
});

router.beforeEach((to, from, next) => {
    if (to.path === "/login" && auth.currentUser) {
        next("/");
        return;
    }

    if (
        to.matched.some((record) => record.meta.requiresAuth) &&
        !auth.currentUser
    ) {
        next("/login");
        return;
    }

    next();
});

export default router;
