<template>
  <section class="quiz">
    <h1 class="text-center text-black font-bold text-2xl mb-5">Written answer question</h1>
    <Form @submit="addQuiz" ref="formRef">
      <div class="flex sm:flex-col sm:items-center items-center justify-center sm:gap-6 gap-4 sm:mb-6">
        <div class=" sm:flex-row flex-col sm:items-end items-center justify-center sm:gap-6 gap-3">
          <BaseTextArea
              label="Question"
              type="textarea"
              name="name"
              placeholder="Write a question"
              rules="required"
              @onClear="(val) => clearField(val)"
              v-model="question.name"
          ></BaseTextArea>
          <BaseInput
              label="Answer"
              type="text"
              name="correctAnswer"
              placeholder="Write an answer"
              rules="required"
              @onClear="(val) => clearField(val)"
              v-model="question.correctAnswer"
          ></BaseInput>
        </div>
        <button type="submit" class="flex-no-shrink p-2 border-2 rounded text-teal-500 border-teal-400 hover:text-white hover:bg-teal-400 sm:mb-3">Add</button>
      </div>
    </Form>
  </section>
</template>

<script setup>
import {reactive, ref} from "vue";
import BaseInput from './ui/BaseInput.vue'
import BaseTextArea from './ui/BaseTextArea.vue'
import { Form } from "vee-validate";
import {useQuizStore} from '../stores/QuizStore.js'
import {v4 as uuidv4} from 'uuid';
import useNotification from "../hooks/notification.js";

const QUIZ = {
  name: null,
  correctAnswer: null,
  yourAnswer: null
}

const formRef = ref()

const quizStore = useQuizStore()
const { setSuccess } = useNotification()

const question = ref({...QUIZ})

function addQuiz(val) {
  let uuid = uuidv4();
  quizStore.addQuiz({...question.value, id: uuid, type: 'written-answer'})
  question.value = {...QUIZ}
  formRef.value.resetForm({
    values: {
      id: null,
      name: null,
      correctAnswer: null,
      yourAnswer: null
    }
  })
  setSuccess({title: "Quiz Successfully Added!"})
}

function clearField(val) {
  question.value[val] = null
}
quizStore.getQuizzesFromLocalStorage()
</script>