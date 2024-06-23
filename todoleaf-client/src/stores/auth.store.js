import { defineStore } from 'pinia';
import { useCookies } from 'vue3-cookies';
import { axiosWrapper } from '../helpers/axios-wrapper.js';
import { router } from '../router/router.js';

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        jwt: null,
        refreshTokenTimeout: null
    }),
    actions: {
        async login(email, password) {
            const response = await axiosWrapper.post(`/login`, { email, password }, { credentials: 'include' });
            this.jwt = response.token;
            const { cookies } = useCookies();
            cookies.set('jwt', this.jwt, { expires: '1d', secure: true, sameSite: 'Lax' });
            this.startRefreshTokenTimer();
        },
        logout() {
            const { cookies } = useCookies();
            cookies.remove('jwt');
            this.jwt = null;
            this.stopRefreshTokenTimer();
            router.push('/login');
        },
        async refreshToken() {
            const response = await axiosWrapper.post(`/refresh-token`, {}, { credentials: 'include' });
            console.log(response.data)
            this.jwt = response.token;
            this.startRefreshTokenTimer();
        },
        startRefreshTokenTimer() {
            if (!this.jwt) return;
            const jwtBase64 = this.jwt.split('.')[1];
            const jwtToken = JSON.parse(atob(jwtBase64));
            const expires = new Date(jwtToken.exp * 1000);
            const timeout = expires.getTime() - Date.now() - (60 * 1000);
            this.refreshTokenTimeout = setTimeout(this.refreshToken, timeout);
        },
        stopRefreshTokenTimer() {
            clearTimeout(this.refreshTokenTimeout);
        }
    }
});
