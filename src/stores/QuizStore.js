import { defineStore } from 'pinia'

export const useQuizStore = defineStore('QuizStore', {
    state: () => {
        return {
            quizList: []
        }
    },
    getters: {
        getQuizList() {
            return this.quizList
        },
    },
    actions: {
        addQuiz(payload) {
            this.quizList.unshift(payload)
            localStorage.setItem('quiz-list', JSON.stringify(this.quizList));
        },
        getQuizzesFromLocalStorage() {
            if (localStorage.getItem('quiz-list')) {
                let quizList = JSON.parse(localStorage.getItem('quiz-list'));
                this.quizList = quizList
            }
        },
        deleteQuestion(payload) {
            this.getQuizzesFromLocalStorage()
            const deletedQuestionIndex = this.quizList.findIndex(q => q.id === payload.id);
            this.quizList.splice(deletedQuestionIndex, 1);
            localStorage.setItem('quiz-list', JSON.stringify(this.quizList));
        },
        editQuestion(payload) {
            this.getQuizzesFromLocalStorage()
            const editedQuestionIndex = this.quizList.findIndex(q => q.id === payload.id);
            this.quizList[editedQuestionIndex].name = payload.name
            this.quizList[editedQuestionIndex].correctAnswer = payload.correctAnswer
            this.quizList[editedQuestionIndex].answers = payload.answers
            localStorage.setItem('quiz-list', JSON.stringify(this.quizList));
        }
    },
})