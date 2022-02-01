import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Table from "../components/Table";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { Container } from "@mui/material";

const PatientTable = () => {
  const [patientInfo, setPatientInfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`/api/items`);
        const body = await result.data;
        setPatientInfo(body);
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
                Header: key.toUpperCase(),
                accessor: key,
                Cell: ({ value }) => (
                  <Link to={`/patient-info/${value}`}>{value}</Link>
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

  if (!patientInfo.length)
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

  return (
    <div>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default PatientTable;
