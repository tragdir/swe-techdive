import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Container, Paper } from "@mui/material";
import { CardMedia } from "@mui/material";

const PatientDetailsPage = () => {
  const [patientDetail, setPatientDetail] = useState([]);
  const { patient_id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`/patient/${patient_id}`);
        const body = result.data;

        setPatientDetail(body);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [patient_id]);

  const { image_study_description, key_findings, png_filename } = patientDetail;

  return (
    <Container>
      <Paper sx={{padding: "1rem", marginBottom: "1rem"}}>
      <h2>We will add edit button on this page</h2>
      <h3>
        We can add delete button here or add within the table on the main page
        🤔
      </h3>
      <h3>Nicolas is on it!</h3>
      </Paper>
      <div
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "space-between",
        }}
      >
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Image Study Description
            </Typography>
            <Paper variant="outlined">
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {image_study_description}
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
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 275, marginLeft: "1rem"}}>
          <CardMedia
            component="img"
            sx={{ width: 300 }}
            image={`https://ohif-hack-diversity-covid.s3.amazonaws.com/covid-png/${png_filename}`}
            alt="xr-image"
          />
        </Card>
      </div>
    </Container>
  );
};

export default PatientDetailsPage;
