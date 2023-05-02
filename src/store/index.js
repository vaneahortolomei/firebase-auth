import { createStore } from "vuex";
import { auth, usersCollection } from "../../src/includes/firebase.js";

const store = createStore({
    state() {
        return {
            name: "John",
            isLogged: false,
        };
    },
    mutations: {},
    actions: {
        async register(payload) {
            const createUser = await auth.createUserWithEmailAndPassword(
                payload.email,
                payload.password,
            );

            await usersCollection.doc(createUser.user.uid).set({
                firstName: payload.firstName,
                email: payload.email,
            });

            await createUser.user.updateProfile({
                displayName: payload.firstName,
            });

            this.isLogged = true;
        },
    },
    getters: {},
});

export default store;
