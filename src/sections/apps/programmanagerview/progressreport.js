import React from 'react';
import {  useEffect } from 'react';
// material-ui
import { Button,Grid ,Divider,Stack} from '@mui/material';

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

const Progressreport = () => {

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [notsubmitted, setNotsubmitted] = React.useState(true);

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  };

  const dispatch = useDispatch();
  const { GetAllWorkOrderFinancialsReport,SubmitMPR } = useHCSS();
  //const Navigation = useNavigate();
  //const scriptedRef = useScriptRef();
  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  //const [isdisabled, setIsdisabled] = React.useState(true);



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
      return () => {
        clearTimeout(timer.current);
      };
    };

    init();
  }, []);


  const handleButtonClick  =  async (event) => {
    event.preventDefault();
    setSuccess(false);
      setLoading(true);
      setNotsubmitted(true);
    //console.log('aaaa');

     await GetAllWorkOrderFinancialsReport(ccyear, cmonth)
         .then((response) => {
        //setCurrentFile('');
          //console.log(response);
          setSuccess(true);
        setLoading(false);
        setNotsubmitted(false);
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

    
  };

  const handleButtonSubmit  =  async (event) => {
    event.preventDefault();
      setSuccess(false);
      setLoading(true);
      setNotsubmitted(true);

     await SubmitMPR(cmonth,ccyear)
         .then((response) => {
          console.log(response);
          setSuccess(true);
        setLoading(false);
        setNotsubmitted(false);
        dispatch(
          openSnackbar({
            open: true,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center'
            },
            message: 'Report Has been submitted.',
            variant: 'alert',
            alert: {
              color: 'success'
            },
            close: true
          })
        );
      });

    
  };
  return (
    <>
<form id="form1" name="form1"  data-ajax="false" method="post" 
 >
     <MainCard title={"Create Monthly Progress Report (" + cmonth+ " " + ccyear +")"}>
     <Grid container spacing={3} alignItems="center">

        <Grid item xs={12}>
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
                      Create Monthly rogress Report
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

        <Grid item xs={12}>
          <Stack spacing={0.5}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ m: 1, position: 'relative' }}>
                    <Button
                      variant="contained"
                      sx={buttonSx}
                      disabled={notsubmitted}
                      onClick={handleButtonSubmit}
                    >
                      Submit Monthly rogress Report
                    </Button>
                  </Box>
                </Box>
              </Stack>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <div>{"Note: Once the current MPR has been sumbitted, it will be showing in the 'Submitted MPRs' page."}</div>
              </Stack>
          </Stack>
        </Grid>


      </Grid>
      </MainCard>
      </form>
    </>
  );
};

export default Progressreport;
