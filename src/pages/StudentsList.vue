<template>
  <div class="container mx-auto px-4">
    <StudentAdd></StudentAdd>
    <div class="students-list">
      <div class="v-table-wrapper">
        <table class="v-table">
          <thead class="v-table__header">
          <tr>
            <th
                v-for="(header, index) in headers"
                :key="`header${index}`"
                ref="tableHeader"
                class="v-table__header-th"
            >
              <span>{{ header.text }}</span>
              <span v-if="header.value === 'index'">
                <input @change="selectAllUsers" v-model="isAllStudentsSelected" type="checkbox"
                       class="w-4 h-4 cursor-pointer text-blue-600 rounded">
              </span>
              <span v-if="header.value === 'name'">
            <svg v-if="isDescSortByName" @click="sortNames"
                 class="w-4 h-4 rounded-full inline ml-2 cursor-pointer hover:bg-blue-400 hover:text-white" fill="none"
                 stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
            </svg>
            <svg v-else @click="sortNames"
                 class="w-4 h-4 rounded-full inline ml-2 cursor-pointer hover:bg-blue-400 hover:text-white" fill="none"
                 stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </span>
              <span v-if="header.value === 'course'">

            <svg v-if="isDescSortByCourse" @click="sortCourses"
                 class="w-4 h-4 rounded-full inline ml-2 cursor-pointer hover:bg-blue-400 hover:text-white" fill="none"
                 stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
            </svg>
            <svg v-else @click="sortCourses"
                 class="w-4 h-4 rounded-full inline ml-2 cursor-pointer hover:bg-blue-400 hover:text-white" fill="none"
                 stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </span>
            </th>
          </tr>
          </thead>
          <tbody class="v-table__body" v-if="students && students.length < 1">
          <tr>
            <td class="v-table__body-td text-center" :colspan="headers.length">No Users</td>
          </tr>
          </tbody>
          <tbody class="v-table__body">
          <tr v-for="(item, itemIndex) in students" :key="`bodyItem${itemIndex}`">
            <td
                v-for="header in headers"
                :key="`rowItem-${itemIndex}-${header.value}`"
                :class="header.className"
                class="v-table__body-td"
            >
          <span v-if="header.value === 'index'">
            <input type="checkbox" @change="selectStudent" v-model="selectedStudents" :value="item.id"
                   class="w-4 h-4 cursor-pointer text-blue-600 rounded ">
          </span>
              <span v-else>{{ item[header.value] }}</span>
              <button v-if="header.value === 'name'" @click="openEditDialog(item)">
                <svg x="0px" y="0px" fill="#0D1066"
                     width="20px" height="20px" viewBox="0 0 494.936 494.936" style="enable-background:new 0 0 494.936 494.936;"
                     xml:space="preserve">
	<g>
		<path d="M389.844,182.85c-6.743,0-12.21,5.467-12.21,12.21v222.968c0,23.562-19.174,42.735-42.736,42.735H67.157
			c-23.562,0-42.736-19.174-42.736-42.735V150.285c0-23.562,19.174-42.735,42.736-42.735h267.741c6.743,0,12.21-5.467,12.21-12.21
			s-5.467-12.21-12.21-12.21H67.157C30.126,83.13,0,113.255,0,150.285v267.743c0,37.029,30.126,67.155,67.157,67.155h267.741
			c37.03,0,67.156-30.126,67.156-67.155V195.061C402.054,188.318,396.587,182.85,389.844,182.85z"/>
    <path d="M483.876,20.791c-14.72-14.72-38.669-14.714-53.377,0L221.352,229.944c-0.28,0.28-3.434,3.559-4.251,5.396l-28.963,65.069
			c-2.057,4.619-1.056,10.027,2.521,13.6c2.337,2.336,5.461,3.576,8.639,3.576c1.675,0,3.362-0.346,4.96-1.057l65.07-28.963
			c1.83-0.815,5.114-3.97,5.396-4.25L483.876,74.169c7.131-7.131,11.06-16.61,11.06-26.692
			C494.936,37.396,491.007,27.915,483.876,20.791z M466.61,56.897L257.457,266.05c-0.035,0.036-0.055,0.078-0.089,0.107
			l-33.989,15.131L238.51,247.3c0.03-0.036,0.071-0.055,0.107-0.09L447.765,38.058c5.038-5.039,13.819-5.033,18.846,0.005
			c2.518,2.51,3.905,5.855,3.905,9.414C470.516,51.036,469.127,54.38,466.61,56.897z"/>
	</g>
