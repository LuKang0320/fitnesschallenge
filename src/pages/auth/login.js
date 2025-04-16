import { Link } from 'react-router-dom';
import {  useEffect,useState } from 'react';
// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import useAuth from 'hooks/useAuth';
import AuthWrapper from 'sections/auth/AuthWrapper';
import AuthLogin from 'sections/auth/auth-forms/AuthLogin';
// ================================|| LOGIN ||================================ //
const isEmptyObject = (obj) => 
  obj && typeof obj === 'object' && !Array.isArray(obj) && Object.keys(obj).length === 0;

const Login = () => {
    const { isLoggedIn } = useAuth();
    const [latestfitness, setLatestfitness] = useState(() => {
      return window.localStorage.getItem('latestFitness') || {};
    });
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    var  targetDate = new Date(2025, 4, 18); // month is 0-based
    targetDate.setHours(0, 0, 0, 0);
    useEffect(() => {
        const init = async () => {
          //console.log(latestfitness);
          if(isEmptyObject(latestfitness) || latestfitness === undefined)
            { 
              var fitnessresponse = await fetch(process.env.REACT_APP_BASE_URL + '/api/fitness/GetLatestFitnessChallenge?' + new URLSearchParams({
          
              }), {
                  method:'GET',
                  headers: {
                    //'Authorization': 'Bearer '+ loginres.access_token
                }, 
                });
            
                let fitres = await fitnessresponse.json();
                window.localStorage.setItem('latestFitness',fitres );
                setLatestfitness(fitres);
                const dateString = fitres.registerdate; // Your date string
                const [year, month, day] = dateString.split('-');
                targetDate = new Date(year, month - 1, day); // month is 0-based
                //console.log(targetDate);
                //console.log(today);
            }
        };

        init();
      }, [latestfitness]);
  


    
  return (
    <AuthWrapper>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Login</Typography>
            {today <= targetDate && (
            <Typography
              component={Link}
              to={isLoggedIn ? '/FitnessChallenge/auth/register' : '/FitnessChallenge/register'}
              variant="body1"
              sx={{ textDecoration: 'none' }}
              color="primary"
            >
              Don&apos;t have an account?
            </Typography>
            )}
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthLogin />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default Login;
