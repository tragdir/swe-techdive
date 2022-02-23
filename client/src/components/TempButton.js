import React from "react";
import { Button } from '@mui/material';

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


export default Buttons;