import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer } from 'react';

// third-party
import jwtDecode from 'jwt-decode';

// reducer - state management
import { LOGIN, LOGOUT } from 'store/reducers/actions';
import authReducer from 'store/reducers/auth';

// project import
import Loader from 'components/Loader';
import axios from 'utils/axios';

const verifyToken = (serviceToken) => {
  if (!serviceToken) {
    return false;
  }
  const decoded = jwtDecode(serviceToken);
  /**
   * Property 'exp' does not exist on type '<T = unknown>(token: string, options?: JwtDecodeOptions | undefined) => T'.
   */
  //console.log(decoded.exp - Date.now() / 1000);
  return decoded.exp > Date.now() / 1000;
};
// constant
const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
};

const setSession = (serviceToken) => {
  if (serviceToken) {
    localStorage.setItem('serviceToken', serviceToken);
    axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
  } else {
    localStorage.removeItem('serviceToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //

const HCSSContext = createContext(null);

export const HCSSProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

   useEffect(() => {
    const init = async () => {
      try {
        const serviceToken = window.localStorage.getItem('serviceToken');     
        if (serviceToken && verifyToken(serviceToken)) {
          //console.log(serviceToken);
          setSession(serviceToken);
          const response = await axios.get('/api/account/me');
          //console.log(response);
          const { user } = response.data;
          dispatch({
            type: LOGIN,
            payload: {
              isLoggedIn: true,
              user
            }
          });
        } else {
          dispatch({
            type: LOGOUT
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: LOGOUT
        });
      }
    };

    init();
   }, []);

  const saveinchtechstaffmonthlyupdates = async (workperformed, workproblems,workexpected, workorderid, year, month) => {
    const response = await axios.post('/api/hcss/saveinchtechstaffmonthlyupdates', {workperformed, workproblems,workexpected,workorderid,year, month});
    let  res = response.data;
    return res;
    
  };
  const UpdateStaffMonthlyUpdatesByPM = async (workperformed, workproblems,workexpected, workorderid, userid, month,year) => {
    const response = await axios.post('/api/hcss/UpdateStaffMonthlyUpdatesByPM', {workperformed, workproblems,workexpected,workorderid,userid,month,year});
    const { res } = response.data;
    let respo = [res];
    console.log(respo);
    
  };

  const RejectStaffMonthlyUpdatesByPM = async (workperformed, workproblems,workexpected, workorderid, userid, month,year) => {
    const response = await axios.post('/api/hcss/RejectStaffMonthlyUpdatesByPM', {workperformed, workproblems,workexpected,workorderid,userid, month,year});
    const { res } = response.data;
    let respo = [res];
    console.log(respo);
    
  };


  
  
  const GetStaffMonthlyUpdatesByUserID = async (userid, month, year) => {

    const response = await axios.post('/api/hcss/GetStaffMonthlyUpdatesByUserID', {
      userid, month, year
    });
    let resdata = response.data;

    //console.log(resdata);
    return resdata;
  };
  const GetStaffMonthlyUpdatesByUserIDWorkOrderID = async (userid, month,workorderid,year) => {

    const response = await axios.post('/api/hcss/GetStaffMonthlyUpdatesByUserIDWorkOrderID', {
      userid, month,workorderid,year
    });
    let resdata = response.data;

    //console.log(resdata);
    return resdata;
  };
  
  const GetWorkOrdersByUserID = async (userid) => {

    const response = await axios.post('/api/hcss/GetWorkOrdersByUserID', {
      userid
    });
    let resdata = response.data;

    //console.log(resdata);
    return resdata;
  };

  const GetAllWorkOrders = async () => {

    const response = await axios.post('/api/hcss/GetAllWorkOrders', {
      
    });
    let resdata = response.data;

    //console.log(resdata);
    return resdata;
  };



  const GetAllUserRoles = async () => {

    const response = await axios.post('/api/hcss/GetAllUserRoles', {
      
    });
    let resdata = response.data;

    //console.log(resdata);
    return resdata;
  };

  

  const GetAllWorkOrderFinancials = async () => {

    const response = await axios.post('/api/hcss/GetAllWorkOrderFinancials', {
      
    });
    let resdata = response.data;

    //console.log(resdata);
    return resdata;
  };

  const AddNewWorkOrder = async (workordernumber, workordername,staffingstatus, workordernum, aaqbranch) => {
    const response = await axios.post('/api/hcss/AddNewWorkOrder', {workordernumber, workordername,staffingstatus, workordernum, aaqbranch});
    const { res } = response.data;
    return res;
  };

  const GetNewWorkOrderNumber = async () => {

    const response = await axios.post('/api/hcss/GetNewWorkOrderNumber', {
      
    });
    let resdata = response.data;

    //console.log(resdata);
    return resdata;
  };

  const GetAllRosters = async (userid) => {

    const response = await axios.post('/api/hcss/GetAllRosters', {
      userid
    });
    let resdata = response.data;

    //console.log(resdata);
    return resdata;
  };
  const GetAllBranchs = async () => {

    const response = await axios.post('/api/hcss/GetAllBranchs', {
      
    });
    let resdata = response.data;

    //console.log(resdata);
    return resdata;
  };
  
  const UploadFinancial = async (file) => {
    //let formData = new FormData();

    //formData.append("file", file);
    console.log(file);
     const response = await axios.post('/api/hcss/UploadFinancial', file);
     const { res } = response.data;
     return res;

  };

  const GetUsersByWorkOrderID = async (workorderid) => {

    const response = await axios.post('/api/hcss/GetUsersByWorkOrderID', {
      workorderid
    });
    let resdata = response.data;

    //console.log(resdata);
    return resdata;
  };
  const GetFinancialByWorkOrderID = async (workorderid, month, year, userid) => {

    const response = await axios.post('/api/hcss/GetFinancialByWorkOrderID', {
      workorderid, month, year, userid
    });
    let resdata = response.data;

    //console.log(resdata);
    return resdata;
  };

  const GetUtilizationByWorkOrderID = async (workorderid, month) => {

    const response = await axios.post('/api/hcss/GetUtilizationByWorkOrderID', {
      workorderid,month
    });
    let resdata = response.data;

    //console.log(resdata);
    return resdata;
  };


  const GetAllWorkOrdersRecruitingStatus = async (userid) => {

    const response = await axios.post('/api/hcss/GetAllWorkOrdersRecruitingStatus', {
      userid
    });
    let resdata = response.data;

    //console.log(resdata);
    return resdata;
  };


  const GetWorkOrdersRecruitingStatusBbyWorkorderID = async (workorderid) => {

    const response = await axios.post('/api/hcss/GetWorkOrdersRecruitingStatusBbyWorkorderID', {
      workorderid
    });
    let resdata = response.data;

    //console.log(resdata);
    return resdata;
  };
  
  const UpdateWorkOrderRecruitingStatus = async (recruitingstatus, staffingstatus, workorderid) => {
    const response = await axios.post('/api/hcss/UpdateWorkOrderRecruitingStatus', {recruitingstatus, staffingstatus,workorderid});
    const { res } = response.data;
    let respo = [res];
    console.log(respo);
    
  };
  
  const UpdateUtilizationSummaryComments = async (comments, workorderid, monthnumber, yearnumber, commentid) => {
    const response = await axios.post('/api/hcss/UpdateUtilizationSummaryComments', {comments, workorderid, monthnumber, yearnumber, commentid});
    const { res } = response.data;
    let respo = [res];
    console.log(respo);
    
  };


  const UpdateWorkOrderRoster = async (userids, workorderid) => {
    console.log(userids);
    const response = await axios.post('/api/hcss/UpdateWorkOrderRoster', {userids,workorderid});
    const { res } = response.data;
    let respo = [res];
    console.log(respo);
    
  };
  
  const GetAllPastMPRs = async () => {
    const response = await axios.post('/api/hcss/GetAllPastMPRs', {  
    });
    let resdata = response.data;
    //console.log(resdata);
    return resdata;
  };


  const GetBMPastMPRs = async (year,month, userid) => {
    const response = await axios.post('/api/hcss/GetBMPastMPRs', {
      year,month, userid
    });
    let resdata = response.data;
    //console.log(resdata);
    return resdata;
  };

  const GetUtilizationByYearMonth = async (year,month, userid) => {

    const response = await axios.post('/api/hcss/GetUtilizationByYearMonth', {
      year,month, userid
    });
    let resdata = response.data;

    //console.log(resdata);
    return resdata;
  };

  const GetAllWorkOrderFinancialsReport = async (year,month) => {

    const response = await axios.post('/api/hcss/GetAllWorkOrderFinancialsReport', {
      year,month
    });
    let resdata = response.data;

    //console.log(resdata);
    return resdata;
  };
  const GetWorkOrderFinancialsReportByName = async (year,month,workordername) => {

    const response = await axios.post('/api/hcss/GetWorkOrderFinancialsReportByName', {
      year,month,workordername
    });
    let resdata = response.data;

    //console.log(resdata);
    return resdata;
  };
  
  const GetBranchWorkOrdersByUserID = async (year,month,userid) => {

    const response = await axios.post('/api/hcss/GetBranchWorkOrdersByUserID', {
      year,month,userid
    });
    let resdata = response.data;

    //console.log(resdata);
    return resdata;
  };

  const GetOrgUsersByUserID = async (userid, username) => {

    const response = await axios.post('/api/hcss/GetOrgUsersByUserID', {
      userid, username
    });
    let resdata = response.data;

    //console.log(resdata);
    return resdata;
  };

  const GetOrg = async (userid) => {

    const response = await axios.post('/api/hcss/GetOrg', {userid
    });
    let resdata = response.data;

    //console.log(resdata);
    return resdata;
  };
  const GetAllContracts = async () => {

    const response = await axios.post('/api/hcss/GetAllContracts', {
      
    });
    let resdata = response.data;

    //console.log(resdata);
    return resdata;
  };
  const SubmitMPR = async (month, year) => {

    const response = await axios.post('/api/hcss/SubmitMPR', {
      month, year
    });
    let resdata = response.data;

    //console.log(resdata);
    return resdata;
  };


  const CreateUser = async (Username, FirstName,LastName, UserGroup, CompanyorGroup ,PhoneNumber,Password,RoleID) => {
    const response = await axios.post('/api/hcss/CreateUser', {Username, FirstName,LastName, UserGroup, CompanyorGroup ,PhoneNumber,Password,RoleID});
    const { res } = response.data;
    return res;
  };


  const DeleteUser = async (userid) => {

    const response = await axios.post('/api/hcss/DeleteUser', {
      userid
    });
    let resdata = response.data;
    return resdata;
  };
  const UpdateUserwithWorkOrders = async (userid, workorderids) => {
    const response = await axios.post('/api/hcss/UpdateUserwithWorkOrders', {userid,workorderids});
    let res  = response.data;
    return res;
    
  };


  const UpdateBranchManager = async (branchid,  userid,  username) => {
    const response = await axios.post('/api/hcss/UpdateBranchManager', {branchid,  userid,  username});
    let res  = response.data;
    return res;
    
  };



// fitness
const GetAllFitness = async () => {

  const response = await axios.post('/api/fitness/GetAllFitness', {
    
  });
  let resdata = response.data;

  //console.log(resdata);
  return resdata;
};
const GetAllUsers = async (fitid) => {

  const response = await axios.post('/api/fitness/GetAllUsers', {
    fitid
  });
  let resdata = response.data;

  //console.log(resdata);
  return resdata;
};
const GetAllUsersRanking = async (fitid) => {

  const response = await axios.post('/api/fitness/GetAllUsersRanking', {
    fitid
  });
  let resdata = response.data;

  //console.log(resdata);
  return resdata;
};
const GetAllFitnessActivities = async () => {

  const response = await axios.post('/api/fitness/GetAllFitnessActivities', {
    
  });
  let resdata = response.data;

  //console.log(resdata);
  return resdata;
};
const GetEmployeeDailyUpdatesByUserID = async (userid, dstring) => {

  const response = await axios.post('/api/fitness/GetEmployeeDailyUpdatesByUserID', {
    userid, dstring
  });
  let resdata = response.data;

  //console.log(resdata);
  return resdata;
};


const AddNewFitnessActivityRecord = async (fitnesschallengeid,activity,totalminutes,activityid,datestring) => {
  const response = await axios.post('/api/fitness/AddNewFitnessActivityRecord', {fitnesschallengeid,activity,totalminutes,activityid,datestring});
  let  res = response.data;
  return res;
  
};



  if (state.isInitialized !== undefined && !state.isInitialized) {
    return <Loader />;
  }

 

  return <HCSSContext.Provider value={{ ...state, saveinchtechstaffmonthlyupdates, GetWorkOrdersByUserID, 
    GetStaffMonthlyUpdatesByUserID, GetAllWorkOrders,GetAllUsers,GetAllUserRoles, GetAllWorkOrderFinancials,AddNewWorkOrder,
    UploadFinancial,GetAllRosters,GetNewWorkOrderNumber,
    GetAllBranchs,GetUsersByWorkOrderID,GetStaffMonthlyUpdatesByUserIDWorkOrderID,
    UpdateStaffMonthlyUpdatesByPM,GetFinancialByWorkOrderID,
    GetUtilizationByWorkOrderID ,
    GetAllWorkOrdersRecruitingStatus,
    GetWorkOrdersRecruitingStatusBbyWorkorderID,
    UpdateWorkOrderRecruitingStatus,
    UpdateUtilizationSummaryComments,
    UpdateWorkOrderRoster,GetAllPastMPRs,GetBMPastMPRs,
    RejectStaffMonthlyUpdatesByPM,
    GetUtilizationByYearMonth,
  GetAllWorkOrderFinancialsReport,
  GetWorkOrderFinancialsReportByName,
  GetBranchWorkOrdersByUserID,GetOrgUsersByUserID,GetOrg,GetAllContracts,SubmitMPR,CreateUser,DeleteUser,
  UpdateUserwithWorkOrders,UpdateBranchManager,



  GetAllFitnessActivities,GetEmployeeDailyUpdatesByUserID,GetAllFitness,AddNewFitnessActivityRecord,
  GetAllUsersRanking}}>{children}</HCSSContext.Provider>;
};

HCSSProvider.propTypes = {
  children: PropTypes.node
};

export default HCSSContext;
