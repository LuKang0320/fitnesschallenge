// material-ui
import React from 'react';
import { useEffect } from 'react';
import {  Grid, InputLabel, Stack,Select ,MenuItem,Button,Typography,Box,Autocomplete,TextField, Chip,Divider} from '@mui/material';
import { CloseOutlined } from '@ant-design/icons';
import AnimateButton from 'components/@extended/AnimateButton';
import FormControl from '@mui/material/FormControl';
import PropTypes from 'prop-types';
import { openSnackbar } from 'store/reducers/snackbar';
import { useDispatch } from 'store';
// project import
import useHCSS from 'hooks/useHCSS';
import MainCard from 'components/MainCard';
// ==============================|| BASIC WIZARD - ADDRESS  ||============================== //

const ManageUserEditForm = ({activeRowData}) =>{
  const dispatch = useDispatch();
  const { GetAllWorkOrders,GetAllUserRoles,GetWorkOrdersByUserID,
    UpdateUserwithWorkOrders } = useHCSS();
  const [workorders, setWorkorderss] = React.useState([]);
  const [selectedworkorders, setSelectedWorkorders] = React.useState([]);

  const [userroles, setUserRoles] = React.useState([]);
  const [userroleid, setUserRoleid] = React.useState('');

  const [isdisabled, setIsdisabled] = React.useState(false);

  // const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  // const d = new Date();
  // var ccmonth = d.getMonth();
  // var ccyear = d.getFullYear();
  // var lmonth = 0;
  // if(ccmonth == 0 ){
  //   lmonth = 11;
  //   ccyear = d.getFullYear() -1 ;
  // }else{
  //   lmonth = ccmonth - 1;
  // }
  // const cmonth = month[lmonth];
  useEffect(() => {
    const init = async () => {
         //console.log(activeRowData.values);
         let workorderlist = await GetAllWorkOrders();
         setWorkorderss(workorderlist.data);
         let selecetedworkorderlist = await GetWorkOrdersByUserID(activeRowData.values.userid);
         setSelectedWorkorders(selecetedworkorderlist.data);

         let userrolelist = await GetAllUserRoles();
         setUserRoles(userrolelist.data);
         setUserRoleid(activeRowData.values.roleid)
    };

    init();
  }, []);

  const userroleselectchange = async (event) => {
    setUserRoleid(event.target.value);
    
  };

  const updatebuttonclicked = async () => {
    try {
      setIsdisabled(true);
      let workorderids = [];
      for (var i=0;i<selectedworkorders.length;i++){
        workorderids.push(selectedworkorders[i].id);
      }
      var res = await UpdateUserwithWorkOrders(activeRowData.values.userid, workorderids);
    if(res.res.success == true){
      
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
    else {

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

    setIsdisabled(false);
  };

  return (
    <>
      <MainCard title={"Edit User"}>
      <Grid container spacing={3}>

      <Grid item xs={12} >
      <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 0.5 }}>
          <Typography variant="subtitle1">User Name:</Typography>
          <Typography variant="subtitle1">{activeRowData.values.username}</Typography>
        </Stack>
        </Grid>

        <Grid item xs={12}>
          <Stack spacing={0.5}>
          <FormControl fullWidth>
              <InputLabel id="manageuseredituserroleslabel" style={{fontSize: "1.9vh"}}>User Role</InputLabel>
              <Select  //fullWidth
              disabled={true}
                labelId="manageuseredituserroleslabel"
                value={userroleid}
                label="User Role"
                //onChange={handlebranchselectChange}
                onChange={userroleselectchange}
              >
                {userroles.map((w,index)=>{
                 return <MenuItem value={w.Id} key={index}>{w.Name}</MenuItem>

                })}
              </Select>
              </FormControl>
          </Stack>
        </Grid>


        <Grid item xs={12}>     
            <Box sx={{ display: 'flex', flexWrap: 'wrap', listStyle: 'none', p: 0, m: 0 }} component="ul">
              <Autocomplete
                multiple
                fullWidth
                //id="tags-outlined"
                options={workorders}
                value={selectedworkorders}
                //onBlur={handleBlur}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(item) => item.workordernumber + ' ' +  item.workordername}
                onChange={(event, newValue) => {
                  //console.log(newValue);
                  setSelectedWorkorders(newValue);
                }}
                renderInput={(params) => <TextField {...params} name="workorder" placeholder="Add Work Order" />}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      key={index}
                      {...getTagProps({ index })}
                      variant="combined"
                      label={option.workordernumber + ' ' +  option.workordername}
                      deleteIcon={<CloseOutlined style={{ fontSize: '0.75rem' }} />}
                      sx={{ color: 'text.primary' }}
                    />
                  ))
                }
                sx={{
                  '& .MuiOutlinedInput-root': {
                    p: 0,
                    '& .MuiAutocomplete-tag': {
                      m: 1
                    },
                    '& fieldset': {
                      display: 'none'
                    },
                    '& .MuiAutocomplete-endAdornment': {
                      display: 'none'
                    },
                    '& .MuiAutocomplete-popupIndicator': {
                      display: 'none'
                    }
                  }
                }}
              />
            </Box>
            <Divider />
        </Grid>         

        {/* <Grid item xs={12}>
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
        </Grid> */}



        <Grid item xs={12} >
         <Grid container spacing={3} >  
              <Grid item xs={12} sm={6}>
        <Stack direction="row" justifyContent="flex-end">
              <AnimateButton>
                <Button disableElevation disabled={isdisabled} variant="contained"  onClick={updatebuttonclicked} sx={{ my: 3, ml: 1}}>
                  Update
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

ManageUserEditForm.propTypes = {
  activeRowData: PropTypes.object
};
export default ManageUserEditForm;