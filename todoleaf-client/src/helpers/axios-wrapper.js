import axios from 'axios';
import { useAuthStore } from '../stores/auth.store.js';

const apiClient = axios.create({
    baseURL: 'http://localhost:8000/api',  // Assurez-vous que l'URL de base correspond à celle de votre serveur Laravel
    withCredentials: true,  // Important pour les sessions Sanctum
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    }
});

apiClient.defaults.withCredentials = true;
apiClient.defaults.withXSRFToken = true;

// Configurez les intercepteurs de requête pour ajouter le JWT header.
apiClient.interceptors.request.use(config => {
    const { user } = useAuthStore();
    if (user && user.jwtToken) {
        config.headers.Authorization = `Bearer ${user.jwtToken}`;
    }
    return config;
});

// Configurez les intercepteurs de réponse pour gérer les données et les erreurs globales.
apiClient.interceptors.response.use(response => {
    return response.data; // Renvoie les données directement pour simplifier l'accès dans les composants.
}, error => {
    const { status } = error.response;
    if ([401, 403].includes(status)) {
        const { logout } = useAuthStore();
        logout(); // Déconnectez l'utilisateur en cas d'erreur 401 ou 403.
    }
    return Promise.reject(error.response.data); // Renvoyez les données d'erreur pour les gérer dans les composants.
});

// Ensuite, définissez les méthodes du wrapper après avoir configuré l'apiClient.
export const axiosWrapper = {
    get(url) {
        return apiClient.get(url);
    },
    post(url, body) {
        console.log(url)
        console.log(body)
        return apiClient.post(url, body);
    },
    put(url, body) {
        return apiClient.put(url, body);
    },
    delete(url) {
        return apiClient.delete(url);
    }
};
