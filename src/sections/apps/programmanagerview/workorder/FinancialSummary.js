// material-ui
import React from 'react';
import { useEffect } from 'react';
import {  Grid, InputLabel, Stack,Select ,MenuItem} from '@mui/material';
// material-ui
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow ,Paper } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import PropTypes from 'prop-types';
// project import
import useHCSS from 'hooks/useHCSS';
import MainCard from 'components/MainCard';
// ==============================|| BASIC WIZARD - ADDRESS  ||============================== //

const FinancialSummary = ({activeRowData}) =>{
  const { GetAllWorkOrders ,GetFinancialByWorkOrderID} = useHCSS();
  const [workorders, setWorkorderss] = React.useState([]);
  const [workorderid, setWorkorderid] = React.useState('');

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
         console.log(activeRowData.values.id);
         let workorderlist = await GetAllWorkOrders();
         setWorkorderss(workorderlist.data);
         setWorkorderid(activeRowData.values.id);
         let financiallist = await GetFinancialByWorkOrderID(activeRowData.values.id, cmonth, ccyear, 'all');
         //console.log(financiallist);
         setFinancials(financiallist.data)
    };

    init();
  }, []);
  let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});
  const workorderselectchange = async (event) => {

    setWorkorderid(event.target.value);
    let financiallist = await GetFinancialByWorkOrderID(event.target.value, cmonth, ccyear, 'all');
    //console.log(financiallist);
    setFinancials(financiallist.data)
  };

  return (
    <>
      <MainCard title={"Financial Summary (" + cmonth+ " " + ccyear +")"}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack spacing={0.5}>
          <FormControl fullWidth>
              <InputLabel id="monthlycontentformworkorderlabel" style={{fontSize: "1.9vh"}}>Work Order</InputLabel>
              <Select  //fullWidth
                labelId="monthlycontentformworkorderlabel"
                value={workorderid}
                label="Work Order"
                //onChange={handlebranchselectChange}
                onChange={workorderselectchange}
              >
                {workorders.map((w,index)=>{
                 return <MenuItem value={w.id} key={index}>{w.workordernumber} - {w.workordername}</MenuItem>

                })}
              </Select>
              </FormControl>
          </Stack>
        </Grid>
        <Grid item xs={12}>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Work Order</TableCell>
            <TableCell align="right">Branch Manager</TableCell>
            <TableCell align="right">Total Funding</TableCell>
            <TableCell align="right">Funding Expended</TableCell>
            <TableCell align="right">Funding Remaining</TableCell>
            <TableCell align="right">Funding Through</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {financials.length > 0 ?
          financials.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.workorder}
              </TableCell>
              <TableCell align="right">{row.aaqbranchmanager}</TableCell>
              <TableCell align="right">{USDollar.format(row.fundsReceived)}</TableCell>
              <TableCell align="right">{USDollar.format(row.fundsExpended)}</TableCell>
              <TableCell align="right">{USDollar.format(row.fundsRemaining)}</TableCell>
              <TableCell align="right">{row.fundsDateDepletion}</TableCell>
            </TableRow>
          )): <></>}
        </TableBody>
      </Table>
    </TableContainer>
        </Grid>

      </Grid>
      </MainCard>
    </>
  );
}

FinancialSummary.propTypes = {
  activeRowData: PropTypes.object
};
export default FinancialSummary;