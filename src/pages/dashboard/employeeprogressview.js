import React from 'react';
import {  useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { Grid, Stack, 
  Typography, Box
 } from '@mui/material';

import MainCard from 'components/MainCard';
import useHCSS from 'hooks/useHCSS';
import ProgressChart from 'sections/dashboard/fitnessemployee/ProgressChart';
// ============================|| JWT - LOGIN ||============================ //

const EmployeeProgressView = () => {
  //const [latestfitness, setLatestfitness] = useState({});

 const [fitnessdata, setFitnessdata] = useState([]);
   const [fitnessdatacate, setFitnessdatacate] = useState([]);

  const {GetEmployeeProgress } = useHCSS();

  const [totalminutes, setTotalminutes] = useState(0);


  useEffect(() => {
    const init = async () => {

          const latestFitnessC = window.localStorage.getItem('latestFitness');
           var lFitness = JSON.parse(latestFitnessC);
           //setLatestfitness(lFitness);
           //console.log(latestfitness);
       await reloadUpdates(lFitness.id);
    };

    init();
  }, []);


// function newchartdata (items) {
//       // Step 1: Create a map for quick lookup
//       const idMap = {};
//       items.forEach(item => {
//         idMap[item.activityid] = item;
//       });

//       // Step 2: Find the max ID
//       const maxId = 13;

//       // Step 3: Build the final array
//       const orderedArray = [];
//       var totolm = 0;
//       for (let i = 1; i <= maxId; i++) {
//         if (idMap[i]) {
//           totolm= totolm + idMap[i].totalminutes;
//           orderedArray.push(idMap[i].totalminutes);
//         } else {
//           orderedArray.push(0);
//         }
//       }
//       setTotalminutes(totolm);
//       return orderedArray;
// }

  const reloadUpdates = async (fid) =>{
    
        const serviceToken = window.localStorage.getItem('serviceToken');
        const jwData = jwtDecode(serviceToken);
        const { userId } = jwData;
        //setLoginuserid(userId);
        let updatesres = await GetEmployeeProgress(userId, fid);
        //console.log(updatesres.data);


        const sortedNames = [...updatesres.data]
        .sort((a, b) => new Date(a.datestring) - new Date(b.datestring))
        .map(item => item.totalminutes);
  
        const sortedCate = [...updatesres.data]
        .sort((a, b) => new Date(a.datestring) - new Date(b.datestring))
        .map(item => item.datestring);
        //console.log(sortedCate);
        const totalminu = sortedNames.reduce((sum, num) => sum + num, 0);
        
        setFitnessdata(sortedNames);
        setFitnessdatacate(sortedCate);
        setTotalminutes(totalminu);
      };
    


  return (
    <>
    <Grid container rowSpacing={1.5} columnSpacing={0.5}>
     <Grid item xs={12} >
            <MainCard sx={{ mt: 0, mb:1 }} content={false}>
              <Box sx={{ p: 2, pb: 0 }}>
                <Stack spacing={0.5}>
                  <Typography variant="h6" >
                    Fitness Challenge Progress: Total {totalminutes} minutes
                  </Typography>
                </Stack>
              </Box>
              <ProgressChart rdata={fitnessdata} rcategories={fitnessdatacate}/>
            </MainCard>
          </Grid>
    </Grid>
    </>
  );
};

export default EmployeeProgressView;
