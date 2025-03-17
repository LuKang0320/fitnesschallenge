// material-ui
import React from 'react';
import { useEffect } from 'react';
import { OutlinedInput, Grid, InputLabel, Stack,Button,Typography} from '@mui/material';
import AnimateButton from 'components/@extended/AnimateButton';
import { openSnackbar } from 'store/reducers/snackbar';
import { useDispatch } from 'store';
// project import

import PropTypes from 'prop-types';
import useHCSS from 'hooks/useHCSS';
import MainCard from 'components/MainCard';
// ==============================|| BASIC WIZARD - ADDRESS  ||============================== //

const Utilizationsummaryedit = ({activeRowData}) =>{
  const dispatch = useDispatch();
  const { UpdateUtilizationSummaryComments } = useHCSS();
  const [workorderid, setWorkorderid] = React.useState('');
  const [commentid, setCommentid] = React.useState('');
  const [comments, setComments] = React.useState('');  
  const [isdisabled, setIsdisabled] = React.useState(false);

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
         //console.log(activeRowData.values);
         setWorkorderid(activeRowData.values.workorderid);   
         setCommentid(activeRowData.values.commentid);     
         setComments(activeRowData.values.comments);

    };

    init();
  }, []);

  const resetform =  () => {
    setIsdisabled(false);
    //setComments('');
  }


  const updatebuttonclicked = async () => {
    try {
      //console.log(commentid);
    await UpdateUtilizationSummaryComments(comments, workorderid, cmonth, ccyear, commentid);
      dispatch(
        openSnackbar({
          open: true,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center'
          },
          message: 'Update Success',
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: true
        })
      );
      resetform();
    }
    catch(err){
      console.error(err);
              dispatch(
                openSnackbar({
                  open: true,
                  anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center'
                  },
                  message: 'Update Failed',
                  variant: 'alert',
                  alert: {
                    color: 'error'
                  },
                  close: true
                })
              );
    }
  };

  const handleCommentsChange =  ( event) => {
    setComments(event.target.value);
    //console.log(event.target);
  };

  return (
    <>
      <MainCard title={"Edit Utilization Summary Comments"}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
            <MainCard >
            <Typography  sx={{ px: 0 }}>
              Work Order : {activeRowData.values.workordernumber }-{activeRowData.values.workordername} 
              </Typography>
              <Typography  sx={{ px: 0 }}>
              {cmonth } {ccyear} : {activeRowData.values.hrsactualcum}
              </Typography>
              <Typography sx={{ px: 0}}>
              Option Period to Date: {activeRowData.values.hrsactualcur}
              </Typography>
            </MainCard>
          </Grid>
        <Grid item xs={12}>
          <InputLabel>Comments</InputLabel>
          <OutlinedInput 
          multiline value={comments}  onChange={handleCommentsChange} 
          rows={6}
          fullWidth placeholder="Please Enter"
               />
        </Grid>

         <Grid item xs={12}>
        <Stack direction="row" justifyContent="flex-end">
              <AnimateButton>
                <Button disableElevation disabled={isdisabled} variant="contained"  onClick={updatebuttonclicked} sx={{ my: 0, ml: 1}}>
                  Update
                </Button>
              </AnimateButton>
            </Stack>
            </Grid>
      </Grid>
      </MainCard>
    </>
  );
}

Utilizationsummaryedit.propTypes = {
  activeRowData: PropTypes.object
};
export default Utilizationsummaryedit;