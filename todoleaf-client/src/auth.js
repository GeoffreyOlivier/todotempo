import axios from 'axios';


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

export default apiClient;
