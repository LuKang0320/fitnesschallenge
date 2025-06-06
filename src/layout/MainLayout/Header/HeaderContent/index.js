//import { useMemo } from 'react';

// material-ui
import { Box, useMediaQuery } from '@mui/material';

// project import
//import Search from './Search';
//import Message from './Message';
import Profile from './Profile';
//import Localization from './Localization';
//import Notification from './Notification';
//import Customization from './Customization';
import MobileSection from './MobileSection';
//import MegaMenuSection from './MegaMenuSection';
import useConfig from 'hooks/useConfig';
import DrawerHeader from 'layout/MainLayout/Drawer/DrawerHeader';
import { LAYOUT_CONST } from 'config';
//import logoIcon from 'assets/images/faalogo.png';
// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  //const { i18n, menuOrientation } = useConfig();
  const { menuOrientation } = useConfig();
  const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  //const localization = useMemo(() => <Localization />, [i18n]);

  //const megaMenu = useMemo(() => <MegaMenuSection />, []);

  return (
    <>
      {menuOrientation === LAYOUT_CONST.HORIZONTAL_LAYOUT && !downLG && <DrawerHeader open={true} />}
      {/* {!downLG && <Search />} */}
      {!downLG && <Box sx={{ width: '100%', ml: { xs: 0, md: 1 } }}></Box>}
      {/* <img src={logoIcon} alt="Faa" height='47'/> */}
     
      {/* {!downLG && megaMenu} */}
      {/* {!downLG && localization} */}
      {downLG && <Box sx={{ width: '100%', ml: 1 }} />}
      
      {/* <Notification />
      <Message /> */}
      {/* <Customization /> */}
      {!downLG && <Profile />}
      {downLG && <MobileSection />}
    </>
  );
};

export default HeaderContent;
