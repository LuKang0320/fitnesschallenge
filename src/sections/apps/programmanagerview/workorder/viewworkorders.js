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
  Tooltip
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

// third-party
import { useExpanded, useFilters, useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable } from 'react-table';
import {  EditTwoTone,EyeTwoTone,InfoCircleTwoTone  } from '@ant-design/icons';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import IconButton from 'components/@extended/IconButton';
import { CSVExport, HeaderSort, IndeterminateCheckbox, TablePagination, TableRowSelection } from 'components/third-party/ReactTable';
import AlertColumnDelete from 'sections/apps/kanban/Board/AlertColumnDelete';

import { dispatch , useSelector} from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { alertPopupToggle } from 'store/reducers/invoice';
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
      filters: [{ id: 'staffingstatus', value: '' }],
      hiddenColumns: ['id'],
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
      <Box sx={{ p: 3, pb: 0, width: '100%' }}>
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
          <CSVExport data={data} filename={'workorders.csv'} />
        </Stack>
      </Stack>
      <Box ref={componentRef}>
        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup, i) => (
              <TableRow key={i} {...headerGroup.getHeaderGroupProps()} sx={{ '& > th:first-of-type': { width: '58px' } }}>
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
const ActionCell = (row, theme,setWorkorderName,setWorkorderId,handlerSelect,handleNextFinancial,handleNextUtilization) => {
  return (
    <Stack direction="row" alignItems="left" justifyContent="left" spacing={0}>
      
      <Tooltip title="Monthly Content Review">
        <IconButton
          color="primary"
          onClick={(e) => {
            e.stopPropagation();
            //console.log(row);
            //navigation(`/apps/invoice/edit/${row.values.id}`);
            handlerSelect(row);
          }}
        >
          <EditTwoTone twoToneColor={theme.palette.primary.main} />
        </IconButton>
      </Tooltip>
      <Tooltip title="View Financial Summary">
        <IconButton
          color="secondary"
          onClick={(e) => {
            e.stopPropagation();
            handleNextFinancial(row);
          }}
        >
          <EyeTwoTone twoToneColor={theme.palette.secondary.main} />
        </IconButton>
      </Tooltip>
      <Tooltip title="View Utilization Summary">
        <IconButton
          color="secondary"
          onClick={(e) => {
            e.stopPropagation();
            handleNextUtilization(row);
          }}
        >
          <InfoCircleTwoTone twoToneColor={theme.palette.success.main} />
        </IconButton>
      </Tooltip>

      {/* <Tooltip title="Delete">
        <IconButton
          color="error"
          onClick={(e) => {
            e.stopPropagation();
            setWorkorderName(row.values.workordername);
            setWorkorderId(row.values.workordernumber);
            dispatch(
              alertPopupToggle({
                alertToggle: true
              })
            );
          }}
        >
          <DeleteTwoTone twoToneColor={theme.palette.error.main} />
        </IconButton>
      </Tooltip> */}
    </Stack>
  );
};

ActionCell.propTypes = {
  row: PropTypes.array,
  //navigation: PropTypes.func,
  theme: PropTypes.object,
  setWorkorderName: PropTypes.func,
  setWorkorderId: PropTypes.func,
  handlerSelect: PropTypes.func,
  handleNextFinancial: PropTypes.func,
  handleNextUtilization: PropTypes.func
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

const ViewWorkOrders = ({handlerSelect,handleNextFinancial,handleNextUtilization}) => {
  const { GetAllWorkOrders } = useHCSS();
  const {  alertPopup } = useSelector((state) => state.invoice);

  const [list, setList] = React.useState([]);
  const [workorderId, setWorkorderId] = useState('');
  const [workorderName, setWorkorderName] = useState('');
  useEffect(() => {
    const init = async () => {
     
      let listsres = await GetAllWorkOrders();
      //console.log(listsres);
      setList(listsres.data);
      
    };

    init();
  }, []);

  //const navigation = useNavigate();

  const handleClose = (status) => {
    if (status) {
      //dispatch(getInvoiceDelete(invoiceId));
      //console.log(workorderId);
      //console.log(workorderName);
      dispatch(
        openSnackbar({
          open: true,
          message: 'Column deleted successfully',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
    }
    dispatch(
      alertPopupToggle({
        alertToggle: false
      })
    );
  };
  const columns = useMemo(
    () => [
      {
        Header: 'Work Order Id',
        accessor: 'id',
        className: 'cell-center',
        disableFilters: true
      },
      {
        Header: 'Work Order Number',
        accessor: 'workordernumber',
        disableFilters: false//,
        //Cell: CustomerCell
      },
      {
        Header: 'Work Order Name',
        accessor: 'workordername'
      },
      {
        Header: 'AAQ Branch',
        accessor: 'aaqbranch'
      },
      {
        Header: 'Branch Manager',
        accessor: 'aaqbranchmanager'
      },
      {
        Header: 'Staffing Status',
        accessor: 'staffingstatus',
        //disableFilters: true,
        filter: 'includes',
        Cell: StatusCell
      },
      {
        Header: 'Actions',
        //className: 'cell-center',
        disableSortBy: true,
        Cell: ({ row }) => ActionCell(row, theme,setWorkorderName,setWorkorderId, handlerSelect,handleNextFinancial,handleNextUtilization)
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const theme = useTheme();

  return (
    <>

      <MainCard content={false}>
        <ScrollX>
          <ReactTable columns={columns} data={list} />
        </ScrollX>
      </MainCard>
      <AlertColumnDelete title={`${workorderId} ` + `${workorderName}`} open={alertPopup} handleClose={handleClose} />
    </>
  );
};

ViewWorkOrders.propTypes = {
  handlerSelect: PropTypes.func,
  handleNextFinancial: PropTypes.func,
  handleNextUtilizationL: PropTypes.func
};

export default ViewWorkOrders;
