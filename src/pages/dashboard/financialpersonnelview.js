import React from 'react';
import {  useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//import jwtDecode from 'jwt-decode';
// material-ui
import { Button,Grid ,Divider,Box, Typography,LinearProgress,Stack,InputLabel} from '@mui/material';
import {withStyles} from '@mui/styles'
//import AnimateButton from 'components/@extended/AnimateButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
// project imports
import MainCard from 'components/MainCard';
// assets
import {FilePdfOutlined,FileExcelOutlined } from '@ant-design/icons';


// third party
//import * as Yup from 'yup';
//import { Formik } from 'formik';
import { openSnackbar } from 'store/reducers/snackbar';
import { useDispatch } from 'store';
// project import
//import useScriptRef from 'hooks/useScriptRef';
import useHCSS from 'hooks/useHCSS';

const BorderLinearProgress = withStyles(() => ({
  root: {
    height: 15,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: "#EEEEEE",
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);
//const delay = (timeout) => new Promise((res) => setTimeout(res, timeout));
// ============================|| JWT - LOGIN ||============================ //

const FinancialPersonnelView = () => {
  const dispatch = useDispatch();
  const { UploadFinancial } = useHCSS();
  const Navigation = useNavigate();
  //const scriptedRef = useScriptRef();
  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  //const [isdisabled, setIsdisabled] = React.useState(true);

  const [loading, setLoading] = React.useState(false);
  const [selectedFiles, setSelectedFiles] = React.useState(undefined);
  const [currentFile, setCurrentFile] = React.useState(undefined);
  const [progress, setProgress] = React.useState(0);
  const [message, setMessage] = React.useState("");
  const [isError, setIsError] = React.useState(false);

  const d = new Date();
  var ccmonth = d.getMonth();
  var ccyear = d.getFullYear();
  var lmonth = 0;
  if(ccmonth == 0 ){
    lmonth = 11;
    ccyear = d.getFullYear() -1 ;
  }else{
    lmonth = ccmonth - 1;
  }
  const cmonth = month[lmonth];

  const selectFile = (event) => {
    //console.log(event.target.files);
    setSelectedFiles(event.target.files);
    setCurrentFile(event.target.files[0]);
    setProgress(0);
  };

  const upload =  async (event) => {
    event.preventDefault();
    let currentFile =selectedFiles[0];
    setProgress(50);
    setCurrentFile(currentFile);
    setLoading(true);
     await UploadFinancial(currentFile)
         .then((response) => {
        setMessage(response.msg);
        setIsError(false);
        setProgress(100);
        setLoading(false);
        //setSelectedFiles(undefined);
        //setCurrentFile('');

        dispatch(
          openSnackbar({
            open: true,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center'
            },
            message: 'Upload Success',
            variant: 'alert',
            alert: {
              color: 'success'
            },
            close: true
          })
        );
      });

    
  };



  useEffect(() => {
    const init = async () => {
     
        //const serviceToken = window.localStorage.getItem('serviceToken');
        //const jwData = jwtDecode(serviceToken);
        //const { userId } = jwData;
        //console.log(userId);
        //let workordersres = await GetWorkOrdersByUserID(userId);
        //setWorkorders(workordersres.data);
        //reloadUpdates();
    };

    init();
  }, []);


  return (
    <>
<form id="form1" name="form1"  data-ajax="false" method="post" 
 >
     <MainCard title={"Financial Personnel View (" + cmonth + " " + ccyear +")"}>
     <Grid container spacing={3} alignItems="center">

        <Grid item xs={12}>
        <Stack spacing={0.5}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
        <InputLabel style={{ fontSize: '1.15rem' }}>Reports:</InputLabel>

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
        </Grid>

     <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid item xs={12}>
            <Stack spacing={0.5}>
            <InputLabel style={{ fontSize: '1.15rem' }}>Import Excel:</InputLabel>
                {currentFile && (
                  <Box className="mb25" display="flex" alignItems="center">
                    <Box width="50%" mr={1}>
                      <BorderLinearProgress variant="determinate" value={progress} />
                    </Box>
                    <Box minWidth={35}>
                      <Typography variant="body2" color="textSecondary">{`${progress}%`}</Typography>
                    </Box>
                  </Box>)
                }
              <Grid item xs={12} >
                <label htmlFor="btn-upload">
                  <input
                    id="btn-upload"
                    name="btn-upload"
                    style={{ display: 'none' }}
                    type="file"
                    onChange={selectFile} />
                  <Button  style={{width: '240px' }}
                    className="btn-choose"
                    variant="outlined"
                    component="span" >
                    Please Choose File From Folder
                  </Button>
                </label>
              </Grid>
        <Grid item xs={12}>
              <Divider />
            </Grid>
        <Grid item xs={12}>
        {selectedFiles && selectedFiles.length > 0 ? selectedFiles[0].name : null}
        </Grid>

        <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Button variant="contained" color="inherit" style={{width: '240px', borderRadius: '15px' }}
                    size="medium"
                    component="span"
                    disabled={loading}
                    startIcon={<CloudUploadIcon  style={{ color:"#3366FF", fontSize: '1.15rem' }} />}
                    sx={{ color:"blue" }}
                    onClick={ upload}
                    >
                    Upload
                  </Button>
                  {loading && (
                      <CircularProgress
                        size={24}
                        sx={{
                          color: green[500],
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          marginTop: '-12px',
                          marginLeft: '-12px',
                        }}
                      />
                    )}
                </Stack>
        <Typography variant="subtitle2" className={`upload-message ${isError ? "error" : ""}`}>
          {message}
        </Typography>
        </Stack>
      </Grid>

      </Grid>
      </MainCard>
      </form>
    </>
  );
};

export default FinancialPersonnelView;
