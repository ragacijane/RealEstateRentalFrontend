import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
    const authToken = ref<string | null>(sessionStorage.getItem('authToken'));
    const refreshToken = ref<string | null>(sessionStorage.getItem('refreshToken'));
    const jwtExpirationTime = ref<number | null>(Number(sessionStorage.getItem('jwtExpirationTime')));
    const refreshTokenExpirationTime = ref<number | null>(Number(sessionStorage.getItem('refreshTokenExpirationTime')));

    const setAuthData = (token: string, refresh: string, jwtExpTime: number, refreshExpTime: number) => {
        authToken.value = token;
        refreshToken.value = refresh;
        jwtExpirationTime.value = jwtExpTime;
        refreshTokenExpirationTime.value = refreshExpTime;

        sessionStorage.setItem('authToken', token);
        sessionStorage.setItem('refreshToken', refresh);
        sessionStorage.setItem('jwtExpirationTime', jwtExpTime.toString());
        sessionStorage.setItem('refreshTokenExpirationTime', refreshExpTime.toString());
    };

    const clearAuthData = () => {
        authToken.value = null;
        refreshToken.value = null;
        jwtExpirationTime.value = null;
        refreshTokenExpirationTime.value = null;

        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('refreshToken');
        sessionStorage.removeItem('jwtExpirationTime');
        sessionStorage.removeItem('refreshTokenExpirationTime');
    };

    return {
        authToken,
        refreshToken,
        jwtExpirationTime,
        refreshTokenExpirationTime,
        setAuthData,
        clearAuthData,
    };
});
