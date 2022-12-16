import { defineStore } from 'pinia'

export const useStudentStore = defineStore('StudentStore', {
    state: () => {
        return {
            studentsList: []
        }
    },
    getters: {
        getUsersList() {
            return this.studentsList
        },
    },
    actions: {
        addStudent(payload) {
            this.studentsList.unshift(payload)
            localStorage.setItem('students-list', JSON.stringify(this.studentsList));
        },
        getStudentsFromLocalStorage(state) {
            if (localStorage.getItem('students-list')) {
                let studentsList = JSON.parse(localStorage.getItem('students-list'));
                this.studentsList = studentsList
            }
        },
        deleteStudent(payload) {
            for(let i = 0; i < payload.length; i++){
                const deletedStudentIndex = this.studentsList.findIndex(user => user.id === payload[i]);
                this.studentsList.splice(deletedStudentIndex, 1);
            }
            localStorage.setItem('students-list', JSON.stringify(this.studentsList));
        },
        editStudent(payload) {
            const editedStudentIndex = this.studentsList.findIndex(user => user.id === payload.id);
            this.studentsList[editedStudentIndex].name = payload.name
            this.studentsList[editedStudentIndex].course = payload.course
            this.studentsList[editedStudentIndex].phone = payload.phone
            this.studentsList[editedStudentIndex].passport = payload.passport
            this.studentsList[editedStudentIndex].pinfl = payload.pinfl
            this.studentsList[editedStudentIndex].birthday = payload.birthday
            localStorage.setItem('students-list', JSON.stringify(this.studentsList));
        }
    },
})