</svg>
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="flex sm:flex-row flex-col justify-between sm:items-end items-center">
      <button @click="deleteStudent" :disabled="!selectedStudents.length"
              :class="{ 'opacity-25 cursor-not-allowed': !selectedStudents.length }"
              class="flex-no-shrink p-2 border-2 rounded text-red-600 border-red-600 hover:text-white hover:bg-red-600">
        Delete
      </button>
    </div>
    <EditDialog ref="editDialogRef"></EditDialog>
  </div>
</template>

<script setup>
import StudentAdd from '../components/StudentAdd.vue'
import EditDialog from '../components/EditDialog.vue'
import '../assets/scss/table.scss'
import useNotification from "../hooks/notification.js";
import {computed, onMounted, ref} from "vue";
import {useStudentStore} from '../stores/StudentStore.js'
import {useRoute, useRouter} from 'vue-router'

const studentStore = useStudentStore()
const { setSuccess } = useNotification()
const route = useRoute()
const router = useRouter()

const headers = computed(() => {
      return [
        {text: "", value: "index"},
        {text: "Name", value: "name", className: "flex items-center justify-between"},
        {text: "Course", value: "course"},
        {text: 'Phone', value: "phone"},
        {text: 'Passport', value: "passport"},
        {text: 'PINFL', value: "pinfl"},
        {text: 'Birthday', value: "birthday"},
      ]
    },
)

const students = computed(() => studentStore.getUsersList)

const isDescSortByName = ref(false)
const isDescSortByCourse = ref(false)
const selectedStudents = ref([])
const isAllStudentsSelected = ref(false)
const editDialogRef = ref()

const clearCheckbox = () => {
  selectedStudents.value = []
  isAllStudentsSelected.value = false
}

function openEditDialog(studentData) {
  editDialogRef.value.open({...studentData})
}

function selectStudent() {
  if (selectedStudents.value.length === students.value.length) {
    isAllStudentsSelected.value = true
  } else {
    isAllStudentsSelected.value = false
  }
}

function selectAllUsers() {
  if (isAllStudentsSelected.value) {
    selectedStudents.value = students.value.map(user => user.id);
  } else {
    selectedStudents.value = []
  }
}

function deleteStudent() {
  studentStore.deleteStudent(selectedStudents.value)
  clearCheckbox()
  setSuccess({title: "Student Successfully Deleted!"})
}

function sortCourses() {
  if(isDescSortByCourse.value) {
    students.value.sort((a, b) => b.course - a.course);
  } else {
    students.value.sort((a, b) => a.course - b.course);
  }
  router.replace({query: {sortByCourse: isDescSortByCourse.value ? "desc" : "asc"}});
  isDescSortByCourse.value = !isDescSortByCourse.value
}

function sortNames() {
  if(isDescSortByName.value) {
    students.value.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 1);
  } else {
    students.value.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
  }

  router.replace({query: {sortByName: isDescSortByName.value ? "desc" : "asc"}});
  isDescSortByName.value = !isDescSortByName.value
}

onMounted(() => {
  studentStore.getStudentsFromLocalStorage()

  const {sortByName, sortByCourse} = route.query;
  if (sortByName) {
    sortNames()
  }
  if(sortByCourse) sortCourses()
})

</script>

<style>
.overlay {
  background: rgb(33,33,33);
  opacity: .47;
  height: 100%;
}
</style>



