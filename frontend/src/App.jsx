import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StoredData from "./Components/StoredData.jsx";
import Form from "./Components/Form.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/storedData" element={<StoredData />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
