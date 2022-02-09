import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { display } from "@mui/system";

const GlobalFilter = ({preGlobalFilteredRows, globalFilter, setGlobalFilter}) => {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = useState(globalFilter);
    const onChange = useAsyncDebounce((value) => {
      setGlobalFilter(value || undefined);
    }, 300);

    return (
        <Box
          sx={{
            width: "50%",
            margin: "1rem auto",
            
          }}
        >
          <TextField fullWidth label={`${count} records`} id="fullWidth" value={value || ""} onChange={(e) => {
              setValue(e.target.value);
              onChange(e.target.value)
          }} />
        </Box>
      );
};

export default GlobalFilter;

