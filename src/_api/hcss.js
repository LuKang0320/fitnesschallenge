// third-party
//import jwt from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';

// project imports
import services from 'utils/mockAdapter';
//import users from 'data/account';

// constant
//const JWT_SECRET = process.env.REACT_APP_JWT_SECRET_KEY;
//const JWT_EXPIRES_TIME = process.env.REACT_APP_JWT_TIMEOUT;

const delay = (timeout) => new Promise((res) => setTimeout(res, timeout));
// const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
// const d = new Date();
// var ccmonth = d.getMonth();
//   var lmonth = 0;
//   if(ccmonth == 0 ){
//     lmonth = 11;
//   }else{
//     lmonth = ccmonth - 1;
//   }
//   const cmonth = month[lmonth];
// ==============================|| MOCK SERVICES - JWT ACCOUNT ||============================== //

services.onPost('/api/hcss/saveinchtechstaffmonthlyupdates').reply(async (request) => {
  try {
    await delay(500);

    const { workperformed, workproblems,workexpected,workorderid, year, month } = JSON.parse(request.data);
    var userid = '';
    var username = '';
    if (window.localStorage.getItem('serviceToken') !== undefined && window.localStorage.getItem('serviceToken') !== null) {
      const serviceToken = window.localStorage.getItem('serviceToken');
      const jwData = jwtDecode(serviceToken);
      const { userId } = jwData;
      userid = userId;
    }

    if(window.localStorage.getItem('users') !== undefined && window.localStorage.getItem('users') !== null)
    { 
      const localUsers = window.localStorage.getItem('users');
       var newUsers = JSON.parse(localUsers);
       //console.log(newUsers);
       username=newUsers[0].name;
    }



    //const d = new Date();
    let formData = new FormData();
        formData.append('workperformed', workperformed);
        formData.append('workproblems', workproblems);
        formData.append('workexpected', workexpected);
        formData.append('workorderid', workorderid);
        formData.append('userid', userid);
        formData.append('username', username);
        formData.append('month', month);
        formData.append('year', year);

    var response = await fetch(process.env.REACT_APP_BASE_URL + '/api/hcss/AddNewStaffMonthlyUpdates', {
      method:'post',
      body: new URLSearchParams(formData)
    });
    let loginres = await response.json();

    //console.log(loginres);
    if(response.ok){
      return [
        200,
        {res: loginres}
      ];
    }
    else {
      return [400, { message: loginres.error_description }];
    }

    // if(response.ok){
    //   return [
    //     200,
    //     {res: {
    //       workperformed: workperformed,
    //       workproblems: workproblems,
    //       workexpected: workexpected,
    //       workorderid: workorderid,
    //       userid:userid,
    //       month:month[d.getMonth()]
    //     }}
    //   ];
    // }
    // else {
    //   return [400, { message: loginres.error_description }];
    // }


    
    //let newUsers = users;

    // if (window.localStorage.getItem('users') !== undefined && window.localStorage.getItem('users') !== null) {
    //   const localUsers = window.localStorage.getItem('users');
    //   newUsers = JSON.parse(localUsers);
    // }

    // const user = newUsers.find((_user) => _user.email === email);

    // if (!user) {
    //   return [400, { message: 'Verify Your Email & Password' }];
    // }

    // if (user.password !== password) {
    //   return [400, { message: 'Invalid Password' }];
    // }

    // const serviceToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_TIME });

    // return [
    //   200,
    //   {
    //     serviceToken,
    //     user: {
    //       id: user.id,
    //       email: user.email,
    //       name: user.name
    //     }
    //   }
    // ];
  } catch (err) {
    console.error(err);
    return [500, { message: 'Server Error' }];
  }
});


services.onPost('/api/hcss/UpdateStaffMonthlyUpdatesByPM').reply(async (request) => {
  try {
    await delay(500);

    const { workperformed, workproblems,workexpected,workorderid, userid,month,year} = JSON.parse(request.data);
    const d = new Date();
    let formData = new FormData();
        formData.append('workperformed', workperformed);
        formData.append('workproblems', workproblems);
        formData.append('workexpected', workexpected);
        formData.append('workorderid', workorderid);
        formData.append('userid', userid);
        formData.append('username', '');
        formData.append('month', month);
        formData.append('year', year);

    var response = await fetch(process.env.REACT_APP_BASE_URL + '/api/hcss/UpdateStaffMonthlyUpdatesByPM', {
      method:'post',
      body: new URLSearchParams(formData)
    });
    let loginres = await response.json();

    //console.log(loginres);

    if(response.ok){
      return [
        200,
        {res: {
          workperformed: workperformed,
          workproblems: workproblems,
          workexpected: workexpected,
          workorderid: workorderid,
          userid:userid,
          month:month[d.getMonth()]
        }}
      ];
    }
    else {
      return [400, { message: loginres.error_description }];
    }
    
  } catch (err) {
    console.error(err);
    return [500, { message: 'Server Error' }];
  }
});

