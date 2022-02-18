import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';


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
            margin: ".1rem auto",
            
          }}
        >
          <InputLabel htmlFor="input-with-icon-adornment">
          {`${count} records`}
        </InputLabel>
          <Input fullWidth label={`${count} records`} id="fullWidth" value={value || ""} onChange={(e) => {
              setValue(e.target.value);
              onChange(e.target.value)
          }}  startAdornment={
            <InputAdornment position="start">
              <SearchOutlinedIcon/>
            </InputAdornment>
          } />
        </Box>
      );
};

export default GlobalFilter;

