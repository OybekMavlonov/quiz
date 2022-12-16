<template>
  <div class="wrapper flex flex-col items-center justify-center">
    <form ref="formRef" @submit.prevent="check">
    <div class=" mb-4" v-for="(quiz, quizIndex) in allquizzes" :key="quiz.id">
  <div v-if="quiz.type === 'one-answer'">
    <h1 class="question font-bold text-lg mb-3">{{quizIndex + 1}}: {{quiz.name}}</h1>
      <div class="flex items-center mb-4" v-for="(answer, index) in quiz.answers"
           :key="index">
        <input @input="takeType1Answers(answer.option, quiz.id)" :id="`radio-${index}`" type="radio" :value="answer.option" :name="`radio-${quizIndex}`" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300">
        <label :id="`radio-${index}`" class="ml-2 text-sm font-medium text-gray-900">{{
             answer.option
          }}</label>
      </div>
  </div>
  <div v-if="quiz.type === 'two-answer'">
    <h1 class="question font-bold text-lg mb-3">{{quizIndex + 1}}: {{quiz.name}}</h1>
    <div class="flex items-center mb-4" v-for="(answer, index) in quiz.answers"
         :key="index">
      <input @input="(val) => takeType2Answers(answer.option, quiz.id, val)" :id="`checkbox-${index}`" type="checkbox" :value="answer.option" name="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300">
      <label :for="`checkbox-${index}`" class="ml-2 text-sm font-medium text-gray-900 ">{{
          answer.option
        }}</label>
    </div>
  </div>
  <div v-if="quiz.type === 'written-answer'">
    <h1 class="question font-bold text-lg mb-3">{{quizIndex + 1}}: {{quiz.name}}</h1>
    <div class="options">
      <BaseInput
          label="Answer"
          type="text"
          name="question"
          placeholder="Write an answer"
          v-model="quiz.yourAnswer"
          @onClear="() => clearField(quiz)"
          @input="(val) => takeWrittenAnswers(val.target.value, quiz.id)"
      ></BaseInput>
    </div>
  </div>
</div>
    <button type="submit" class="bg-emerald-800 text-white p-2 border-2 rounded">Check</button>
    </form>
    <div v-if="isShowResult" class="bg-white mt-5 p-3 rounded font-bold">Your result: {{foundAnswers}}/{{allquizzes.length}}</div>
  </div>
</template>

<script setup>
import {computed, ref} from 'vue'
import {useQuizStore} from '../stores/QuizStore.js'
import BaseInput from '../components/ui/BaseInput.vue'

const quizStore = useQuizStore()
quizStore.getQuizzesFromLocalStorage()
const allquizzes = computed(() => quizStore.getQuizList)

const formRef = ref()

const foundAnswers = ref()
const isShowResult = ref(false)

const type1Answers = ref({})
const type2Answers = ref({})
const writtenAnswers = ref({})

function clearField(quiz) {
  quiz.yourAnswer = null
  writtenAnswers.value[quiz.id] = null
}

function takeType1Answers(selectedAnswer, id) {
  type1Answers.value[id] = selectedAnswer
}
function takeType2Answers(selectedAnswer, id, val) {
  if(!type2Answers.value[id]?.length) {
    type2Answers.value[id] = []
  }
  if(val.target.checked){
    type2Answers.value[id].push(selectedAnswer)
  } else {
    let index = type2Answers.value[id].indexOf(selectedAnswer)
    type2Answers.value[id].splice(index,1)
  }
}
function takeWrittenAnswers(val, id) {
  writtenAnswers.value[id] = val
}

const check = () => {
  let correct = 0
  let incorrect = 0
  allquizzes.value.forEach(quiz => {
    if(type1Answers.value[quiz.id] && quiz.type === 'one-answer') {
      if(type1Answers.value[quiz.id] === quiz.correctAnswer) {
        correct++
      } else {
        incorrect++
      }
    }
    if(type2Answers.value[quiz.id] && quiz.type === 'two-answer') {
      if(quiz.correctAnswer.length === type2Answers.value[quiz.id]?.length){
        const containsAll = quiz.correctAnswer.every(element => {
          return type2Answers.value[quiz.id].includes(element);
        });
        containsAll === true ? correct++ : incorrect++
      } else {
        incorrect++
      }
    }
    if(writtenAnswers.value[quiz.id] && quiz.type === 'written-answer') {
      if(writtenAnswers.value[quiz.id] === quiz.correctAnswer) {
        correct++
      } else {
        incorrect++
      }
    }
  })
  foundAnswers.value = correct
  isShowResult.value = true
  formRef.value.reset()
  type1Answers.value = {}
  type2Answers.value = {}
  writtenAnswers.value = {}
}
</script>