import { createStore } from "vuex";
import { useRouter } from "vue-router";
import { auth } from "../../src/includes/firebase.js";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";

const store = createStore({
    state: () => ({
        user: null,
    }),
    mutations: {
        SET_USER(state, user) {
            state.user = user;
        },
        CLEAR_USER(state) {
            state.user = null;
        },
    },
    actions: {
        async register({ commit }, payload) {
            const { email, password, name } = payload;

            await createUserWithEmailAndPassword(auth, email, password);

            await updateProfile(auth.currentUser, {
                displayName: name,
            });

            commit("SET_USER", auth.currentUser);
        },
        async login({ commit }, payload) {
            const { email, password } = payload;

            await signInWithEmailAndPassword(auth, email, password);

            commit("SET_USER", auth.currentUser);
        },
        async logOut({ commit }) {
            await signOut(auth);
            commit("CLEAR_USER");
        },

        fetchUser({ commit }) {
            onAuthStateChanged(auth, async (user) => {
                const router = useRouter();
                if (user === null) {
                    await commit("CLEAR_USER");
                } else {
                    await commit("SET_USER", user);

                    if (
                        (await router.isReady()) &&
                        router.currentRoute.value.path === "/login"
                    ) {
                        await router.push("/");
                    }
                }
            });
        },
    },
});

export default store;
