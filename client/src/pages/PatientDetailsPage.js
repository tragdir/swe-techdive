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
 

  useEffect(() => {
    const fetchData = async (name, id, stateType) => {
      try {
        const result = await axios.get(`/api/${name}/${id}`);
        const body = result.data;

        stateType(body);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData("exam", patient_id, setExamInfo);
    fetchData("patient", patient_id, setPatientInfo);
  }, [patient_id]);

  const { key_findings, png_filename, brixia, patient } = examInfo;
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
                {png_filename}
              </Typography>
            </Paper>
          <Paper>
          <CardMedia
            component="img"
            sx={{ width: 300 }}
            image={`https://ohif-hack-diversity-covid.s3.amazonaws.com/covid-png/${png_filename}`}
            alt="xr-image"
          />
          </Paper>
          <Typography variant="h5" component="div">
             Brixia:
            </Typography>
            <Paper variant="outlined">
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {brixia.join(",")}
              </Typography>
            </Paper>
          </CardContent> : <Typography>Seems like no exam information for this subject ID: {patientInfo._id}</Typography>}
        </Card>
      </div>
    </Container>
  );
};

export default PatientDetailsPage;
