import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { router } from './router/router.js'
import { useAuthStore } from "@/stores/auth.store.js"
import { useCookies } from 'vue3-cookies';

const app = createApp(App);
const authStore = useAuthStore();
const { cookies } = useCookies();

app.use(createPinia());
app.use(router);

useCookies({
    expireTimes: "30d",
    path: "/",
    domain: "",
    secure: true,
    sameSite: "None"
});
authStore.jwt = cookies.get('jwt');

app.mount('#app');


