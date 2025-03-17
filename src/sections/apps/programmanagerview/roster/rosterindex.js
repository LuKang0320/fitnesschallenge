import { useState } from 'react';
import PropTypes from 'prop-types';
// material-ui
import { Button, Stack } from '@mui/material';

// project imports
import Rosters from './rosters';
import Rosteredit from './rosteredit';
//import FinancialSummary from './FinancialSummary';
//import UtilizationSummary from './UtilizationSummary';
import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';

// step options
const steps = ['Recruiting Status', 'Edit Recruiting Status'];

const GetStepContent = ({ handlenext, step, activeRowData }) => {
  switch (step) {
    case 0:
      return <Rosters handlerSelect={handlenext}/>;
    case 1:
      return <Rosteredit  activeRowData={activeRowData}/>;
    // case 2:
    //   return <FinancialSummary activeRowData={activeRowData}/>;
    // case 3:
    //   return <UtilizationSummary activeRowData={activeRowData}/>;
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

const Rosterindex = () => {
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

export default Rosterindex;
