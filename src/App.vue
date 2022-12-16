<template>
  <router-view></router-view>
</template>

<script setup>
import { useAuthStore } from './stores/AuthStore.js'
import { useRouter } from "vue-router";
import { computed, watch } from 'vue'

const authStore = useAuthStore()
const router = useRouter()

authStore.autoLogin()
const didAutoLogout = computed(() => {
  return authStore.didAutoLogoutUser
})

watch(didAutoLogout, (newValue, oldValue) => {
  if(newValue && newValue !== oldValue) {
    router.replace('/auth')
  }
})
</script>
