import { createRouter, createWebHistory } from 'vue-router'

import MainLayout from '../layout/MainLayout.vue'
import AuthorizationLayout from '../layout/AuthorizationLayout.vue'
import StudentsList from '../pages/StudentsList.vue'
import CreateQuiz from '../pages/CreateQuiz.vue'
import TakeQuiz from '../pages/TakeQuiz.vue'
import DeleteEditQuestion from '../pages/DeleteEditQuestion.vue'
import UserAuth from "../pages/auth/UserAuth.vue";
import { useAuthStore } from '../stores/AuthStore.js'

const routes = [
    {
        path: "/auth",
        component: AuthorizationLayout,
        children: [
            {
                path: "",
                name: "auth",
                component: UserAuth,
            },
        ],
    },
        {
            path: "/",
            component: MainLayout,
            children: [
                {
                    path: "/students-list",
                    name: "students-list",
                    component: StudentsList,
                    meta: { requiresAuth: true }
                },
                {
                    path: "/create-quiz",
                    name: "create-quiz",
                    component: CreateQuiz,
                    meta: { requiresAuth: true }
                },
                {
                    path: "/take-quiz",
                    name: "take-quiz",
                    component: TakeQuiz,
                    meta: { requiresAuth: true }
                },
                {
                    path: "/delete-edit-quiz",
                    name: "delete-edit-quiz",
                    component: DeleteEditQuestion,
                    meta: { requiresAuth: true }
                },
            ]
        },
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, _, next) => {
    const authStore = useAuthStore()
    if(to.meta.requiresAuth && !authStore.isAuthenticated) {
        next('/auth')
    } else {
        next();
    }
})

export default router