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

const MonthlyContentForm = ({activeRowData}) =>{
  const dispatch = useDispatch();
  const { GetAllWorkOrders,GetUsersByWorkOrderID,GetStaffMonthlyUpdatesByUserIDWorkOrderID,
    UpdateStaffMonthlyUpdatesByPM,RejectStaffMonthlyUpdatesByPM } = useHCSS();
  const [workorders, setWorkorderss] = React.useState([]);
  const [workorderid, setWorkorderid] = React.useState('');

  const [users, setUsers] = React.useState([]);
  const [userid, setUserid] = React.useState('');
  const [rejectdec, setRejectdec] = React.useState('');
  const [workperformed, setWorkperformed] = React.useState('');
  const [problemsencountered, setProblemsencountered] = React.useState('');
  const [workexpected, setWorkexpected] = React.useState('');
  const [isdisabled, setIsdisabled] = React.useState(true);

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
         let userslist = await GetUsersByWorkOrderID(activeRowData.values.id);
         setUsers(userslist.data);
    };

    init();
  }, []);

  const resetform =  () => {
    setIsdisabled(true);
    setWorkperformed('');
    setWorkexpected('');
    setProblemsencountered('');
    setUserid('');
  }

  const workorderselectchange = async (event) => {
    resetform();
    setWorkorderid(event.target.value);
    let userslist = await GetUsersByWorkOrderID(event.target.value);
    setUsers(userslist.data);
  };
  const userselectchange = async (event) => {
    if(workorderid !== '')
    {
      setRejectdec('')
      setUserid(event.target.value);
      let updatesres = await GetStaffMonthlyUpdatesByUserIDWorkOrderID(event.target.value, cmonth,workorderid,ccyear);
      if(updatesres.data.length > 0)
      {
        if (updatesres.data[0].status == 'rejected'){
          setRejectdec('This record has been re-opened, please notify the user to re-submitt!');
        }
        setIsdisabled(false);
        setWorkperformed(updatesres.data[0].workperformed);
        setWorkexpected(updatesres.data[0].workexpected);
        setProblemsencountered(updatesres.data[0].workproblems);
      }
      else{
        setIsdisabled(true);
        setWorkperformed('');
        setWorkexpected('');
        setProblemsencountered('');
      }
    
    }
  };

  const updatebuttonclicked = async () => {
    try {
    await UpdateStaffMonthlyUpdatesByPM(workperformed, problemsencountered,workexpected, workorderid,userid,cmonth, ccyear);
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


  const rejectbuttonclicked = async () => {
    try {
    await RejectStaffMonthlyUpdatesByPM('', '','', workorderid,userid, cmonth, ccyear);
    setRejectdec('This record has been re-opened, please notify the user to re-submitt!');
      dispatch(
        openSnackbar({
          open: true,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center'
          },
          message: 'Success',
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


  const handleworkperformedChange =  ( event) => {
    setWorkperformed(event.target.value);

  };
  const handleproblemsencounteredChange =  (event) => {
    
    setProblemsencountered(event.target.value);
  };
  const handleworkexpectedChange =  ( event) => {
    setWorkexpected(event.target.value);
  };

  return (
    <>
      <MainCard title={"Monthly Content Review (" + cmonth+ " " + ccyear +")"}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl
          variant="outlined"
          style={{ width: "100%", marginBottom: 3}}>
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
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={0.5}>
          <FormControl fullWidth>
              <InputLabel id="monthlycontentformuserlabel" style={{fontSize: "1.9vh"}}>Project Staff Name</InputLabel>
              <Select  //fullWidth
                labelId="monthlycontentformuserlabel"
                value={userid}
                label="Project Staff Nam"
                //onChange={handlebranchselectChange}
                onChange={userselectchange}
              >
                {users.map((w,index)=>{
                 return <MenuItem value={w.userid} key={index}>{w.username}</MenuItem>

                })}
              </Select>
              </FormControl>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <InputLabel>Work Performed</InputLabel>
          <OutlinedInput id="monthlycontentformworkperformed"
           minRows={5}
           maxRows={10}
          multiline value={workperformed}  onChange={handleworkperformedChange} 
          
          fullWidth placeholder="Please Enter"
               />
        </Grid>
        <Grid item xs={12}>
          <InputLabel>Problems Encountered</InputLabel>
          <OutlinedInput id="monthlycontentformworkproblems"
          multiline
          minRows={5}
           maxRows={10} value={problemsencountered} onChange={handleproblemsencounteredChange} 
          fullWidth placeholder="Please Enter" />
        </Grid>
        <Grid item xs={12}>
          <InputLabel>Work Expected</InputLabel>
          <OutlinedInput id="monthlycontentformworkexpected"
          multiline
          minRows={5}
           maxRows={10} value={workexpected}  onChange={handleworkexpectedChange} 
            fullWidth placeholder="Please Enter"/>
        </Grid>
        <Grid item xs={12} >
         <Grid container spacing={0} >
          <Grid item xs={12} sm={6}>
            <Stack direction="row" justifyContent="start">
            <InputLabel  style={{fontSize: "1.9vh"}}>{rejectdec}</InputLabel>
          </Stack> 
          </Grid>
          <Grid item xs={12} sm={6}>
        <Stack direction="row" justifyContent="flex-end">
              <AnimateButton>
                <Button disableElevation disabled={isdisabled} variant="contained"  onClick={updatebuttonclicked} sx={{ my: 0, ml: 1}}>
                  Update
                </Button>
              </AnimateButton>
              <AnimateButton>
                <Button disableElevation disabled={isdisabled} variant="contained"  onClick={rejectbuttonclicked} sx={{ my: 0, ml: 1}}>
                  Re-Open
                </Button>
              </AnimateButton>
            </Stack>
            </Grid>
            </Grid>
            </Grid>
      </Grid>
      </MainCard>
    </>
  );
}

MonthlyContentForm.propTypes = {
  activeRowData: PropTypes.object
};
export default MonthlyContentForm;