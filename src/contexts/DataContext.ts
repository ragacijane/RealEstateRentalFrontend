import type { Borough, Equipment, Structure, Tag, Types } from '@/typesAndUtils/types';
import type { InjectionKey } from 'vue';
import { reactive, provide, inject } from 'vue';

interface DataContextType {
  allTags: Tag[];
  setAllTags: (newData: Tag[]) => void;
  allEquips: Equipment[];
  setAllEquips: (newData: Equipment[]) => void;
  allTypes: Types[];
  setAllTypes: (newData: Types[]) => void;
  allBoroughs: Borough[];
  setAllBoroughs: (newData: Borough[]) => void;
  allStructures: Structure[];
  setAllStructures: (newData: Structure[]) => void;
}

// Define the injection key
export const DataContextKey: InjectionKey<DataContextType> = Symbol('DataContext');

// Create a function to provide the context
export function provideDataContext() {
  const state = reactive<DataContextType>({
    allTags: [] as Tag[],
    allEquips: [] as Equipment[], // Fixed typo
    allTypes: [] as Types[],
    allBoroughs: [] as Borough[],
    allStructures: [] as Structure[],
    setAllTags(newData: Tag[]):void {
      state.allTags = newData;
    },
    setAllEquips(newData: Equipment[]) {
      state.allEquips = newData;
    },
    setAllTypes(newData: Types[]) {
      state.allTypes = newData;
    },
    setAllBoroughs(newData: Borough[]) {
      state.allBoroughs = newData;
    },
    setAllStructures(newData: Structure[]) {
      state.allStructures = newData;
    },
  });

  provide(DataContextKey, state);
  return state;
}

// Create a function to inject the context
export function useDataContext(): DataContextType {
  const context = inject(DataContextKey);
  if (!context) {
    throw new Error('DataContext must be used within a provider.');
  }
  return context;
}
