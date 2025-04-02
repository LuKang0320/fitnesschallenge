// material-ui
import React from 'react';
import { useEffect } from 'react';
import {  Grid, InputLabel, Stack,Select ,MenuItem,Typography, Button} from '@mui/material';
//import { CloseOutlined } from '@ant-design/icons';
import AnimateButton from 'components/@extended/AnimateButton';
import FormControl from '@mui/material/FormControl';
import PropTypes from 'prop-types';
import { openSnackbar } from 'store/reducers/snackbar';
import { useDispatch } from 'store';
// project import
import useHCSS from 'hooks/useHCSS';
import MainCard from 'components/MainCard';
// ==============================|| BASIC WIZARD - ADDRESS  ||============================== //

const ManageUserEditBranchForm = ({activeRowData}) =>{
  const dispatch = useDispatch();
  const { GetAllUserRoles,GetAllBranchs,UpdateBranchManager} = useHCSS();
    
  const [branchs, setBranchs] = React.useState([]);
  const [branchid, setBranchid] = React.useState('');

  const [userroles, setUserRoles] = React.useState([]);
  const [userroleid, setUserRoleid] = React.useState('');

  const [isdisabled, setIsdisabled] = React.useState(true);
  useEffect(() => {
    const init = async () => {
         //console.log(activeRowData.values);

         let branchlist = await GetAllBranchs();
         setBranchs(branchlist.data);
         if(branchlist.data.find(x => x.branchmanager == activeRowData.values.username) !== undefined)
          {
         setBranchid(branchlist.data.find(x => x.branchmanager == activeRowData.values.username).id);
        }
        else{
          setBranchid('');
        }

         let userrolelist = await GetAllUserRoles();
         setUserRoles(userrolelist.data);
         setUserRoleid(activeRowData.values.roleid)
    };

    init();
  }, []);

  const userroleselectchange = async (event) => {
    setUserRoleid(event.target.value);
    
  };

  const branchselectchange = async (event) => {
    setBranchid(event.target.value);
    setIsdisabled(false);
  };

  const updatebuttonclicked = async () => {
    try {
      setIsdisabled(true);
      //console.log(branchid);
      //console.log(activeRowData.values);
      var res = await UpdateBranchManager(branchid, activeRowData.values.userid,activeRowData.values.username);
    if(res.data.success == true){
      
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

    //setIsdisabled(false);
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
              <InputLabel  style={{fontSize: "1.9vh"}}>User Role</InputLabel>
              <Select  //fullWidth
              disabled={true}
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
          <Stack spacing={0.5}>
          <FormControl fullWidth>
              <InputLabel  style={{fontSize: "1.9vh"}}>Branch</InputLabel>
              <Select  //fullWidth
                value={branchid}
                label="Branch"
                onChange={branchselectchange}
                
              >
                {branchs.map((w,index)=>{
                 return <MenuItem value={w.id} key={index}>{w.branchname}</MenuItem>

                })}
              </Select>
              </FormControl>
          </Stack>
        </Grid>



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

ManageUserEditBranchForm.propTypes = {
  activeRowData: PropTypes.object
};
export default ManageUserEditBranchForm;