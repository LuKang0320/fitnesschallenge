import PropTypes from 'prop-types';
import { useMemo, useEffect, Fragment, useState, useRef } from 'react';
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
  Tooltip,
  Typography
} from '@mui/material';
import {  useTheme } from '@mui/material/styles';

// third-party
import { useExpanded, useFilters, useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable,useGroupBy } from 'react-table';
import {  EditTwoTone } from '@ant-design/icons';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import IconButton from 'components/@extended/IconButton';
import { CSVExport, IndeterminateCheckbox, TablePagination, TableRowSelection } from 'components/third-party/ReactTable';

import { renderFilterTypes, GlobalFilter } from 'utils/react-table';

import useHCSS from 'hooks/useHCSS';
// assets
import { DownOutlined, GroupOutlined, RightOutlined, UngroupOutlined } from '@ant-design/icons';
import { useControlledState } from 'utils/react-table';

const CellExpander = ({ row }) => {
  if (row.canExpand) {
    const groupedCell = row.allCells.find((d) => d.isGrouped);
    const collapseIcon = row.isExpanded ? <DownOutlined /> : <RightOutlined />;

    return (
      <Stack direction="row" spacing={1} alignItems="center">
        <Box sx={{ pl: row.depth * 2, pr: 1.25, fontSize: '0.75rem', color: 'text.secondary' }} {...row.getToggleRowExpandedProps()}>
          {collapseIcon}
        </Box>
        {groupedCell.render('Cell')} ({row.subRows.length})
      </Stack>
    );
  }
  return null;
};

