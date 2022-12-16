<template>
  <Teleport to="body" v-if="dialog">
    <div class="overlay w-full fixed top-0 left-0"></div>
  </Teleport>
  <transition name="fade">
    <div v-if="dialog" class="flex items-center justify-center fixed top-0 left-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
      <div class="relative w-full h-full max-w-md md:h-auto">
        <div class="relative bg-white rounded-lg shadow">
          <button @click="close" type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            <span class="sr-only">Close modal</span>
          </button>
          <div class="px-6 py-6 lg:px-8">
            <h3 class="mb-4 text-xl font-medium text-gray-900">Edit Question</h3>
            <Form class="space-y-6" @submit="editQuestion" ref="formEditRef">
              <BaseTextArea
                  label="Question"
                  type="textarea"
                  name="name"
                  placeholder="Write a question"
                  rules="required"
                  @onClear="(val) => clearField(val)"
                  v-model="questionData.name"
              ></BaseTextArea>
              <div v-if="questionData.type === 'one-answer'">
                <div class="input wrapper flex items-center" v-for="(input,index) in questionData.answers"
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
                      @click="addField(input, questionData.answers)"
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
                      @click="removeField(index, questionData.answers)"
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
                <div class="options flex items-center mb-4" v-for="(item,index) in questionData.answers"
                     :key="index">
                  <input v-model="questionData.correctAnswer" v-if="questionData.answers.length > 1 && questionData.answers[index].option" :id="`radio-${index}`" type="radio" :value="item.option" name="radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300">
                  <label v-if="questionData.answers.length > 1 && questionData.answers[index].option" :for="`radio-${index}`" class="ml-2 text-sm font-medium text-gray-900 ">{{
                      questionData.answers[index].option
                    }}</label>
                </div>
              </div>
              <div v-if="questionData.type === 'two-answer'">
                <h1 class="text-red-700 mb-2">You should uncheck the correct answer before editing the field which you want change</h1>
                <div class="input wrapper flex items-center" v-for="(input,index) in questionData.answers"
                     :key="index">
                  <BaseInput
                      :disabled="questionData.correctAnswer.includes(input.option)"
                      :label="`Option ${index+1}`"
                      type="text"
                      :name="`answers${index}`"
                      :placeholder="`Write Option ${index+1}`"
                      rules="required"
                      @onClear="(val) => clearField(val)"
                      v-model="input.option"
                  ></BaseInput>
                  <svg
                      @click="addField(input, questionData.answers)"
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
                      @click="removeField(index, questionData.answers)"
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
                <div class="options flex items-center mb-4" v-for="(item,index) in questionData.answers"
                     :key="index">
                  <input v-model="questionData.correctAnswer" v-if="questionData.answers.length > 1 && questionData.answers[index].option" :id="`checkbox-${index}`" type="checkbox" :value="item.option" name="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300">
                  <label v-if="questionData.answers.length > 1 && questionData.answers[index].option" :for="`checkbox-${index}`" class="ml-2 text-sm font-medium text-gray-900 ">{{
                      questionData.answers[index].option
                    }}</label>
                </div>
              </div>
              <div v-if="questionData.type === 'written-answer'">
                <div class="options">
                  <BaseInput
                      label="Answer"
                      type="text"
                      name="correctAnswer"
                      placeholder="Write an answer"
                      rules="required"
                      @onClear="(val) => clearField(val)"
                      v-model="questionData.correctAnswer"
                  ></BaseInput>
                </div>
              </div>
              <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Edit</button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import BaseInput from './ui/BaseInput.vue'
import BaseTextArea from './ui/BaseTextArea.vue'
import { Form } from "vee-validate";
import {useQuizStore} from '../stores/QuizStore.js'
import useNotification from "../hooks/notification.js";
import {ref} from "vue"
const dialog = ref(false)

const QUESTION = {
  id: null,
  name: null,
  answers: [{option: null}],
  correctAnswer: []
}
const quizStore = useQuizStore()
const { setSuccess } = useNotification()
const questionData = ref({...QUESTION})
const disabled = ref(false)

function editQuestion() {
  quizStore.editQuestion({...questionData.value})
  setSuccess({title: "Question Successfully Edited!"})
  close()
}

function addField(value, fieldType) {
  fieldType.push({ option: "" });
}
function removeField(index, fieldType) {
  fieldType.splice(index, 1);
}
function open({...question}) {
  dialog.value = true;
  questionData.value = question
}
function close() {
  dialog.value = false;
}
function clearField(val) {
  if ((val.includes('answers'))) {
    let index = val.slice(7)
    questionData.value.answers[+index].option = null
  }
  else {
    questionData.value[val] = null
  }
}
defineExpose({open})
</script>