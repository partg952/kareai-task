"use client";
import React from "react";
import { createContext, useState } from "react";

const Context = createContext();
function ContextProvider({children}) {
  const [progress,setProgress] = useState(16.66);
  return (
    <Context.Provider value = {{progress,setProgress}}>
        {children}
    </Context.Provider>
  )
}

export default ContextProvider;
export {Context};