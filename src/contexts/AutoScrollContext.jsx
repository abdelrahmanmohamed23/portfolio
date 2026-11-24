"use client";
import { createContext, useContext, useRef } from "react";
const AutoScrollContext = createContext(null);
export default function AutoScrollProvider({children}) {
  const isAutoScrollingRef = useRef(false);

  return (
    <AutoScrollContext.Provider value={isAutoScrollingRef}>
      {children}
    </AutoScrollContext.Provider>
  );
}

export function useAutoScroll() {
  return useContext(AutoScrollContext);
}
