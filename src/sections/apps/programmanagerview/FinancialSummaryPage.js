// material-ui
import PropTypes from 'prop-types';
import React from 'react';
import { useMemo,useEffect ,Fragment,useRef,useState  } from 'react';
//import {  Grid} from '@mui/material';
// material-ui
import { Box,
  Chip,
  Tabs,
  Tab,
  Stack, Table, TableBody, TableCell, TableHead, TableRow ,useMediaQuery } from '@mui/material';
//import FormControl from '@mui/material/FormControl';
// project import
import useHCSS from 'hooks/useHCSS';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { useExpanded, useFilters, useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable } from 'react-table';
import { CSVExport,  TablePagination, TableRowSelection } from 'components/third-party/ReactTable';
import { renderFilterTypes, GlobalFilter } from 'utils/react-table';
import {alpha,useTheme } from '@mui/material/styles';
// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data }) {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  const defaultColumn = useMemo(() => ({ Filter: GlobalFilter }), []);
  const filterTypes = useMemo(() => renderFilterTypes, []);
  const initialState = useMemo(
    () => ({
      filters: [{ id: 'workorder', value: '' }],
      hiddenColumns: ['id'],
      pageIndex: 0,
      pageSize: 10
    }),
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    //headerGroups,
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

  const groups = ['All', ...new Set(data.map((item) => item.workorder))];

  const [activeTab, setActiveTab] = useState(groups[0]);

  useEffect(() => {
    setFilter('workorder', activeTab === 'All' ? '' : activeTab);
    // eslint-disable-next-line
  }, [activeTab]);

  return (
    <>
      <Box sx={{ p: 3, pb: 0, width: '100%', display:'none' }}>
        <Tabs value={activeTab} onChange={(e, value) => setActiveTab(value)} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          {groups.map((status, index) => (
            <Tab
              key={index}
              label={status}
              value={status}
              icon={
                <Chip
                  label={ data.length }
                  color={'success'}
                  variant="light"
                  size="small"
                />
              }
              iconPosition="end"
            />
          ))}
        </Tabs>
      </Box>
      <Stack direction={matchDownSM ? 'column' : 'row'} spacing={1} justifyContent="space-between" alignItems="center" sx={{ p: 3, pb: 3 }}>
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
          <CSVExport data={data} filename={'financialsummary.csv'} />
        </Stack>
      </Stack>
      <Box ref={componentRef}>
        <Table {...getTableProps()}>
          {/* <TableHead align="right">
            {headerGroups.map((headerGroup, i) => (
              <TableRow key={i} {...headerGroup.getHeaderGroupProps()} sx={{ '& > th:first-of-type': { width: '200px' } }}>
                {headerGroup.headers.map((column, x) => (
                  <TableCell align="right" key={x} {...column.getHeaderProps([{ className: column.className }])}>
                    <HeaderSort column={column} sort />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead> */}
          <TableHead>
          <TableRow>
            <TableCell align="left">Work Order</TableCell>
            <TableCell align="left">Branch Manager</TableCell>
            <TableCell align="right">Total Funding</TableCell>
            <TableCell align="right">Funding Expended</TableCell>
            <TableCell align="right">Funding Remaining</TableCell>
            <TableCell align="right">Funding Through</TableCell>
          </TableRow>
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
                    {row.cells.map((cell, i) => 
                      {
                       if(cell.column.Header !=='Work Order' && cell.column.Header !=='Branch Manager')
                          return <TableCell align="right" key={i} {...cell.getCellProps([{ className: cell.column.className }])}>
                            {cell.render('Cell')}
                          </TableCell>
                      return <TableCell align="left" key={i} {...cell.getCellProps([{ className: cell.column.className }])}>
                      {cell.render('Cell')}
                    </TableCell>
                      }
                    )}
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
  data: PropTypes.array
};
// ==============================|| BASIC WIZARD - ADDRESS  ||============================== //
// Status
function dateDiffInDays(a, b) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}
const DateCell = ({ value }) => {
  var date = value.substring(0,10).split('-')
  var mydate = new Date(date[0],date[1] - 1,date[2]);
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  var month = monthNames[mydate.getMonth()];
  var year = mydate.getFullYear();
  var day =mydate.getDate();
  var rdate = month + ' ' + day + ', ' + year;

  var today = new Date();
  var difference = dateDiffInDays(today, mydate);

  if(difference <=60)
    {
      return <Chip color="warning" label={rdate} size="small" variant="light"  />;
    }
    else 
    {
      return <Chip color="success" label={rdate} size="small" variant="light"  />;
    }
};
// Format the price above to USD using the locale, style, and currency.
let USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
const NumberCell = ({ value }) => {
  //label={new Date(value).toLocaleDateString('en-US')} 
      ///return (Math.round(value * 100) / 100).toFixed(2);
      return USDollar.format(value);
};


const FinancialSummaryPage = () =>{
  const { GetFinancialByWorkOrderID} = useHCSS();
  const localUsers = window.localStorage.getItem('users');
  var newUsers = JSON.parse(localUsers);
  //console.log(newUsers[0]);
  var userid = 'all';
  if(newUsers[0].role.includes('Branch Manager')){
    userid = newUsers[0].id;
  }

  const [financials, setFinancials] = React.useState([]);

  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const d = new Date();
  var ccmonth = d.getMonth();
  var ccyear = d.getFullYear();
  var lmonth = 0;
  if(ccmonth == 0 ){
    lmonth = 11;
    ccyear = d.getFullYear() -1 ;
  }else{
    lmonth = ccmonth - 1;
  }
  const cmonth = month[lmonth];
  useEffect(() => {
    const init = async () => {
         let financiallist = await GetFinancialByWorkOrderID("0", cmonth, ccyear,userid);
         //console.log(financiallist);
         setFinancials(financiallist.data)
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
        Header: 'Work Order',
        accessor: 'workorder'
      },
      {
        Header: 'Branch Manager',
        accessor: 'aaqbranchmanager'
      },
      
      {
        Header: 'Total Funding',
        accessor: 'fundsReceived',
        Cell: NumberCell
      },
      {
        Header: 'Funding Expended',
        accessor: 'fundsExpended',
        Cell: NumberCell
      },
      {
        Header: 'Funding Remaining',
        accessor: 'fundsRemaining',
        Cell: NumberCell
      },
      {
        Header: 'Funding Through',
        accessor: 'fundsDateDepletion',
        Cell: DateCell
      }
    ],
    []
  );

  return (
    <>
      <MainCard content={false} title={"Financial Summary (" + cmonth+ " " + ccyear +")"}>
      <ScrollX>
          <ReactTable columns={columns} data={financials} />
        </ScrollX>

      </MainCard>
    </>
  );
}

export default FinancialSummaryPage;