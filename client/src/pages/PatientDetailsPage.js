import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Container, Paper } from "@mui/material";
import { CardMedia } from "@mui/material";

const PatientDetailsPage = () => {
  //const [isLoading, setIsLoading] = useState(true)
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

  // const patientRender = () => {
  //   if(!isLoading){
  //     const objKey = Object.keys(patientInfo[0])
  //     return objKey
  //   }
  //   return;
  // }

  // patientRender();


  const objKey = Object.keys(patientInfo)
  return (
    <Container>
      <Paper sx={{padding: "1rem", marginBottom: "1rem"}}>
      <Typography  sx={{textAlign: "center"}}>
            Patient Details
          </Typography>
      </Paper>
      <div
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "space-around",
        }}
      >
        {
        <Card sx={{ minWidth: 275 }}>
          <Typography>
            Patient Info:
          </Typography>
          <CardContent>
            {patientInfo[0] && objKey.map((item, key) => {
              return (
                <div key={key}>
                    <Typography variant="h5" component="div">
               {item}
              </Typography>
              <Paper variant="outlined">
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                 {patientInfo[0][item]}
                </Typography>
              </Paper>

                </div>
              )
            })}

          </CardContent>
        </Card> } <h1>No data for patient</h1>

        <Card sx={{ minWidth: 300, marginLeft: "1rem", flexDirection: 'row'}}>
          <Typography>Exam Info:  Number of exam: #{examInfo.length}</Typography>
          <div sx={{display: "flex", flexDirection: 'row'}}>
          {examInfo?.map((item, index) => {

            return (
              <div key={index}>
              <h3>Exam #{index}</h3>
              <Paper variant="outlined">
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
               ID: {examInfo[index].patient}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
               Exam Type: {examInfo[index].description}
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
                {score.join(",")}
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
