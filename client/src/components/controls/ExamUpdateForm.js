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

export default function ExamUpdateForm({examInfo}) {

    const [updateState, setUpdateState] = useState(false)
    const [values, setValues] = useState(examInfo);
    // console.log(values)

    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }
        const handleSubmit = async ({image, description, key_findings, score}) => {
            const scoreArray = score.toString().split("");
            let scoreParser = [];

            for(var i = 0; i < scoreArray.length; i++){
                scoreParser.push(parseInt(scoreArray[i]));
            }

            console.log(scoreParser);

            const data = {image, description, key_findings, score: scoreParser};
            console.log(data)
                await axios.put(`/api/exam/${examInfo._id}`, data)
                           .then(response => {
                            setUpdateState(response.data.success)
                            console.log(response.data)

                           })
                           .catch((e) => console.log(e))
                           .finally(() => window.location.reload(false))
        }


    const handleReset = async () => {
        setValues(examInfo)
    }

        if(updateState){
            return <Typography>Exam updated successfuly!</Typography>
        }

        //console.log(examInfo);
        //console.log(values.score)
        var scores = values.score;

        var stringParse = "";

        for(var i = 0; i < scores.length; i++){
            stringParse += scores[i].toString();
        };

        //console.log(stringParse);

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
          label="ID"
          name='description'
          type='string'
          value={values.patient}
          disabled
          style ={{width: '97%'}}
        />

<TextField
          error={values.image === ''}
          id="filled-error"
          label="Image URL"
          name='image'
          value={values.image}
          helperText={values.image ? "": "Image is required"}
          style ={{width: '97%'}}
        //   variant="filled"
         onChange={handleInputChange}
        />


    {/* <FormControl>
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
    </FormControl> */}
      </div>
      <div>
      <TextField
          error={values.description === ""}
          id="outlined-error"
          label="Description"
          name='description'
          type='string'
          value={values.description}
          helperText={values.description ? "": "Description is required"}
        //   style ={{width: '97%'}}
          onChange={handleInputChange}
        />

        <TextField
          error={values.score === ''}
          id="filled-error"
          label="Brixia Score"
          type="number"
          name='score'
          onInput = {(e) =>{
            e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0,6)
        }}
          value={stringParse}
          helperText={values.score ? "": "Score is required."}
        //   variant="filled"
         onChange={handleInputChange}
         />

      </div>
      <div>
      <TextField
          error={values.key_findings === ''}
          id="filled-error"
          multiline
          maxRows={4}
          style ={{width: '97%'}}
          label="Key Findings"
          name='key_findings'
          value={values.key_findings}
          helperText={values.key_findings ? "": "Key findings are required"}
        //   variant="filled"
         onChange={handleInputChange}
        />
      </div>

      <Stack spacing={2} direction="row" sx={{justifyContent: 'flex-end', marginTop: '10px'}}>
      <Button variant="outlined" onClick={() => handleReset()}>Reset</Button>
      <Button variant="contained" onClick={() => handleSubmit(values)}>Update</Button>
    </Stack>
    </Box>
  );
}
