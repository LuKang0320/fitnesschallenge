// third-party
import jwt from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';

// project imports
import services from 'utils/mockAdapter';
import users from 'data/account';

// constant
const JWT_SECRET = process.env.REACT_APP_JWT_SECRET_KEY;
//const JWT_EXPIRES_TIME = process.env.REACT_APP_JWT_TIMEOUT;

const delay = (timeout) => new Promise((res) => setTimeout(res, timeout));

// ==============================|| MOCK SERVICES - JWT ACCOUNT ||============================== //

services.onPost('/api/account/login').reply(async (request) => {
  try {
    await delay(500);

    const { email, password } = JSON.parse(request.data);

    let formData = new FormData();
        formData.append('username', email);
        formData.append('password', password);
        formData.append('grant_type', 'password');

    var response = await fetch(process.env.REACT_APP_BASE_URL + '/Token', {
      method:'post',
      body: new URLSearchParams(formData)
    });
    let loginres = await response.json();


    var userresponse = await fetch(process.env.REACT_APP_BASE_URL + '/api/account/GetUserByName?' + new URLSearchParams({
      username: loginres.userName
  }), {
      method:'GET',
      headers: {
        'Authorization': 'Bearer '+ loginres.access_token
    }, 
    });

    var fitnessresponse = await fetch(process.env.REACT_APP_BASE_URL + '/api/fitness/GetLatestFitnessChallenge?' + new URLSearchParams({

  }), {
      method:'GET',
      headers: {
        'Authorization': 'Bearer '+ loginres.access_token
    }, 
    });

    let fitres = await fitnessresponse.json();

    let userres = await userresponse.json();
    if(response.ok && userresponse.ok&&fitnessresponse.ok){
      const serviceToken = jwt.sign({ userId: userres.Id }, JWT_SECRET, { expiresIn: loginres.expires_in });
      const accessToken =loginres.access_token;
      const latestFitness= fitres;
      return [
        200,
        {
          serviceToken,
          accessToken,
          latestFitness,
          user: {
            id: userres.Id,
            email: userres.Email,
            name: userres.FirstName + ' ' + userres.LastName,
            role: userres.Roles
          }
        }
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

services.onPost('/api/account/register').reply(async (request) => {
  try {
    await delay(500);

    const { id, email, password, firstName, lastName } = JSON.parse(request.data);


    let formData = new FormData();
    formData.append('FirstName', firstName);
    formData.append('LastName', lastName);
    formData.append('Email', email);

    formData.append('UserGroup', 'Employee');
    formData.append('CompanyorGroup', 'INCATECH');
    formData.append('Username', email);

    formData.append('Password', password);
    formData.append('ConfirmPassword', password);
    formData.append('RegisterFrom', 'HR');

    var response = await fetch(process.env.REACT_APP_BASE_URL + '/api/account/create', {
      method:'post',
      body: new URLSearchParams(formData)
    });
    let loginres = await response.json();
  
    if(loginres.Message == 'The request is invalid.'){
      return [400, { message: loginres.ModelState[""][0]
      }];
    }
    if (!email || !password) {
      return [400, { message: 'Enter Your Email & Password' }];
    }

    if (!firstName || !lastName) {
      return [400, { message: 'Enter Your Name' }];
    }

    const result = users.push({
      id,
      email,
      password,
      name: `${firstName} ${lastName}`
    });

    return [200, { users: result }];
  } catch (err) {
    console.error(err);
    return [500, { message: 'Server Error' }];
  }
});

services.onGet('/api/account/me').reply((request) => {
  try {
    var sss = request.headers.toJSON();
    const { Authorization } = sss;
    if (!Authorization) {
      return [401, { message: 'Token Missing' }];
    }

    let newUsers =users;

    if (window.localStorage.getItem('users') !== undefined && window.localStorage.getItem('users') !== null) {
      const localUsers = window.localStorage.getItem('users');
      newUsers = JSON.parse(localUsers);
    }
    //console.log(newUsers);
    const serviceToken = Authorization.toString();
    const jwData = jwtDecode(serviceToken);
    const { userId } = jwData;
    const user = newUsers.find((_user) => _user.id === userId);

    if (!user) {
      return [401, { message: 'Invalid Token' }];
    }

    return [
      200,
      {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      }
    ];
  } catch (err) {
    return [500, { message: 'Server Error' }];
  }
});
