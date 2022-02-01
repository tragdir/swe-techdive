import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import PatientTable from "./pages/PatientTable";
import PatientDetailsPage from "./pages/PatientDetailsPage";
import Header from "./components/Header";
import NotFound from "./pages/NotFound";
import AddPatient from "./pages/AddPatient";
// MUI
import { CssBaseline } from "@mui/material";

function App() {
  return (
    <Router>
      <CssBaseline />
      <Header />
      <Routes>
        <Route path="/" element={<PatientTable />} exact />
        <Route path="/items" element={<PatientTable />} />
        <Route
          path="/item/:patient_id"
          element={<PatientDetailsPage />}
        />
        <Route path="/item/add" element={<AddPatient />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
