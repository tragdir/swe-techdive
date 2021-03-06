import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CoronavirusIcon from "@mui/icons-material/Coronavirus";

import Typography from "@mui/material/Typography";

import AccountCircle from "@mui/icons-material/AccountCircle";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Header() {
  
  const linkStyle = {
    textDecoration: "none",
    color: "white",
  };

  // function refreshPage() {
  //   window.location.reload();
  // }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ marginBottom: "1rem" }}>
        <Toolbar>
          <Link to={"/patients"} style={linkStyle}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              // onClick={ refreshPage }
            >
              <CoronavirusIcon />
            </IconButton>
          </Link>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            COVID-19 Radiology Report
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              display: {
                md: "flex",
              },
              justifyContent: "space-between",
            }}
          >
            <Link to={"/admin"} style={linkStyle}>
              <Button
                variant="outlined"
                size="large"
                edge="end"
                color="inherit"
                // onClick={ refreshPage }
              >
                Admin &nbsp;
                <AccountCircle />
              </Button>
            </Link>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-haspopup="true"
              color="inherit"
            ></IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
