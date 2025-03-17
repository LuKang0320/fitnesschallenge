// material-ui
import PropTypes from 'prop-types';
import React from 'react';
import { useCallback,useMemo,useEffect ,Fragment,useRef,useState  } from 'react';
//import {  Grid} from '@mui/material';
// material-ui
import { Box,
  Chip,
  Tabs,
  Tab,
  Stack, Table, TableBody, TableCell, TableHead, TableRow ,useMediaQuery,Tooltip ,Skeleton} from '@mui/material';
//import FormControl from '@mui/material/FormControl';
// project import
import useHCSS from 'hooks/useHCSS';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { useExpanded, useFilters, useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable } from 'react-table';
import { CSVExport, HeaderSort, TablePagination, TableRowSelection } from 'components/third-party/ReactTable';
import { renderFilterTypes, GlobalFilter } from 'utils/react-table';
import {alpha,useTheme } from '@mui/material/styles';
// ==============================|| REACT TABLE ||============================== //
import {  EditTwoTone } from '@ant-design/icons';
import IconButton from 'components/@extended/IconButton';
// assets
import { DownOutlined, RightOutlined } from '@ant-design/icons';

// ==============================|| REACT TABLE - SUB ROW ||============================== //

function SubRows({ row, rowProps, loading }) {
  const theme = useTheme();
  if (loading) {
    return (
      <>
        {[0, 1, 2].map((item) => (
          <TableRow key={item}>
            <TableCell />
            {[0, 1, 2, 3, 4, 5].map((col) => (
              <TableCell key={col}>
                <Skeleton animation="wave" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </>
    );
  }

  return (
    <>
        <TableRow
          key={`sub-${row.id}-${row.index}`}
          {...{ ...rowProps, key: `${row.index}-${rowProps.key}` }}
          sx={{ bgcolor: alpha(theme.palette.primary.lighter, 0.35) }}
        >
            <TableCell key={`subtcell-${row.id}-${row.index}`} colSpan={row.cells.length} >           
                Comments: {row.values.comments}           
            </TableCell>

        </TableRow>
    </>
  );
}

SubRows.propTypes = {
  row: PropTypes.object,
  rowProps: PropTypes.any,
  loading: PropTypes.bool
};

// ==============================|| SUB ROW - ASYNC DATA ||============================== //

function SubRowAsync({ row, rowProps }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line
  }, []);

  return <SubRows row={row} rowProps={rowProps} loading={loading} />;
}

SubRowAsync.propTypes = {
  row: PropTypes.object,
  rowProps: PropTypes.any
};

// ==============================|| REACT TABLE - EXPANDING TABLE ||============================== //

const CellExpander = ({ row }) => {
  const collapseIcon = row.isExpanded ? <DownOutlined /> : <RightOutlined />;
  return (
    <Box sx={{ fontSize: '0.75rem', color: 'text.secondary' }} {...row.getToggleRowExpandedProps()}>
      {collapseIcon}
    </Box>
  );
};

CellExpander.propTypes = {
  row: PropTypes.object
};

function ReactTable({ columns, data,renderRowSubComponent }) {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  const defaultColumn = useMemo(() => ({ Filter: GlobalFilter }), []);
  const filterTypes = useMemo(() => renderFilterTypes, []);
  const initialState = useMemo(
    () => ({
      filters: [{ id: 'workorderid', value: '' }],
      hiddenColumns: ['workorderid','commentid','comments'],
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
    toggleAllRowsSelected,visibleColumns
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
  // const countGroup = data.map((item) => item.year);
  // const counts = countGroup.reduce(
  //   (acc, value) => ({
  //     ...acc,
  //     [value]: (acc[value] || 0) + 1
  //   }),
  //   {}
  // );

  const [activeTab, setActiveTab] = useState(groups[0]);

  useEffect(() => {
    setFilter('workorderid', activeTab === 'All' ? '' : activeTab);
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
          <CSVExport data={data} filename={'utilizationsummary.csv'} />
        </Stack>
      </Stack>
      <Box ref={componentRef}>
        <Table {...getTableProps()}>
          <TableHead style={{width : '100px'}} >
            {headerGroups.map((headerGroup, i) => (
              <TableRow key={i} {...headerGroup.getHeaderGroupProps()} sx={{ '& > th:last-of-type': { width: '100px' } }}>
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
              const rowProps = row.getRowProps();
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
                  {row.isExpanded && renderRowSubComponent({ row, rowProps, visibleColumns })}
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
  data: PropTypes.array,
  renderRowSubComponent: PropTypes.any
};

//Action Cell


const ActionCell = (row, theme,handlerSelect) => {
  return (
    <Stack direction="row" alignItems="left" justifyContent="left" spacing={0}>
      
      <Tooltip title="Edit Comments">
        <IconButton
          color="primary"
          onClick={(e) => {
            e.stopPropagation();
            handlerSelect(row);
          }}
        >
          <EditTwoTone twoToneColor={theme.palette.primary.main} />
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


const UtilizationSummaryPage = ({handlerSelect}) =>{
  const { GetUtilizationByYearMonth} = useHCSS();
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
         let financiallist = await GetUtilizationByYearMonth(ccyear,cmonth,userid);
         //console.log(financiallist);
         setFinancials(financiallist.data)
    };

    init();
  }, []);

  var columns = useMemo(
    () => [
      {
        Header: 'Id',
        accessor: 'workorderid',
        className: 'cell-center',
        disableFilters: true
      },
      {
        Header: () => null,
        id: 'expander',
        className: 'cell-center',
        Cell: CellExpander,
        SubCell: () => null
      },
      {
        Header: 'cId',
        accessor: 'commentid',
        className: 'cell-center',
        disableFilters: true
      },
      {
        Header: 'Work Order#',
        accessor: 'workordernumber'
      },
      {
        Header: 'Work Order Name',
        accessor: 'workordername'
      },
      
      {
        Header: cmonth,
        accessor: 'hrsactualcur'
      },
      {
        Header: 'Option Period to Date',
        accessor: 'hrsactualcum'
      }
      ,
      {
        Header: 'Comments',
        accessor: 'comments'
      }
 
    ],
    []
  );

  if(newUsers[0].role.includes('Program Manager')){
    columns =  [
      {
        Header: 'Id',
        accessor: 'workorderid',
        className: 'cell-center',
        disableFilters: true
      },
      {
        Header: () => null,
        id: 'expander',
        className: 'cell-center',
        Cell: CellExpander,
        SubCell: () => null
      },
      {
        Header: 'cId',
        accessor: 'commentid',
        className: 'cell-center',
        disableFilters: true
      },
      {
        Header: 'Work Order#',
        accessor: 'workordernumber'
      },
      {
        Header: 'Work Order Name',
        accessor: 'workordername'
      },
      
      {
        Header: cmonth,
        accessor: 'hrsactualcur'
      },
      {
        Header: 'Option Period to Date',
        accessor: 'hrsactualcum'
      },
      {
        Header: 'Comments',
        accessor: 'comments'
      },
 
      {
        Header: 'Edit Comments',
        //className: 'cell-center',
        //accessor: 'comments',
        disableSortBy: true,
        Cell: ({ row }) => ActionCell(row, theme, handlerSelect)
      }
      // ,
      // {
      //   Header: 'Comments',
      //   accessor: 'comments'
      // }
      ];
  }
  const renderRowSubComponent = useCallback(({ row, rowProps }) => <SubRowAsync row={row} rowProps={rowProps} />, []);

  const theme = useTheme();
  return (
    <>
      {/* <MainCard content={false} title={"Utilization Summary (" + cmonth+ " " + ccyear +")"}>
      <ScrollX>
          <ReactTable columns={columns} data={financials} />
        </ScrollX>

      </MainCard> */}

<MainCard content={false} title="Expanding Row" >
      <ScrollX>
        <ReactTable columns={columns} data={financials} renderRowSubComponent={renderRowSubComponent} />
      </ScrollX>
    </MainCard>
    </>
  );
}

export default UtilizationSummaryPage;