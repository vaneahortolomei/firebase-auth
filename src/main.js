import { createApp, reactive } from "vue";
import router from "/src/router/index.js";

// import { auth } from "./includes/firebase.js";

import store from "./store";
import "../src/style/index.scss";
import App from "./App.vue";

//GlobalNotification
const message = reactive({ message: "" });

const app = createApp(App);

app.use(router);
app.use(store);
app.provide("key", message);

app.mount("#app");
