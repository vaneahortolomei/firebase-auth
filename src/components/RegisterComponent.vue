<template>
    <form
        role="form"
        class="form form--auth"
        action="#"
        @submit.prevent="register"
    >
        <div class="form__group">
            <Input
                id="name"
                v-model="v$.name.$model"
                label="Name"
                type="text"
                class="form__input"
                name="name"
                @blur="v$.name.$touch"
            />
            <span
                v-for="(error, index) in v$.name.$errors"
                :key="index"
                class="form__error"
            >
                {{ error.$message }}
            </span>
        </div>
        <div class="form__group">
            <Input
                id="email"
                v-model="v$.email.$model"
                label="Email"
                type="text"
                class="form__input"
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
                class="form__input"
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
            Sign Up
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
        name: "",
        email: "",
        password: "",
    });

    const rules = computed(() => ({
        name: {
            required,
            minValue: minLength(2),
            $lazy: true,
        },
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

    const register = () => {
        v$.value
            .$validate()
            .then((valid) => {
                if (valid) {
                    store
                        .dispatch("register", state)
                        .then(() => {
                            key.message = "Hello User!";
                            timeout(2000);

                            route.push("/");
                        })
                        .catch((e) => {
                            console.log(e.code);
                            if(e.code === "auth/email-already-in-use"){
                                key.message = "email-already-in-use";
                                timeout(2000);
                            }
                            if (e.code === "auth/too-many-requests") {
                                key.message = "TOO_MANY_ATTEMPTS_TRY_LATER";
                            }
                        });
                } else {
                    throw Error("Value is required"); //test error
                }
            })
            .catch(() => {
                throw Error("Value is required"); //test error
            });
    };
</script>
