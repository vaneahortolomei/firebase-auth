<template>
    <div class="auth">
        <transition name="fade" mode="out-in">
            <h2 v-if="selectedTab === 'register'" class="auth__title">
                Register
            </h2>
            <h2 v-else class="auth__title">Log In</h2>
        </transition>
        <transition name="fade" mode="out-in">
            <div v-if="selectedTab === 'register'" class="auth__register">
                <Register />
            </div>
            <div v-else class="auth__login">
                <Login />
            </div>
        </transition>
        <div class="auth__controls controls">
            <transition name="fade" mode="out-in">
                <button
                    v-if="selectedTab === 'register'"
                    class="button button--link button--responsive controls__button"
                    @click="showScreen('login')"
                >
                    Sign In
                </button>
                <button
                    v-else
                    class="button button--link button--responsive controls__button"
                    @click="showScreen('register')"
                >
                    Create Free Account
                </button>
            </transition>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import Register from "../components/RegisterComponent.vue";
import Login from "../components/LoginComponent.vue";

const selectedTab = ref("");

const showScreen = (str) => {
    selectedTab.value = str;
};
</script>