services.onPost('/api/hcss/RejectStaffMonthlyUpdatesByPM').reply(async (request) => {
  try {
    await delay(500);

    const { workperformed, workproblems,workexpected,workorderid, userid, month, year} = JSON.parse(request.data);
    const d = new Date();
    let formData = new FormData();
        formData.append('workperformed', workperformed);
        formData.append('workproblems', workproblems);
        formData.append('workexpected', workexpected);
        formData.append('workorderid', workorderid);
        formData.append('userid', userid);
        formData.append('username', '');
        formData.append('month', month);
        formData.append('year', year);

    var response = await fetch(process.env.REACT_APP_BASE_URL + '/api/hcss/RejectStaffMonthlyUpdatesByPM', {
      method:'post',
      body: new URLSearchParams(formData)
    });
    let loginres = await response.json();

    //console.log(loginres);

    if(response.ok){
      return [
        200,
        {res: {
          workperformed: workperformed,
          workproblems: workproblems,
          workexpected: workexpected,
          workorderid: workorderid,
          userid:userid,
          month:month[d.getMonth()]
        }}
      ];
    }
    else {
      return [400, { message: loginres.error_description }];
    }
    
  } catch (err) {
    console.error(err);
    return [500, { message: 'Server Error' }];
  }
});


services.onPost('/api/hcss/GetStaffMonthlyUpdatesByUserID').reply(async (request) => {
  try {
    await delay(500);

    const { userid, month , year} = JSON.parse(request.data);

    var response = await fetch(process.env.REACT_APP_BASE_URL + '/api/hcss/GetStaffMonthlyUpdatesByUserID?' + new URLSearchParams({
        userid: userid,
        month: month,
        year: year
    }), {
      method:'get'
    });
    let loginres = await response.json();

    //console.log(loginres);
    var res = [];
    loginres.map(r=> {
      res.push(r)
    })
    if(response.ok){
      return [
        200,
        {data: res}
      ];
    }
    else {
      return [400, { message: loginres.error_description }];
    }

  } catch (err) {
    console.error(err);
    return [500, { message: 'Server Error' }];
  }
});

services.onPost('/api/hcss/GetStaffMonthlyUpdatesByUserIDWorkOrderID').reply(async (request) => {
  try {
    await delay(500);

    const { userid, month,workorderid,year } = JSON.parse(request.data);

    var response = await fetch(process.env.REACT_APP_BASE_URL + '/api/hcss/GetStaffMonthlyUpdatesByUserIDWorkOrderID?' + new URLSearchParams({
        userid: userid,
        month: month,
        workorderid: workorderid,
        year: year
    }), {
      method:'get'
    });
    let loginres = await response.json();

    //console.log(loginres);
    var res = [];
    loginres.map(r=> {
      res.push(r)
    })
    if(response.ok){
      return [
        200,
        {data: res}
      ];
    }
    else {
      return [400, { message: loginres.error_description }];
    }

  } catch (err) {
    console.error(err);
    return [500, { message: 'Server Error' }];
  }
});


services.onPost('/api/hcss/GetWorkOrdersByUserID').reply(async (request) => {
  try {
    await delay(500);

    const { userid } = JSON.parse(request.data);

    var response = await fetch(process.env.REACT_APP_BASE_URL + '/api/hcss/GetWorkOrdersByUserID?' + new URLSearchParams({
        userid: userid
    }), {
      method:'get'
    });
    let loginres = await response.json();

    //console.log(loginres);
    var res = [];
    loginres.map(r=> {
      res.push(r)
    })
    if(response.ok){
      return [
        200,
        {data: res}
      ];
    }
    else {
      return [400, { message: loginres.error_description }];
    }

  } catch (err) {
    console.error(err);
    return [500, { message: 'Server Error' }];
  }
});

services.onPost('/api/hcss/GetAllWorkOrders').reply(async () => {
  try {
    await delay(500);

    var response = await fetch(process.env.REACT_APP_BASE_URL + '/api/hcss/GetAllWorkOrders?', {
      method:'get'
    });
    let loginres = await response.json();

    //console.log(loginres);
    var res = [];
    loginres.map(r=> {
      res.push(r)
    })
    if(response.ok){
      return [
        200,
        {data: res}
      ];
    }
    else {
      return [400, { message: loginres.error_description }];
    }

  } catch (err) {
    console.error(err);
    return [500, { message: 'Server Error' }];
  }
});



