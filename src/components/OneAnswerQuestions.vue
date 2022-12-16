<template>
  <section class="quiz">
    <h1 class="text-center text-black font-bold text-2xl mb-5">One answer question</h1>
    <Form @submit="addQuiz" ref="formRef">
      <div class="flex sm:flex-col sm:items-center items-center justify-center sm:gap-6 gap-4 sm:mb-6">
        <div class=" sm:flex-row flex-col sm:items-end items-center justify-center sm:gap-6 gap-3">
          <BaseTextArea
              label="Question"
              type="textarea"
              name="name"
              placeholder="Write a question"
              rules="required"
              v-model="question.name"
          ></BaseTextArea>
          <div class="input wrapper flex items-center" v-for="(input,index) in question.answers"
               :key="index">
          <BaseInput
              :label="`Option ${index+1}`"
              type="text"
              :name="`answers${index}`"
              :placeholder="`Write Option ${index+1}`"
              rules="required"
              @onClear="(val) => clearField(val)"
              v-model="input.option"
          ></BaseInput>
          <svg
              @click="addField(input, question.answers)"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              class="ml-2 cursor-pointer"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
                fill="green"
                d="M11 11V7h2v4h4v2h-4v4h-2v-4H7v-2h4zm1 11C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"
            />
          </svg>
          <svg
              v-if="index > 0"
              @click="removeField(index, question.answers)"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              class="ml-2 cursor-pointer"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
                fill="#EC4899"
                d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9.414l2.828-2.829 1.415 1.415L13.414 12l2.829 2.828-1.415 1.415L12 13.414l-2.828 2.829-1.415-1.415L10.586 12 7.757 9.172l1.415-1.415L12 10.586z"
            />
          </svg>
          </div>

          <div class="flex items-center mb-4" v-for="(item,index) in question.answers"
               :key="index">
              <input v-model="question.correctAnswer" v-if="question.answers.length > 1 && question.answers[index].option" :id="`radio-${index}`" type="radio" :value="item.option" name="radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300">
              <label v-if="question.answers.length > 1 && question.answers[index].option" :for="`radio-${index}`" class="ml-2 text-sm font-medium text-gray-900 ">{{
                question.answers[index].option
              }}</label>
          </div>
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
  answers: [{option: null}],
  correctAnswer: null
}

const formRef = ref()

const quizStore = useQuizStore()
const { setSuccess } = useNotification()

const question = ref({...QUIZ})

function addQuiz() {
  let uuid = uuidv4();
  quizStore.addQuiz({...question.value, id: uuid, type: 'one-answer'})
  question.value = {...QUIZ}
  question.value.answers = [{option: null}]
  formRef.value.resetForm({
    values: {
      id: null,
      name: null,
      answers: [{option: ''}],
      correctAnswer: null
    }
  })
  setSuccess({title: "Quiz Successfully Added!"})
}
function clearField(val) {
  if ((val.includes('answers'))) {
    let index = val.slice(7)
    question.value.answers[+index].option = null
  }
  else {
    question.value[val] = null
  }
}
function addField(value, fieldType) {
  fieldType.push({ option: "" });
}
function removeField(index, fieldType) {
  fieldType.splice(index, 1);
}

quizStore.getQuizzesFromLocalStorage()
</script>