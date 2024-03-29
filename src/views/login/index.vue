<script lang="ts" setup>
import { useUserStore } from '../../store/modules/user.ts';
import { reactive } from 'vue';

const userStore = useUserStore();

const loginParams = reactive({
  username: 'nene',
  password: '123456'
})

const testMessage = () => {
  window.$message.success('Hello Arco');
};
</script>

<template>
  <div class="flex flex-col">
    <p class="font-size-12 font-bold">{{ userStore.getToken || 'Empty' }}</p>
    <button @click="userStore.login(loginParams)">Login</button>
    <button @click="userStore.getInfo()">GET Info</button>
  </div>
  <div class="m10">
    <a-button type="primary" @click="testMessage">ARCO BUTTON</a-button>
  </div>
</template>