services.onPost('/api/hcss/GetAllUserRoles').reply(async () => {
  try {
    await delay(500);

    var response = await fetch(process.env.REACT_APP_BASE_URL + '/api/hcss/GetAllUserRoles?', {
      method:'get'
    });
    let loginres = await response.json();

    //console.log(loginres);
    var res = [];
    loginres.map(r=> {
      res.push(r)
    })
    if(response.ok){
      return [
        200,
        {data: res}
      ];
    }
    else {
      return [400, { message: loginres.error_description }];
    }

  } catch (err) {
    console.error(err);
    return [500, { message: 'Server Error' }];
  }
});





services.onPost('/api/hcss/GetAllWorkOrderFinancials').reply(async () => {
  try {
    await delay(500);

    var response = await fetch(process.env.REACT_APP_BASE_URL + '/api/hcss/GetAllWorkOrderFinancials?', {
      method:'get'
    });
    let loginres = await response.json();

    //console.log(loginres);
    var res = [];
    loginres.map(r=> {
      res.push(r)
    })
    if(response.ok){
      return [
        200,
        {data: res}
      ];
    }
    else {
      return [400, { message: loginres.error_description }];
    }

  } catch (err) {
    console.error(err);
    return [500, { message: 'Server Error' }];
  }
});


services.onPost('/api/hcss/AddNewWorkOrder').reply(async (request) => {
  try {
    await delay(500);

    const { workordernumber, workordername,staffingstatus, workordernum, aaqbranch } = JSON.parse(request.data);

    let formData = new FormData();
        formData.append('workordernumber', workordernumber);
        formData.append('workordername', workordername);
        formData.append('staffingstatus', staffingstatus);
        formData.append('workordernum', workordernum);
        formData.append('aaqbranchid', aaqbranch);

    var response = await fetch(process.env.REACT_APP_BASE_URL + '/api/hcss/AddNewWorkOrder', {
      method:'post',
      body: new URLSearchParams(formData)
    });
    let loginres = await response.json();

    //console.log(loginres);

    if(response.ok){
      return [
        200,
        {res: loginres}
      ];
    }
    else {
      return [400, { message: loginres.error_description }];
    }

  } catch (err) {
    console.error(err);
    return [500, { message: 'Server Error' }];
  }
});

services.onPost('/api/hcss/UploadFinancial').reply(async (request) => {
  try {
    await delay(500);
    console.log(request);
    //const { file } = JSON.parse(request.data);

    let formData = new FormData();
        formData.append('file', request.data);

    var response = await fetch(process.env.REACT_APP_BASE_URL + '/api/hcss/UploadFinancials', {
      method:'post',
      headers: {
        //"Content-Type": "multipart/form-data",
        //"Accept": "application/json"
      },
      body: formData
    });
    let loginres = await response.json();

    //console.log(loginres);

    if(response.ok){
      return [
        200,
        {res: loginres}
      ];
    }
    else {
      return [400, { message: loginres.error_description }];
    }

  } catch (err) {
    console.error(err);
    return [500, { message: 'Server Error' }];
  }
});

services.onPost('/api/hcss/GetAllRosters').reply(async (request) => {
  try {
    await delay(500);
    const { userid } = JSON.parse(request.data);
    var response = await fetch(process.env.REACT_APP_BASE_URL + '/api/hcss/GetAllRosters?' + new URLSearchParams({
      userid: userid
    }), {
      method:'get'
    });
    let loginres = await response.json();

    //console.log(loginres);
    var res = [];
    loginres.map(r=> {
      res.push(r)
    })
    if(response.ok){
      return [
        200,
        {data: res}
      ];
    }
    else {
      return [400, { message: loginres.error_description }];
    }

  } catch (err) {
    console.error(err);
    return [500, { message: 'Server Error' }];
  }
});


services.onPost('/api/hcss/GetNewWorkOrderNumber').reply(async () => {
  try {
    await delay(500);

    var response = await fetch(process.env.REACT_APP_BASE_URL + '/api/hcss/GetNewWorkOrderNumber?', {
      method:'get'
    });
    let loginres = await response.json();

    if(response.ok){
      return [
        200,
        {data: loginres}
      ];
    }
    else {
      return [400, { message: loginres.error_description }];
    }

  } catch (err) {
    console.error(err);
    return [500, { message: 'Server Error' }];
  }
});

