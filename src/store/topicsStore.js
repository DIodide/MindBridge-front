import { create } from 'zustand';

const useTopicsStore = create((set) => ({
  topics: [],
  setTopics: (newTopics) => set({ topics: newTopics }),
}));

export default useTopicsStore;