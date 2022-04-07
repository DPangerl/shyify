import React from "react";
import Start from "@views/Start";
import { Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Start />} />
    </Routes>
  );
}
