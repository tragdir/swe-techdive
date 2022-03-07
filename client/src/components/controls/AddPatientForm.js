import React, { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { FormControlLabel, RadioGroup, Radio, Container, FormLabel } from "@mui/material";
import axios from 'axios';


const AddPatientForm = () => {

  const initialValues = {
 
    age: '',
    gender: '',
    race: '',
    zipcode: '',
    latestBmi: '',
    icoAdmit: '',
    mortality: ''
  }

  const initialErrorValues = {

    age: false,
    gender: false,
    race: false,
    zipcode: false,
    latestBmi: false,
    icoAdmit: false,
    mortality: false
  }

  //intial component values

  const [age, setAge] = useState(initialValues.age);
  const [gender, setGender] = useState(initialValues.gender);
  const [race, setRace] = useState(initialValues.race);
  const [zipcode, setZipcode] = useState(initialValues.zipcode);
  const [latestBmi, setLatestBmi] = useState(initialValues.latestBmi);
  const [icoAdmit, setIcoAdmit] = useState(initialValues.icoAdmit);
  const [mortality, setmortality] = useState(initialValues.mortality);


  //initial error values 
 
  const [ageError, setAgeError] = useState(initialErrorValues.age);
  const [genderError, setGenderError] = useState(initialErrorValues.gender);
  const [raceError, setRaceError] = useState(initialErrorValues.race);
  const [zipcodeError, setZipcodeError] = useState(initialErrorValues.zipcode);
  const [latestBmiError, setLatestBmiError] = useState(initialErrorValues.latestBmi);
  const [icoAdmitError, setIcoAdmitError] = useState(initialErrorValues.icoAdmit);
  const [mortalityError, setmortalityError] = useState(initialErrorValues.mortality);


  const [values,setValues] = useState({});

  const [success,setSuccess] = React.useState(false);



  const handleSubmit = (e) => { //handles event when submit is clicked 
    e.preventDefault()
    errorReset();
    
  let patientModel =[];

    
   if(!hasErrors()){
    patientModel = {
      "age" : age,
      "sex" : gender[0],
      "race" : race,
      "zip" : zipcode,
      "latest_bmi" : latestBmi,
      "icu_admit" : icoAdmit,
      "mortality" : mortality
    };
  
    //axios post
    const   addNewPatient = async () =>{
      const result = axios.post ('api/patient', patientModel)
      console.log(result.data)
    }

    addNewPatient();

  
    
   }

   
  }////



  return (
    <Container maxWidth='xs' >

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{

          height: 20,
          '& > :not(style)': { m: 1, width: '50ch' },

        }}
        noValidate
        autoComplete="off"
      >

        <Grid container spacing={2}>


        <Grid item xs={4}>
            <TextField //Age
            
              id="outlined-basic"
              label="Age"
              variant="standard"
              type="number"
              error={ageError}
              onChange={(e) => {
                setAge(e.target.value)
                if (!isNaN(e.target.value) && parseInt(e.target.value) > 0 && e.target.value != '') { setAgeError(false); }

              }}
            />
          </Grid>

        <Grid item xs={8}>
        <Container maxWidth="sx" >

          <FormLabel 
            required
            error={genderError}
          >
            Gender:
          </FormLabel>

          <RadioGroup //Radiobutton Group for GENDER:
            sx={{ flexDirection: 'row' }}
            value={gender}

            onChange={(e) => {
              setGender(e.target.value)
              if (e.target.value != '') setGenderError(false)
            }}

          >
            <FormControlLabel
              value='Male'
              control={<Radio />}
              label="Male"
            />

            <FormControlLabel
              value='Female'
              control={<Radio />}
              label="Female"
            />
          </RadioGroup>
        </Container>

        </Grid>
          
          
        <Container maxWidth="xs">

          <FormLabel
            required
            error={raceError}
          >
            Race:</FormLabel>

          <RadioGroup //RadioButton Group for the race 
            sx={{ flexDirection: 'column' }}
            value={race}
            onChange={(e) => {
              setRace(e.target.value)
              if (e.target.value != '') setRaceError(false)
            }}
          >
            <FormControlLabel
              value='Native_Hawaiian_or_Pacific_Islander'
              control={<Radio />}
              label="Native Hawaiian or other Pacific Islander"
            />

            <FormControlLabel
              value='Black_or_Afican_American'
              control={<Radio />}
              label="Black or African American"
            />

            <FormControlLabel
              value='Asian'
              control={<Radio />}
              label="Asian"
            />
            <FormControlLabel
              value='White'
              control={<Radio />}
              label="White"
            />
            <FormControlLabel
              value='Other'
              control={<Radio />}
              label="Other"
            />

          </RadioGroup>


        </Container>

        <Grid item xs={6}>
        <TextField //Zipcode TextField
          id="outlined-basic"
          label="Zipcode"
          variant="standard"
          type="number"
          error={zipcodeError}
          onChange={(e) => {
            setZipcode(e.target.value)
            if (!isNaN(e.target.value) && e.target.value.length == 5 && e.target.value != '') { setZipcodeError(false) }
          }}
        />
        </Grid>
        <Grid item xs={4}>
            <TextField //Latest Bmi
            
              id="outlined-basic"
              label="LatestBmi"
              variant="standard"
              type="number"
              error={latestBmiError}
              onChange={(e) => {
                setLatestBmi(e.target.value)
                if (!isNaN(e.target.value) && parseInt(e.target.value) > 0 && e.target.value != '') { setLatestBmiError(false); }

              }}
            />
          </Grid>

  

          <Grid item xs={6}>

            <Container maxWidth="xs">
              <FormLabel
                required
                error={icoAdmitError}

              >
                IcoAdmit:</FormLabel>
              <RadioGroup //RadioButton Group for the IcoAdmit 
                sx={{ flexDirection: 'column' }}
                value={icoAdmit}
                onChange={(e) => {
                  setIcoAdmit(e.target.value)
                  if (e.target.value != '') setIcoAdmitError(false)
                }}
              >
                <FormControlLabel
                  value='Yes'
                  control={<Radio />}
                  label="Yes"
                />
                <FormControlLabel
                  value='No'
                  control={<Radio />}
                  label="No"
                />
              </RadioGroup>
            </Container>

          </Grid>

          <Grid item xs={6}>
            <Container maxWidth="xs">
              <FormLabel
                required
                error={mortalityError}
              >
                Mortality:</FormLabel>
              <RadioGroup //RadioButton Group for the MORTALITY 
                sx={{ flexDirection: 'column' }}
                value={mortality}
                onChange={(e) => {
                  setmortality(e.target.value)
                  if (e.target.value != '') setmortalityError(false)
                }}
              >
                <FormControlLabel
                  value='Yes'
                  control={<Radio />}
                  label="Yes"
                />
                <FormControlLabel
                  value='No'
                  control={<Radio />}
                  label="No"
                />
              </RadioGroup>
            </Container>
          </Grid>

 
        </Grid>
       
        <Button variant="contained" type="submit" >Submit</Button>



      </Box>

    </Container>
  );




  //FUNCTIONS

  function errorReset() {
  
    setAgeError(false);
    setGenderError(false);
    setRaceError(false);
    setZipcodeError(false);
    setLatestBmiError(false);
    setIcoAdmitError(false);
    setmortalityError(false);
  }



  function hasErrors() {
    const erros = new Array();
    if (isNaN(age) || parseInt(age) < 0 || age == '') { setAgeError(true);
     erros.push(true);}


    if (gender == '') { setGenderError(true);erros.push(true);}
    if (race == '') { setRaceError(true);erros.push(true); }
    if (isNaN(zipcode) || zipcode.length < 5 || zipcode.length > 5 || zipcode == '') { setZipcodeError(true); erros.push(true); }
    if (isNaN(latestBmi) || parseInt(latestBmi) < 0 || latestBmi == '') { setLatestBmiError(true); erros.push(true); }
    if (icoAdmit == '') { setIcoAdmitError(true);erros.push(true); }
    if (mortality == '') { setmortalityError(true); erros.push(true);}

  return erros.includes(true);

  }


};




export default AddPatientForm ;

