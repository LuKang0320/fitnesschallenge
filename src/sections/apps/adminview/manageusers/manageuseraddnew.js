// material-ui
import React from 'react';
import { useEffect ,useState} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { OutlinedInput, Grid, InputLabel, Stack,Button,FormHelperText,InputAdornment,Typography,Box,Link,
  Select,MenuItem
} from '@mui/material';
import AnimateButton from 'components/@extended/AnimateButton';
import FormControl from '@mui/material/FormControl';
import PropTypes from 'prop-types';
import { openSnackbar } from 'store/reducers/snackbar';
import { useDispatch } from 'store';
// project import
import useHCSS from 'hooks/useHCSS';
import * as Yup from 'yup';
import { Formik } from 'formik';
import IconButton from 'components/@extended/IconButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';
// ==============================|| BASIC WIZARD - ADDRESS  ||============================== //
import useScriptRef from 'hooks/useScriptRef';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const ManageUserAddForm = () =>{
  const dispatch = useDispatch();
  const scriptedRef = useScriptRef();
  const {GetAllUserRoles,CreateUser} = useHCSS();
  const [userroles, setUserRoles] = React.useState([]);
  const [level, setLevel] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };
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
      changePassword('');
         let userrolelist = await GetAllUserRoles();
         setUserRoles(userrolelist.data);
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
              <Typography variant="subtitle1">Add New User:</Typography>
              </Stack>
            </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="firstname-signup">First Name*</InputLabel>
                  <OutlinedInput
                    id="firstname-login"
                    type="firstname"
                    value={values.firstname}
                    name="firstname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="John"
                    fullWidth
                    error={Boolean(touched.firstname && errors.firstname)}
                  />
                  {touched.firstname && errors.firstname && (
                    <FormHelperText error id="helper-text-firstname-signup">
                      {errors.firstname}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="lastname-signup">Last Name*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.lastname && errors.lastname)}
                    id="lastname-signup"
                    type="lastname"
                    value={values.lastname}
                    name="lastname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Doe"
                    inputProps={{}}
                  />
                  {touched.lastname && errors.lastname && (
                    <FormHelperText error id="helper-text-lastname-signup">
                      {errors.lastname}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
          <Stack spacing={1}>
         
              <InputLabel >User Role*</InputLabel>
              <Select  //fullWidth
                value={values.roleid}
                label="User Role"
                id="roleid"
                name='RoleID'
                //onChange={handlebranchselectChange}
                onChange={handleChange('roleid')}
              >
                {userroles.map((w,index)=>{
                 return <MenuItem value={w.Id} key={index}>{w.Name}</MenuItem>

                })}
              </Select>
             
          </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel >FAA Email Address*</InputLabel>
                  <OutlinedInput
                    autoComplete="new-password" 
                    fullWidth
                    error={Boolean(touched.faaemail && errors.faaemail)}
                    value={values.faaemail}
                    name="faaemail"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="example@faa.gov"
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
                  <InputLabel htmlFor="firstname-signup">Company/Group</InputLabel>
                  <OutlinedInput
                    value={values.company}
                    name="company"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="company"
                    fullWidth
                    error={Boolean(touched.company && errors.company)}
                  />
                  {touched.company && errors.company && (
                    <FormHelperText error id="helper-text-firstname-signup">
                      {errors.company}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="firstname-signup">Phone Number*</InputLabel>
                  {/* <OutlinedInput
                    value={values.phonenumber}
                    name="phonenumber"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="111-111-1111"
                    fullWidth
                    error={Boolean(touched.phonenumber && errors.phonenumber)}
                  /> */}


                  <PhoneInput
                  fullWidth
                    name="phonenumber"
                    className="number"
                    country={"us"}
                    onBlur={handleBlur('phonenumber')}
                    value={values.phonenumber}
                    onChange={handleChange('phonenumber')}
                    error={Boolean(touched.phonenumber && errors.phonenumber)}
                />
                  {touched.phonenumber && errors.phonenumber && (
                    <FormHelperText error id="helper-text-firstname-signup">
                      {errors.phonenumber}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel >Email Address(User Name)*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="demo@company.com"
                    inputProps={{}}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="helper-text-email-signup">
                      {errors.email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel >Password</InputLabel>
                  <OutlinedInput
                    autoComplete="new-password" 
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      changePassword(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          color="secondary"
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="******"
                    inputProps={{}}
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error id="helper-text-password-signup">
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="body2">
                  By Signing up, you agree to our &nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="#">
                    Terms of Service
                  </Link>
                  &nbsp; and &nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="#">
                    Privacy Policy
                  </Link>
                </Typography>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12} >
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    Create Account
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

ManageUserAddForm.propTypes = {
  activeRowData: PropTypes.object
};
export default ManageUserAddForm;