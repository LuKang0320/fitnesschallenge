import { useState } from 'react';
import PropTypes from 'prop-types';
// material-ui
import { Button, Stack } from '@mui/material';

// project imports
import Utilizationsummary from './UtilizationSummaryPage';
import Utilizationsummaryedit from './utilizationsummaryedit';
import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';

// step options
const steps = ['Utilization Summary', 'Edit Utilization Summary'];

const GetStepContent = ({ handlenext, step, activeRowData }) => {
  switch (step) {
    case 0:
      return <Utilizationsummary handlerSelect={handlenext} />;
    case 1:
      return <Utilizationsummaryedit  activeRowData={activeRowData}/>;
    default:
      return <></>
  }
}
GetStepContent.propTypes = {
  handlenext: PropTypes.func,
  step: PropTypes.number,
  activeRowData: PropTypes.object
};
// ==============================|| FORMS WIZARD - BASIC ||============================== //

const Utilizationsummaryindex = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [activeRowData, setActiveRowData] = useState({});
  //console.log(activeRowData);
  const handleNext = (row) => {
    setActiveStep(1);
    setActiveRowData(row);
  };

  const handleBack = () => {
    setActiveStep(0);
    setActiveRowData({});
  };

  return (
    <MainCard >
      <>
            <GetStepContent step={activeStep} handlenext={handleNext} activeRowData={activeRowData}/>
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

export default Utilizationsummaryindex;
