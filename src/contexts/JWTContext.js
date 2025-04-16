import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer } from 'react';

// third-party
import { Chance } from 'chance';
import jwtDecode from 'jwt-decode';

// reducer - state management
import { LOGIN, LOGOUT } from 'store/reducers/actions';
import authReducer from 'store/reducers/auth';

// project import
import Loader from 'components/Loader';
import axios from 'utils/axios';
import useConfig from 'hooks/useConfig';

const chance = new Chance();

// constant
const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
};

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

const setSession = (serviceToken) => {
  if (serviceToken) {
    localStorage.setItem('serviceToken', serviceToken);
    axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
  } else {
    localStorage.removeItem('serviceToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

const setAccessSession = (serviceToken) => {
  if (serviceToken) {
    localStorage.setItem('accessToken', serviceToken);
  } else {
    localStorage.removeItem('accessToken');
  }
  //console.log(window.localStorage.getItem('accessToken'))
};

const setLatestFitness = (latestFitness) => {
  if (latestFitness) {
    localStorage.setItem('latestFitness', JSON.stringify(latestFitness));
  } else {
    localStorage.removeItem('latestFitness');
  }
};
// ==============================|| JWT CONTEXT & PROVIDER ||============================== //

const JWTContext = createContext(null);

export const JWTProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const { onChangeAppDefaultPath } = useConfig();
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

  const login = async (email, password) => {
    const response = await axios.post('/api/account/login', { email, password });
    const { serviceToken,accessToken,latestFitness, user } = response.data;

    if(user.role.includes('Employee')){
      onChangeAppDefaultPath('/FitnessChallenge/dashboard/employeeview');
      //console.log(APP_DEFAULT_PATH);
    }
    if(user.role.includes('SuperAdmin')){
      onChangeAppDefaultPath('/FitnessChallenge/dashboard/adminview/adminlanding');
      //console.log(APP_DEFAULT_PATH);
    }

    let users = [user];
    localStorage.removeItem('users');
    if (window.localStorage.getItem('users') !== undefined && window.localStorage.getItem('users') !== null) {
      const localUsers = window.localStorage.getItem('users');
      users = [
        ...localUsers,
        {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.Roles
        }
      ];
    }     
    window.localStorage.setItem('users', JSON.stringify(users));
    setSession(serviceToken);
    setAccessSession(accessToken);
    setLatestFitness(latestFitness);
    dispatch({
      type: LOGIN,
      payload: {
        isLoggedIn: true,
        user
      }
    });
    window.location.reload(false);
  };

  const register = async (email, password, firstName, lastName) => {
    // todo: this flow need to be recode as it not verified
    const id = chance.bb_pin();
    const response = await axios.post('/api/account/register', {
      id,
      email,
      password,
      firstName,
      lastName
    });
    console.log(response);
  };

  const logout = () => {
    localStorage.removeItem('users');
    localStorage.removeItem('latestFitness');
    setSession(null);
    setLatestFitness(null);
    dispatch({ type: LOGOUT });
  };

  const resetPassword = async () => {};

  const updateProfile = () => {};

  if (state.isInitialized !== undefined && !state.isInitialized) {
    return <Loader />;
  }

  return <JWTContext.Provider value={{ ...state, login, logout, register, resetPassword, updateProfile }}>{children}</JWTContext.Provider>;
};

JWTProvider.propTypes = {
  children: PropTypes.node
};

export default JWTContext;
