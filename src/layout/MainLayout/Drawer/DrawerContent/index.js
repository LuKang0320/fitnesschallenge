import { useSelector } from 'react-redux';

// material-ui
import { useMediaQuery, useTheme } from '@mui/material';

// project import
import NavCard from './NavCard';
import Navigation from './Navigation';
import SimpleBar from 'components/third-party/SimpleBar';

// ==============================|| DRAWER CONTENT ||============================== //

const DrawerContent = () => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

  const menu = useSelector((state) => state.menu);
  const { drawerOpen } = menu;

  var showq200 = false;
//set user role accesss menu
if(window.localStorage.getItem('users') !== undefined && window.localStorage.getItem('users') !== null)
  { const localUsers = window.localStorage.getItem('users');
   var newUsers = JSON.parse(localUsers);
   if( newUsers[0].role.includes('Division Manager') || newUsers[0].role.includes('Branch Manager'))
  {
    showq200 = true;
  }
  }



  return (
    <SimpleBar
      sx={{
        '& .simplebar-content': {
          display: 'flex',
          flexDirection: 'column'
        }
      }}
    >
      <Navigation />
      {drawerOpen && !matchDownMD && showq200 && <NavCard />}
    </SimpleBar>
  );
};

export default DrawerContent;
