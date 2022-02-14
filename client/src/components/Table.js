import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { styled } from '@mui/material/styles';
import { useTable, useGlobalFilter, useSortBy} from "react-table";
import GlobalFilter from "./GlobalFilter";

// ******************************************************
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from "react-router-dom";
import axios from "axios";
// ****************************************************


//  ************* Styled Table *************
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
//  ************* Styled Table *************


const PTable = ({ columns, data, setPatientInfo }) => {
  
  const [idOfItemToDelete, setIdOfItemToDelte]  = React.useState('')
  const [deleteSuccess, setDeleteSuccess] = React.useState(false)
    // Delete item from table
  React.useEffect(() => {
    const deleteItem = async (id) => {
      try {
        setIdOfItemToDelte(id)
        const result = await axios.delete(`/api/patient/${id}`)
        setDeleteSuccess(true)
        console.log(result.data)
        setDeleteSuccess(false)
        setIdOfItemToDelte("")
      } catch (error) {
        console.log(error)
      }
    }
    deleteItem(idOfItemToDelete);
    
  }, [idOfItemToDelete])


  React.useEffect(() => {
    setPatientInfo(deleteSuccess ? data.filter(item => item.patient !== idOfItemToDelete) : data)
  }, [deleteSuccess])

  const actionButtons = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "modify",
        Header: "Modify",
        Cell: ({ row }) => (
          
          <Grid item xs={8}>
                  <DeleteForeverIcon sx={{cursor: "pointer"}} onClick={() => setIdOfItemToDelte(row.values._id)}/>
                  <EditIcon onClick={() => <Link to={`/patient/${row.values._id}/edit`} component="link" underline="hover"/>}/>
            </Grid>
        ),
      },
    ]);
  }

 
  // console.log(data.filter(item => item.patient !== idOfItemToDelete))
  // console.log(deleteSuccess)


  const tableInstance = useTable(  
    {
    columns,
     data,
    initialState: {
      hiddenColumns: ["createdAt", "updatedAt", "__v", "race", "patient_id",]
    }
    },
    useGlobalFilter,
    useSortBy,
    actionButtons
  )
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    state,
  } = tableInstance;

  // Render the UI for your table
  // Material UI
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };  
  // *************************************

  
  return (
    <Paper sx={{ width: "100%", overflow: "hidden", margin: ".6rem" }}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <GlobalFilter preGlobalFilteredRows={preGlobalFilteredRows} 
        setGlobalFilter={setGlobalFilter} globalFilter={state.globalFilter}/>
        <Table {...getTableProps()} stickyHeader aria-label="sticky table">
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()} >
                {headerGroup.headers.map((column) => (
                  <StyledTableCell
                    style={{ minWidth: "170" }}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                    {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼"): ""}
                  </StyledTableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, i) => {
                prepareRow(row);
                return (
                  <StyledTableRow hover {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <TableCell {...cell.getCellProps()} align="left">
                          {cell.render("Cell")}
                        </TableCell>
                      );
                    })}
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default PTable;
