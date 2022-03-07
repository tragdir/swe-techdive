import React, { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Select } from "@mui/material";
import { deepPurple } from '@mui/material/colors';





const CreateExam = () => {
    const bgcolor = deepPurple[50]
    const state = {
        Image: '',
        Keyfinding: '',
        Description: ''

    }
    const [Image, setImage] = useState(state.Image);
    const [Keyfinding, setKeyfinding] = useState(state.Keyfinding);
    const [Description, setDescription] = useState(state.Description);

    return (
        <div>
            <Grid
                container
                justify="center"
                alignItems="center"
                direction="column"
                style={{
                    minHeight: "100vh",
                    background: bgcolor
                }}
                spacing={4}
            >
                <Box sx={{ fontSize: 90, color: "Red" }}>CREATE EXAM</Box>
                <Grid spacing={-10} container alignItems="flex-start" direction="column">
                    <Box sx={{ fontSize: 50, color: "black" }}>EXAM INFO</Box>

                    <Box><TextField id="outlined-basic" label="Image URL" placeholder="Image Link" variant="outlined" margin="dense" focused
                        onChange={(event) => { setImage(event.target.value) }} /></Box> {/* Image Link */}


                    <Box><TextField id="outlined-basic" label="Key Findings" variant="outlined" margin="dense" focused
                        onChange={(event) => { setKeyfinding(event.target.value) }} /></Box> {/* KeyFinding */}  
                        

                    <Box width={350}><TextField id="outlined-basic" label="Description" variant="outlined" placeholder="Description of patient exam" fullWidth 
                     margin="dense" focused
                        onChange={(event) => { setDescription(event.target.value) }}
                        multiline={true}
                        rows={7}
                        /></Box> {/* Description */}
                    <div>
                        <Button className="submit" variant="contained" color="primary"
                            onClick={() => <div></div>}> submit
                        </Button>
                    </div>




                </Grid>

            </Grid>

        </div>
    )

};




export default CreateExam;
