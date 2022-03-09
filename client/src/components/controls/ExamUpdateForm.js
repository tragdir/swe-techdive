import React, {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {Typography } from '@mui/material';
import axios from 'axios';

export default function ExamUpdateForm({examInfo}) {

    const [updateState, setUpdateState] = useState(false)
    const [values, setValues] = useState(examInfo);

    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }


        const handleSubmit = async ({image, description, key_findings, score}) => {

          // This code fixes the error: Object added to array of brixia when image url edited
            let scoreArray;

            if(typeof(score) == "string"){

              scoreArray = score.split("");

            } else if (typeof(score) == "object"){

              scoreArray = score.toString().split("").map(Number).filter(i => i);

            }

            let scoreParser = [];

            for(var i = 0; i < scoreArray.length; i++){
              scoreParser.push(parseInt((isNaN(scoreArray[i]) ? 0 : scoreArray[i])));

            }

           
            // Destruction the values to send to the DB
            const data = {image, description, key_findings, score: scoreParser};
                await axios.put(`/api/exam/${examInfo._id}`, data)
                           .then(response => {
                            setUpdateState(response.data.success)

                           })
                           .catch((e) => console.log(e))
                           .finally(() => window.location.reload(false))
        }

// Reset back to original
    const handleReset = async () => {
        setValues(examInfo)
    }

        if(updateState){
            return <Typography>Exam updated successfuly!</Typography>
        }

        // Converting Brixia score array to string
        var scores = values.score;

        var stringParse = "";

        for(var i = 0; i < scores.length; i++){
            stringParse += scores[i].toString();
        };


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
