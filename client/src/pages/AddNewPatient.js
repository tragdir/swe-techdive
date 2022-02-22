import React, { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { FormControlLabel, RadioGroup, Radio, Container, FormLabel } from "@mui/material";


import DateAdapter from '@mui/lab/AdapterDateFns';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';



const AddNewPatient = () => {

  const initialValues = {
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    race: '',
    zipcode: '',
    latestBmi: '',
    latestWeight: '',
    icoAdmit: '',
    mortality: ''
  }

  const initialErrorValues = {
    firstName: false,
    lastName: false,
    age: false,
    gender: false,
    race: false,
    zipcode: false,
    latestBmi: false,
    latestWeight: false,
    icoAdmit: false,
    mortality: false
  }

  //intial component values
  const [firstName, setFirstName] = useState(initialValues.firstName);
  const [lastName, setLastName] = useState(initialValues.lastName);
  const [age, setAge] = useState(Date.now);
  const [gender, setGender] = useState(initialValues.gender);
  const [race, setRace] = useState(initialValues.race);
  const [zipcode, setZipcode] = useState(initialValues.zipcode);
  const [latestBmi, setLatestBmi] = useState(initialValues.latestBmi);
  const [latestWeight, setLatestWeight] = useState(initialValues.latestWeight);
  const [icoAdmit, setIcoAdmit] = useState(initialValues.icoAdmit);
  const [mortality, setmortality] = useState(initialValues.mortality);
  const [value, setValue] = useState(null);//for our calander value


  //initial error values 
  const [firstNameError, setFirstNameError] = useState(initialErrorValues.firstName);
  const [lastNameError, setLastNameError] = useState(initialErrorValues.lastName);
  const [ageError, setAgeError] = useState(initialErrorValues.age);
  const [genderError, setGenderError] = useState(initialErrorValues.gender);
  const [raceError, setRaceError] = useState(initialErrorValues.race);
  const [zipcodeError, setZipcodeError] = useState(initialErrorValues.zipcode);
  const [latestBmiError, setLatestBmiError] = useState(initialErrorValues.latestBmi);
  const [latestWeightError, setLatestWeightError] = useState(initialErrorValues.latestWeight);
  const [icoAdmitError, setIcoAdmitError] = useState(initialErrorValues.icoAdmit);
  const [mortalityError, setmortalityError] = useState(initialErrorValues.mortality);








  const handleSubmit = (e) => { //handles event when submit is clicked 
    e.preventDefault()

    errorReset();
  
    checkErrors();

    
    getAge();



  }

  return (
    <Container maxWidth='xs' >

      <Box
        component="form"
        onSubmit={handleSubmit}g
        sx={{

          height: 20,
          '& > :not(style)': { m: 1, width: '50ch' },

        }}
        noValidate
        autoComplete="off"
      >

        <Grid container spacing={2}>

          <Grid item xs={6}>
            <TextField //firstName TextField

              id="outlined-basic"
              label="Firstname"
              variant="standard"
              error={firstNameError}
              onChange={(e) => {
                if (e.target.value != '') setFirstNameError(false);
                setFirstName(e.target.value)
              }}
              
            />
          </Grid>

          <Grid item xs={6}>
            <TextField // lastName textfield
              id="outlined-basic"
              label="Lastname"
              variant="standard"
              error={lastNameError}
              onChange={(e) => {
                setLastName(e.target.value)
                if (e.target.value != '') setLastNameError(false)
              }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField //LatestBmi TextField
              id="outlined-basic"
              label="Latest Bmi"
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
            <TextField //LatestWeight Field
              id="outlined-basic"
              label="Latest Weight"
              variant="standard"
              type="number"
              error={latestWeightError}
              onChange={(e) => {
                setLatestWeight(e.target.value)
                if (!isNaN(e.target.value) && parseInt(e.target.value) > 0 && e.target.value != '') { setLatestWeightError(false); }
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
                  value='icoAdmit_Yes'
                  control={<Radio />}
                  label="Yes"
                />
                <FormControlLabel
                  value='icoAdmit_No'
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
                  value='mortality_Yes'
                  control={<Radio />}
                  label="Yes"
                />
                <FormControlLabel
                  value='mortality_No'
                  control={<Radio />}
                  label="No"
                />
              </RadioGroup>
            </Container>
          </Grid>

        <Grid item xs={12}>
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

        </Grid>








        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker

            label="Birthdate:"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);

            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>






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














        <Button variant="contained" type="submit">Submit</Button>



      </Box>

    </Container>
  );




  //FUNCTIONS

  function errorReset() {
    setFirstNameError(false);
    setLastNameError(false);
    setAgeError(false);
    setGenderError(false);
    setRaceError(false);
    setZipcodeError(false);
    setLatestBmiError(false);
    setLatestWeightError(false);
    setIcoAdmitError(false);
    setmortalityError(false);
  }



  function checkErrors() {
    
    if (firstName == '') { setFirstNameError(true); }
    if (lastName == '') { setLastNameError(true); }

    //need to think about the age field


    if (gender == '') { setGenderError(true) }
    if (race == '') { setRaceError(true) }
    if (isNaN(zipcode) || zipcode.length < 5 || zipcode.length > 5 || zipcode == '') { setZipcodeError(true) }
    if (isNaN(latestBmi) || parseInt(latestBmi) < 0 || latestBmi == '') { setLatestBmiError(true); }
    if (isNaN(latestWeight) || parseInt(latestWeight) < 0 || latestWeight == '') { setLatestWeightError(true); }
    if (icoAdmit == '') { setIcoAdmitError(true); }
    if (mortality == '') { setmortalityError(true); }


  }


  function getAge() {
    const today = new Date();
    const birthDate = new Date(value);


    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }





};




export default AddNewPatient;
