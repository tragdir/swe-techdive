<<<<<<< HEAD
import React from "react";
import { Alert, Button, Container, TextField, Box, Grid } from "@mui/material";
import Buttons from "../components/Button";


const AddPatient = () => {
  return (
    <div>
      {/* <h1>Hi</h1> */}

      <Grid
        container
        justify="center"
        alignItems="center"
        direction="column"
      >
        <Box sx={{
          fontStyle: 'italic', fontFamily: '',
          typography: 'h1', lineHeight: 'normal', fontSize: 200, letterSpacing: 20
        }}>CREATE EXAM</Box>
      </Grid>

      {/* Add Patients
      <Grid container direction="column" alignItems="left" justify="center">
        <div><Button size="large" variant="contained" color="secondary"
          onClick={() => <div></div>}>Add Patient</Button></div>
      </Grid> */}

      <Grid
        container
        justify="center"
        alignItems="flex-start"
        direction="column">
        <TextField
          id="outlined-basic"
          label="Patient ID"
          variant="outlined"
        />
        
           <TextField
            id="outlined-basic"
            label="age"
            variant="outlined"
          />
    


      </Grid>
      <Buttons />

    </div>
  )
};

export default AddPatient;
=======
>>>>>>> upstream/main
