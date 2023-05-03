import { createStore } from "vuex";
import { auth, db, usersCollection } from "../../src/includes/firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from "firebase/auth";

const store = createStore({
    state() {
        return {
            user: null,
            isLogged: false,
        };
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user;
        },
        CLEAR_USER(state, user) {
            state.user = user;
        },
    },
    actions: {
        async register({ commit }, payload) {

            const { email, password, name } = payload;

            const createUser = await createUserWithEmailAndPassword(
                auth,
                email,
                password,
            );

            const user = auth.currentUser;

            await updateProfile(user, {
                displayName: name
            });


            this.commit("SET_USER", user);


            this.isLogged = true;
        },
        async login({ commit }, payload) {
            const { email, password } = payload;

            await signInWithEmailAndPassword(
                auth,
                email,
                password,
            );
            const user = auth.currentUser;


            this.commit("SET_USER", user);

            this.isLogged = true;
        },
    },
    getters: {},
});

export default store;
