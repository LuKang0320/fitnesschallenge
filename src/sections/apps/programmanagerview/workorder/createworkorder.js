import React from 'react';
import {  useEffect } from 'react';
//import jwtDecode from 'jwt-decode';
// material-ui
import { Button, Divider, Grid, OutlinedInput, FormHelperText, InputLabel,
  Select,
  MenuItem } from '@mui/material';
import AnimateButton from 'components/@extended/AnimateButton';
// project imports
import MainCard from 'components/MainCard';
// styles & constant
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
    }
  }
};
// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import { openSnackbar } from 'store/reducers/snackbar';
import { useDispatch } from 'store';
// project import
import useScriptRef from 'hooks/useScriptRef';
import useHCSS from 'hooks/useHCSS';

// ============================|| JWT - LOGIN ||============================ //

const CreateWorkOrder = () => {
  const dispatch = useDispatch();
  const { AddNewWorkOrder,GetNewWorkOrderNumber,GetAllBranchs } = useHCSS();
  const scriptedRef = useScriptRef();
  const [workordernum, setWorkordernum] = React.useState(0);
  const [workordernumber, setWorkordernumber] = React.useState('');
  //const [branch, setBranch] = React.useState('');
  const [branchs, setBranchs] = React.useState([]);
  //const [branchmanager, setBranchmanager] = React.useState('');
  useEffect(() => {
    const init = async () => {
     
      reloadMaxWorkOrderNumber();
         //const serviceToken = window.localStorage.getItem('serviceToken');
         //const jwData = jwtDecode(serviceToken);
         //const { userId } = jwData;
         //console.log(userId);
         let branches = await GetAllBranchs();
         setBranchs(branches.data);
    };

    init();
  }, []);

  const reloadMaxWorkOrderNumber = async () =>{
    let res = '000';
    let newworkordernumnber= await GetNewWorkOrderNumber();

    if(newworkordernumnber.data < 10){
      res = 'WO-00' + newworkordernumnber.data;
    } 
    if(newworkordernumnber.data > 9 && newworkordernumnber.data < 100){

      res = 'WO-0' + newworkordernumnber.data;
    }
    if(newworkordernumnber.data > 99){
      res = 'WO-' + newworkordernumnber.data;
    } 
    setWorkordernum(newworkordernumnber.data);
    setWorkordernumber(res);
};


  return (
    <>
      <Formik
        initialValues={              
          {
            workordernum:workordernum,
            workordernumber: workordernumber,
            workordername: '',
            staffingstatus: '',
            aaqbranch: ''
        }        
      }
      enableReinitialize
        validationSchema={Yup.object().shape({
          workordernumber: Yup.string().max(255).required('Work order number is required'),
          workordername: Yup.string().max(255).required('Work order name is required'),
          staffingstatus: Yup.string().max(255).required('Recruiting status is required'),
          aaqbranch: Yup.string().max(255).required('AAQ Branch is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting ,resetForm }) => {
          try {
           let res= await AddNewWorkOrder(values.workordernumber, values.workordername,values.staffingstatus, values.workordernum,values.aaqbranch);
            console.log('select form submit - ', values);
                console.log(res);       
            //await delay(2000);
            //         
              //console.log(scriptedRef);
            if (scriptedRef.current) {
              if(res.success === true){
              dispatch(
                openSnackbar({
                  open: true,
                  anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center'
                  },
                  message: 'New work order has been created!',
                  variant: 'alert',
                  alert: {
                    color: 'success'
                  },
                  close: true
                })
              );
              
              setStatus({ success: true });
              setSubmitting(false);
              resetForm(); 
              reloadMaxWorkOrderNumber();  
            }
            else{
              dispatch(
                openSnackbar({
                  open: true,
                  anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center'
                  },
                  message: res.msg,
                  variant: 'alert',
                  alert: {
                    color: 'error'
                  },
                  close: true
                })
              );
              setStatus({ success: false});
              setErrors({ submit: res.msg });
              //setSubmitting(false);
            }
            }
          } catch (err) {
            console.error(err);
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }
        }}
      >
        {({ errors,   handleBlur, handleChange,handleSubmit, isSubmitting ,touched,values}) => (
          <form noValidate onSubmit={handleSubmit}>
            <MainCard >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <InputLabel>Work Order Number</InputLabel>
              <OutlinedInput id="workordernumber" disabled={true}
              fullWidth placeholder="Please Enter" onBlur={handleBlur}
                    onChange={handleChange('workordernumber')}  value={values.workordernumber} 
                    error={Boolean(touched.workordernumber && errors.workordernumber)}/>
              {touched.workordernumber && errors.workordernumber && (
                    <FormHelperText error id="standard-weight-helper-text-work-performed">
                      {errors.workordernumber}
                    </FormHelperText>
                  )}
              <FormHelperText>Please enter your new work order number</FormHelperText>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <InputLabel>Word Order Name</InputLabel>
              <OutlinedInput id="workordername"
               fullWidth placeholder="Please Enter" onBlur={handleBlur}
                    onChange={handleChange}  value={values.workordername}
                    error={Boolean(touched.workordername && errors.workordername)}/>
              {touched.workordername && errors.workordername && (
                    <FormHelperText error id="standard-weight-helper-text-work-problems">
                      {errors.workordername}
                    </FormHelperText>
                  )}
              <FormHelperText>Please enter the new work order name</FormHelperText>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <InputLabel >AAQ Branch</InputLabel>
              <Select  fullWidth
                id="aaqbranch"
                value={values.aaqbranch}
                label="AAQ Branch"
                //onChange={handlebranchselectChange}
                onChange={handleChange('aaqbranch')}
              >
                {branchs.map((w,index)=>{
                 return <MenuItem value={w.id} key={index}>{w.branchname} - {w.branchmanager}</MenuItem>

                })}
              </Select>
              {/* <InputLabel >Branch Manager</InputLabel>
              <Select fullWidth disabled={false}
                id="branchmanager"
                value={values.branchmanager}
                label="Branch Manager"
                onChange={handleChange('branchmanager')}
              >
                {branchs.map((w,index)=>{
                 return <MenuItem value={w.branchname} key={index}>{w.branchmanager}</MenuItem>

                })}
              </Select> */}
              {touched.aaqbranch && errors.aaqbranch && (
                    <FormHelperText error id="standard-weight-helper-text-branch">
                      {errors.aaqbranch}
                    </FormHelperText>
                  )}
              <FormHelperText>Please select the AAQ Branch</FormHelperText>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
            <InputLabel>Recruiting Status</InputLabel>
            <Select 
            
            id="staffingstatus" fullWidth  value={values.staffingstatus} onChange={handleChange('staffingstatus')} MenuProps={MenuProps}>
                  <MenuItem value="Open">Open</MenuItem>
                  <MenuItem value="Full">Full</MenuItem>
                </Select>   
                {touched.staffingstatus && errors.staffingstatus && (
                    <FormHelperText error id="standard-weight-helper-text-work-problems">
                      {errors.staffingstatus}
                    </FormHelperText>
                  )}
              <FormHelperText>Please select the new work order recruiting status</FormHelperText>
            </Grid>
            {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting } fullWidth size="large" type="submit" variant="contained" color="primary">
                    submit
                  </Button>
                </AnimateButton>
              </Grid>
          </Grid>
        </MainCard>
          </form>
        )}
      </Formik>
    </>
  );
};

export default CreateWorkOrder;
