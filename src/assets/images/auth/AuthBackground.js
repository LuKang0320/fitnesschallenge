// material-ui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import logo from 'assets/images/background.jpg';
import logoDark from 'assets/images/background.jpg';
// ==============================|| AUTH BLUR BACK SVG ||============================== //

const AuthBackground = () => {
  const theme = useTheme();
  return (
    // <Box sx={{ position: 'absolute', filter: 'blur(0.5px)', zIndex: -1, bottom: 0 }}>
    //    <img src={theme.palette.mode === 'dark' ? logoDark : logo} alt="Mantis" width="100%" height="calc(100vh - 175px)" />
    // </Box>
    <Box sx={{  position: 'absolute', zIndex: -1, bottom: 0 , height:'100%', width:'100%', backgroundPosition: 'center', backgroundSize:'cover'}}>
       <img src={theme.palette.mode === 'dark' ? logoDark : logo} alt="Mantis" width="100%" height="100%" />
    </Box>
  );
};

export default AuthBackground;
