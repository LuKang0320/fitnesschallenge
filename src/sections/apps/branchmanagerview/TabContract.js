import {useMemo, useEffect,Fragment ,useRef ,useState  } from 'react';
import PropTypes from 'prop-types';
import React from 'react';
// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import {
  Button,
  Grid,
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
  useMediaQuery

} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ScrollX from 'components/ScrollX';
// project import
//import Avatar from 'components/@extended/Avatar';
import MainCard from 'components/MainCard';
//import { linkedInColor, twitterColor } from 'config';

// assets
import {FilePdfOutlined, ThunderboltFilled ,UserOutlined,UsergroupAddOutlined ,FileExcelOutlined } from '@ant-design/icons';
import { CSVExport, HeaderSort, TablePagination, TableRowSelection } from 'components/third-party/ReactTable';
import { renderFilterTypes, GlobalFilter } from 'utils/react-table';
import useHCSS from 'hooks/useHCSS';
import { useExpanded, useFilters, useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable } from 'react-table';
function ReactTable({ columns, data }) {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  const defaultColumn = useMemo(() => ({ Filter: GlobalFilter }), []);
  const filterTypes = useMemo(() => renderFilterTypes, []);
  const initialState = useMemo(
    () => ({
      filters: [{ id: 'workordernumber', value: '' }],
      hiddenColumns: [],
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

  const groups = ['All', ...new Set(data.map((item) => item.year))];
  const countGroup = data.map((item) => item.workordernumber);
  const counts = countGroup.reduce(
    (acc, value) => ({
      ...acc,
      [value]: (acc[value] || 0) + 1
    }),
    {}
  );

  const [activeTab, setActiveTab] = useState(groups[0]);

  useEffect(() => {
    setFilter('workordernumber', activeTab === 'All' ? '' : activeTab);
    // eslint-disable-next-line
  }, [activeTab]);

  return (
    <>
      <Box sx={{ p: 3, pb: 0, width: '100%', display:'none' }}>
        <Tabs value={activeTab} onChange={(e, value) => setActiveTab(value)} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          {groups.map((staffingstatus, index) => (
            <Tab
              key={index}
              label={staffingstatus}
              value={staffingstatus}
              icon={
                <Chip
                  label={
                    staffingstatus === 'All'
                      ? data.length
                      : staffingstatus === 'Full'
                      ? counts['Full']
                      : staffingstatus === 'Full'
                      ? counts.Full
                      : counts.Open
                  }
                  color={staffingstatus === 'All' ? 'primary' : staffingstatus === 'Full' ? 'success' : 'warning'}
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
          <CSVExport data={data} filename={'branchworkorders.csv'} />
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
  data: PropTypes.array
};

function dateDiffInDays(a, b) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}
// ==============================|| ACCOUNT PROFILE - PERSONAL ||============================== //
const DateCell = ({ value }) => {

  var mydate = new Date(Date.parse(value));
  var today = new Date();
  var difference = dateDiffInDays(today, mydate);

var date = value.substring(0,10).split('-')
var rdate = date[1] + '/' + date[2] + '/' + date[0]

  if(difference <=60)
    {
      return <Chip color="warning" label={rdate} size="small" variant="light"  />;
    }
    else 
    {
      return <Chip color="success" label={rdate} size="small" variant="light"  />;
    }
};
const TabContract = () => {
  //const matchDownMD = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const { GetBranchWorkOrdersByUserID } = useHCSS();
  const [list, setList] = React.useState([]);
  const [branchname, setBranchname] = React.useState('HCSS III Online: AAQ-');
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
  const localUsers = window.localStorage.getItem('users');
  var newUsers = JSON.parse(localUsers);
  //console.log(newUsers[0]);
  //if(newUsers[0].role.includes('Project Staff Member')){

  //}
  const Navigation = useNavigate();
  useEffect(() => {
    const init = async () => {  
      let listsres = await GetBranchWorkOrdersByUserID(ccyear, cmonth, newUsers[0].id);
      //console.log(listsres);
      setList(listsres.data);   
      setBranchname('HCSS III Online: AAQ-'+listsres.data[0].branchname);
    };
    init();
  }, []);
  const columns = useMemo(
    () => [
      {
        Header: 'WO Number',
        accessor: 'workordernumber',
        className: 'cell-center',
        disableFilters: true
      },
      {
        Header: 'WO Name',
        accessor: 'workordername'
      },
      {
        Header: 'Funded Through',
        accessor: 'fundsDateDepletion',
        Cell: DateCell
      },
      
      {
        Header: 'Status',
        accessor: 'staffingstatus'
      }
    ],
    []
  );
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={8}>
        <MainCard title={branchname} style={{minHeight: '610px'}}>
          <Grid container spacing={2}>
          <Grid item xs={12}>
            <MainCard >
                <ScrollX>
              <ReactTable columns={columns} data={list} />
            </ScrollX>
            </MainCard>
          </Grid>
          </Grid>
        </MainCard>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Grid container>       
          <Grid item sm={12} xs={12}>
            {/* <MainCard title="Actions" >
              <Stack spacing={0.5}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Button variant="contained" color="inherit" style={{width: '240px', borderRadius: '15px' }}   
                    size="medium"
                    startIcon={<UserOutlined  style={{ color: 'blue', fontSize: '1.15rem' }} />}
                    sx={{ color: 'blue' }} 
                    onClick={ () =>Navigation('/dashboard/programmanagerview/recruitingstatus')}>
                    Recruiting Status
                  </Button>
                </Stack>
              </Stack>
            </MainCard> */}
            <MainCard title="HCSS III Overview">
              <Stack spacing={0.5}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Button variant="contained" color="inherit" style={{width: '240px', borderRadius: '15px' }}   
                    size="medium"
                    startIcon={<UserOutlined  style={{ color: 'blue', fontSize: '1.15rem' }} />}
                    sx={{ color: 'blue' }} 
                    onClick={ () =>Navigation('/dashboard/programmanagerview/recruitingstatus')}>
                    Recruiting Status
                  </Button>
                </Stack>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Button size="medium" variant="contained" color="inherit" style={{width: '240px', borderRadius: '15px' }}
                    startIcon={<UserOutlined style={{ color: 'blue', fontSize: '1.15rem' }} />}
                    sx={{ color: 'blue' }} 
                    onClick={ () =>Navigation('/dashboard/programmanagerview/orgnization/personal')}
                    >
                    View Org Chart
                  </Button>
                </Stack>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Button   variant="contained" color="inherit" style={{width: '240px', borderRadius: '15px' }}
                    size="medium"
                    startIcon={<UsergroupAddOutlined style={{ color: "blue", fontSize: '1.15rem' }} />}
                    sx={{ color: "blue"}}
                    onClick={ () =>Navigation('/dashboard/programmanagerview/rosters')}>
                    View Roster
                  </Button>
                </Stack>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Button variant="contained" color="inherit" style={{width: '240px', borderRadius: '15px' }}
                    size="medium"
                    startIcon={<ThunderboltFilled  style={{ color: "blue", fontSize: '1.15rem' }} />}
                    sx={{ color: "blue" }}
                    onClick={ () =>Navigation('/dashboard/branchmanagerview/workordermprs')}>
                    View Past Progress Reports
                  </Button>
                </Stack>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Button variant="contained" color="inherit" style={{width: '240px', borderRadius: '15px' }}
                    size="medium"
                    startIcon={<FilePdfOutlined  style={{ color: "blue", fontSize: '1.15rem' }} />}
                    sx={{ color: "blue" }}
                    onClick={ () =>Navigation('/dashboard/programmanagerview/financialsummary')}
                    >
                    View Financials Summary
                  </Button>
                </Stack>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Button variant="contained" color="inherit" style={{width: '240px', borderRadius: '15px' }}
                    size="medium"
                    startIcon={<FileExcelOutlined  style={{ color:"#3366FF", fontSize: '1.15rem' }} />}
                    sx={{ color:"blue" }}
                    onClick={ () =>Navigation('/dashboard/programmanagerview/utilizationsummary')}
                    >
                    View Utilization Summary
                  </Button>
                </Stack>
              </Stack>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
      {/* <Grid item xs={12}>
        <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
          <Button variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button variant="contained">Update Profile</Button>
        </Stack>
      </Grid> */}
    </Grid>
  );
};

export default TabContract;
