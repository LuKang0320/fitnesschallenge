// material-ui
import React from 'react';
import { useEffect } from 'react';
import { Grid, InputLabel, Stack,Select ,MenuItem,Button,
  Autocomplete,
  Box,Chip,TextField,Divider} from '@mui/material';
  import { CloseOutlined } from '@ant-design/icons';
import AnimateButton from 'components/@extended/AnimateButton';
import FormControl from '@mui/material/FormControl';
import PropTypes from 'prop-types';
import { openSnackbar } from 'store/reducers/snackbar';
import { useDispatch } from 'store';
// project import
import useHCSS from 'hooks/useHCSS';
import MainCard from 'components/MainCard';
// ==============================|| BASIC WIZARD - ADDRESS  ||============================== //

const Rosteredit = ({activeRowData}) =>{
  const dispatch = useDispatch();
  const { GetAllWorkOrders,GetUsersByWorkOrderID,UpdateWorkOrderRoster } = useHCSS();
  const [workorders, setWorkorderss] = React.useState([]);
  const [workorderid, setWorkorderid] = React.useState('');

  const [peoples, setPeoples] = React.useState([]);
  const [selectedpeoples, setSelectedpeoples] = React.useState([]);

  const [isdisabled, setIsdisabled] = React.useState(false);

  useEffect(() => {
    const init = async () => {
         console.log(activeRowData.values.workorderid);
         let workorderlist = await GetAllWorkOrders();
         setWorkorderss(workorderlist.data);
         setWorkorderid(activeRowData.values.workorderid);
         let statuslist = await GetUsersByWorkOrderID(activeRowData.values.workorderid);            
         setSelectedpeoples(statuslist.data);
         let selectstatuslist = await GetUsersByWorkOrderID('0');     
         setPeoples(selectstatuslist.data);
    };

    init();
  }, []);

  const resetform =  () => {
    setIsdisabled(false);
    setSelectedpeoples([]);
    setPeoples([]);

  }

  const workorderselectchange = async (event) => {
    resetform();
    setWorkorderid(event.target.value);
    let statuslist = await GetUsersByWorkOrderID(event.target.value);
    setSelectedpeoples(statuslist.data);
    let selectstatuslist = await GetUsersByWorkOrderID('0');     
    setPeoples(selectstatuslist.data);
  };

  const updatebuttonclicked = async () => {
    try {
      //console.log(selectedpeoples);
      let userids = [];
      for (var i=0;i<selectedpeoples.length;i++){
        userids.push(selectedpeoples[i].userid);
      }
      console.log(userids);
    await UpdateWorkOrderRoster(userids, workorderid);
      dispatch(
        openSnackbar({
          open: true,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center'
          },
          message: 'Update Success',
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: true
        })
      );
    }
    catch(err){
      console.error(err);
              dispatch(
                openSnackbar({
                  open: true,
                  anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center'
                  },
                  message: 'Update Failed',
                  variant: 'alert',
                  alert: {
                    color: 'error'
                  },
                  close: true
                })
              );
    }
  };

  return (
    <>
      <MainCard title={"Recruiting Stauts Review"}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack spacing={0.5}>
          <FormControl fullWidth>
              <InputLabel id="monthlycontentformworkorderlabel" style={{fontSize: "1.9vh"}}>Work Order</InputLabel>
              <Select 
                labelId="monthlycontentformworkorderlabel"
                value={workorderid}
                label="Work Order"
                onChange={workorderselectchange}
              >
                {workorders.map((w,index)=>{
                 return <MenuItem value={w.id} key={index}>{w.workordernumber} - {w.workordername}</MenuItem>

                })}
              </Select>
              </FormControl>
          </Stack>
        </Grid>
        <Grid item xs={12}>
           <Divider />
        </Grid>
        <Grid item xs={12}>     
            <Box sx={{ display: 'flex', flexWrap: 'wrap', listStyle: 'none', p: 0, m: 0 }} component="ul">
              <Autocomplete
                multiple
                fullWidth
                //id="tags-outlined"
                options={peoples}
                value={selectedpeoples}
                //onBlur={handleBlur}
                isOptionEqualToValue={(option, value) => option.userid === value.userid}
                getOptionLabel={(item) => item.username}
                onChange={(event, newValue) => {
                  //console.log(newValue);
                  setSelectedpeoples(newValue);
                }}
                renderInput={(params) => <TextField {...params} name="people" placeholder="Add People" />}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      key={index}
                      {...getTagProps({ index })}
                      variant="combined"
                      label={option.username}
                      deleteIcon={<CloseOutlined style={{ fontSize: '0.75rem' }} />}
                      sx={{ color: 'text.primary' }}
                    />
                  ))
                }
                sx={{
                  '& .MuiOutlinedInput-root': {
                    p: 0,
                    '& .MuiAutocomplete-tag': {
                      m: 1
                    },
                    '& fieldset': {
                      display: 'none'
                    },
                    '& .MuiAutocomplete-endAdornment': {
                      display: 'none'
                    },
                    '& .MuiAutocomplete-popupIndicator': {
                      display: 'none'
                    }
                  }
                }}
              />
            </Box>
            <Divider />
        </Grid>
         <Grid item xs={12}>
        <Stack direction="row" justifyContent="flex-end">
              <AnimateButton>
                <Button disableElevation disabled={isdisabled} variant="contained"  onClick={updatebuttonclicked} sx={{ my: 3, ml: 1}}>
                  Update
                </Button>
              </AnimateButton>
            </Stack>
            </Grid>
      </Grid>
      </MainCard>
    </>
  );
}

Rosteredit.propTypes = {
  activeRowData: PropTypes.object
};
export default Rosteredit;