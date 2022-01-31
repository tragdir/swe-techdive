import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Container, Paper } from "@mui/material";
import { CardMedia } from "@mui/material";

const PatientDetailsPage = () => {
  const { patient_id } = useParams();
  const [patientDetail, setPatientDetail] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`/api/patient/data/${patient_id}`);
        const body = result.data;

        setPatientDetail(body);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [patient_id]);

  const { image_study_description, radiologist_key_findings } = patientDetail;

  return (
    <Container>
      <h2>We will add edit button on this page</h2>
      <h3>
        We can add delete button here or add within the table on the main page
        🤔
      </h3>
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
                {radiologist_key_findings}
              </Typography>
            </Paper>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 275 }}>
          <CardMedia
            component="img"
            sx={{ width: 300 }}
            image="https://source.unsplash.com/random/900x700/?fruit"
            alt="Random photo"
          />
        </Card>
      </div>
    </Container>
  );
};

export default PatientDetailsPage;
