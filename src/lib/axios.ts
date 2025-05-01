import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_SAMUEL_SERVER_URL,
    headers: {
        // 'Content-Type': 'application/json',
        'appid': import.meta.env.VITE_APP_SAMUEL_APP_ID,
        'widgetKey': import.meta.env.VITE_APP_SAMUEL_WIDGET_KEY
    }
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        console.error('Axios Error:', error);
        return Promise.reject(error);
    }
);

export default axiosInstance;