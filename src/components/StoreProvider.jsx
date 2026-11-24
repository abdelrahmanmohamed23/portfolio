"use client";

import {
  createContext,
  useEffect,
  useRef,
  useLayoutEffect,
  useTransition,
} from "react";
import { createStore } from "zustand";

export const StoreContext = createContext(null);

export default function StoreProvider({ children }) {
  const store = useRef(null);

  if (!store.current) {
    store.current = createStore((set, get) => ({
      sectionsRefs: {},
      addSection: (key, element) => {
        set({ sectionsRefs: { ...get().sectionsRefs, [key]: element } });
      },
    }));
  }

  return (
    <StoreContext.Provider value={store.current}>
      {children}
    </StoreContext.Provider>
  );
}
