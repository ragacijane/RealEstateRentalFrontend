// src/context/MyContext.ts
import type { OwnerItem } from '@/typesAndUtils/types';
import type {InjectionKey} from 'vue';
import { reactive, provide, inject } from 'vue';

interface AdminContextType {
  allProperties: OwnerItem[];
  setAllProperties: (newData: OwnerItem[]) => void;
}

// Define the injection key
export const AdminContextKey: InjectionKey<AdminContextType> = Symbol('MyContext');

// Create a function to provide the context
export function provideAdminContext() {

  const state = reactive<AdminContextType>({
    allProperties: [] as OwnerItem[],
    setAllProperties(newData: OwnerItem[]) {
      state.allProperties = newData;
    },
  });
  provide(AdminContextKey, state);
  return state;
}

// Create a function to inject the context
export function useAdminContext(): AdminContextType {
  const context = inject(AdminContextKey);
  if (!context) {
    throw new Error('AdminContext must be used within a provider.');
  }
  return context;
}
