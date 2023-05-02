import { createApp } from "vue";
import router from "/src/router/index.js";
import store from "./store";
import "../src/style/index.scss";
import App from "./App.vue";

const app = createApp(App);

app.use(router);
app.use(store);

app.mount("#app");
