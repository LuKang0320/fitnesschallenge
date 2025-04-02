import PropTypes from 'prop-types';
import { useMemo, useEffect, Fragment, useState, useRef } from 'react';
//import { useNavigate } from 'react-router';
import React from 'react';
// material-ui
import {
  Box,
  Chip,
  Tabs,
  Tab,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useMediaQuery,
  Button,Grid,Typography
} from '@mui/material';
import AnimateButton from 'components/@extended/AnimateButton';
import { alpha, useTheme } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';

// third-party
import { useExpanded, useFilters, useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable } from 'react-table';


// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';

import { CSVExport, HeaderSort, IndeterminateCheckbox, TablePagination, TableRowSelection } from 'components/third-party/ReactTable';

//import { dispatch , useSelector} from 'store';

import { renderFilterTypes, GlobalFilter } from 'utils/react-table';
import DailyBarChart from 'sections/dashboard/fitnessadmin/DailyBarChart';
import useHCSS from 'hooks/useHCSS';

// ==============================|| REACT TABLE ||============================== //

function FReactTable({ columns, data }) {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  const defaultColumn = useMemo(() => ({ Filter: GlobalFilter }), []);
  const filterTypes = useMemo(() => renderFilterTypes, []);
  const initialState = useMemo(
    () => ({
      filters: [{ id: 'rolename', value: '' }],
      hiddenColumns: ['userid', 'roleid','rolename'],
      pageIndex: 0,
      pageSize: 10
    }),
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    gotoPage,
    setPageSize,
    state: { globalFilter, selectedRowIds, pageIndex, pageSize },
    preGlobalFilteredRows,
    setGlobalFilter,
    setFilter,
    toggleAllRowsSelected
  } = useTable(
    {
      columns,
      data,
      filterTypes,
      defaultColumn,
      initialState
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect
  );

  const componentRef = useRef(null);

  // ================ Tab ================

  const groups = ['All', ...new Set(data.map((item) => item.rolename))];
  const countGroup = data.map((item) => item.rolename);
  const counts = countGroup.reduce(
    (acc, value) => ({
      ...acc,
      [value]: (acc[value] || 0) + 1
    }),
    {}
  );

  const [activeTab, setActiveTab] = useState(groups[0]);

  useEffect(() => {
    setFilter('rolename', activeTab === 'All' ? '' : activeTab);
    // eslint-disable-next-line
  }, [activeTab]);

  return (
    <>
      <Box sx={{ p: 0, pb: 0, width: '100%',display: 'none' }}>
        <Tabs value={activeTab} onChange={(e, value) => setActiveTab(value)} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          {groups.map((status, index) => (
            <Tab
              key={index}
              label={status}
              value={status}
              icon={
                <Chip
                  label={
                    status === 'All'
                      ? data.length
                      : status === 'Project Staff Member'
                      ? counts['Project Staff Member']
                      : status === 'Branch Manager'
                      ? counts['Branch Manager']
                      : status === 'Incatech Accounting'
                      ? counts['Incatech Accounting']
                      : status === 'Program Manager'
                      ? counts['Program Manager']
                      :0
                      
                  }
                  color={status === 'All' ? 'primary' : status === 'Project Staff Member' ? 'success' : status === 'Branch Manager' ? 'warning' : 'error'}
                  variant="light"
                  size="small"
                />
              }
              iconPosition="end"
            />
          ))}
        </Tabs>
      </Box>
      <Stack direction={matchDownSM ? 'column' : 'row'} spacing={1} justifyContent="space-between" alignItems="center" sx={{ p:0, pb: 3,display: 'none' }}>
        <Stack direction={matchDownSM ? 'column' : 'row'} spacing={2}>
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            size="small"
          />
        </Stack>
        <Stack direction={matchDownSM ? 'column' : 'row'} alignItems="center" spacing={matchDownSM ? 1 : 0}>
          <TableRowSelection selected={Object.keys(selectedRowIds).length} />       
              <AnimateButton>
                <Button disableElevation startIcon={<AddIcon />}  variant="outlined"   sx={{ my: 0, ml: 3, mr:3}}>
                  Add New User
                </Button>
              </AnimateButton>
           
          <CSVExport data={data} filename={'allusers.csv'} />
        </Stack>
      </Stack>
      <Box ref={componentRef}>
        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup, i) => (
              <TableRow key={i} {...headerGroup.getHeaderGroupProps()} sx={{ '& > th:first-of-type': { width: '220px' } }}>
                {headerGroup.headers.map((column, x) => (
                  <TableCell key={x} {...column.getHeaderProps([{ className: column.className }])}>
                    <HeaderSort column={column} sort />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <Fragment key={i}>
                  <TableRow
                    {...row.getRowProps()}
                    onClick={() => {
                      toggleAllRowsSelected(false);
                      row.toggleRowSelected();
                    }}
                    sx={{ cursor: 'pointer', bgcolor: row.isSelected ? alpha(theme.palette.primary.lighter, 0.35) : 'inherit' }}
                  >
                    {row.cells.map((cell, i) => (
                      <TableCell key={i} {...cell.getCellProps([{ className: cell.column.className }])}>
                        {cell.render('Cell')}
                      </TableCell>
                    ))}
                  </TableRow>
                </Fragment>
              );
            })}
            <TableRow sx={{ '&:hover': { bgcolor: 'transparent !important' } }}>
              <TableCell sx={{ p: 2, py: 3 }} colSpan={9}>
                <TablePagination gotoPage={gotoPage} rows={rows} setPageSize={setPageSize} pageSize={pageSize} pageIndex={pageIndex} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </>
  );
}

FReactTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array
};


// Section Cell and Header
const SelectionCell = ({ row }) => <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />;
const SelectionHeader = ({ getToggleAllPageRowsSelectedProps }) => (
  <IndeterminateCheckbox indeterminate {...getToggleAllPageRowsSelectedProps()} />
);

SelectionCell.propTypes = {
  row: PropTypes.object
};

SelectionHeader.propTypes = {
  getToggleAllPageRowsSelectedProps: PropTypes.func
};

const Adminlandingview = () => {
  const { GetAllUsers } = useHCSS();

  const [list, setList] = React.useState([]);

   const [fitnessdata, setFitnessdata] = useState([]);
  useEffect(() => {
    const init = async () => {   
      let listsres = await GetAllUsers(1);
      setList(listsres.data);
      setFitnessdata([10,20,30,40,50,60,70,80,40,50,60,70,80]);
    };

    init();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: 'User Name',
        accessor: 'username',
        //className: 'cell-center'//,
        //disableFilters: true
      },
      {
        Header: 'Role',
        accessor: 'rolename'
      },
      {
        Header: 'User ID',
        accessor: 'userid'
      },
      {
        Header: 'Total Minutes',
        //accessor: 'roleid'
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );


  return (
    <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <MainCard content={false}>
            <ScrollX>
              <FReactTable columns={columns} data={list} />
            </ScrollX>
          </MainCard>
          </Grid>
          <Grid item xs={12} sm={6}>
            <MainCard sx={{ mt: 0, mb:1 }} content={false}>
              <Box sx={{ p: 2, pb: 0 }}>
                <Stack spacing={0.5}>
                  <Typography variant="h6" >
                    Statistics: 180 minutes
                  </Typography>
                </Stack>
              </Box>
              <DailyBarChart rdata={fitnessdata}/>
            </MainCard>
          </Grid>
      </Grid>
  );
};

Adminlandingview.propTypes = {
};

export default Adminlandingview;
