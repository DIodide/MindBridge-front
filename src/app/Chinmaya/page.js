"use client";

import React from "react";
import Component from "./page1";
import Component1 from "./page2";
import LearningDashboard from "./page3";

function App() {
  
    return (
      <div className="App">
        <Component />
        <Component1 />
        <LearningDashboard />
      </div>
    );
  }
  
  export default App;

/* 
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";  // Adjust path as needed

export function CheckboxWithText() {
  return (
    <div className="items-top flex space-x-2">
      
      <Checkbox id="terms1" />
    
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor="terms1"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          <Checkbox id2="terms2" />
          Option 1
        </label>
        <p className="text-sm text-muted-foreground">
          Option 2
        </p>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App bg-blue-200 p-8 text-center" style={{ padding: "20px", textAlign: "center" }}>
      <h1>What are your prior experiences with this topic?</h1>
      <CheckboxWithText />
    </div>
  );
}

export default App; */
