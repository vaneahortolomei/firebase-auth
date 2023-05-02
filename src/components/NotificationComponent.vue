<template>
    <div v-if="key.message" class="notification">
        {{ key.message }}
    </div>
</template>

<script setup>
import { inject } from "vue";

let key = inject("key");
</script>
