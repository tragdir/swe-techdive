import React, {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {Typography } from '@mui/material';
import axios from 'axios';

export default function ExamUpdateForm({id}) {

    const [updateState, setUpdateState] = useState(false)
    const [values, setValues] = useState({description: '', score: '', key_findings: '', image: ''});
    // console.log(values)

    // Set submit button disabled if values are empty
    const handleError = () => {
        let tf = true
        if(values.description !== "" && values.score !=="" && values.key_findings !=="" && values.image !==""){
            tf = false
        }
        return tf
     }


    const handleInputChange = e => {
        e.preventDefault();
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }
        const handleSubmit = async ({image, description, key_findings, score}) => {
            const scoreArray = score.split("");
           
            let scoreParser = [];

            for(var i = 0; i < scoreArray.length; i++){
                scoreParser.push(parseInt(scoreArray[i]));
            }

            console.log(scoreParser);

            const data = {image, description, key_findings, score:scoreParser};
            console.log(data)
                await axios.post(`/api/exam/${id}`, data)
                           .then(response => {
                            setUpdateState(response.data.success)
                            console.log(response.data)

                           })
                           .catch((e) => console.log(e))
                            .finally(() => window.location.reload(false))


        }


    const handleReset = async () => {
        setValues(values)
    }

        if(updateState){
            return <Typography>Exam added successfuly!</Typography>
        }

        //console.log(examInfo);
        //console.log(values.score)
        // var scores = values.score;

        // var stringParse = "";

        // for(var i = 0; i < scores.length; i++){
        //     stringParse += scores[i].toString();
        // };

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
          //error={values.image === ''}
          id="filled-error"
          label="Image URL"
          name='image'
          value={values.image}
          //helperText={values.image ? "": "Image is required"}
          style ={{width: '97%'}}
        //   variant="filled"
         onChange={handleInputChange}
        />

      </div>
      <div>
      <TextField
          //error={values.description === ""}
          id="outlined-error"
          label="Description"
          name='description'
          type='string'
          value={values.description}
          //helperText={values.description ? "": "Description is required"}
          onChange={handleInputChange}
        />

        <TextField
          //error={values.score === ''}
          id="filled-error"
          label="Brixia Score"
          type="number"
          name='score'
          onInput = {(e) =>{
            e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0,6)
        }}
          value={values.score}
          //helperText={values.score ? "": "Score is required."}
        //   variant="filled"
         onChange={handleInputChange}
         />

      </div>
      <div>
      <TextField
         // error={values.key_findings === ''}
          id="filled-error"
          multiline
          maxRows={4}
          style ={{width: '97%'}}
          label="Key Findings"
          name='key_findings'
          value={values.key_findings}
         // helperText={values.key_findings ? "": "Key findings are required"}
        //   variant="filled"
         onChange={handleInputChange}
        />
      </div>

      <Stack spacing={2} direction="row" sx={{justifyContent: 'flex-end', marginTop: '10px'}}>
      <Button variant="outlined" onClick={() => handleReset()}>Reset</Button>
      <Button variant="contained" disabled={handleError()} onClick={() => handleSubmit(values)}>Submit</Button>
    </Stack>
    </Box>
  );
}
