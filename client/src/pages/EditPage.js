import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function EditPage({singleExam}) {
  const [value, setValue] = React.useState('Controlled');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  if(singleExam.patient === undefined) {
    <h1>No exam</h1>
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
          id="outlined-multiline-flexible"
          label="Patient"
          multiline
          maxRows={4}
          value={singleExam.patient}
          onChange={handleChange}
          disabled
        />
        <TextField
          id="outlined-multiline-flexible"
          label="Description"
          multiline
          maxRows={4}
          value={singleExam.description}
          onChange={handleChange}
        />
        <TextField
          id="outlined-multiline-static"
          label="Key Findings"
          multiline
          rows={4}
          value={singleExam.key_findings}
        />

      </div>
      <div>
        <TextField
          id="filled-textarea"
          label="Image Url"
          value={singleExam.image}
          multiline
          variant="filled"
        />
        <TextField
          id="filled-multiline-flexible"
          label="Birixia"
          multiline
          maxRows={4}
          value={singleExam.score.join(',')}
          onChange={handleChange}
          variant="filled"
        />
      </div>
      
    </Box>
  );
}
