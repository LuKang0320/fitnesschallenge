import PropTypes from 'prop-types';
import { useMemo, useEffect, Fragment, useState , useRef } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React from 'react';
// material-ui
import {
  Box,
  Chip,
  //Tabs,
  //Tab,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useMediaQuery,
  Tooltip
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

// third-party
import { useExpanded, useFilters, useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable } from 'react-table';
import {  DownloadOutlined  } from '@ant-design/icons';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import IconButton from 'components/@extended/IconButton';
import { CSVExport, HeaderSort, IndeterminateCheckbox, TablePagination, TableRowSelection } from 'components/third-party/ReactTable';
import { renderFilterTypes, GlobalFilter } from 'utils/react-table';

import useHCSS from 'hooks/useHCSS';

// ==============================|| REACT TABLE ||============================== //


function ReactTable({ columns, data }) {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  const defaultColumn = useMemo(() => ({ Filter: GlobalFilter }), []);
  const filterTypes = useMemo(() => renderFilterTypes, []);
  const initialState = useMemo(
    () => ({
      filters: [{ id: 'month', value: '' }],
      hiddenColumns: ['id'],
      pageIndex: 0,
      pageSize: 5
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

  const groups = ['All', ...new Set(data.map((item) => item.month))];
  // const countGroup = data.map((item) => item.month);
  // const counts = countGroup.reduce(
  //   (acc, value) => ({
  //     ...acc,
  //     [value]: (acc[value] || 0) + 1
  //   }),
  //   {}
  // );

  const [activeTab, setActiveTab] = useState(groups[0]);

  useEffect(() => {
    setFilter('month', activeTab === 'All' ? '' : activeTab);
    // eslint-disable-next-line
  }, [activeTab]);

  function selectOnchange(e){
    //console.log(e);
    setActiveTab(e.target.value);
  }

  return (
    <>
      <Box sx={{ p: 3, pb: 0, width: '100%', display:'none' }}>
        {/* <Tabs value={activeTab} onChange={(e, value) => setActiveTab(value)} sx={{ borderBottom: 1, borderColor: 'divider' }}>
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
                      : status === '2023'
                      ? counts['2023']
                      : status === 'Full'
                      ? counts.Full
                      : counts.Open
                  }
                  color={status === 'All' ? 'primary' : status === '2023' ? 'success' : 'warning'}
                  variant="light"
                  size="small"
                />
              }
              iconPosition="end"
            />
          ))}
        </Tabs> */}
      </Box>
      <Stack direction={matchDownSM ? 'column' : 'row'} spacing={1} justifyContent="space-between" alignItems="center" sx={{ p: 3, pb: 3 }}>
        <Stack direction={matchDownSM ? 'column' : 'row'} spacing={2}>
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            size="small"
          />
          <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-helper-label">Month</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={activeTab}
                label="Month"
                //onChange={setMonth}
                onChange={selectOnchange}
              >
                  {groups.map((status, index) => (
                  <MenuItem key={index} value={status} 
                  >{status}</MenuItem>
                ))}   
              </Select>
            </FormControl>
        </Stack>
        <Stack direction={matchDownSM ? 'column' : 'row'} alignItems="center" spacing={matchDownSM ? 1 : 0}>
          <TableRowSelection selected={Object.keys(selectedRowIds).length} />
          <CSVExport data={data} filename={'pastworkorderprs.csv'} />
        </Stack>
      </Stack>
      <Box ref={componentRef}>
        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup, i) => (
              <TableRow key={i} {...headerGroup.getHeaderGroupProps()} sx={{ '& > th:first-of-type': { width: '200px' } }}>
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

ReactTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array//,
  //month: PropTypes.string,
  //setMonth: PropTypes.func
};

// ==============================|| INVOICE - LIST ||============================== //


// Status
const StatusCell = ({ value }) => {
  switch (value) {

    case '2023':
      return <Chip color="warning" label={value} size="small" variant="light" />;
    default: 
      return <Chip color="success" label={value} size="small" variant="light" />;
  }
};

StatusCell.propTypes = {
  value: PropTypes.string
};

// Action Cell
const ActionCell = (row, theme) => {
  return (
    <Stack direction="row" alignItems="left" justifyContent="left" spacing={0}>
      
      <Tooltip title="Download">
        <IconButton
          color="primary"
          onClick={(e) => {
            e.stopPropagation();
            console.log(row);
            //navigation(`/apps/invoice/edit/${row.values.id}`);
            //handlerSelect(row);
            window.open(process.env.REACT_APP_BASE_URL +'/ReportTemplate/Working/Archive/'+ row.values.filename,'_blank');
          }}
        >
          <DownloadOutlined  twoToneColor={theme.palette.primary.main} />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

ActionCell.propTypes = {
  row: PropTypes.array,
  //navigation: PropTypes.func,
  theme: PropTypes.object,
  handlerSelect: PropTypes.func
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

const Pastwomprs = () => {
  const { GetBMPastMPRs } = useHCSS();
  const localUsers = window.localStorage.getItem('users');
  var newUsers = JSON.parse(localUsers);
  var userid = 'all';
  if(newUsers[0].role.includes('Branch Manager')){
    userid = newUsers[0].id;
  }
  //const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
   const d = new Date();
   var ccmonth = d.getMonth();
   var ccyear = d.getFullYear();
  //var lmonth = 0;
  if(ccmonth == 0 ){
    //lmonth = 11;
    ccyear = d.getFullYear() -1 ;
  }else{
    //lmonth = ccmonth - 1;
  }
  //const cmonth = month[lmonth];
  //console.log(cmonth);
  const [list, setList] = React.useState([]);
  useEffect(() => {
    const init = async () => {  
      let listsres = await GetBMPastMPRs(ccyear,'all',userid);
      setList(listsres.data);   
    };
    init();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: 'Id',
        accessor: 'id',
        className: 'cell-center',
        disableFilters: true
      },
      
      {
        Header: 'Work Order #',
        accessor: 'workordernumber'
      },
      {
        Header: 'Year',
        accessor: 'year',
        Cell: StatusCell
      },
      {
        Header: 'Month',
        accessor: 'month'
      },
      
      {
        Header: 'File Name',
        accessor: 'filename'
      },
      {
        Header: 'Download',
        //className: 'cell-center',
        disableSortBy: true,
        Cell: ({ row }) => ActionCell(row, theme)
      }
    ],
    []
  );

  const theme = useTheme();

  return (
    <>

      <MainCard content={false}>
        <ScrollX>
          <ReactTable columns={columns} data={list}/>
        </ScrollX>
      </MainCard>
    </>
  );
};


export default Pastwomprs;
