import { useEffect, useState } from 'react';

// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';

import Loader from 'components/Loader';
import Locales from 'components/Locales';
import RTLLayout from 'components/RTLLayout';
import ScrollTop from 'components/ScrollTop';
import Snackbar from 'components/@extended/Snackbar';
import Notistack from 'components/third-party/Notistack';

import { dispatch } from 'store';
import { fetchDashboard } from 'store/reducers/menu';

// auth provider
//import { FirebaseProvider as AuthProvider } from 'contexts/FirebaseContext';
// import { AWSCognitoProvider as AuthProvider } from 'contexts/AWSCognitoContext';
 import { JWTProvider as AuthProvider } from 'contexts/JWTContext';
 import { HCSSProvider as HCSSProvider } from 'contexts/HCSSContext';
// import { Auth0Provider as AuthProvider } from 'contexts/Auth0Context';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => {
  const [loading, setLoading] = useState(false);
  //console.log("App is rendering!");
  // useEffect(() => {
  //   dispatch(fetchDashboard()).then(() => {
  //     setLoading(true);
  //   });
  // }, []);
  useEffect(() => {
    const load = async () => {
      try {
        await dispatch(fetchDashboard());
      } catch (err) {
        console.error('Failed to load dashboard:', err);
      } finally {
        setLoading(true);
      }
    };
    load();
  }, []);

  if (!loading) return <Loader />;
  return (
    <ThemeCustomization>
      <RTLLayout>
        <Locales>
          <ScrollTop>
            <AuthProvider>
            
              <HCSSProvider>
              <>
                <Notistack>
                  <Routes />
                  <Snackbar />
                </Notistack>
              </>
              </HCSSProvider>
            </AuthProvider>
          </ScrollTop>
        </Locales>
      </RTLLayout>
    </ThemeCustomization>
  );
};

export default App;
