// src/stores/AuthStore.js (Pinia)
import { defineStore } from 'pinia'
import axios from "axios";

let timer;
export const useAuthStore = defineStore('AuthStore', {
    state: () => {
        return {
            token: null,
            didAutoLogout: false,
        }
    },
    getters: {
        isAuthenticated() {
            return !!this.token;
        },
        didAutoLogoutUser() {
            return this.didAutoLogout;
        },
    },
    actions: {
        async login(payload) {
            return this.auth({...payload, mode: 'login',})
        },
        async signup(payload) {
            return this.auth({...payload, mode: 'signup',})
        },
        setUser({ idToken, email, expiresIn, localId }) {
            // const expiresIn = 5000;
            this.token = idToken
            const expirationDate = new Date().getTime() + expiresIn * 10000;
            localStorage.setItem('token', idToken);
            localStorage.setItem('email', email);
            localStorage.setItem('userId', localId);
            localStorage.setItem('tokenExpiration', expirationDate);
            const authStore = useAuthStore()
            timer = setTimeout(function () {
                authStore.autoLogout()
            }, expiresIn * 10000);
        },
        async auth(payload) {
            const mode = payload.mode;
            let key = 'AIzaSyAYLyMDnyOrcCDNocL7IO6u2S3VkxllG_w'
            let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`;
            if (mode === 'signup') {
                url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`;
            }
            const params = {
                email: payload.email,
                password: payload.password,
                returnSecureToken: true,
            }
                return new Promise((resolve, reject) => {
                    axios
                        .post(url, params)
                        .then(({ data: { idToken, email, expiresIn, localId } }) => {
                            mode === 'login' ? this.setUser({ idToken, email, expiresIn, localId }) : ''
                            resolve(({ idToken, email, expiresIn, localId }));
                        })
                        .catch(reject);
                });
        },
        autoLogin(context) {
            const token = localStorage.getItem('token');
            const email = localStorage.getItem('email');
            const tokenExpiration = localStorage.getItem('tokenExpiration');

            const expiresIn = +tokenExpiration - new Date().getTime();

            if (expiresIn < 0) return;

            const authStore = useAuthStore()
            timer = setTimeout(function () {
                authStore.autoLogout()
            }, expiresIn);

            if (token) {
                this.token = token
            }
        },
        logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('email');
            localStorage.removeItem('userId');
            localStorage.removeItem('tokenExpiration');
            clearTimeout(timer);

            this.token = null
        },
        autoLogout() {
            this.logout();
            this.didAutoLogout = true
        },
    },
})