services.onPost('/api/hcss/GetAllBranchs').reply(async () => {
  try {
    await delay(500);

    var response = await fetch(process.env.REACT_APP_BASE_URL + '/api/hcss/GetAllBranchs?', {
      method:'get'
    });
    let loginres = await response.json();

    //console.log(loginres);
    var res = [];
    loginres.map(r=> {
      res.push(r)
    })
    if(response.ok){
      return [
        200,
        {data: res}
      ];
    }
    else {
      return [400, { message: loginres.error_description }];
    }

  } catch (err) {
    console.error(err);
    return [500, { message: 'Server Error' }];
  }
});


services.onPost('/api/hcss/GetUsersByWorkOrderID').reply(async (request) => {
  try {
    await delay(500);

    const { workorderid } = JSON.parse(request.data);

    var response = await fetch(process.env.REACT_APP_BASE_URL + '/api/hcss/GetUsersByWorkOrderID?' + new URLSearchParams({
      workorderid: workorderid
    }), {
      method:'get'
    });
    let loginres = await response.json();

    //console.log(loginres);
    var res = [];
    loginres.map(r=> {
      res.push(r)
    })
    if(response.ok){
      return [
        200,
        {data: res}
      ];
    }
    else {
      return [400, { message: loginres.error_description }];
    }

  } catch (err) {
    console.error(err);
    return [500, { message: 'Server Error' }];
  }
});


services.onPost('/api/hcss/GetFinancialByWorkOrderID').reply(async (request) => {
  try {
    await delay(500);

    const { workorderid, month, year, userid } = JSON.parse(request.data);

    var response = await fetch(process.env.REACT_APP_BASE_URL + '/api/hcss/GetFinancialByWorkOrderID?' + new URLSearchParams({
      workorderid: workorderid,
      month: month,
      year: year,
      userid: userid
    }), {
      method:'get'
    });
    let loginres = await response.json();

    //console.log(loginres);
    var res = [];
    loginres.map(r=> {
      res.push(r)
    })
    if(response.ok){
      return [
        200,
        {data: res}
      ];
    }
    else {
      return [400, { message: loginres.error_description }];
    }

  } catch (err) {
    console.error(err);
    return [500, { message: 'Server Error' }];
  }
});

services.onPost('/api/hcss/GetUtilizationByWorkOrderID').reply(async (request) => {
  try {
    await delay(500);

    const { workorderid , month} = JSON.parse(request.data);

    var response = await fetch(process.env.REACT_APP_BASE_URL + '/api/hcss/GetUtilizationByWorkOrderID?' + new URLSearchParams({
      workorderid: workorderid,
      month: month
    }), {
      method:'get'
    });
    let loginres = await response.json();

    //console.log(loginres);
    var res = [];
    loginres.map(r=> {
      res.push(r)
    })
    if(response.ok){
      return [
        200,
        {data: res}
      ];
    }
    else {
      return [400, { message: loginres.error_description }];
    }

  } catch (err) {
    console.error(err);
    return [500, { message: 'Server Error' }];
  }
});

services.onPost('/api/hcss/GetAllWorkOrdersRecruitingStatus').reply(async (request) => {
  try {
    await delay(500);
    const { userid} = JSON.parse(request.data);
    var response = await fetch(process.env.REACT_APP_BASE_URL + '/api/hcss/GetAllWorkOrdersRecruitingStatus?'+ new URLSearchParams({
      userid: userid
    }), {
      method:'get'
    });
    let loginres = await response.json();

    //console.log(loginres);
    var res = [];
    loginres.map(r=> {
      res.push(r)
    })
    if(response.ok){
      return [
        200,
        {data: res}
      ];
    }
    else {
      return [400, { message: loginres.error_description }];
    }

  } catch (err) {
    console.error(err);
    return [500, { message: 'Server Error' }];
  }
});

services.onPost('/api/hcss/GetWorkOrdersRecruitingStatusBbyWorkorderID').reply(async (request) => {
  try {
    await delay(500);

    const { workorderid } = JSON.parse(request.data);

    var response = await fetch(process.env.REACT_APP_BASE_URL + '/api/hcss/GetWorkOrdersRecruitingStatusBbyWorkorderID?' + new URLSearchParams({
      workorderid: workorderid
    }), {
      method:'get'
    });
    let loginres = await response.json();

    //console.log(loginres);
    var res = [];
    loginres.map(r=> {
      res.push(r)
    })
    if(response.ok){
      return [
        200,
        {data: res}
      ];
    }
    else {
      return [400, { message: loginres.error_description }];
    }

  } catch (err) {
    console.error(err);
    return [500, { message: 'Server Error' }];
  }
});

