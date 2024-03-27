<script lang="ts" setup>
import { useUserStore } from '../../store/modules/user.ts';
import { reactive } from 'vue';

const userStore = useUserStore();

const loginParams = reactive({
  username: 'nene',
  password: '123456'
})
</script>

<template>
  <div>
    <p class="font-size-20 font-bold">{{ userStore.getToken || 'Empty' }}</p>
    <button @click="userStore.login(loginParams)">Login</button>
  </div>
</template>
