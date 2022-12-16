<template>
  <header class="bg-purple-700 flex items-center justify-center w-full">
    <nav class="flex items-center justify-between">
      <h1 class="text-white">{{currentUser}}</h1>

      <ul class="flex items-center justify-between p-0 m-0">
        <li class="m-2 border-2 rounded text-white border-white hover:text-white hover:bg-sky-600">
          <router-link class="flex-no-shrink p-2" to="/take-quiz">Take quiz</router-link>
        </li>
        <li class="m-2 border-2 rounded text-white border-white hover:text-white hover:bg-sky-600">
          <router-link class="flex-no-shrink p-2" to="/create-quiz">Create quiz</router-link>
        </li>
        <li class="m-2 border-2 rounded text-white border-white hover:text-white hover:bg-sky-600">
          <router-link class="flex-no-shrink p-2" to="/delete-edit-quiz">Delete/Edit Question</router-link>
        </li>
        <li class="m-2 border-2 rounded text-white border-white hover:text-white hover:bg-sky-600">
          <router-link class="flex-no-shrink p-2" to="/students-list">Students list</router-link>
        </li>
        <li>
          <button class="flex-no-shrink m-2 p-2 border-2 rounded text-white border-white hover:text-white hover:bg-sky-600" @click="logout">Logout</button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import {onMounted, ref} from "vue";
import { useAuthStore } from '../../stores/AuthStore.js'
import { useRouter } from "vue-router";

const authStore = useAuthStore()

const router = useRouter()
const currentUser = ref()

function logout() {
  authStore.logout()
  router.replace('/auth');
}
onMounted(() => {
  currentUser.value = localStorage.getItem('email')
})
</script>

<style scoped>
a.router-link-active {
  @apply bg-emerald-400
}
header {
  height: 5rem;
}

header a {
  text-decoration: none;
  display: inline-block;
}

header nav {
  width: 90%;
  margin: auto;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
