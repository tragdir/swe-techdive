import React from "react";
import { Link, useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, Container, Paper } from "@mui/material";
import { CardMedia, Box } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import Chip from '@mui/material/Chip';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useFetch from "../components/UseFetch";



const PatientDetailsPage = () => {
  const { patient_id } = useParams();

 const {itemInfo: patientInfo, isLoading} = useFetch(`patient/${patient_id}`);
 
 const {itemInfo: examInfo} = useFetch(`exam/${patient_id}`);

  const patientRender = () => {
    if(!isLoading){
      const objKey = Object.keys(patientInfo[0])
      return objKey
    }
    return;
  }

  
  patientRender();
  
 
  // Birixia color control
  function getColor(item){
    if (item === 0) { return "success"}
     else if (item === 1) {return "warning"}
     else if (item === 2) {return "error"}
     else{return "error"}
  }

  if(patientInfo === null) {
    return <Typography>No Patient data </Typography>
  }

  if(examInfo === null) {
    return <Typography>No Exam data </Typography>
  }
  
 
  const objKey = Object.keys(patientInfo[0])
 
  return (
  <Container>
      <Paper sx={{padding: "1rem", marginBottom: "1rem"}}>
       
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <Link to={'/'} style={{ textDecoration: 'none' }}>
        <Button>
        <ArrowBackIcon/> Back to Table
        </Button>
        </Link>
        <Typography variant="h4"  sx={{textAlign: "center"}}>
            Patient Details
          </Typography>
          <Typography variant="h4"  sx={{textAlign: "center", visibility:'hidden'}}>
           Patient Details
          </Typography>
          </div>
      </Paper>
      <div
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "space-around",
        }}
      >
        <Card sx={{ minWidth: 275 }}>
          <div>
          <AccountCircle sx={{ marginBottom: '-5px'}}/> Patient Info:
          <Divider />
          </div>
          <CardContent>
            
      <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
      }}
    >
      {patientInfo[0] && objKey.map((item, key) => {
              return (
                <div key={key}>
                  <ListItem>
        <ListItemAvatar>
          <Avatar>
          {item.replace(/(?:_| |\b)(\w)/g, function(str, p1) { return p1.toUpperCase()})}
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={item.replace(/(?:_| |\b)(\w)/g, function(str, p1) { return p1.toUpperCase()})} 
        secondary={(item === 'createdAt' || item === "updatedAt") ? new Date(patientInfo[0][item]).toLocaleString(): patientInfo[0][item]} />
      </ListItem>
      <Divider variant="inset" component="li" />

                </div>
              )
            })}
      </List>
           
          </CardContent>
        </Card>

        <Card sx={{ marginLeft: "1rem", flexDirection: 'row'}}>
          <Typography variant='h5'>Exam Info: {examInfo.length} {examInfo.length > 1 ? 'exams' : 'exam'}</Typography>
          <Divider />
          <div sx={{display: "flex", flexDirection: 'row'}}>
          {examInfo?.map((item, index) => {
           
            return (
              <div key={index}>
              <h4>Exam #{index + 1}</h4>
              <Paper variant="outlined">
              <Typography sx={{ mb: 1.5 }}  color="text.secondary">
               ID: {examInfo[index].patient}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
               Exam Type: {examInfo[index].description}
              </Typography>
              <Typography sx={{ mb: 1.5 }} variant="body2" color="text.secondary">
               Url: {examInfo[index].image ? examInfo[index].image: 'N/A'}
              </Typography>
              {examInfo[index].image ?
              <CardMedia
            component="img"
            sx={{ width: 400 }}
            image={`https://ohif-hack-diversity-covid.s3.amazonaws.com/covid-png/${examInfo[index].image}`}
            alt="xr-image"
          />
            :  <BrokenImageIcon sx={{width:"300px", height:"200px", backgroundColor: 'gray'}} /> }
          <Stack direction="row" spacing={5} sx={{marginTop: ".5rem", marginBottom: ".5rem"}}>
               {examInfo[index].score.map((item, key) => {
                 return (
                  <Chip key={key} label={item} color={getColor(item)} />
                 )
               })}
                </Stack>
                <Box>
                <Typography sx={{ mt: 1.5}} variant="caption">
                Created: {new Date(examInfo[index].createdAt).toLocaleString()}
              </Typography>
                </Box>
              <Typography sx={{ mt: 1.5 }} variant="caption">
                Updated: {new Date(examInfo[index].updatedAt).toLocaleString()}
              </Typography>
               </Paper>

              </div>
            )
            
          })}

          </div>
        </Card>
      </div>
    </Container>
  );
};

export default PatientDetailsPage;