services.onPost('/api/hcss/UpdateWorkOrderRecruitingStatus').reply(async (request) => {
  try {
    await delay(500);

    const { recruitingstatus, staffingstatus,workorderid} = JSON.parse(request.data);
    let formData = new FormData();
        formData.append('recruitingstatus', recruitingstatus);
        formData.append('staffingstatus', staffingstatus);
        formData.append('workorderid', workorderid);

    var response = await fetch(process.env.REACT_APP_BASE_URL + '/api/hcss/UpdateWorkOrderRecruitingStatus', {
      method:'post',
      body: new URLSearchParams(formData)
    });
    let loginres = await response.json();

    //console.log(loginres);

    if(response.ok){
      return [
        200,
        {res: {
          recruitingstatus: recruitingstatus,
          staffingstatus: staffingstatus,
          workorderid: workorderid
        }}
      ];
    }
    else {
      return [400, { message: loginres.error_description }];
    }
    
  } catch (err) {
    console.error(err);
    return [500, { message: 'Server Error' }];
  }
});

services.onPost('/api/hcss/UpdateUtilizationSummaryComments').reply(async (request) => {
  try {
    await delay(500);

    const { comments, workorderid, monthnumber, yearnumber, commentid} = JSON.parse(request.data);
    let formData = new FormData();
        formData.append('comments', comments);
        formData.append('workorderid', workorderid);
        formData.append('monthnumber', monthnumber);
        formData.append('yearnumber', yearnumber);
        formData.append('commentid', commentid);
    var response = await fetch(process.env.REACT_APP_BASE_URL + '/api/hcss/UpdateUtilizationSummaryComments', {
      method:'post',
      body: new URLSearchParams(formData)
    });
    let loginres = await response.json();

    //console.log(loginres);

    if(response.ok){
      return [
        200,
        {res: {
          comments: comments,
          workorderid: workorderid,
          monthnumber: monthnumber,
          yearnumber: yearnumber,
          commentid: commentid
        }}
      ];
    }
    else {
      return [400, { message: loginres.error_description }];
    }
    
  } catch (err) {
    console.error(err);
    return [500, { message: 'Server Error' }];
  }
});

services.onPost('/api/hcss/UpdateWorkOrderRoster').reply(async (request) => {
  try {
    await delay(500);

    const { userids,workorderid} = JSON.parse(request.data);
    let formData = new FormData();
        formData.append('userids', userids);
        formData.append('workorderid', workorderid);

    var response = await fetch(process.env.REACT_APP_BASE_URL + '/api/hcss/UpdateWorkOrderRoster', {
      method:'post',
      body: new URLSearchParams(formData)
    });
    let loginres = await response.json();

    //console.log(loginres);

    if(response.ok){
      return [
        200,
        {res: {
          userids: userids,
          workorderid: workorderid
        }}
      ];
    }
    else {
      return [400, { message: loginres.error_description }];
    }
    
  } catch (err) {
    console.error(err);
    return [500, { message: 'Server Error' }];
  }
});

services.onPost('/api/hcss/GetAllPastMPRs').reply(async () => {
  try {
    await delay(500);

    var response = await fetch(process.env.REACT_APP_BASE_URL + '/api/hcss/GetAllPastMPRs?', {
      method:'get'
    });
    let loginres = await response.json();

    //console.log(loginres);
    var res = [];
    loginres.map(r=> {
      res.push(r)
    })
    if(response.ok){
      return [
        200,
        {data: res}
      ];
    }
    else {
      return [400, { message: loginres.error_description }];
    }

  } catch (err) {
    console.error(err);
    return [500, { message: 'Server Error' }];
  }
});
services.onPost('/api/hcss/GetBMPastMPRs').reply(async (request) => {
  try {
    await delay(500);
    const { year, month, userid } = JSON.parse(request.data);
    var response = await fetch(process.env.REACT_APP_BASE_URL + '/api/hcss/GetBMPastMPRs?' + new URLSearchParams({
      year: year, month: month, userid: userid
    }), {
      method:'get'
    });
    let loginres = await response.json();

    //console.log(loginres);
    var res = [];
    loginres.map(r=> {
      res.push(r)
    })
    if(response.ok){
      return [
        200,
        {data: res}
      ];
    }
    else {
      return [400, { message: loginres.error_description }];
    }

  } catch (err) {
    console.error(err);
    return [500, { message: 'Server Error' }];
  }
});
services.onPost('/api/hcss/GetUtilizationByYearMonth').reply(async (request) => {
  try {
    await delay(500);

    const { year, month, userid } = JSON.parse(request.data);

    var response = await fetch(process.env.REACT_APP_BASE_URL + '/api/hcss/GetUtilizationByYearMonth?' + new URLSearchParams({
      year: year, month: month, userid: userid
    }), {
      method:'get'
    });
    let loginres = await response.json();

    //console.log(loginres);
    var res = [];
    loginres.map(r=> {
      res.push(r)
    })
    if(response.ok){
      return [
        200,
        {data: res}
      ];
    }
    else {
      return [400, { message: loginres.error_description }];
    }

  } catch (err) {
    console.error(err);
    return [500, { message: 'Server Error' }];
  }
});

