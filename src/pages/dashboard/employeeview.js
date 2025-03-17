import React from 'react';
import {  useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
// material-ui
import {FormControl, Select, Button, Divider, Grid, FormHelperText, InputLabel,MenuItem, Stack, 
  Typography, Box,TextField 
 } from '@mui/material';
import AnimateButton from 'components/@extended/AnimateButton';
// project imports
import MainCard from 'components/MainCard';
// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import { openSnackbar } from 'store/reducers/snackbar';
import { useDispatch } from 'store';
// project import
//import useScriptRef from 'hooks/useScriptRef';
import useHCSS from 'hooks/useHCSS';
import DailyBarChart from 'sections/dashboard/fitnessemployee/DailyBarChart';
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
//const delay = (timeout) => new Promise((res) => setTimeout(res, timeout));
// ============================|| JWT - LOGIN ||============================ //

const EmployeeView = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));
  const dispatch = useDispatch();
  const { saveinchtechstaffmonthlyupdates,GetAllFitnessActivities,GetEmployeeDailyUpdatesByUserID } = useHCSS();
  //const scriptedRef = useScriptRef();
  const [fitnessactivity, setFitnessactivity] = React.useState('');
  const [fitnessactivities, setFitnessactivities] = React.useState([]);
  const [usermonthlyupdates, setUsermonthlyupdates] = React.useState([]);
  const [usermonthlyupdate, setUsermonthlyupdate] = React.useState({});

  const [isdisabled, setIsdisabled] = React.useState(true);


  useEffect(() => {
    const init = async () => {
       await reloadUpdates();
    };

    init();
  }, []);

  const reloadUpdates = async () =>{
        const serviceToken = window.localStorage.getItem('serviceToken');
        const jwData = jwtDecode(serviceToken);
        const { userId } = jwData;
        let workordersres = await GetAllFitnessActivities();
        setFitnessactivities(workordersres.data);
        let updatesres = await GetEmployeeDailyUpdatesByUserID(userId, selectedDate);
        setUsermonthlyupdates(updatesres.data);       
        //console.log(updatesres.data);
        var wid = [];
        var workid = [];
        for (var i = 0; i < workordersres.data.length; i++) 
        {
          var result = updatesres.data.filter(obj => {
            return obj.activityid === workordersres.data[i].id
          });
          if(result.length == 0)
          
            wid.push(workordersres.data[i].name);
            workid.push(workordersres.data[i].id);
        }
        //console.log(wid.length);  
        if(wid.length > 0)
        {
          //setWorkorderwarning("Work Order " + wid.toString() + " still need to be updated");
          setFitnessactivity(workid[0]);
          workorderselectchange(workid[0],updatesres.data);
        }
        else 
        {
          //console.log(workordersres.data.length);  
            if(workordersres.data.length > 0)
              {
              setFitnessactivity(workordersres.data[0].id);
              workorderselectchange(workordersres.data[0].id,updatesres.data);
            }
        }        
      };
    
  const handleworkorderselectChange = async(event) => {

    workorderselectchange(event.target.value, usermonthlyupdates);
  
  };

  function workorderselectchange(workorderid, ups){
    setFitnessactivity(workorderid);

    var result = [];
    if(usermonthlyupdates > 0)
    {
      result = usermonthlyupdates.filter(obj => {
          return obj.activityid === workorderid
        })
      }
      else {
        if(ups.length > 0){
          result = ups.filter(obj => {
            return obj.activityid === workorderid
          })
        }
      }
    if(result.length > 0)
    {
      setUsermonthlyupdate(result[0]);
    }
    else{
      setUsermonthlyupdate({});
      setIsdisabled(false);
    }
  }



  function getInitialFormValues(inputs) {
    const initialValues = {};
    for (const field in inputs) {
        if (!initialValues[field]) {
        initialValues[field] = inputs[field];
      }
  }
  //console.log(initialValues);
    return initialValues;
  }

  return (
    <>
    <Grid container rowSpacing={1.5} columnSpacing={0.5}>
     <Grid item xs={12} >
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    label="Select a date"
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                </Grid>
            </Grid>
            <MainCard sx={{ mt: 0, mb:1 }} content={false}>
              <Box sx={{ p: 2, pb: 0 }}>
                <Stack spacing={0.5}>
                  <Typography variant="h6" >
                    Today Statistics: 180 minutes
                  </Typography>
                </Stack>
              </Box>
              <DailyBarChart />
            </MainCard>
          </Grid>
     <Grid item xs={12} >
        <Formik
          initialValues={
            Object.keys(usermonthlyupdate).length === 0?         
            {
              totalminutes: 0
          } :  
          getInitialFormValues(usermonthlyupdate)
        }
        enableReinitialize
          validationSchema={Yup.object().shape({
            totalminutes: Yup.string().max(12400).required('Minutes Performed is required')
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting ,resetForm }) => {
            try {
            var res= await saveinchtechstaffmonthlyupdates(values.totalminutes, fitnessactivity,ccyear, cmonth);
              //console.log(res);
              if(res.res.success == true){
                window.open(res.res.msg,'_blank');
                dispatch(
                  openSnackbar({
                    open: true,
                    anchorOrigin: {
                      vertical: 'top',
                      horizontal: 'center'
                    },
                    message: 'Submit Success',
                    variant: 'alert',
                    alert: {
                      color: 'success'
                    },
                    close: true
                  })
                );
                reloadUpdates();
                resetForm();
                setStatus({ success: true });
                setSubmitting(false);
                setIsdisabled(true);
              }
              else {
                setStatus({ success: false });
                setErrors({ submit: err.message });
                setSubmitting(false);
                setIsdisabled(false);

              }
            } catch (err) {
            // console.error(err);
                setStatus({ success: false });
                setErrors({ submit: err.message });
                setSubmitting(false);
                setIsdisabled(false);
              
            }
          
          }}
        >
          {({ errors,   handleBlur, handleChange,handleSubmit, isSubmitting ,touched,values,resetForm}) => (
            <form noValidate onSubmit={handleSubmit}>
              <MainCard title={"Employee Fitness Challenge Daily Updates"}>
            <Grid container spacing={2} alignItems="center" >              
            <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    label="Select a date"
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>

              <FormControl
            variant="outlined"
            style={{ width: "100%", marginBottom: 3, marginLeft: 15 }}
          >
            
              <Grid item xs={12}>
                <InputLabel id="fitnessactivities-select-label">Fitness Activities</InputLabel>
                <Select   style={{ width: "100%" }}
                  variant="outlined"
                  labelId="fitnessactivities-select-label"
                  // id="fitnessactivities-simple-select"
                  value={fitnessactivity}
                  label={"Fitness Activities"}
                  
                  onChange={(e) => { 
                    resetForm();
                    handleworkorderselectChange(e);
                }}
                >
                  {fitnessactivities.map((w,index)=>{
                  return <MenuItem value={w.id} key={index}>{w.name}</MenuItem>
                  })}
                </Select>
              </Grid>
              </FormControl>

              
              <Grid item xs={12}>
                <InputLabel>Minutes Performed</InputLabel>
                <TextField id="totalminutes"  type="number"
                fullWidth placeholder="Please Enter Minutes Performed" onBlur={handleBlur}
                      onChange={handleChange}  value={values.totalminutes} 
                      error={Boolean(touched.totalminutes && errors.totalminutes)}/>
                {touched.totalminutes && errors.totalminutes && (
                      <FormHelperText error id="standard-weight-helper-text-work-performed">
                        {errors.totalminutes}
                      </FormHelperText>
                    )}
                {/* <FormHelperText>Please enter your work performed</FormHelperText> */}
              </Grid>            

              {errors.submit && (
                  <Grid item xs={12}>
                    <FormHelperText error>{errors.submit}</FormHelperText>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <AnimateButton>
                    <Button disableElevation disabled={isSubmitting || isdisabled} fullWidth size="large" type="submit" variant="contained" color="primary">
                      submit
                    </Button>
                  </AnimateButton>
                </Grid>
            </Grid>
          </MainCard>
            </form>
          )}
        </Formik>
      </Grid>
    </Grid>
    </>
  );
};

export default EmployeeView;
