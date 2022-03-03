import { Alert, Button, Container, Box, Grid } from "@mui/material";
import React from "react";





const NotFound = () => {

  return (

    <div>

      <Grid
        container
        justify="center"
        alignItems="center"
        direction="column"
        style={{
          minHeight: "100vh",
        }}
        spacing={5}
      // sx={{ bgcolor: 'success.main' }}
      >
        <Box sx={{ fontStyle: 'italic', fontFamily: '', color: 'primary.main', typography: 'h1', lineHeight: 'normal', fontSize: 200, letterSpacing: 20 }}>404 error</Box>
        <Box sx={{ color: 'primary.main', lineHeight: 2, fontSize: 64, letterSpacing: 2 }}> <h4>THE PAGE YOU WERE LOOKING FOR DOES NOT EXIT </h4></Box>
        <Box sx={{ color: 'primary.main', lineHeight: 2, fontSize: 50, letterSpacing: 2 }}> <h5>Click The Go Back Button To Return To Previous Page</h5> </Box>

      </Grid>

      <Grid container direction="column" alignItems="center" justify="center">
        <div><Button size="large" variant="contained" color="primary"
          onClick={() => <div>{window.history.back()}</div>}>Go back</Button></div>
      </Grid></div >
  );

};







export default NotFound;