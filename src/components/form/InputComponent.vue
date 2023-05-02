<template>
    <label :for="id">{{ label }}</label>
    <input
        v-bind="$attrs"
        :id="id"
        :placeholder="label"
        :value="modelValue"
        :name="name"
        class="form__input"
        @input="$emit('update:modelValue', $event.target.value)"
    />
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

defineEmits(["update:modelValue"]);

defineProps({
    label: {
        type: String,
        default: "Input",
    },
    modelValue: {
        type: [String, Number, Object],
        default: "",
    },
    id: {
        type: String,
        default: "",
    },
    name: {
        type: String,
        default: "",
    },
});
</script>
