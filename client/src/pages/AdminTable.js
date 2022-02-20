import React, { useEffect, useState, useMemo, useContext } from "react";
import { Link } from "react-router-dom";
import Table from "../components/Table";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { Container, Alert, Typography } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Stack } from '@mui/material';
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
import { Snackbar } from "@mui/material";


const AdminTable = () => {
  const [idOfItemToDelete, setIdOfItemToDelte]  = useState('')
  const [deleteSuccess, setDeleteSuccess] = useState(false)
  const [openPopup, setOpenPopup] = useState(false)
  const { allPatients, isLoading, setAllPatients } = useContext(AppContext);

  const [alert, setAlert] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const handleClose = () => {
    setAlert({ ...state, open: false });
  };

  useEffect(() => {
    const deletePatient = async (id) => {
      try {
        if(idOfItemToDelete) {
          const result = await axios.delete(`/api/patient/${id}`)
          console.log(result.data)
          setDeleteSuccess(true)
          setAlert({ open: true,  vertical: 'top',
          horizontal: 'center',});
          // setIdOfItemToDelte("")
        }
      } catch (error) {
        console.log(error)
      }
    }

    deletePatient(idOfItemToDelete)

  }, [idOfItemToDelete, alert.open]);
  

  console.log(idOfItemToDelete)
  console.log(deleteSuccess)

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

            return {

                Header: key.toUpperCase().replaceAll("_", " "),
                accessor: key,

            };
          })
        : [],
    [allPatients]
  );


  const data = useMemo(() => [...allPatients], [allPatients]);

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


  React.useEffect(() => {
    setAllPatients(deleteSuccess ? data.filter(item => item._id !== idOfItemToDelete) : data)
    // setDeleteSuccess(false)
  }, [deleteSuccess, idOfItemToDelete])

  const actionButtons = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "modify",
        Header: "Modify",
        Cell: ({ row }) => (

          <Grid item xs={8}>
                <Button onClick={() => setIdOfItemToDelte(row.values._id)}><DeleteForeverIcon sx={{color: 'red'}}/></Button>
          </Grid>
        ),
      },
    ]);
  }
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
  actionButtons ? actionButtons: ""
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
      {/* <Popup openPopup={openPopup} setOpenPopup={setOpenPopup} btnName="Delete" title="Warning!">
        <Typography>Deleting patient erases all its exams</Typography>
      </Popup> */}
      <Snackbar open={alert.open} autoHideDuration={4000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success">
          Delete successful!
      </Alert>
    </Snackbar>
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
      <Table setAllPatients={setAllPatients} tableInstance={tableInstance}/>
    </div>
  );
};

export default AdminTable;
