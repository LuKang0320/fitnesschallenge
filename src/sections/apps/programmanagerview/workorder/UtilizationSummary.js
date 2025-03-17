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

const UtilizationSummary = ({activeRowData}) =>{
  const { GetAllWorkOrders ,GetUtilizationByWorkOrderID} = useHCSS();
  const [workorders, setWorkorderss] = React.useState([]);
  const [workorderid, setWorkorderid] = React.useState('');

  const [utilizations, setUtilizations] = React.useState([]);

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
         let utilizationlist = await GetUtilizationByWorkOrderID(activeRowData.values.id,cmonth);
         //console.log(financiallist);
         setUtilizations(utilizationlist.data)
    };

    init();
  }, []);

  const workorderselectchange = async (event) => {

    setWorkorderid(event.target.value);
    let utilizationlist = await GetUtilizationByWorkOrderID(event.target.value,cmonth);
    //console.log(financiallist);
    setUtilizations(utilizationlist.data)
  };

  return (
    <>
      <MainCard title={"Utilization Summary (" + cmonth+ " " + ccyear +")"}>
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
            <TableCell>Employee Name</TableCell>
            <TableCell align="right">{cmonth} {d.getFullYear()}</TableCell>
            <TableCell align="right">Option Period to Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {utilizations.length > 0 ?
          utilizations.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.percenthrscur}%</TableCell>
              <TableCell align="right">{row.percenthrscum}%</TableCell>
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

UtilizationSummary.propTypes = {
  activeRowData: PropTypes.object
};
export default UtilizationSummary;