CellExpander.propTypes = {
  row: PropTypes.object
};

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data }) {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  const defaultColumn = useMemo(() => ({ Filter: GlobalFilter }), []);
  const filterTypes = useMemo(() => renderFilterTypes, []);
  const initialState = useMemo(
    () => ({
      filters: [{ id: 'staffingstatus', value: '' }],
      hiddenColumns: ['staffingstatus','userid'],
      groupBy: ['workorder'],
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
    setFilter
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
    useGroupBy,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
    
    (hooks) => {
      hooks.useControlledState.push(useControlledState);
      hooks.visibleColumns.push((columns, { instance }) => {
        // @ts-ignore
        if (!instance.state.groupBy.length) {
          return columns;
        }
        return [
          {
            id: 'expander',
            // @ts-ignore
            Header: ({ allColumns, state: { groupBy } }) =>
              groupBy.map((columnId, i) => {
                const column = allColumns.find((d) => d.id === columnId);
                const groupIcon = column.isGrouped ? <UngroupOutlined /> : <GroupOutlined />;

                return (
                  <Stack
                    key={i}
                    direction="row"
                    spacing={1.25}
                    alignItems="center"
                    {...column.getHeaderProps()}
                    sx={{ display: 'inline-flex', '&:not(:last-of-type)': { mr: 1.5 } }}
                  >
                    {column.canGroupBy ? (
                      <Box
                        sx={{ color: column.isGrouped ? 'error.main' : 'primary.main', fontSize: '1rem' }}
                        {...column.getGroupByToggleProps()}
                      >
                        {groupIcon}
                      </Box>
                    ) : null}
                    <Typography variant="subtitle1">{column.render('Header')}</Typography>
                  </Stack>
                );
              }),
            Cell: CellExpander
          },
          ...columns
        ];
      });
    }
  );

  const componentRef = useRef(null);

  // ================ Tab ================

  const groups = ['All', ...new Set(data.map((item) => item.staffingstatus))];
  const countGroup = data.map((item) => item.staffingstatus);
  const counts = countGroup.reduce(
    (acc, value) => ({
      ...acc,
      [value]: (acc[value] || 0) + 1
    }),
    {}
  );

  const [activeTab, setActiveTab] = useState(groups[0]);
 
  useEffect(() => {
    setFilter('staffingstatus', activeTab === 'All' ? '' : activeTab);
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
                  label={
                    status === 'All'
                      ? data.length
                      : status === 'Open'
                      ? counts.Open
                      : status === 'Full'
                      ? counts.Full
                      : counts.Open
                  }
                  color={status === 'All' ? 'primary' : status === 'Open' ? 'success' : status === 'Full' ? 'warning' : 'error'}
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
          {/* {headerGroups.map((group, index) => (
            <Stack key={index} direction={matchDownSM ? 'column' : 'row'} spacing={1} {...group.getHeaderGroupProps()}>
              {group.headers.map((column, i) => (
                <Box key={i} {...column.getHeaderProps([{ className: column.className }])}>
                  {column.canFilter ? column.render('Filter') : null}
                </Box>
              ))}
            </Stack>
          ))} */}
          <CSVExport data={data} filename={'rosters.csv'} />
        </Stack>
      </Stack>
      <Box ref={componentRef}>
        <Table {...getTableProps()}>
        <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow key={headerGroup.id} {...headerGroup.getHeaderGroupProps()} sx={{ '& > th:first-of-type': { width: '210px' } }}>
                {headerGroup.headers.map((column) => {
                  const groupIcon = column.isGrouped ? <UngroupOutlined /> : <GroupOutlined />;
                  return (
                    <TableCell key={column.id} {...column.getHeaderProps([{ className: column.className }])}>
                      <Stack direction="row" spacing={1.15} alignItems="center" sx={{ display: 'inline-flex' }}>
                        {column.canGroupBy ? (
                          <Box
                            sx={{ color: column.isGrouped ? 'error.main' : 'primary.main', fontSize: '1rem' }}
                            {...column.getGroupByToggleProps()}
                          >
                            {groupIcon}
                          </Box>
                        ) : null}
                        <Box>{column.render('Header')}</Box>
                      </Stack>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <Fragment key={i}>
                  <TableRow key={row.id} {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    let bgcolor = 'background.paper';
                    if (cell.isAggregated) bgcolor = 'secondary.lighter';
                    if (cell.isGrouped) bgcolor = 'success.lighter';
                    if (cell.isPlaceholder) bgcolor = 'error.lighter';

                    return (
                      <TableCell key={cell.column.id} {...cell.getCellProps([{ className: cell.column.className }])} sx={{ bgcolor }}>
                        {cell.isAggregated ? cell.render('Aggregated') : cell.isPlaceholder ? null : cell.render('Cell')}
                      </TableCell>
                    );
                  })}
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

// ==============================|| INVOICE - LIST ||============================== //


// Status
const StatusCell = ({ value }) => {
  switch (value) {

    case 'Open':
      return <Chip color="success" label="Open" size="small" variant="light" />;
    case 'Full':
      return <Chip color="warning" label="Full" size="small" variant="light" />;
  }
};

StatusCell.propTypes = {
  value: PropTypes.string
};

// Action Cell
const ActionCell = (row, handlerSelect, theme) => {
  return (
    <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
      <Tooltip title="Edit">
        <IconButton
          color="primary"
          onClick={(e) =>
            {e.stopPropagation();
              handlerSelect(row);
            }
          }
        >
          <EditTwoTone twoToneColor={theme.palette.primary.main} />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

ActionCell.propTypes = {
  row: PropTypes.array,
  handlerSelect:PropTypes.func,
  theme: PropTypes.object
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

const Rosters = ({handlerSelect}) => {
  const { GetAllRosters } = useHCSS();
  const localUsers = window.localStorage.getItem('users');
  var newUsers = JSON.parse(localUsers);
  //console.log(newUsers[0]);
  var userid = 'all';
  if(newUsers[0].role.includes('Branch Manager')){
    userid = newUsers[0].id;
  }
  const [list, setList] = React.useState([]);
  useEffect(() => {
    const init = async () => {
     
      let listsres = await GetAllRosters(userid);
      listsres.data.sort((a, b) => a.workorderid - b.workorderid);
      setList(listsres.data);
      
    };

    init();
  }, []);

  var columns = useMemo(
    () => [
      {
        Header: 'WO-ID',
        accessor: 'workorderid',
        className: 'cell-center',
        disableFilters: true,
        disableGroupBy: true,
        aggregate: 'average',
        Aggregated: ({ value }) => `${value}`
      },
      {
        Header: 'userid',
        accessor: 'userid',
        className: 'cell-center',
        disableFilters: true,
        disableGroupBy: true
      },
      {
        Header: 'Work Order',
        accessor: 'workorder',
        aggregate: 'average',
        Aggregated: ({ value }) => `${value} (avg)`
      },
      {
        Header: 'Name',
        accessor: 'username',
        //aggregate: 'count',
        //Aggregated: ({ value }) => `${value} Person`,
        disableGroupBy: true
      },
      
      {
        Header: 'FAA Email',
        accessor: 'CompanyorGroup',
        //disableFilters: true,
        filter: 'includes',
        disableGroupBy: true
      },
      {
        Header: 'Email',
        accessor: 'email',
        //disableFilters: true,
        filter: 'includes',
        disableGroupBy: true
      },
      {
        Header: 'Phone',
        accessor: 'PhoneNumber',
        //disableFilters: true,
        filter: 'includes',
        disableGroupBy: true
      },
      {
        Header: 'Status',
        accessor: 'staffingstatus',
        //disableFilters: true,
        filter: 'includes',
        disableGroupBy: true
      }
      // ,
      
      // {
      //   Header: 'Actions',
      //   className: 'cell-center',
      //   disableSortBy: true,
      //   Cell: ({ row }) => ActionCell(row, handlerSelect, theme)
      // }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  if(newUsers[0].role.includes('Program Manager')){

    columns =  [
        {
          Header: 'WO-ID',
          accessor: 'workorderid',
          className: 'cell-center',
          disableFilters: true,
          disableGroupBy: true,
          aggregate: 'average',
          Aggregated: ({ value }) => `${value}`
        },
        {
          Header: 'userid',
          accessor: 'userid',
          className: 'cell-center',
          disableFilters: true,
          disableGroupBy: true
        },
        {
          Header: 'Work Order',
          accessor: 'workorder',
          aggregate: 'average',
          Aggregated: ({ value }) => `${value} (avg)`
        },
        {
          Header: 'Name',
          accessor: 'username',
          //aggregate: 'count',
          //Aggregated: ({ value }) => `${value} Person`,
          disableGroupBy: true
        },
        
        {
          Header: 'FAA Email',
          accessor: 'CompanyorGroup',
          //disableFilters: true,
          filter: 'includes',
          disableGroupBy: true
        },
        {
          Header: 'Email',
          accessor: 'email',
          //disableFilters: true,
          filter: 'includes',
          disableGroupBy: true
        },
        {
          Header: 'Phone',
          accessor: 'PhoneNumber',
          //disableFilters: true,
          filter: 'includes',
          disableGroupBy: true
        },
        {
          Header: 'Status',
          accessor: 'staffingstatus',
          //disableFilters: true,
          filter: 'includes',
          disableGroupBy: true
        },
        
        {
          Header: 'Actions',
          className: 'cell-center',
          disableSortBy: true,
          Cell: ({ row }) => ActionCell(row, handlerSelect, theme)
        }
      ];
  }
  const theme = useTheme();

  return (
    <>

      <MainCard content={false}>
        <ScrollX>
          <ReactTable columns={columns} data={list} />
        </ScrollX>
      </MainCard>
    </>
  );
};

Rosters.propTypes = {
  handlerSelect: PropTypes.func
};

export default Rosters;
