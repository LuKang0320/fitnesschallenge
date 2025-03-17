import React from 'react';
import {  useEffect } from 'react';
// material-ui
import { Grid ,Divider,Stack,
  Button, InputLabel,
  Select,
  MenuItem } from '@mui/material';

// project imports
import MainCard from 'components/MainCard';

// third party
import { openSnackbar } from 'store/reducers/snackbar';
import { useDispatch } from 'store';
// project import
import useHCSS from 'hooks/useHCSS';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';


//const delay = (timeout) => new Promise((res) => setTimeout(res, timeout));
// ============================|| JWT - LOGIN ||============================ //

const WOProgressreport = () => {

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  };

  const dispatch = useDispatch();
  const { GetWorkOrderFinancialsReportByName,GetAllWorkOrders } = useHCSS();

  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];


  const [workorders, setWorkorders] = React.useState([]);
  const [workorder, setWorkorder] = React.useState('');

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
      let listsres = await GetAllWorkOrders();
      //console.log(listsres);
      setWorkorders(listsres.data);
    };

    init();
  }, []);


  const handleButtonClick  =  async (event) => {
    if(workorder !== ''){
    event.preventDefault();
    setSuccess(false);
      setLoading(true);
    //console.log('aaaa');

     await GetWorkOrderFinancialsReportByName(ccyear, cmonth,workorder)
         .then((response) => {
        //setCurrentFile('');
          console.log(response.data);
          setSuccess(true);
        setLoading(false);
        window.open(response.data,'_blank');
        dispatch(
          openSnackbar({
            open: true,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center'
            },
            message: 'Report Has been created.',
            variant: 'alert',
            alert: {
              color: 'success'
            },
            close: true
          })
        );
      });
    }
    else {
      dispatch(
        openSnackbar({
          open: true,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center'
          },
          message: 'Please select a work order',
          variant: 'alert',
          alert: {
            color: 'error'
          },
          close: true
        })
      );
    }
    
  };
  const handleworkorderselectChange = (event) => {

    setWorkorder(event.target.value);
  }

  return (
    <>
<form id="form1" name="form1"  data-ajax="false" method="post" 
 >
     <MainCard title={"Create Work Order Progress Report (" + cmonth+ " " + ccyear +")"}>
     <Grid container spacing={3} alignItems="center">


        <Grid item xs={12}>
        <Stack spacing={0.5}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ m: 1, position: 'relative' }}>
                        <InputLabel >Work Order</InputLabel>
                    <Select  fullWidth sx={{ minWidth: 200 }}
                      id="woprworkorder"
                      value={workorder}
                      label="Work Order"
                      onChange={handleworkorderselectChange}
                    >
                      {workorders.map((w,index)=>{
                      return <MenuItem value={w.workordernum} key={index}>{w.workordernumber} - {w.workordername}</MenuItem>

                      })}
                    </Select>
                  </Box>
                </Box>
              </Stack>
          </Stack>
          <Stack spacing={0.5}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ m: 1, position: 'relative' }}>
                    <Button
                      variant="contained"
                      sx={buttonSx}
                      disabled={loading}
                      onClick={handleButtonClick}
                    >
                      Create WO Progress Report
                    </Button>
                    {loading && (
                      <CircularProgress
                        size={24}
                        sx={{
                          color: green[500],
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          marginTop: '-12px',
                          marginLeft: '-12px',
                        }}
                      />
                    )}
                  </Box>
                </Box>
              </Stack>
          </Stack>
        </Grid>

        <Grid item xs={12}>
              <Divider />
        </Grid>




      </Grid>
      </MainCard>
      </form>
    </>
  );
};

export default WOProgressreport;
