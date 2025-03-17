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
  Tooltip,
  Button
} from '@mui/material';
import AnimateButton from 'components/@extended/AnimateButton';
import { alpha, useTheme } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';

// third-party
import { useExpanded, useFilters, useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable } from 'react-table';
import {  EditTwoTone,DeleteTwoTone } from '@ant-design/icons';

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

function ReactTable({ columns, data,handleAddNew }) {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  const defaultColumn = useMemo(() => ({ Filter: GlobalFilter }), []);
  const filterTypes = useMemo(() => renderFilterTypes, []);
  const initialState = useMemo(
    () => ({
      filters: [{ id: 'rolename', value: '' }],
      hiddenColumns: ['userid', 'roleid'],
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
          
              <AnimateButton>
                <Button disableElevation startIcon={<AddIcon />} onClick={handleAddNew}  variant="outlined"   sx={{ my: 0, ml: 3, mr:3}}>
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

ReactTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  handleAddNew: PropTypes.func
};

// Action Cell
const ActionCell = (row, theme,setUserName,setUserId,handlerSelect) => {
  return (
    <Stack direction="row" alignItems="left" justifyContent="left" spacing={0} >    
      <Tooltip  title="Edit Seleted User" style={{ opacity: row.values.roleid == '1' ||row.values.roleid == '6'? '1': '0.2' }}>
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
  

      <Tooltip title="Delete">
        <IconButton
          color="error"
          onClick={(e) => {
            e.stopPropagation();
            setUserName(row.values.username);
            setUserId(row.values.userid);
            dispatch(
              alertPopupToggle({
                alertToggle: true
              })
            );
          }}
        >
          <DeleteTwoTone twoToneColor={theme.palette.error.main} />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

ActionCell.propTypes = {
  row: PropTypes.array,
  //navigation: PropTypes.func,
  theme: PropTypes.object,
  setUserName: PropTypes.func,
  setUserId: PropTypes.func,
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

const ManageUsers = ({handlerSelect,handleAddNew}) => {
  const { GetAllUsers,DeleteUser } = useHCSS();
  const {  alertPopup } = useSelector((state) => state.invoice);
  const [list, setList] = React.useState([]);
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  useEffect(() => {
    const init = async () => {   
      let listsres = await GetAllUsers();
      setList(listsres.data);
      
    };

    init();
  }, []);

  const handleClose = (status) => {
    if (status) {
      const dodelete = async () => {
        try {  
          var res =  await DeleteUser(userId);
          if(res.data.success == true){
            dispatch(
              openSnackbar({
                open: true,
                message: 'Selected user has been deleted successfully',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alert: {
                  color: 'success'
                },
                close: false
              })
            );
            let listsres = await GetAllUsers();
            setList(listsres.data);
          }
          else{
            dispatch(
              openSnackbar({
                open: true,
                message: 'Can NOT delete the selected user.',
                variant: 'alert',
                alert: {
                  color: 'error'
                },
                close: false
              })
            );
          }
          } 
          catch (err) {
            dispatch(
              openSnackbar({
                open: true,
                message: 'Can NOT delete the selected user.',
                variant: 'alert',
                alert: {
                  color: 'error'
                },
                close: false
              })
            );
          }       
      };
      dodelete();
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
        Header: 'Role ID',
        accessor: 'roleid'
      },
      {
        Header: 'Actions',
        //className: 'cell-center',
        disableSortBy: true,
        Cell: ({ row }) => ActionCell(row, theme,setUserName,setUserId, handlerSelect)
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
          <ReactTable columns={columns} data={list} handleAddNew={handleAddNew} />
        </ScrollX>
      </MainCard>
      <AlertColumnDelete title={`${userName}`} open={alertPopup} handleClose={handleClose} />
    </>
  );
};

ManageUsers.propTypes = {
  handlerSelect: PropTypes.func,
  handleAddNew: PropTypes.func
};

export default ManageUsers;
