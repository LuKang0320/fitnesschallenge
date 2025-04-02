import { useState } from 'react';
import PropTypes from 'prop-types';
// material-ui
import { Button, Stack } from '@mui/material';

// project imports
import ManageUsers from './manageusers';
import ManageUserEditForm from './manageuseredituser';
import ManageUserAddNewForm from './manageuseraddnew';
import ManageUserEditBranchForm from './manageusereditbranchuser';
import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';

// step options
const steps = ['All User', 'Manage User', 'Add New User', 'Manage Branch User'];

const GetStepContent = ({ handlenext,handleAddNew, step, activeRowData }) => {
  switch (step) {
    case 0:
      return <ManageUsers handlerSelect={handlenext} handleAddNew={handleAddNew} />;
    case 1:
      return <ManageUserEditForm  activeRowData={activeRowData}/>;
    case 2:
        return <ManageUserAddNewForm activeRowData={activeRowData}/>;
    case 3:
          return <ManageUserEditBranchForm activeRowData={activeRowData}/>;
    default:
      return <></>
  }
}
GetStepContent.propTypes = {
  handlenext: PropTypes.func,
  handleAddNew: PropTypes.func,
  step: PropTypes.number,
  activeRowData: PropTypes.object
};
// ==============================|| FORMS WIZARD - BASIC ||============================== //

const ManageUsersIndex = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [activeRowData, setActiveRowData] = useState({});
  //console.log(activeRowData);
  const handleNext = (row) => {
    console.log(row);
    if(row.values.rolename === 'Branch Manager'){
      setActiveStep(3);
    }
    if(row.values.rolename === 'Project Staff Member'){

      setActiveStep(1);
    }
    
    setActiveRowData(row);
  };

  const handleAddNew = (row) => {
    setActiveStep(2);
    setActiveRowData(row);
  };

  const handleBack = () => {
    setActiveStep(0);
    setActiveRowData({});
  };

  return (
    <MainCard >
      {/* <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper> */}
      <>
          
            <GetStepContent step={activeStep} handlenext={handleNext} handleAddNew={handleAddNew} activeRowData={activeRowData}/>
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

export default ManageUsersIndex;
