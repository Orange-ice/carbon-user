<script lang="ts" setup>
import { useUserStore } from '../../store/modules/user.ts';

const userStore = useUserStore();
</script>

<template>
  <div>
    <p class="font-size-20 font-bold">{{ userStore.getToken }}</p>
    <button @click="userStore.login()">Login</button>
  </div>
</template>
