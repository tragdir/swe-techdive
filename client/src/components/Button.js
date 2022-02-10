import React from "react";
import { Button } from '@mui/material';
import PatientTable from "../pages/PatientTable";



const Buttons = (props) => {
   
    
    return (
        <div>
            <Button
                className="cncelbtn"
                variant="contained"
                color="primary"
                onClick={() =>
                    <div>
                        {alert("returning to prev page")}
                        {window.history.back()}
                    </div>

                }> cancel
            </Button>

        </div>
    );

}
// const hidding = withRouter(Buttons);

export default Buttons;