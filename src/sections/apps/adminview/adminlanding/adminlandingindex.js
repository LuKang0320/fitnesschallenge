import { useState } from 'react';
import PropTypes from 'prop-types';
// material-ui
import { Button, Stack } from '@mui/material';

// project imports
import AdminLandingView from './adminlandingview';
import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';

// step options
const steps = ['All User', 'Manage User', 'Add New User', 'Manage Branch User'];

const GetStepContent = ({ handlenext, step }) => {
  switch (step) {
    case 0:
      return <AdminLandingView handlerSelect={handlenext} />;
    default:
      return <></>
  }
}
GetStepContent.propTypes = {
  handlenext: PropTypes.func,
  step: PropTypes.number
};
// ==============================|| FORMS WIZARD - BASIC ||============================== //

const AdminlandingIndex = () => {
  const [activeStep, setActiveStep] = useState(0);
  const handleNext = (row) => {
    console.log(row);
    if(row.values.rolename === 'Branch Manager'){
      setActiveStep(3);
    }
    if(row.values.rolename === 'Project Staff Member'){

      setActiveStep(1);
    }
  };

  const handleBack = () => {
    setActiveStep(0);
  };

  return (
    <MainCard >
      <>
          
            <GetStepContent step={activeStep} handlenext={handleNext} />
            <Stack direction="row" justifyContent={activeStep !== 0 ? 'space-between' : 'flex-end'}>
              {activeStep !== 0 && (
                <Button variant="contained" onClick={handleBack} sx={{ my: 3, ml: 1 }}>
                  Back
                </Button>
              )}
              <AnimateButton>
                <Button variant="contained"  onClick={handleNext} 
                sx={{ my: 3, ml: 1, display: 'none',}}
                // sx={{ my: 3, ml: 1, display: activeStep === 0?'none':null,}}
                >
                  {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                </Button>
              </AnimateButton>
            </Stack>
          

      </>
    </MainCard>
  );
};

export default AdminlandingIndex;
