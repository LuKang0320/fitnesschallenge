// material-ui
import { Button, Link, Stack } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// assets
//import avatar from 'assets/images/users/avatar-group.png';
import AnimateButton from 'components/@extended/AnimateButton';


// ==============================|| DRAWER CONTENT - NAVIGATION CARD ||============================== //

const NavCard = () => (
  <MainCard sx={{ bgcolor: 'grey.50', mt: 0,ml:3,mr:3 }}>
    <Stack alignItems="center" spacing={1}>
      {/*<CardMedia component="img" image={avatar} />
      {/* <Stack alignItems="center">
        <Typography variant="h5">Q200 Tool</Typography>
        <Typography variant="h6" color="secondary">
          Get to resolve query
        </Typography>
      </Stack> */}
      <AnimateButton>
        <Button variant="shadow" size="small" component={Link} href="https://q200.online/aaqdashboard/#/login" target="_blank">
        Q200 Tool
        </Button>
      </AnimateButton>
    </Stack>
  </MainCard>
);

export default NavCard;
