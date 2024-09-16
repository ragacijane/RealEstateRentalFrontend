import type { AxiosResponse } from 'axios'
import axios from 'axios'

interface ApiResponse<T> {
  data: T | null
  error: string | null
}

// Generic GET request function
export async function get<T>(url: string, headers?: Record<string, string>): Promise<ApiResponse<T>> {
  try {
    const response = await axios.get<T>(url, {
      headers: headers as Record<string, string> | undefined,
    });
    return { data: response.data, error: null }
  } catch (error: any) {
    return { data: null, error: error.message }
  }
}

// Example of a POST request function (if needed)
export async function post<T>(url: string, body: any, headers?: Record<string, string>): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(headers || {}) },
      body: JSON.stringify(body)
    })
    const data = await response.json()
    return { data, error: null }
  } catch (error: any) {
    return { data: null, error: error.message }
  }
}

export async function postImages<T>(url: string, body: FormData, headers?: Record<string, string>): Promise<ApiResponse<T>> {
  try {
    const response: AxiosResponse<T> = await axios.post(url, body, {
      headers: { 'Content-Type': 'multipart/form-data', ...(headers || {}) }
    })
    const data = await response.data
    return { data, error: null }
  } catch (error: any) {
    return { data: null, error: error.message }
  }
}

export async function put<T>(url: string, body: any, headers?: Record<string, string>): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...(headers || {}) },
      body: JSON.stringify(body)
    })
    const data = await response.json()
    return { data, error: null }
  } catch (error: any) {
    return { data: null, error: error.message }
  }
}

export async function toggle(url: string, headers?: Record<string, string>): Promise<boolean> {
  try {
    const response = await axios.post(url, {}, { // Pass an empty object as the body
      headers: { 'Content-Type': 'application/json', ...(headers || {}) }
    });

    // Return true if status is 200, otherwise false
    return response.status === 200;
  } catch (error: any) {
    return false;
  }
}
