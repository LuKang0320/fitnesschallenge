// material-ui
import React from 'react';
import { useEffect ,useState} from 'react';
import { OutlinedInput, Grid, InputLabel, Stack,Button,FormHelperText,Typography,TextField
} from '@mui/material';
import AnimateButton from 'components/@extended/AnimateButton';

import PropTypes from 'prop-types';
import { openSnackbar } from 'store/reducers/snackbar';
import { useDispatch } from 'store';
// project import
import useHCSS from 'hooks/useHCSS';
import * as Yup from 'yup';
import { Formik } from 'formik';

// ==============================|| BASIC WIZARD - ADDRESS  ||============================== //
import useScriptRef from 'hooks/useScriptRef';
import "react-phone-input-2/lib/style.css";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const ManageFitnessAddForm = () =>{
  const [selectedStartdate, setSelectedstartdate] = useState(dayjs().format("YYYY-MM-DD"));
  const [selectedEnddate, setSelectedenddate] = useState(dayjs().format("YYYY-MM-DD"));
  const dispatch = useDispatch();
  const scriptedRef = useScriptRef();
  const {CreateUser} = useHCSS();
  //const [userroles, setUserRoles] = React.useState([]);

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
      console.log(selectedStartdate);
         //let userrolelist = await GetAllUserRoles();
         //setUserRoles(userrolelist.data);
    };

    init();
  }, []);


  return (
    <>
      <Formik
        initialValues={{
          firstname: '',
          lastname: '',
          roleid: '',
          email: '',
          faaemail: '',
          phonenumber:'',
          password: '',
          company:'',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          firstname: Yup.string().max(255).required('First Name is required'),
          lastname: Yup.string().max(255).required('Last Name is required'),
          roleid: Yup.string().max(255).required('User Role is required'),
          phonenumber: Yup.string().max(255).required('Phone Number is required'),
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting,resetForm }) => {
          try {  //Username, firstname,lastname, UserGroup, CompanyorGroup ,PhoneNumber
          var res =  await CreateUser(values.email, values.firstname, values.lastname, values.company, values.faaemail, values.phonenumber, values.password,values.roleid);
          if (scriptedRef.current) {
            if(res.success == true){
              setStatus({ success: true });
              setSubmitting(false);
              dispatch(
                openSnackbar({
                  open: true,
                  message: 'New user has been successfully created.',
                  variant: 'alert',
                  alert: {
                    color: 'success'
                  },
                  close: false
                })
              );
              resetForm();
            }
            else{
              setStatus({ success: false });
              setErrors({ submit: res.msg });
              setSubmitting(false);
              dispatch(
                openSnackbar({
                  open: true,
                  message: 'Can NOT create new user.',
                  variant: 'alert',
                  alert: {
                    color: 'error'
                  },
                  close: false
                })
              );
            }
          }
          } catch (err) {
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack>
              <Typography variant="subtitle1">New Fitness Challenge Session:</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={12}>
                <Stack spacing={1}>
                  <InputLabel >Name</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.faaemail && errors.faaemail)}
                    value={values.faaemail}
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="New Fitness Challenge Name"
                    inputProps={{}}
                  />
                  {touched.faaemail && errors.faaemail && (
                    <FormHelperText error id="helper-text-faaemail-signup">
                      {errors.faaemail}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DesktopDatePicker
                                      label="Start Date"
                                      value={selectedStartdate}
                                      onChange={(newValue) => setSelectedstartdate(newValue)}
                                      renderInput={(params) => <TextField {...params} />}
                                    />
                                  </LocalizationProvider>
                  {touched.firstname && errors.firstname && (
                    <FormHelperText error id="helper-text-firstname-signup">
                      {errors.firstname}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DesktopDatePicker
                                      label="End Date"
                                      value={selectedEnddate}
                                      onChange={(newValue) => setSelectedenddate(newValue)}
                                      renderInput={(params) => <TextField {...params} />}
                                    />
                                  </LocalizationProvider>
                  {touched.lastname && errors.lastname && (
                    <FormHelperText error id="helper-text-lastname-signup">
                      {errors.lastname}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              
              
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12} >
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    Submit
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}

ManageFitnessAddForm.propTypes = {
  activeRowData: PropTypes.object
};
export default ManageFitnessAddForm;