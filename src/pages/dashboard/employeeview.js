import React from 'react';
import {  useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
// material-ui
import {FormControl, Select, Button, Grid, FormHelperText, InputLabel,MenuItem, Stack, 
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
  const [loginuserid, setLoginuserid] = useState('');
  const dispatch = useDispatch();
  const {AddNewFitnessActivityRecord,GetAllFitnessActivities,GetEmployeeDailyUpdatesByUserID } = useHCSS();
  //const scriptedRef = useScriptRef();
  const [fitnessactivity, setFitnessactivity] = React.useState('');
  const [fitnessactivities, setFitnessactivities] = React.useState([]);
  const [usermonthlyupdates, setUsermonthlyupdates] = React.useState([]);
  const [usermonthlyupdate, setUsermonthlyupdate] = React.useState({});

  const [isdisabled, setIsdisabled] = React.useState(true);
  const [fitnessdata, setFitnessdata] = useState([]);
  const [latestfitness, setLatestfitness] = useState({});



  useEffect(() => {
    const init = async () => {
      if(window.localStorage.getItem('latestFitness') !== undefined)
        { 
          const latestFitnessC = window.localStorage.getItem('latestFitness');
           var lFitness = JSON.parse(latestFitnessC);
           setLatestfitness(lFitness);
        }
       await reloadUpdates();
    };

    init();
  }, []);


function newchartdata (items) {
      // Step 1: Create a map for quick lookup
      const idMap = {};
      items.forEach(item => {
        idMap[item.activityid] = item;
      });

      // Step 2: Find the max ID
      const maxId = 13;

      // Step 3: Build the final array
      const orderedArray = [];

      for (let i = 1; i <= maxId; i++) {
        if (idMap[i]) {
          orderedArray.push(idMap[i].totalminutes);
        } else {
          orderedArray.push(0);
        }
      }
      return orderedArray;
}

  const reloadUpdates = async () =>{
    
      //console.log(latestfitness);
        const serviceToken = window.localStorage.getItem('serviceToken');
        const jwData = jwtDecode(serviceToken);
        const { userId } = jwData;
        setLoginuserid(userId);
        let workordersres = await GetAllFitnessActivities();
        setFitnessactivities(workordersres.data);
        let updatesres = await GetEmployeeDailyUpdatesByUserID(userId, selectedDate);
        setUsermonthlyupdates(updatesres.data);    
      
        var newdata = newchartdata(updatesres.data);
        setFitnessdata(newdata);

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
        if(wid.length > 0)
        {
          //setWorkorderwarning("Work Order " + wid.toString() + " still need to be updated");
          setFitnessactivity(workid[0]);
          fitnessselectchange(workid[0],updatesres.data);
        }
        else 
        {
            if(workordersres.data.length > 0)
              {
              setFitnessactivity(workordersres.data[0].id);
              fitnessselectchange(workordersres.data[0].id,updatesres.data);
            }
        }        
      };
    
  const handlefitnessselectChange = async(event) => {

    fitnessselectchange(event.target.value, usermonthlyupdates);
  
  };

  function fitnessselectchange(fitnessid, ups){
    setFitnessactivity(fitnessid);

    var result = [];
    if(usermonthlyupdates > 0)
    {
      result = usermonthlyupdates.filter(obj => {
          return obj.activityid === fitnessid
        })
      }
      else {
        if(ups.length > 0){
          result = ups.filter(obj => {
            return obj.activityid === fitnessid
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
    return initialValues;
  }

  const handledateselectChange = async(newdate) => {

    setSelectedDate(dayjs(newdate).format("YYYY-MM-DD"));
    let updatesres = await GetEmployeeDailyUpdatesByUserID(loginuserid, dayjs(newdate).format("YYYY-MM-DD"));
        setUsermonthlyupdates(updatesres.data);    
        fitnessselectchange(fitnessactivity, updatesres.data); 
        var newdata = newchartdata(updatesres.data);
        setFitnessdata(newdata);
  };

  return (
    <>
    <Grid container rowSpacing={1.5} columnSpacing={0.5}>
     <Grid item xs={12} >
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    label="Select a date"
                    minDate={latestfitness.startdate}
                    maxDate={latestfitness.enddate}
                    value={selectedDate}
                    onChange={(newValue) => {handledateselectChange(newValue)}}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                </Grid>
            </Grid>
            <MainCard sx={{ mt: 0, mb:1 }} content={false}>
              <Box sx={{ p: 2, pb: 0 }}>
                <Stack spacing={0.5}>
                  <Typography variant="h6" >
                    Statistics: 180 minutes
                  </Typography>
                </Stack>
              </Box>
              <DailyBarChart rdata={fitnessdata}/>
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
            try {   //fitnesschallengeid,activity,totalminutes,activityid,datestring
              var fitem= fitnessactivities.find(item => item.id === fitnessactivity);
            var res= await AddNewFitnessActivityRecord(latestfitness.id, fitem.name,values.totalminutes,
               fitnessactivity,selectedDate);
              if(res.res.success == true){
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
              <MainCard title={latestfitness.name +" -- Employee Fitness Challenge Daily Updates"}>
            <Grid container spacing={2} alignItems="center" >              

            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
              <FormControl
            variant="outlined"
            style={{ width: "100%", marginTop:10, marginBottom: 3, marginLeft: 3 }}
          >
                <InputLabel id="fitnessactivities-select-label">Fitness Activities</InputLabel>
                <Select   style={{ width: "100%" }}
                  variant="outlined"
                  labelId="fitnessactivities-select-label"
                  // id="fitnessactivities-simple-select"
                  value={fitnessactivity}
                  label={"Fitness Activities"}
                  
                  onChange={(e) => { 
                    resetForm();
                    handlefitnessselectChange(e);
                }}
                >
                  {fitnessactivities.map((w,index)=>{
                  return <MenuItem value={w.id} key={index}>{w.name}</MenuItem>
                  })}
                </Select>
                </FormControl>
              </Grid>
             

              
              <Grid item xs={12} sm={6}>
              <FormControl
            variant="outlined"
            style={{ width: "100%", marginTop:10, marginBottom: 3, marginLeft: 3}}
          >
                <TextField id="totalminutes"  type="number"  label={"Minutes Performed"}
                fullWidth placeholder="Please Enter Minutes Performed" onBlur={handleBlur}
                      onChange={handleChange}  value={values.totalminutes} 
                      error={Boolean(touched.totalminutes && errors.totalminutes)}/>
                {touched.totalminutes && errors.totalminutes && (
                      <FormHelperText error id="standard-weight-helper-text-work-performed">
                        {errors.totalminutes}
                      </FormHelperText>
                    )}
              </FormControl>
              </Grid>    
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
