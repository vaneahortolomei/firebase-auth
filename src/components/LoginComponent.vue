<template>
    <form
        role="form"
        class="form form--auth"
        action="#"
        @submit.prevent="login"
    >
        <div class="form__group">
            <Input
                id="email"
                v-model="v$.email.$model"
                label="Email"
                type="text"
                name="email"
                @blur="v$.email.$touch"
            />
            <span
                v-for="(error, index) in v$.email.$errors"
                :key="index"
                class="form__error"
            >
                {{ error.$message }}
            </span>
        </div>
        <div class="form__group">
            <Input
                id="password"
                v-model="v$.password.$model"
                label="Password"
                type="password"
                name="password"
                @blur="v$.password.$touch"
            />
            <span
                v-for="(error, index) in v$.password.$errors"
                :key="index"
                class="form__error"
            >
                {{ error.$message }}
            </span>
        </div>
        <button class="button button--light button--responsive" type="submit">
            Log In
        </button>
    </form>
</template>

<script setup>
import Input from "../components/form/InputComponent.vue";
import { reactive, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import { inject } from "vue";

let key = inject("key");

const state = reactive({
    email: "",
    password: "",
});

const rules = computed(() => ({
    email: {
        required,
        email,
        $lazy: true,
    },
    password: {
        required,
        minLength: minLength(8),
        $lazy: true,
    },
}));

const v$ = useVuelidate(rules, state);

const store = useStore();
const route = useRouter();

const timeout = (time) => {
    return setTimeout(() => {
        key.message = "";
    }, time);
};

const login = () => {
    v$.value
        .$validate()
        .then((valid) => {
            if (valid) {
                store
                    .dispatch("login", {
                        email: state.email,
                        password: state.password,
                    })
                    .then(() => {
                        key.message = "Welcome back!";

                        route.push("dashboard");
                    })
                    .catch((e) => {
                        if (e.response && e.response.status === 400) {
                            key.message = "Incorrect email or password!";

                            timeout(2000);
                        }
                    });
            } else {
                throw Error("Value is required");
            }
        })
        .catch(() => {
            throw Error("Value is required");
        });
};
</script>
