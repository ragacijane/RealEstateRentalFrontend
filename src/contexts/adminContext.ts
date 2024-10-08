// src/context/MyContext.ts
import type { Property } from '@/typesAndUtils/types'
import type { InjectionKey } from 'vue'
import { reactive, provide, inject } from 'vue'

interface AdminContextType {
  allProperties: Property[]
  setAllProperties: (newData: Property[]) => void
}

// Define the injection key
export const AdminContextKey: InjectionKey<AdminContextType> = Symbol('AdminContext')

// Create a function to provide the context
export function provideAdminContext() {
  const storedProperties = localStorage.getItem('allProperties')
  const parsedProperties = storedProperties ? JSON.parse(storedProperties) : []

  const state = reactive<AdminContextType>({
    allProperties: parsedProperties as Property[],
    setAllProperties(newData: Property[]) {
      state.allProperties = newData
      localStorage.setItem('allProperties', JSON.stringify(newData))
    }
  })
  provide(AdminContextKey, state)
  return state
}

// Create a function to inject the context
export function useAdminContext(): AdminContextType {
  const context = inject(AdminContextKey)
  if (!context) {
    throw new Error('AdminContext must be used within a provider.')
  }
  return context
}
