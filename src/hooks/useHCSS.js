import { useContext } from 'react';

// auth provider
//import AuthContext from 'contexts/FirebaseContext';
// import AuthContext from 'contexts/AWSCognitoContext';
 import HCSSContext from 'contexts/HCSSContext';
// import AuthContext from 'contexts/Auth0Context';

// ==============================|| AUTH HOOKS ||============================== //

const useHCSS = () => {
  const context = useContext(HCSSContext);

  if (!context) throw new Error('context must be use inside provider');

  return context;
};

export default useHCSS;
