<template>
    <header class="header">
        <nav class="header__nav">
            <ul class="header__nav-list nav-list">
                <li class="nav-list__item">
                    <router-link :to="{ name: 'login' }">Login</router-link>
                </li>
                <li class="nav-list__item">
                    <router-link :to="{ name: 'home' }">Home</router-link>
                </li>
            </ul>
        </nav>
        <div class="header__user user">
            <p>{{ name }}</p>
        </div>
    </header>
</template>

<script setup>
import { useStore } from "vuex";

const store = useStore();

const { name } = store.state;
</script>
