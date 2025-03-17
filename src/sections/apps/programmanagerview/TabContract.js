import { useEffect} from 'react';
import React from 'react';
// material-ui
//import { useTheme } from '@mui/material/styles';
import {  Button,List, ListItem, Grid, Stack, Typography,useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// third-party
//import NumberFormat from 'react-number-format';

// project import
//import Avatar from 'components/@extended/Avatar';
import MainCard from 'components/MainCard';
//import { linkedInColor, twitterColor } from 'config';
import useHCSS from 'hooks/useHCSS';
// assets
import {PlusOutlined , EditOutlined ,FilePdfOutlined, ThunderboltFilled ,UserOutlined,UsergroupAddOutlined ,FileExcelOutlined } from '@ant-design/icons';


function DateCell (value ) {
  var mydate = new Date(value);
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  var month = monthNames[mydate.getMonth()];
  var year = mydate.getFullYear();
  var day =mydate.getDate();
  var rdate = month + ' ' + day + ', ' + year;
      return rdate;
}

// ==============================|| ACCOUNT PROFILE - PERSONAL ||============================== //

const TabContract = () => {
  const { GetAllContracts} = useHCSS();
  const matchDownMD = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const Navigation = useNavigate();
  const [contract, setContract] = React.useState({});
  useEffect(() => {
    const init = async () => {
         let contracts = await GetAllContracts();
         //console.log(financiallist);
         setContract(contracts.data[0])
    };

    init();
  }, []);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={8}>
        <MainCard title="FAA Contract Information" style={{minHeight: '610px'}}>
          <Grid container spacing={2}>
          <Grid item xs={12}>
            <MainCard >
              <Typography  sx={{ px: 2 }}>
                Amount: ${new Intl.NumberFormat('en-US').format(contract.amount)}
              </Typography>
              <Typography sx={{ px: 2 }}>
                Start: {DateCell(contract.startdate)}
              </Typography>
              <Typography sx={{ px: 2 }}>
                End: {DateCell(contract.enddate)}
              </Typography>
            </MainCard>
          </Grid>
          <Grid item xs={12}>
            <MainCard >
              <List sx={{ py: 0 }}>
              <ListItem>
                  <Stack spacing={0.5}>
                    <Typography color="secondary">Contract Number</Typography>
                    <Typography>{contract.contractnumber}</Typography>
                  </Stack>
                </ListItem>
                <ListItem>
                  <Stack spacing={0.5}>
                    <Typography color="secondary">Contract Name</Typography>
                    <Typography>{contract.contractname}</Typography>
                  </Stack>
                </ListItem>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Contractor</Typography>
                        <Typography>{contract.contractor}</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Program Manager</Typography>
                        <Typography>{contract.programmanager}</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">FAA CO</Typography>
                        <Typography>
                         {contract.faaco}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">FAA COR</Typography>
                        <Typography>{contract.faacor}</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
                
              </List>
            </MainCard>
          </Grid>
          
          </Grid>
        </MainCard>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Grid container>       
          <Grid item sm={12} xs={12}>
            <MainCard title="Actions" >
              <Stack spacing={0.5}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Button size="medium" variant="contained" color='inherit' style={{width: '240px', borderRadius: '15px' }}
                    startIcon={<PlusOutlined style={{ color: "blue", fontSize: '1.15rem' }} />}
                    sx={{ color: "blue" }}
                    onClick={ () =>Navigation('/dashboard/programmanagerview/createworkorder')}>
                    Create Work Orders
                  </Button>
                </Stack>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Button  variant="contained" color="inherit" style={{width: '240px', borderRadius: '15px' }}
                    size="medium"
                    startIcon={<EditOutlined style={{ color: 'blue', fontSize: '1.15rem' }} />}
                    sx={{ color: 'blue'}}
                    onClick={ () =>Navigation('/dashboard/programmanagerview/viewworkorders')}>
                    View/Edit Work Orders
                  </Button>
                </Stack>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Button variant="contained" color="inherit" style={{width: '240px', borderRadius: '15px' }}   
                    size="medium"
                    startIcon={<UserOutlined  style={{ color: 'blue', fontSize: '1.15rem' }} />}
                    sx={{ color: 'blue' }} 
                    onClick={ () =>Navigation('/dashboard/programmanagerview/recruitingstatus')}>
                    Recruiting Status
                  </Button>
                </Stack>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Button  variant="contained" color="inherit" style={{width: '240px', borderRadius: '15px' }}
                    size="medium"
                    startIcon={<FilePdfOutlined  style={{ color: 'blue', fontSize: '1.15rem' }} />}
                    sx={{ color: 'blue' }}
                    onClick={ () =>Navigation('/dashboard/programmanagerview/progressreport')}>
                    Create Progress Report
                  </Button>
                </Stack>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Button      
                    size="medium" variant="contained" color="inherit" style={{width: '240px', borderRadius: '15px' }}
                    startIcon={<ThunderboltFilled  style={{ color: 'blue', fontSize: '1.15rem' }} />}
                    sx={{ color: 'blue' }}
                    onClick={ () =>Navigation('/dashboard/programmanagerview/woprogressreport')}>
                    Create WO Progress Report
                  </Button>
                </Stack>
              </Stack>
            </MainCard>
            <MainCard title="HCSS III Overview">
              <Stack spacing={0.5}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Button size="medium" variant="contained" color="inherit" style={{width: '240px', borderRadius: '15px' }}
                    startIcon={<UserOutlined style={{ color: 'blue', fontSize: '1.15rem' }} />}
                    sx={{ color: 'blue' }} 
                    onClick={ () =>Navigation('/dashboard/programmanagerview/orgnization/personal')}
                    >
                    View Org Chart
                  </Button>
                </Stack>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Button   variant="contained" color="inherit" style={{width: '240px', borderRadius: '15px' }}
                    size="medium"
                    startIcon={<UsergroupAddOutlined style={{ color: "blue", fontSize: '1.15rem' }} />}
                    sx={{ color: "blue"}}
                    onClick={ () =>Navigation('/dashboard/programmanagerview/rosters')}>
                    View Roster
                  </Button>
                </Stack>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Button variant="contained" color="inherit" style={{width: '240px', borderRadius: '15px' }}
                    size="medium"
                    startIcon={<ThunderboltFilled  style={{ color: "blue", fontSize: '1.15rem' }} />}
                    sx={{ color: "blue" }}
                    onClick={ () =>Navigation('/dashboard/programmanagerview/pastmprs')}>
                    View Past Progress Reports
                  </Button>
                </Stack>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Button variant="contained" color="inherit" style={{width: '240px', borderRadius: '15px' }}
                    size="medium"
                    startIcon={<FilePdfOutlined  style={{ color: "blue", fontSize: '1.15rem' }} />}
                    sx={{ color: "blue" }}
                    onClick={ () =>Navigation('/dashboard/programmanagerview/financialsummary')}
                    >
                    View Financials Summary
                  </Button>
                </Stack>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Button variant="contained" color="inherit" style={{width: '240px', borderRadius: '15px' }}
                    size="medium"
                    startIcon={<FileExcelOutlined  style={{ color:"#3366FF", fontSize: '1.15rem' }} />}
                    sx={{ color:"blue" }}
                    onClick={ () =>Navigation('/dashboard/programmanagerview/utilizationsummary')}
                    >
                    View Utilization Summary
                  </Button>
                </Stack>
              </Stack>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
      {/* <Grid item xs={12}>
        <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
          <Button variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button variant="contained">Update Profile</Button>
        </Stack>
      </Grid> */}
    </Grid>
  );
};

export default TabContract;
