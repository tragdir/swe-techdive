import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import axios from "axios";
import PatientTable from "./pages/PatientTable";
import PatientDetailsPage from "./pages/PatientDetailsPage";
import Header from "./components/Header";
import NotFound from "./pages/NotFound";
// import AddPatient from "./pages/AddPatient";
import AdminTable from "./pages/AdminTable";
import MainFooter from "./components/MainFooter";
// MUI
import { CssBaseline } from "@mui/material";

import { AppContext } from "./context";
import AdminDetailsPage from "./pages/AdminDetailsPage";


function App() {
  const [patientInfo, setPatientInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`api/data`);
        const body = await result.data;
        setPatientInfo(body);
        setIsLoading(false)
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
// console.log(patientInfo)
  
  return (
    <Router>
      <CssBaseline />
      <Header />
      <AppContext.Provider value={{patientInfo, isLoading, setPatientInfo}}>
        <Routes>
          <Route path="/" element={<PatientTable  />} exact />
          <Route path="/patients" element={<PatientTable  />} />
          <Route
            path="/patient/:patient_id"
            element={<PatientDetailsPage />}
          />
          <Route path="/admin" element={<AdminTable />} />
          <Route path="/admin/patient/:patient_id" element={<AdminDetailsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppContext.Provider>
      <MainFooter/>
    </Router>
  );
}

export default App;
