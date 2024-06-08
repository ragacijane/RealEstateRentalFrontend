// src/context/MyContext.ts
import type {InjectionKey} from 'vue';
import { reactive, provide, inject } from 'vue';

interface MyContextType {
  message: string;
  setMessage: (newMessage: string) => void;
}

// Define the injection key
export const MyContextKey: InjectionKey<MyContextType> = Symbol('MyContext');

// Create a function to provide the context
export function provideMyContext() {
  const state = reactive({
    message: 'Hello, Vue with TypeScript!',
    setMessage(newMessage: string) {
      state.message = newMessage;
    },
  });

  provide(MyContextKey, state);
}

// Create a function to inject the context
export function useMyContext(): MyContextType {
  const context = inject(MyContextKey);
  if (!context) {
    throw new Error('useMyContext must be used within a provider.');
  }
  return context;
}
