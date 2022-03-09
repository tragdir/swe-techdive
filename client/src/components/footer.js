import React from "react";
// import { AppBar, Toolbar, Typography, Grid } from "@material-ui/core";
import { Group, Info} from "@mui/icons-material";
import { AppBar, Typography, Grid } from "@mui/material";

const Footer = () =>
<div style={{marginBottom: "0px"}}>
      <AppBar position="static" color = "primary" >
       <Grid container justify="center" style={{minHeight: "180px"}}>
            <Grid container item sm={6} xs={11} justify="space-between">
                <Grid item sm={5} xs={12}>
                    <Info color="action" />
                    <Typography paragraph>
                        SWE COVID-19 Mini Project
                        Hack.Diversity 2022 Cohort.
                    </Typography>
                </Grid>
                <Grid item sm={5} xs={11}>
                    <Group color="action" />
                    <Typography paragraph>
                         Team Hack-Avengers Members:
                         Amanda Bazelais, Wilyendri Duran, Melaku Tachbele, Malik Siguenza, Nicolas Salazar,
                        Vladimir Pierre-Louis & Allyson Ochoa
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
      </AppBar>

      </div>

export default Footer;
