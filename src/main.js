import { createApp } from 'vue'
import { createPinia } from "pinia"
import "./assets/scss/index.scss"
import './plugins/VeeValidate'
import router from './router'
import App from './App.vue'
import VueTheMask from 'vue-the-mask'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const options = {
    transition: "Vue-Toastification__fade",
    newestOnTop: false,
    position: "top-right",
    timeout: 3000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 1.42,
    showCloseButtonOnHover: true,
    hideProgressBar: true,
    closeButton: "button",
    icon: true,
    rtl: false
};

const myApp = createApp(App).use(router).use(VueTheMask).use(createPinia()).use(Toast, options)
myApp.mount('#app')
