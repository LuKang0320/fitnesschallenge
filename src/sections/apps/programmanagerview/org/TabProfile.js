// material-ui
import { Grid} from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// ==============================|| ACCOUNT PROFILE - BASIC ||============================== //

const TabProfile = () => {

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MainCard>
              <Grid container spacing={3}>
              <img style={{maxHeight: '100%', maxWidth:'100%'}}
               
                src={process.env.REACT_APP_BASE_URL + '/staffing%20matrix.jpg'}
                alt={`Staff`}
                loading="lazy"
              />
              </Grid>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TabProfile;
