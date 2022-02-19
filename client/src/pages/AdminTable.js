import React, { useEffect, useState, useMemo, useContext } from "react";
import { Link } from "react-router-dom";
import Table from "../components/Table";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { Container, Alert } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { CardMedia, Stack } from '@mui/material';
import { AppContext } from "../context";
import { useTable, useGlobalFilter, useSortBy} from "react-table";

// +++++++++++++++++++++++++++++++++

// ******************************************************
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import GlobalFilter from "../components/GlobalFilter";

import axios from "axios";
// ****************************************************
// Popup
import Popup from "../components/Popup";
import DefaultButton from "../components/controls/DefaultButton";


const AdminTable = () => {
  const [idOfItemToDelete, setIdOfItemToDelte]  = React.useState('')
  const [deleteSuccess, setDeleteSuccess] = React.useState(false)
  const [openPopup, setOpenPopup] = useState(false)
  const { allPatients, isLoading, setAllPatients, setEditValue } = useContext(AppContext);
  console.log(allPatients);
  const columns = useMemo(
    () =>
    allPatients[0]
        ? Object.keys(allPatients[0]).map((key) => {
            if (key === "_id"){
              return {
                Header: "MODIFY",
                accessor: key,
                Cell: ({ value }) => (
                  <div>
                  <Link to={`/admin/patient/${value}`} component="link" underline="hover">{value}</Link>
                  </div>

                ),
              };
            }

              // if (key === "image"){
              //   return {
              //     Header: "Xray Image",
              //     accessor: key,
              //     Cell: ({ value }) => <CardMedia
              //     component="img"
              //     height="80px"
              //     width="100px"
              //     image={`https://ohif-hack-diversity-covid.s3.amazonaws.com/covid-png/${value}`}
              //     alt="xray-image"
              //     />
              //   };
              // }
              // if (key === "score"){
              //   return {
              //     Header: "BRIXIA SCORE",
              //     accessor: key,
              //     Cell: ({ value }) => value.join(", ")
              //   };
              // }

            return {

                Header: key.toUpperCase().replaceAll("_", " "),
                accessor: key,

            };
          })
        : [],
    [allPatients]
  );

  // console.log(patientInfo)

  const data = useMemo(() => [...allPatients], [allPatients]);

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

React.useEffect(() => {
  setAllPatients(deleteSuccess ? data.filter(item => item._id !== idOfItemToDelete) : data)
  // setDeleteSuccess(false)
}, [deleteSuccess, idOfItemToDelete])

  React.useEffect(() => {
    const deleteItem = async (id) => {
      try {
        if(idOfItemToDelete !== '') {
          const result = await axios.delete(`/api/patient/${id}`)
          setDeleteSuccess(true)
          console.log(result.data)
          setIdOfItemToDelte("")
        }
      } catch (error) {
        console.log(error)
      }
    }
    deleteItem(idOfItemToDelete);

  }, [idOfItemToDelete, deleteSuccess])

  // const actionButtons = (hooks) => {
  //   hooks.visibleColumns.push((columns) => [
  //     ...columns,
  //     {
  //       id: "modify",
  //       Header: "Modify",
  //       Cell: ({ row }) => (

  //         <Grid item xs={8}>

  //                <Button>
  //                <Link sx={{cursor: "pointer", color: "inherit"}} to={`/admin/patient/${row.values.patient}/`}>
  //                  Modify
  //                 </Link>
  //                </Button>

  //         </Grid>
  //       ),
  //     },
  //   ]);
  // }
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const tableInstance = useTable(
  {
  columns,
   data,
  initialState: {
    hiddenColumns: ["createdAt", "updatedAt", "__v", "patient_id"]
  }
  },
  useGlobalFilter,
  useSortBy,
  // actionButtons ? actionButtons: ""
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

    if(isLoading === false && !allPatients.length){
      return (
        <Container>
          <Alert severity="error">No data found!</Alert>
        </Container>
      )
    }

  return (
    <div>
      <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}>
      </Popup>
      <Stack direction="row">
      <GlobalFilter preGlobalFilteredRows={preGlobalFilteredRows}
        setGlobalFilter={setGlobalFilter} globalFilter={state.globalFilter}/>
      <DefaultButton
            text="Add New"
            variant="outlined"
            onClick = {()=> setOpenPopup(true)}
            sx={{height: "40px", marginRight: "1.4rem", marginTop: "1rem"}}
          />
        </Stack>
      <Table setAllPatients={setAllPatients} setEditValue={setEditValue} tableInstance={tableInstance}/>
    </div>
  );
};

export default AdminTable;
