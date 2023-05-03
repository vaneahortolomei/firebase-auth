<template>
    <header class="header">
        <nav class="header__nav">
            <ul class="header__nav-list nav-list">
                <li v-if="!data" class="nav-list__item">
                    <router-link class="nav-list__link" :to="{ name: 'login' }"
                        >Login
                    </router-link>
                </li>
                <li class="nav-list__item">
                    <router-link class="nav-list__link" :to="{ name: 'home' }"
                        >Home
                    </router-link>
                </li>
            </ul>
        </nav>
        <div v-if="data" class="header__user user">
            <p class="user__name">{{ userName }}</p>
            <button class="button user__button" @click="logOut">Logout</button>
        </div>
    </header>
</template>

<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const data = ref(null);
const userName = ref("");

onMounted(() => {
    onAuthStateChanged(getAuth(), async (user) => {
        if (user) {
            data.value = user;
            userName.value = user.displayName;
        }
    });
});

const store = useStore();
const route = useRouter();

const logOut = () => {
    store.dispatch("logOut");
    route.push("/");

    location.reload();
};
</script>