services.onPost('/api/hcss/GetAllWorkOrderFinancialsReport').reply(async (request) => {
  try {
    await delay(500);

    const { year, month } = JSON.parse(request.data);

    var response = await fetch(process.env.REACT_APP_BASE_URL + '/api/hcss/GetAllWorkOrderFinancialsReport?' + new URLSearchParams({
      year: year, month: month
    }), {
      method:'get'
    });
    let loginres = await response.json();

    //console.log(loginres);
    if(response.ok){
      return [
        200,
        {data: loginres}
      ];
    }
    else {
      return [400, { message: loginres.error_description }];
    }

  } catch (err) {
    console.error(err);
    return [500, { message: 'Server Error' }];
  }
});


services.onPost('/api/hcss/GetWorkOrderFinancialsReportByName').reply(async (request) => {
  try {
    await delay(500);

    const { year, month,workordername } = JSON.parse(request.data);

    var response = await fetch(process.env.REACT_APP_BASE_URL + '/api/hcss/GetWorkOrderFinancialsReportByName?' + new URLSearchParams({
      year: year, month: month, workordername: workordername
    }), {
      method:'get'
    });
    let loginres = await response.json();

    //console.log(loginres);
    if(response.ok){
      return [
        200,
        {data: loginres}
      ];
    }
    else {
      return [400, { message: loginres.error_description }];
    }

  } catch (err) {
    console.error(err);
    return [500, { message: 'Server Error' }];
  }
});

services.onPost('/api/hcss/GetBranchWorkOrdersByUserID').reply(async (request) => {
  try {
    await delay(500);

    const { year, month,userid } = JSON.parse(request.data);

    var response = await fetch(process.env.REACT_APP_BASE_URL + '/api/hcss/GetBranchWorkOrdersByUserID?' + new URLSearchParams({
      year: year, month: month, userid: userid
    }), {
      method:'get'
    });
    let loginres = await response.json();

    //console.log(loginres);
    if(response.ok){
      return [
        200,
        {data: loginres}
      ];
    }
    else {
      return [400, { message: loginres.error_description }];
    }

  } catch (err) {
    console.error(err);
    return [500, { message: 'Server Error' }];
  }
});

services.onPost('/api/hcss/GetOrgUsersByUserID').reply(async (request) => {
  try {
    await delay(500);

    const { userid, username } = JSON.parse(request.data);

    var response = await fetch(process.env.REACT_APP_BASE_URL + '/api/hcss/GetOrgUsersByUserID?' + new URLSearchParams({
      userid: userid,  username: username
    }), {
      method:'get'
    });
    let loginres = await response.json();

    //console.log(loginres);
    if(response.ok){
      return [
        200,
        {data: loginres}
      ];
    }
    else {
      return [400, { message: loginres.error_description }];
    }

  } catch (err) {
    console.error(err);
    return [500, { message: 'Server Error' }];
  }
});

services.onPost('/api/hcss/GetOrg').reply(async (request) => {
  try {
    await delay(500);
    const { userid } = JSON.parse(request.data);
    var response = await fetch(process.env.REACT_APP_BASE_URL + '/api/hcss/GetOrg?' + new URLSearchParams({
      userid: userid}), {
      method:'get'
    });
    let loginres = await response.json();

    //console.log(loginres);
    if(response.ok){
      return [
        200,
        {data: loginres}
      ];
    }
    else {
      return [400, { message: loginres.error_description }];
    }

  } catch (err) {
    console.error(err);
    return [500, { message: 'Server Error' }];
  }
});

