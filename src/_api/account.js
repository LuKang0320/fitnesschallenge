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

    let userres = await userresponse.json();
    //console.log(loginres);
    //console.log(userres);
    if(response.ok && userresponse.ok){

      const serviceToken = jwt.sign({ userId: userres.Id }, JWT_SECRET, { expiresIn: loginres.expires_in });
      const accessToken =loginres.access_token
      return [
        200,
        {
          serviceToken,
          accessToken,
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

services.onPost('/api/account/register').reply(async (request) => {
  try {
    await delay(500);

    const { id, email, password, firstName, lastName } = JSON.parse(request.data);

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
