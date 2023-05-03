<template>
    <div v-if="load" class="wrapper">
        <div class="content">
            <div class="loader-default">
                <div class="loader-default--spinner"></div>
            </div>
        </div>
    </div>
    <div v-else class="wrapper">
        <HeaderComponent />
        <transition name="fade">
            <Notification />
        </transition>
        <div class="content">
            <div class="container">
                <router-view />
            </div>
        </div>
    </div>
</template>
<script setup>
import HeaderComponent from "./components/HeaderComponent.vue";
import Notification from "./components/NotificationComponent.vue";
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const load = ref(true);

onMounted(() => {
    onAuthStateChanged(getAuth(), async (user) => {
        if (user) {
            load.value = false;
        } else {
            load.value = false;
        }
    });
});
</script>
