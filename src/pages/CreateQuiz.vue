<template>
  <div class="tabs flex items-center justify-center mb-7">
    <button @click="changeTab('OneAnswerQuestions')" :class="tab.__name === 'OneAnswerQuestions' ? 'active' : ''" class="p-2 m-2 text-blue-800 border-blue-800 border-2">One answer questions</button>
    <button @click="changeTab('TwoAnswerQuestions')" :class="tab.__name === 'TwoAnswerQuestions' ? 'active' : ''" class="p-2 m-2 text-blue-800 border-blue-800 border-2">Two answer questions</button>
    <button @click="changeTab('WrittenAnswerQuestions')" :class="tab.__name === 'WrittenAnswerQuestions' ? 'active' : ''" class="p-2 m-2 text-blue-800 border-blue-800 border-2">Written answer questions</button>
  </div>
  <component :is="tab"></component>
</template>

<script setup>
import OneAnswerQuestions from '../components/OneAnswerQuestions.vue'
import TwoAnswerQuestions from '../components/TwoAnswerQuestions.vue'
import WrittenAnswerQuestions from '../components/WrittenAnswerQuestions.vue'
import {ref, markRaw} from 'vue'

const tab = ref(null)

changeTab('OneAnswerQuestions')
function changeTab (compName) {
  const lookup = {
    OneAnswerQuestions,
    TwoAnswerQuestions,
    WrittenAnswerQuestions
  }
  tab.value = markRaw(lookup[compName])
}

</script>

<style>
.active {
  @apply bg-blue-800 text-white
}
</style>