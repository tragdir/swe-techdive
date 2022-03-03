import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import axios from "axios";
import PatientTable from "./pages/PatientTable";
import PatientDetailsPage from "./pages/PatientDetailsPage";
import Header from "./components/Header";
import NotFound from "./pages/NotFound";
import AdminTable from "./pages/AdminTable";
import MainFooter from "./components/MainFooter";
// MUI
import { CssBaseline } from "@mui/material";

import { AppContext } from "./context";
import AdminDetailsPage from "./pages/AdminDetailsPage";
import AddNewPatient from "./pages/AddNewPatient";

function App() {
  const [patientInfo, setPatientInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [allPatients, setAllPatients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`/api/data`);
        const body = await result.data;
        setPatientInfo(body);
        setIsLoading(false)
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

  }, []);

<<<<<<< HEAD
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`api/patients`);
        const body = await result.data;
        setAllPatients(body);
        setIsLoading(false)
      } catch (error) {
        console.log(error);
      }
    };
=======
 useEffect(() => {
  const fetchData = async () => {
    try {
      const result = await axios.get(`/api/patients`);
      const body = await result.data;
      setAllPatients(body);
      setIsLoading(false)
    } catch (error) {
      console.log(error);
    }
  };
>>>>>>> 235e52c8c22fb7f20d96614e84fb35fab958e5f1

    fetchData();

  }, []);

  return (
    <Router>
      <CssBaseline />
      <Header />
      <AppContext.Provider value={{ patientInfo, isLoading, setPatientInfo, allPatients, setAllPatients }}>
        <Routes>
          <Route path="/" element={<PatientTable />} exact />
          <Route path="/patients" element={<PatientTable />} />
          <Route
            path="/patient/:patient_id"
            element={<PatientDetailsPage />}
          />
          <Route path="/addnewpatient" element={<AddNewPatient />} />
          <Route path="/admin" element={<AdminTable />} />
          <Route path="/admin/patient/:patient_id" element={<AdminDetailsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppContext.Provider>
      <MainFooter />
    </Router>
  );
}

export default App;
