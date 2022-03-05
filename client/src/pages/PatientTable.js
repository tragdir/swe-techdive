import React, { useMemo, useContext } from "react";
import { Link } from "react-router-dom";
import Table from "../components/Table";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { Container, Alert } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { CardMedia } from '@mui/material';
import { AppContext } from "../context";
import { useTable, useGlobalFilter, useSortBy, useColumnOrder} from "react-table";
import GlobalFilter from "../components/GlobalFilter";
import BrokenImageIcon from '@mui/icons-material/BrokenImage';

const PatientTable = () => {

const {patientInfo, isLoading, setPatientInfo, setEditValue} = useContext(AppContext);

  const columns = useMemo(
    () =>
      patientInfo[0]
        ? Object.keys(patientInfo[0]).map((key) => {
            if (key === "patient"){
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
            }

              if (key === "image"){

                return {
                  Header: "Xray Image",
                  accessor: key,
                  Cell: ({ value }) => value ? <CardMedia
                  component="img"
                  height="80px"
                  image={`https://ohif-hack-diversity-covid.s3.amazonaws.com/covid-png/${value}`}    
                  alt="xray-image"
                  
                  />: <BrokenImageIcon style={{height: "80px"}}/>
                };
              }
              if (key === "score"){
                return {
                  Header: "Brixia Score",
                  accessor: key,
                  Cell: ({ value }) => value.join(", ")
                };
              }

            return {

                Header: key.toUpperCase().replaceAll("_", " "),
                accessor: key,

            };
          })
        : [],
    [patientInfo]
  );

  // console.log(patientInfo)

  const data = useMemo(() => [...patientInfo], [patientInfo]);

  const tableInstance = useTable(  
    {
    columns,
     data,
    initialState: {
      "columnOrder": ['patient', 'age', 'sex', 'zip', 'latest_bmi', 'score', 'description', 'key_findings', 'image' ],
      hiddenColumns: ["createdAt", "updatedAt", "__v", "race", "patient_id", "mortality", "_id", "icu_admit"]
    }
    },
    useGlobalFilter,
    useSortBy,
    useColumnOrder,
  )
  const {preGlobalFilteredRows,
    setGlobalFilter,
    state} = tableInstance

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
      <GlobalFilter preGlobalFilteredRows={preGlobalFilteredRows} 
        setGlobalFilter={setGlobalFilter} globalFilter={state.globalFilter}/>
      <Table tableInstance={tableInstance} setPatientInfo={setPatientInfo} setEditValue={setEditValue} />
    </div>
  );
};

export default PatientTable;
