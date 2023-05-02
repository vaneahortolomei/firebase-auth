<template>
    <div class="wrapper">
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
</script>
