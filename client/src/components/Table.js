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
import Button from '@mui/material/Button';

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


const PTable = ({ columns, data }) => {

  const actionButtons = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "Edit",
        Header: "Edit",
        Cell: ({ row }) => (
          <Button variant="outlined" onClick={() => alert("Editing: " + row.values.id)}>
            Edit
          </Button>
        ),
      },
    ]);
  }

  const tableInstance = useTable(  
    {
    columns,
    data,
    initialState: {
      hiddenColumns: ["createdAt", "updatedAt", "__v", "_id", "race", "patient_id"]
    }
    },
    useGlobalFilter,
    useSortBy
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
