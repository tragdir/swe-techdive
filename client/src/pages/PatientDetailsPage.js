import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Container, Paper } from "@mui/material";
import { CardMedia } from "@mui/material";

const PatientDetailsPage = () => {
  const [examInfo, setExamInfo] = useState([]);
  const [patientInfo, setPatientInfo] = useState([])
  const { patient_id } = useParams();
  const isMounted = React.useRef(true);


  const fetchPatientData = async () => {
    try {
      var body = null;
      if(isMounted){
      const result = await axios.get(`/api/patient/${patient_id}`);
      body = result.data;
      console.log(body[0]);
    }

      setPatientInfo(body[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchExamData = async () => {
    try {
      var body = null;
      if(isMounted){
      const result = await axios.get(`/api/exam/${patient_id}`);
      body = result.data;
      console.log(body[0]);
    }

      setExamInfo(body[0]);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    if(isMounted.current){
      fetchPatientData();
      fetchExamData();

}
    return ()=> {isMounted.current = false}
  }, []);



  const { key_findings, image, score, patient } = examInfo;
  // const spreadBrixia = brixia.join(",")
  // console.log(spreadBrixia)
  // const item = [patientInfo]
  // console.log(...item)

  const objKey = Object.keys(patientInfo)

  return (
    <Container>
      <Paper sx={{padding: "1rem", marginBottom: "1rem"}}>
      <h2>We will add edit button on this page</h2>
      <h3>
        We can add delete button here or add within the table on the main page
        🤔
      </h3>

      <h3>Nicolas is on it!</h3>
      <h1>  {examInfo.length}</h1>
      </Paper>
      <div
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "space-between",
        }}
      >
        <Card sx={{ minWidth: 275 }}>
          <Typography>
            Patient Info:
          </Typography>
          <CardContent>
            {patientInfo && objKey.map((item, key) => {
              return (
                <div>
                    <Typography variant="h5" component="div">
               {item}
              </Typography>
              <Paper variant="outlined">
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                 {patientInfo[item]}
                </Typography>
              </Paper>

                </div>
              )
            })}

          </CardContent>
        </Card>
        <Card sx={{ minWidth: 300, marginLeft: "1rem"}}>
          <Typography>Exam Info:</Typography>
         {examInfo.length !== 0 ? <CardContent>
            <Typography variant="h5" component="div">
              Patient:
            </Typography>
            <Paper variant="outlined">
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {patient}
              </Typography>
            </Paper>
            <Typography variant="h5" component="div">
              Radiologist Key Findings
            </Typography>
            <Paper variant="outlined">
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {key_findings}
              </Typography>
            </Paper>

            <Typography variant="h5" component="div">
             URL:
            </Typography>
            <Paper variant="outlined">
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {image}
              </Typography>
            </Paper>
          <Paper>
          <CardMedia
            component="img"
            sx={{ width: 300 }}
            image={`https://ohif-hack-diversity-covid.s3.amazonaws.com/covid-png/${image}`}
            alt="xr-image"
          />
          </Paper>
          <Typography variant="h5" component="div">
            score:
            </Typography>
            <Paper variant="outlined">
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {score}
              </Typography>
            </Paper>
          </CardContent> : <Typography>Seems like no exam information for this subject ID: {patientInfo._id}</Typography>}
        </Card>
      </div>
    </Container>
  );
};

export default PatientDetailsPage;
