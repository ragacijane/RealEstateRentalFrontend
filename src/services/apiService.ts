import type { AxiosResponse } from 'axios'
import axios from 'axios'

interface ApiResponse<T> {
  data: T | null
  error: string | null
}

// Generic GET request function
export async function get<T>(url: string): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url)
    const data = await response.json()
    return { data, error: null }
  } catch (error: any) {
    return { data: null, error: error.message }
  }
}

// Example of a POST request function (if needed)
export async function post<T>(url: string, body: any): Promise<ApiResponse<T>> {
  try {
    console.log(JSON.stringify(body))
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },

      body: JSON.stringify(body)
    })
    const data = await response.json()
    return { data, error: null }
  } catch (error: any) {
    return { data: null, error: error.message }
  }
}

export async function postImages<T>(url: string, body: FormData): Promise<ApiResponse<T>> {
  try {
    const response: AxiosResponse<T> = await axios.post(url, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    const data = await response.data
    return { data, error: null }
  } catch (error: any) {
    return { data: null, error: error.message }
  }
}

export async function put<T>(url: string, body: any): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    const data = await response.json()
    return { data, error: null }
  } catch (error: any) {
    return { data: null, error: error.message }
  }
}

/*
interface ApiResponse<T> {
  data: T;
  error: string | null;
}

export async function get<T>(url: string): Promise<ApiResponse<T>> {
  try {
    const response = await axios.get(`${BACKEND_URL}${url}`);
    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

export async function post<T>(url: string, body: any): Promise<ApiResponse<T>> {
  try {
    const response = await axios.post(`${BACKEND_URL}${url}`, body);
    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}
*/