services.onPost('/api/hcss/GetAllContracts').reply(async () => {
  try {
    await delay(500);

    var response = await fetch(process.env.REACT_APP_BASE_URL + '/api/hcss/GetAllContracts?', {
      method:'get'
    });
    let loginres = await response.json();

    //console.log(loginres);
    var res = [];
    loginres.map(r=> {
      res.push(r)
    })
    if(response.ok){
      return [
        200,
        {data: res}
      ];
    }
    else {
      return [400, { message: loginres.error_description }];
    }

  } catch (err) {
    console.error(err);
    return [500, { message: 'Server Error' }];
  }
});

services.onPost('/api/hcss/SubmitMPR').reply(async (request) => {
  try {
    await delay(500);

    const { month, year } = JSON.parse(request.data);

    var response = await fetch(process.env.REACT_APP_BASE_URL + '/api/hcss/SubmitMPR?' + new URLSearchParams({
      month: month,  year: year
    }), {
      method:'get'
    });
    let loginres = await response.json();

    //console.log(loginres);
    if(response.ok){
      return [
        200,
        {data: loginres}
      ];
    }
    else {
      return [400, { message: loginres.error_description }];
    }

  } catch (err) {
    console.error(err);
    return [500, { message: 'Server Error' }];
  }
});


services.onPost('/api/hcss/CreateUser').reply(async (request) => {
  try {
    await delay(500);

    const { Username, FirstName,LastName, UserGroup, CompanyorGroup ,PhoneNumber,Password,RoleID} = JSON.parse(request.data);

    let formData = new FormData();
        formData.append('Username', Username);
        formData.append('FirstName', FirstName);
        formData.append('LastName', LastName);
        formData.append('UserGroup', UserGroup);
        formData.append('CompanyorGroup', CompanyorGroup);
        formData.append('PhoneNumber', PhoneNumber);
        formData.append('Email', Username);
        formData.append('Password', Password);
        formData.append('ConfirmPassword', Password);
        formData.append('RoleID', RoleID);
    var response = await fetch(process.env.REACT_APP_BASE_URL + '/api/hcss/CreateUser', {
      method:'post',
      body: new URLSearchParams(formData)
    });
    let loginres = await response.json();

    //console.log(loginres);

    if(response.ok){
      return [
        200,
        {res: loginres}
      ];
    }
    else {
      return [400, { message: loginres.error_description }];
    }

  } catch (err) {
    console.error(err);
    return [500, { message: 'Server Error' }];
  }
});


services.onPost('/api/hcss/DeleteUser').reply(async (request) => {
  try {
    await delay(500);

    const {userid } = JSON.parse(request.data);

    var response = await fetch(process.env.REACT_APP_BASE_URL + '/api/hcss/DeleteUser?' + new URLSearchParams({
      userid: userid
    }), {
      method:'get'
    });
    let loginres = await response.json();

    //console.log(loginres);
    if(response.ok){
      return [
        200,
        {data: loginres}
      ];
    }
    else {
      return [400, { message: loginres.error_description }];
    }

  } catch (err) {
    console.error(err);
    return [500, { message: 'Server Error' }];
  }
});

services.onPost('/api/hcss/UpdateUserwithWorkOrders').reply(async (request) => {
  try {
    await delay(500);

    const { userid,workorderids} = JSON.parse(request.data);
    let formData = new FormData();
        formData.append('userid', userid);
        formData.append('workorderids', workorderids);

    var response = await fetch(process.env.REACT_APP_BASE_URL + '/api/hcss/UpdateUserwithWorkOrders', {
      method:'post',
      body: new URLSearchParams(formData)
    });
    let loginres = await response.json();

    //console.log(loginres);

    if(response.ok){
      return [
        200,
        {res: loginres}
      ];
    }
    else {
      return [400, { message: loginres.error_description }];
    }
    
  } catch (err) {
    console.error(err);
    return [500, { message: 'Server Error' }];
  }
});

services.onPost('/api/hcss/UpdateBranchManager').reply(async (request) => {
  try {
    await delay(500);

    const {  branchid,  userid,  username} = JSON.parse(request.data);

    var response = await fetch(process.env.REACT_APP_BASE_URL + '/api/hcss/UpdateBranchManager?' + new URLSearchParams({
      branchid: branchid, userid: userid, username: username
    }), {
      method:'get'
    });
    let loginres = await response.json();

    //console.log(loginres);
    if(response.ok){
      return [
        200,
        {data: loginres}
      ];
    }
    else {
      return [400, { message: loginres.error_description }];
    }

  } catch (err) {
    console.error(err);
    return [500, { message: 'Server Error' }];
  }
});



///   fitness challenge services

