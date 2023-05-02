import { createRouter } from "vue-router";
import { createWebHashHistory } from "vue-router";

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

export default router;
