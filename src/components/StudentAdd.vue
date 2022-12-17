<template>
  <section class="user-addition">
    <Form @submit="addStudent" ref="formRef">
      <div class="flex flex-col items-center justify-center sm:gap-6 gap-4 sm:mb-6">
        <div class="flex sm:flex-row flex-col sm:items-end items-center justify-center sm:gap-6 gap-3">
          <BaseInput
              label="Full name"
              type="text"
              name="name"
              placeholder="Name"
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
              v-mask="'+998(9#)###-##-##'"
              @onClear="(val) => clearField(val)"
          ></BaseInput>
        </div>
        <div class="flex sm:flex-row flex-col sm:items-end items-center justify-center gap-3">
          <BaseInput
              label="Passport"
              type="text"
              name="passport"
              rules="required"
              @onClear="(val) => clearField(val)"
              v-model="studentData.passport"
          ></BaseInput>
          <BaseInput
              label="PINFL"
              type="text"
              name="pinfl"
              rules="required"
              v-model="studentData.pinfl"
              @onClear="(val) => clearField(val)"
          ></BaseInput>
          <BaseInput
              label="Birthday"
              type="date"
              name="birthday"
              rules="required"
              v-model="studentData.birthday"
              @onClear="(val) => clearField(val)"
          ></BaseInput>
        </div>
        <button type="submit" class="flex-no-shrink p-2 border-2 rounded text-teal-500 border-teal-400 hover:text-white hover:bg-teal-400 sm:mb-6">Add</button>
      </div>
    </Form>
  </section>
</template>

<script setup>
import {reactive, ref} from "vue";
import BaseInput from './ui/BaseInput.vue'
import BaseSelect from './ui/BaseSelect.vue'
import { Form } from "vee-validate";
import { useStudentStore } from '../stores/StudentStore.js'
import {v4 as uuidv4} from 'uuid';
import useNotification from "../hooks/notification.js";

const { setSuccess } = useNotification()
const studentStore = useStudentStore()
const formRef = ref()

function addStudent() {
  let uuid = uuidv4();
  studentStore.addStudent({...studentData.value, id: uuid})
  studentData.value = {...STUDENTDATA}
  formRef.value.resetForm({
    values: {
      id: null,
      name: null,
      course: null,
      phone: null,
      passport: null,
      pinfl: null,
      birthday: null
    }
  })
  setSuccess({title: "Student Successfully Added!"})
}

function clearField(val) {
  studentData.value[val] = null
}

const STUDENTDATA = {
  name: null,
  course: null,
  phone: null,
  passport: null,
  pinfl: null,
  birthday: null
}
const studentData = ref({...STUDENTDATA})

const courseOptions = reactive([
  {name: 1, value: 1},
  {name: 2, value: 2},
  {name: 3, value: 3},
  {name: 4, value: 4},
])
</script>
