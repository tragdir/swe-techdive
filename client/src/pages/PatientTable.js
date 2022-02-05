import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Table from "../components/Table";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { Container, Alert } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";


const PatientTable = () => {
  const [patientInfo, setPatientInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`/patients`);
        const body = await result.data;
        setPatientInfo(body);
        setIsLoading(false)
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  
  const columns = useMemo(
    () =>
      patientInfo[0]
        ? Object.keys(patientInfo[0]).map((key) => {
            if (key === "patient_id")
              return {
                Header: "SUBJECT ID",
                accessor: key,
                Cell: ({ value }) => (
                  <div>
                   <div>
                   <AccountCircle/>
                   </div>
                  <Link to={`/patient/${value}`} component="link" underline="hover">{value}</Link>
                  </div>
                  
                ),
              };
                        
            return {
              Header: "COMORBIDITIES",
              columns: [
                {
                  Header: key.toUpperCase().replaceAll("_", " "),
                  accessor: key,
                },
              ],
            };
          })
        : [],
    [patientInfo]
  );

  const data = useMemo(() => [...patientInfo], [patientInfo]);

  if (isLoading)
    return (
      <Container>
        <Box>
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </Box>
      </Container>
    );

    if(isLoading === false && !patientInfo.length){
      return (
        <Container>
          <Alert severity="error">No data found!</Alert>
        </Container>
      )
    }

  return (
    <div>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default PatientTable;
