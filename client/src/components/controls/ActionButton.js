import React from 'react'
import { Button } from '@mui/material'

// const useStyles = makeStyles(theme => ({
//     root: {
//         minWidth: 0,
//         margin: theme.spacing(0.5)
//     },
//     secondary: {
//         backgroundColor: theme.palette.secondary.light,
//         '& .MuiButton-label': {
//             color: theme.palette.secondary.main,
//         }
//     },
//     primary: {
//         backgroundColor: theme.palette.primary.light,
//         '& .MuiButton-label': {
//             color: theme.palette.primary.main,
//         }
//     },
// }))

const ActionButton = (props) => {
    const { color, children, onClick } = props;
    // const classes = useStyles();

    return (
        <Button
            onClick={onClick}>
            {children}
        </Button>
    )
}

export default ActionButton