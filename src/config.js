// ==============================|| THEME CONSTANT  ||============================== //

export const twitterColor = '#1DA1F2';
export const facebookColor = '#3b5998';
export const linkedInColor = '#0e76a8';

export const LAYOUT_CONST = {
  VERTICAL_LAYOUT: 'vertical',
  HORIZONTAL_LAYOUT: 'horizontal'
};

export const APP_DEFAULT_PATH = 'dashboard/employeeview';
export const HORIZONTAL_MAX_ITEM = 6;
export const DRAWER_WIDTH = 260;

// ==============================|| THEME CONFIG  ||============================== //

const config = {
  APP_DEFAULT_PATH: 'dashboard/employeeview',
  /**
   * The props used for the theme font-style.
   * We provide static below options -
   * `'Inter', sans-serif`
   * `'Poppins', sans-serif`
   * `'Roboto', sans-serif`
   * `'Public Sans', sans-serif` (default)
   */
  fontFamily: `'Public Sans', sans-serif`,

  /**
   * The props used for display menu-items with multi-language.
   * We provide static below languages according to 'react-intl' options - https://www.npmjs.com/package/react-intl
   * 'en' (default)
   * 'fr'
   * 'ro'
   * 'zh'
   */
  i18n: 'en',

  /**
   * the props used for menu orientation (diffrent theme layout).
   * we provide static below options -
   * 'vertical' (default)
   * 'horizontal'
   */
  menuOrientation: 'vertical',

  /**
   * the props used for show mini variant drawer
   * the mini variant is recommended for apps sections that need quick selection access alongside content.
   * default - false
   */
  miniDrawer: false,

  /**
   * the props used for theme container.
   * the container centers your content horizontally. It's the most basic layout element.
   * default - true which show container
   * false - will show fluid
   */
  container: true,

  /**
   * the props used for default theme palette mode
   * explore the default theme
   * below theme options -
   * 'light' (default)
   * 'dark'
   */
  mode: 'light',

  /**
   * the props used for theme primary color variants
   * we provide static below options thoe s are already defaine in src/themes/theme -
   * 'default'
   * 'theme1'
   * 'theme2'
   * 'theme3'
   * 'theme4'
   * 'theme5'
   * 'theme6'
   * 'theme7'
   * 'theme8'
   */
  presetColor: 'theme4',

  /**
   * the props used for default theme direction
   * explore the default theme
   * below theme options -
   * 'ltr' (default)
   * 'rtl'
   */
  themeDirection: 'ltr'
};

export default config;
