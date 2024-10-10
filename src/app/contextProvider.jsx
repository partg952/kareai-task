"use client";
import React from "react";
import { createContext, useState } from "react";

const context = createContext();
function contextProvider({children}) {
  const [progress,setProgress] = useState(16.66);
  return (
    <context.Provider value = {progress}>
        {children}
    </context.Provider>
  )
}

export default contextProvider;
export {context};