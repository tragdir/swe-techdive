import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { MenuItem, Typography } from '@mui/material';
import axios from 'axios';

export default function PatientUpdateForm({patientInfo}) {

    const [updateState, setUpdateState] = useState(false)
    const [values, setValues] = useState(patientInfo);
    // console.log(values)

    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })

    }
        const handleSubmit = async ({age, sex, race, zip, icu_admit, latest_bmi, mortality}) => {
            const data = {age, sex, race, zip, icu_admit, latest_bmi, mortality};
            console.log(data)
                await axios.put(`/api/patient/${patientInfo._id}`, data)
                           .then(response => {
                            setUpdateState(response.data.success)
                            console.log(response.data)

                           })
                           .catch((e) => console.log(e))
                           .finally(() => window.location.reload(false))
        }


    const handleReset = async () => {
        setValues(patientInfo)
    }

        if(updateState){
            return <Typography>Patient updated successfuly!</Typography>
        }

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          error={values.age === ""}
          id="outlined-error"
          label="Age"
          name='age'
          type='number'
          value={values.age}
          helperText={values.age ? "": "Age is required"}
          onChange={handleInputChange}
        />
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="sex"
        label="Gender"
        value={values.sex}
        onChange={handleInputChange}
      >
        <FormControlLabel value="F" control={<Radio />} label="Female" />
        <FormControlLabel value="M" control={<Radio />} label="Male" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
      </RadioGroup>
    </FormControl>
      </div>
      <div>
      <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Race</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="race"
        label="Race"
        value={values.race}
        onChange={handleInputChange}
      >
        <FormControlLabel value="BLACK OR AFRICAN AMERICAN" control={<Radio />} label="Black or African American" />
        <FormControlLabel value="WHITE" control={<Radio />} label="White" />
      </RadioGroup>
    </FormControl>


        <TextField
          error={values.zip === ''}
          id="filled-error"
          label="zip"
          type="number"
          name='zip'
          value={values.zip}
          helperText={values.zip ? "": "Zip is required"}
        //   variant="filled"
         onChange={handleInputChange}
        />
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">ICU Admit</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="icu_admit"
        label="ICU Admit"
        value={values.icu_admit}
        onChange={handleInputChange}
      >
        <FormControlLabel value="N" control={<Radio />} label="No" />
        <FormControlLabel value="Y" control={<Radio />} label="Yes" />
      </RadioGroup>
    </FormControl>
      </div>
      <div>

        <TextField
          error={values.latest_bmi === ''}
          id="filled-error"
          label="BMI"
          type="number"
          name='latest_bmi'
          value={values.latest_bmi}
          helperText={values.latest_bmi ? "": "BMI is required"}
        //   variant="filled"
         onChange={handleInputChange}
        />
         <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Mortality</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="mortality"
        label="Martality"
        value={values.mortality}
        onChange={handleInputChange}
      >
        <FormControlLabel value="N" control={<Radio />} label="No" />
        <FormControlLabel value="Y" control={<Radio />} label="Yes" />
      </RadioGroup>
    </FormControl>
      </div>
      <Stack spacing={2} direction="row" sx={{justifyContent: 'flex-end', marginTop: '10px'}}>
      <Button variant="outlined" onClick={() => handleReset()}>Reset</Button>
      <Button variant="contained" onClick={() => handleSubmit(values)}>Update</Button>
    </Stack>
    </Box>
  );
}
