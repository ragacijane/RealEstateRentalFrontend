import axios from 'axios';
import { BACKEND_URL } from '@/constants/constant';
import { useAuthStore } from '@/store/authStore';

export async function login(username: string, password: string) {
    const authStore = useAuthStore();

    try {
        const response = await axios.post(`${BACKEND_URL}/auth/login`, { username, password });
        const { jwt, refreshToken, jwtExpiration, refreshTokenExpiration } = response.data;

        if (!jwt || !refreshToken || !jwtExpiration || !refreshTokenExpiration) {
            throw new Error('Missing required fields in response data');
        }

        authStore.setAuthData(jwt, refreshToken, jwtExpiration, refreshTokenExpiration);
    } catch (error) {
        console.error('Login failed:', error);
        authStore.clearAuthData();
        throw error;
    }
}

export async function refreshToken() {
    const authStore = useAuthStore();
    const token = authStore.refreshToken;

    if (!token) {
        throw new Error('No refresh token available');
    }

    try {
        const response = await axios.post(`${BACKEND_URL}/auth/refresh-token`, {}, {
            headers: { Authorization: `Bearer ${token}` },
        });

        const { jwt, refreshToken, jwtExpirationTime, refreshTokenExpirationTime } = response.data;
        authStore.setAuthData(jwt, refreshToken, jwtExpirationTime, refreshTokenExpirationTime);
    } catch (error) {
        console.error('Token refresh failed:', error);
        authStore.clearAuthData();
        throw error;
    }
}

export function getAuthHeaders() {
    const authStore = useAuthStore();
    return { Authorization: `Bearer ${authStore.authToken ? authStore.authToken : ''}` };
}

export function logout() {
    const authStore = useAuthStore();
    authStore.clearAuthData();
}
export function checkTokenExpiration() {
    const authStore = useAuthStore();
    const currentTime = Date.now();

    if (authStore.jwtExpirationTime && authStore.jwtExpirationTime <= currentTime) {
        logout();
        return false;
    }
    return true;
}