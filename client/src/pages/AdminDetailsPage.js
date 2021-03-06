import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, Button, Container, Paper } from "@mui/material";
import { CardMedia } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
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
import Snackbar from '@mui/material/Snackbar';
import { Alert } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BrokenImage from "@mui/icons-material/BrokenImage";
import Popup from "../components/Popup";
import PatientUpdateForm from "../components/controls/PatientUpdateForm";
import ExamUpdateForm from "../components/controls/ExamUpdateForm";
import DefaultButton from "../components/controls/DefaultButton";
import CreateExam from "../components/controls/CreateExam";



const AdminDetailsPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [examInfo, setExamInfo] = useState([]);
  const [patientInfo, setPatientInfo] = useState([{patient: ""}])
  const { patient_id } = useParams();
  const [examId, setExamId] = useState('')
  const [openPatientForm, setOpenPatientForm] = useState(false)
  const [openExamForm, setOpenExamForm] = useState(false)
  const [addExamOpenPupup, setAddExamOpenPupup] = useState(false)

    const [state, setState] = useState({
      open: false,
      vertical: 'top',
      horizontal: 'center',
    });

  useEffect(() => {
    const fetchData = async (name, id, stateType) => {
      try {
        const result = await axios.get(`/api/${name}/${id}`);
        const body = result.data;
        stateType(body);
        setIsLoading(false)
      } catch (error) {
        console.log(error);
      }
    };

    fetchData("patient", patient_id, setPatientInfo);
    fetchData("exam", patient_id, setExamInfo);

  }, [patient_id]);

  // Change object to an array to dynamicaly render
  const patientRender = () => {
    if(!isLoading){
      const objKey = Object.keys(patientInfo[0])
      return objKey
    }
    return;
  }


  patientRender();


  React.useEffect(() => {
    const deleteItem = async (id) => {
      try {
        if(examId !== '') {
          const result = await axios.delete(`/api/exam/${id}`)
          console.log(result.data)
          setState({ open: true });
          setExamId("")
          window.location.reload(false)
        }
      } catch (error) {
        console.log(error)
      }
    }
    deleteItem(examId);

  }, [examId, state.open]);

  // Snack bar handler
  const handleClose = () => {
    setState({ ...state, open: false });
  };
  // Birixia color control
  function getColor(item){
    if (item === 0) { return "success"}
     else if (item === 1) {return "primary"}
     else if (item === 2) {return "info"}
     else{return "error"}
  }

  const objKey = Object.keys(patientInfo[0])
  return (
  <Container>
    <Snackbar open={state.open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success">
          Delete successful!
      </Alert>
    </Snackbar>
      <Paper sx={{padding: "1rem", marginBottom: "1rem"}}>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <Popup openPopup={addExamOpenPupup} setOpenPopup={setAddExamOpenPupup} title={`Adding Exam for: ${patientInfo[0]._id}`}>
           <CreateExam id={patientInfo[0]._id}/>
            </Popup>
        <Link to={'/admin'} style={{ textDecoration: 'none' }}>
        <Button>
        <ArrowBackIcon/> Admin Table
        </Button>
        </Link>
        <Typography variant="h4"  sx={{textAlign: "center"}}>
            Patient Details
          </Typography>
        <DefaultButton
            text="Add New Exam"
            variant="outlined"
            onClick = {()=> setAddExamOpenPupup(true)}
           
          />
        </div>
      </Paper>
      <div
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "space-around",
        }}
      >
        {!isLoading ?
        <Card sx={{ minWidth: 275 }}>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <div><Typography variant="h6"><AccountCircle sx={{ marginBottom: '-5px'}}/> Patient Info:</Typography></div>
          <Box>
          <Popup openPopup={openPatientForm} setOpenPopup={setOpenPatientForm} btnName='Update' title={`Editing Patient: ${patientInfo[0]._id}`}>
           <PatientUpdateForm patientInfo={patientInfo[0]}/>
            </Popup>
          <Button onClick={() => setOpenPatientForm(true)}>
                     <EditIcon sx={{cursor: "pointer", color: "yellowgreen"}}/>
            </Button>
            {/* <Button onClick={() => {}}><DeleteForeverIcon sx={{color: "red"}}/></Button> */}
            </Box>
          </div>
          <Divider />
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
        secondary={(item === 'createdAt' || item === "updatedAt") ? new Date(patientInfo[0][item]).toLocaleString(): patientInfo[0][item]}/>
      </ListItem>
      <Divider variant="inset" component="li" />

                </div>
              )
            })}
      </List>

          </CardContent>
        </Card> : <Stack spacing={1}>
        <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="text" />
      <Skeleton variant="rectangular" width={210} height={118} />
    </Stack>}
            {examInfo.length ?
        <Card sx={{ marginLeft: "1rem", flexDirection: 'row', padding: "0.3rem"}}>
          <Typography variant="h6">Exam Info: {examInfo.length} {examInfo.length > 1 ? 'exams' : 'exam'}</Typography>
          <Divider />
          <div sx={{display: "flex", flexDirection: 'row'}}>
          {examInfo?.map((item, index) => {

            return (
              <div key={index}>
                <Popup openPopup={openExamForm} setOpenPopup={setOpenExamForm} btnName='Update' title={`Editing Exam: ${examInfo[index]._id}`}>
                <ExamUpdateForm examInfo={examInfo[index]}/>
                </Popup>
                 <Button onClick={() => setOpenExamForm(true)}>
                     <EditIcon sx={{cursor: "pointer", color: "yellowgreen"}}/>
                 </Button>
                 <Button onClick={() => setExamId(examInfo[index]._id)}><DeleteForeverIcon sx={{color: "red"}}/></Button>
              <h3>Exam #{index + 1}</h3>
              <Paper variant="outlined" sx={{padding: '0.2rem'}}>
              <Typography sx={{ mb: 1.5 }}  color="text.secondary">
               ID: {examInfo[index].patient}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
               Exam Type: {examInfo[index].description}
              </Typography>
              <Typography sx={{ mb: 1.5 }} variant="body2" color="text.secondary">
               Url: {examInfo[index].image}
              </Typography>
              {examInfo[index].image ?
              <CardMedia
            component="img"
            sx={{ width: 400 }}
            image={`https://ohif-hack-diversity-covid.s3.amazonaws.com/covid-png/${examInfo[index].image}`}
            alt="xr-image"
          />
            :  <BrokenImage sx={{width:"300px", height:"200px", backgroundColor: 'gray'}} /> }
          <Stack direction="row" spacing={5} sx={{marginTop: ".5rem", marginBottom: ".5rem"}}>
               {examInfo[index].score.map((item, key) => {
                 return (
                  <Chip key={key} label={item} color={getColor(item)} />
                 )
               })}
            </Stack>
                <Box>
                <Typography sx={{ mb: 1.5, maxWidth: 400 }} color="text.secondary">
                Key Findings: {examInfo[index].key_findings}
              </Typography>
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
        </Card> : <h3>No exam found!</h3>                }
      </div>
    </Container>
  );
};

export default AdminDetailsPage;
