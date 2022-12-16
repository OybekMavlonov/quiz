<template>
  <section class="auth-main">
    <div class="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div class="w-full p-6 m-auto bg-white border-t border-purple-600 rounded shadow-lg shadow-purple-800/50 lg:max-w-md">
        <Form class="mt-6" @submit="onSubmit">
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-800">Email</label>
            <Field
                name="email"
                v-slot="{ errors, field }"
                rules="required|email"
            >
              <div class="relative w-full">
                <input
                    type="email"
                    placeholder="Email"
                    v-model="userData.email"
                    v-bind="field"
                    class="block px-4 py-2 mt-2 bg-white border pl-3 border-grey-700 text-purple-700 text-sm rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40 w-full pr-10 p-2.5"
                />
                <div
                    class="flex absolute inset-y-0 right-0 items-center pr-3 cursor-pointer"
                    @click="clearField(name)"
                >
                </div>
              </div>
              <div class="h-3">
                <transition name="fade">
                  <span v-if="errors[0]" class="text-red-500 block text-sm">{{errors[0] }}</span>
                </transition>
              </div>
            </Field>
          </div>
          <div class="mt-4">
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-800">Password</label>
              <Field
                  name="name"
                  v-slot="{ errors, field }"
                  rules="required|pwdlen"
              >
                <div class="relative w-full">
                  <input
                      :type="show ? 'password' : 'text'"
                      placeholder="Password"
                      v-model="userData.pwd"
                      v-bind="field"
                      class="bg-white border pl-3 border-grey-700 text-purple-700 text-sm rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40 block w-full px-4 py-2 mt-2 pr-10 p-2.5"
                  />
                  <div class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                    <svg class="w-6 h-6 cursor-pointer" @click="showPassword"  :class="{'hidden': !show, 'block':show }" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21">
                      </path>
                    </svg>
                    <svg class="w-6 h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                         @click="showPassword" :class="{'hidden': show, 'block':!show }">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z">
                      </path>
                    </svg>
                  </div>

                </div>
                <div class="h-3">
                  <transition name="fade">
                    <span v-if="errors[0]" class="text-red-500 block text-sm">{{errors[0] }}</span>
                  </transition>
                </div>
              </Field>
            </div>
            <div class="flex mt-6">
              <button mode="login"
                  class="w-full px-4 py-2 mr-2 tracking-wide capitalize text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                {{ submitButtonCaption }}
              </button>
              <button type="reset" mode="signup" @click="switchAuthMode"
                      class="w-full px-4 py-2 tracking-wide capitalize text-purple-600 transition-colors duration-200 transform bg-white border-purple-600 rounded-md hover:bg-purple-400 hover:text-white">
                {{ switchModeButtonCaption }}
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '../../stores/AuthStore.js'
import { useRouter } from "vue-router";
import useNotification from "../../hooks/notification.js";
import { Form, Field } from 'vee-validate';

const USERDATA = {
  email: null,
  pwd: null,
}

const userData = ref({...USERDATA})
function clearField(val) {
  userData.value[val] = null
}

const show = ref(false)

const authStore = useAuthStore()
const router = useRouter()
const { setResponseError, setSuccess } = useNotification()

const onSubmit = async (values, actions) => {
  try {
    const actionPayload = {
      email: userData.value.email,
      password: userData.value.pwd,
      returnSecureToken: true,
    };

    if (mode.value === 'signup') {
      await authStore.signup(actionPayload)
      mode.value = 'login'
      setSuccess({title: 'Successfully signed up. Please log in '})
    } else {
      await authStore.login(actionPayload)
      await router.replace('/students-list')
      setSuccess({title: 'Successfully logged in. '})
    }
  } catch (err) {
    setResponseError({error: err})
  }
  actions.resetForm();
}

const mode = ref('login')

const submitButtonCaption = computed(() => {
  return mode.value === 'login' ? 'Login' :  'Signup'
})

const switchModeButtonCaption = computed(() => {
  return mode.value === 'login' ? 'Signup instead' :  'Login instead'
})

function switchAuthMode() {
  mode.value === 'login' ? mode.value = 'signup' : mode.value = 'login'
}

function showPassword() {
  show.value = !show.value
}

</script>