services.onPost('/api/fitness/GetAllFitnessActivities').reply(async (request) => {
  try {
    await delay(500);

    const { userid } = JSON.parse(request.data);

    var response = await fetch(process.env.REACT_APP_BASE_URL + '/api/fitness/GetAllFitnessActivities?' + new URLSearchParams({
        userid: userid
    }), {
      method:'get'
    });
    let loginres = await response.json();

    //console.log(loginres);
    var res = [];
    loginres.map(r=> {
      res.push(r)
    })
    if(response.ok){
      return [
        200,
        {data: res}
      ];
    }
    else {
      return [400, { message: loginres.error_description }];
    }

  } catch (err) {
    console.error(err);
    return [500, { message: 'Server Error' }];
  }
});

services.onPost('/api/fitness/GetEmployeeDailyUpdatesByUserID').reply(async (request) => {
  try {
    await delay(500);

    const { userid, dstring} = JSON.parse(request.data);

    var response = await fetch(process.env.REACT_APP_BASE_URL + '/api/fitness/GetEmployeeDailyUpdatesByUserID?' + new URLSearchParams({
        userid: userid,
        dstring: dstring
    }), {
      method:'get'
    });
    let loginres = await response.json();

    //console.log(loginres);
    var res = [];
    loginres.map(r=> {
      res.push(r)
    })
    if(response.ok){
      return [
        200,
        {data: res}
      ];
    }
    else {
      return [400, { message: loginres.error_description }];
    }

  } catch (err) {
    console.error(err);
    return [500, { message: 'Server Error' }];
  }
});


services.onPost('/api/fitness/GetAllUsers').reply(async (request) => {
  try {
    await delay(500);
    const { fitid } = JSON.parse(request.data);
    var response = await fetch(process.env.REACT_APP_BASE_URL + '/api/fitness/GetAllUsers?'+ new URLSearchParams({
      fitid: fitid
  }), {
      method:'get'
    });
    let loginres = await response.json();

    //console.log(loginres);
    var res = [];
    loginres.map(r=> {
      res.push(r)
    })
    if(response.ok){
      return [
        200,
        {data: res}
      ];
    }
    else {
      return [400, { message: loginres.error_description }];
    }

  } catch (err) {
    console.error(err);
    return [500, { message: 'Server Error' }];
  }
});
services.onPost('/api/fitness/GetAllFitness').reply(async () => {
  try {
    await delay(500);
    var response = await fetch(process.env.REACT_APP_BASE_URL + '/api/fitness/GetAllFitness?', {
      method:'get'
    });
    let loginres = await response.json();

    //console.log(loginres);
    var res = [];
    loginres.map(r=> {
      res.push(r)
    })
    if(response.ok){
      return [
        200,
        {data: res}
      ];
    }
    else {
      return [400, { message: loginres.error_description }];
    }

  } catch (err) {
    console.error(err);
    return [500, { message: 'Server Error' }];
  }
});


services.onPost('/api/fitness/AddNewFitnessActivityRecord').reply(async (request) => {
  try {
    await delay(500);

    const { fitnesschallengeid,activity,totalminutes,activityid,datestring } = JSON.parse(request.data);
    var userid = '';
    var username = '';
    if (window.localStorage.getItem('serviceToken') !== undefined && window.localStorage.getItem('serviceToken') !== null) {
      const serviceToken = window.localStorage.getItem('serviceToken');
      const jwData = jwtDecode(serviceToken);
      const { userId } = jwData;
      userid = userId;
    }

    if(window.localStorage.getItem('users') !== undefined && window.localStorage.getItem('users') !== null)
    { 
      const localUsers = window.localStorage.getItem('users');
       var newUsers = JSON.parse(localUsers);
       username=newUsers[0].name;
    }


    //const d = new Date();
    let formData = new FormData();
        formData.append('fitnesschallengeid', fitnesschallengeid);
        formData.append('activity', activity);
        formData.append('totalminutes', totalminutes);
        formData.append('activityid', activityid);
        formData.append('userid', userid);
        formData.append('username', username);
        formData.append('datestring', datestring);

    var response = await fetch(process.env.REACT_APP_BASE_URL + '/api/fitness/AddNewFitnessActivityRecord', {
      method:'post',
      body: new URLSearchParams(formData)
    });
    let loginres = await response.json();

    if(response.ok){
      return [
        200,
        {res: loginres}
      ];
    }
    else {
      return [400, { message: loginres.error_description }];
    }

  } catch (err) {
    console.error(err);
    return [500, { message: 'Server Error' }];
  }
});