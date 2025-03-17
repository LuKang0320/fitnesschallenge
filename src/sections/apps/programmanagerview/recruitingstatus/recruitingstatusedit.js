// material-ui
import React from 'react';
import { useEffect } from 'react';
import { OutlinedInput, Grid, InputLabel, Stack,Select ,MenuItem,Button} from '@mui/material';
import AnimateButton from 'components/@extended/AnimateButton';
import FormControl from '@mui/material/FormControl';
import PropTypes from 'prop-types';
import { openSnackbar } from 'store/reducers/snackbar';
import { useDispatch } from 'store';
// project import
import useHCSS from 'hooks/useHCSS';
import MainCard from 'components/MainCard';
// ==============================|| BASIC WIZARD - ADDRESS  ||============================== //

const Recruitingstatusedit = ({activeRowData}) =>{
  const dispatch = useDispatch();
  const { GetAllWorkOrders,GetWorkOrdersRecruitingStatusBbyWorkorderID,UpdateWorkOrderRecruitingStatus } = useHCSS();
  const [workorders, setWorkorderss] = React.useState([]);
  const [workorderid, setWorkorderid] = React.useState('');

  const [staffingstatus, setStaffingstatus] = React.useState('');  
  const [recruitingstatus, setRecruitingstatus] = React.useState('');

  const [isdisabled, setIsdisabled] = React.useState(false);

  useEffect(() => {
    const init = async () => {
         console.log(activeRowData.values.id);
         let workorderlist = await GetAllWorkOrders();
         setWorkorderss(workorderlist.data);
         setWorkorderid(activeRowData.values.id);
         let statuslist = await GetWorkOrdersRecruitingStatusBbyWorkorderID(activeRowData.values.id);
         setStaffingstatus(statuslist.data[0].staffingstatus);
         setRecruitingstatus(statuslist.data[0].recruitingstatus); 
    };

    init();
  }, []);

  const resetform =  () => {
    setIsdisabled(false);
    setStaffingstatus('');
    setRecruitingstatus('');
  }

  const workorderselectchange = async (event) => {
    resetform();
    setWorkorderid(event.target.value);
    let statuslist = await GetWorkOrdersRecruitingStatusBbyWorkorderID(event.target.value);
    setStaffingstatus(statuslist.data[0].staffingstatus);
    setRecruitingstatus(statuslist.data[0].recruitingstatus); 
  };

  const updatebuttonclicked = async () => {
    try {
    await UpdateWorkOrderRecruitingStatus(recruitingstatus, staffingstatus, workorderid);
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

  const handlestaffingstatusChange =  ( event) => {
    setStaffingstatus(event.target.value);

  };
  const handlerecruitingstatusChange =  ( event) => {
    setRecruitingstatus(event.target.value);

  };
  return (
    <>
      <MainCard title={"Recruiting Stauts Review"}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack spacing={0.5}>
          <FormControl fullWidth>
              <InputLabel id="monthlycontentformworkorderlabel" style={{fontSize: "1.9vh"}}>Work Order</InputLabel>
              <Select 
                labelId="monthlycontentformworkorderlabel"
                value={workorderid}
                label="Work Order"
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
          <InputLabel>Description</InputLabel>
          <OutlinedInput id="recruitingstatusformrecruitingstatus"
          multiline value={recruitingstatus}  onChange={handlerecruitingstatusChange} 
          rows={2}
          fullWidth placeholder="Please Enter"
               />
        </Grid>
        <Grid item xs={12}>
            <InputLabel>Recruiting Status</InputLabel>
            <Select 
            id="recruitingstatusformstaffingstatus" fullWidth  value={staffingstatus} 
            onChange={handlestaffingstatusChange}>
                  <MenuItem value="Open">Open</MenuItem>
                  <MenuItem value="Full">Full</MenuItem>
                </Select>   
            </Grid>
         <Grid item xs={12}>
        <Stack direction="row" justifyContent="flex-end">
              <AnimateButton>
                <Button disableElevation disabled={isdisabled} variant="contained"  onClick={updatebuttonclicked} sx={{ my: 3, ml: 1}}>
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

Recruitingstatusedit.propTypes = {
  activeRowData: PropTypes.object
};
export default Recruitingstatusedit;