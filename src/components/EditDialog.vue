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
          <h3 class="mb-4 text-xl font-medium text-gray-900">Edit Student Details</h3>
          <Form class="space-y-6" @submit="editStudentData" ref="formEditRef">
            <BaseInput
                label="Full name"
                type="text"
                name="name"
                placeholder="Oybek"
                rules="required"
                @onClear="(val) => clearField(val)"
                v-model="studentData.name"
            ></BaseInput>
            <BaseSelect
                label="Select course"
                name="course"
                placeholder="Select course"
                rules="required"
                :options="courseOptions"
                v-model="studentData.course"
                @onClear="(val) => clearField(val)"
            ></BaseSelect>
            <BaseInput
                label="Phone number"
                type="tel"
                name="phone"
                placeholder="+ 998 (XX) XXX-XX-XX"
                rules="required"
                v-model="studentData.phone"
                v-mask="'+ 998(9#)###-##-##'"
                @onClear="(val) => clearField(val)"
            ></BaseInput>
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
import BaseSelect from './ui/BaseSelect.vue'
import { Form } from "vee-validate";
import { useStudentStore } from '../stores/StudentStore.js'
import useNotification from "../hooks/notification.js";
import {ref, reactive} from "vue"
const dialog = ref(false)

const STUDENTDATA = {
  id: null,
  name: null,
  course: null,
  phone: null
}
const studentStore = useStudentStore()
const { setSuccess } = useNotification()
const studentData = ref({...STUDENTDATA})
const courseOptions = reactive([
  {name: 1, value: 1},
  {name: 2, value: 2},
  {name: 3, value: 3},
  {name: 4, value: 4},
])

function editStudentData() {
  studentStore.editStudent({...studentData.value})
  setSuccess({title: "Student Data Successfully Edited!"})
  close()
}
function open(studentDetails) {
  dialog.value = true;
  studentData.value = studentDetails
}
function close() {
  dialog.value = false;
}

defineExpose({open})
</script>