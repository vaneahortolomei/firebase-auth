<template>
    <div class="wrapper">
        <HeaderComponent />
        <div class="content">
            <div class="container">
                <router-view />
            </div>
        </div>
    </div>
</template>
<script setup>
import HeaderComponent from "./components/HeaderComponent.vue";
</script>
