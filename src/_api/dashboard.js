// project import
import services from 'utils/mockAdapter';
// third-party
//import { FormattedMessage } from 'react-intl';
// ==============================|| MENU ITEMS - DASHBOARD  ||============================== //

// var access_token = null;
// if (window.localStorage.getItem('accessToken') !== undefined && window.localStorage.getItem('accessToken') !== null) {
//    access_token = window.localStorage.getItem('accessToken');
//   //console.log(access_token);
// }


var dashboard = {
  id: 'group-dashboard',
  title: 'dashboard',
  type: 'group',
  icon: 'dashboardOutlined',
  children: [
    // {
    //   id: 'dashboard',
    //   title: 'dashboard',
    //   type: 'collapse',
    //   icon: 'dashboardOutlined',
    //   children: [
    //     {
    //       id: 'default',
    //       title: 'default',
    //       type: 'item',
    //       url: '/dashboard/default',
    //       breadcrumbs: false
    //     },
    //     {
    //       id: 'analytics',
    //       title: 'analytics',
    //       type: 'item',
    //       url: '/dashboard/analytics',
    //       breadcrumbs: false
    //     }
    //   ]
    // },
    // {
    //   id: 'components',
    //   title: 'components',
    //   type: 'item',
    //   url: '/components-overview/buttons',
    //   icon: 'goldOutlined',
    //   target: true,
    //   chip: {
    //     label: 'new',
    //     color: 'primary',
    //     size: 'small',
    //     variant: 'combined'
    //   }
    // },
    {
      id: 'dailyactivity',
      title: 'dailyactivity',
      icon: 'dashboardOutlined',
      url: '/FitnessChallenge/dashboard/employeeview',
      breadcrumbs: false,
      type: 'item'
    },
    {
      id: 'challengeprogess',
      title: 'challengeprogess',
      icon: 'dashboardOutlined',
      url: '/FitnessChallenge/dashboard/employeeprogressview',
      breadcrumbs: false,
      type: 'item'
    }
  ]
};
//set user role accesss menu
if(window.localStorage.getItem('users') !== undefined && window.localStorage.getItem('users') !== null)
 { const localUsers = window.localStorage.getItem('users');
  var newUsers = JSON.parse(localUsers);
  
          if(newUsers[0].role.includes('Employee')){
            dashboard = {
              id: 'group-dashboard',
              title: 'dashboard',
              type: 'group',
              icon: 'dashboardOutlined',
              children: [
                {
                  id: 'dailyactivity',
                  title: 'dailyactivity',
                  icon: 'dashboardOutlined',
                  url: '/FitnessChallenge/dashboard/employeeview',
                  breadcrumbs: false,
                  type: 'item'
                },
                {
                  id: 'challengeprogess',
                  title: 'challengeprogess',
                  icon: 'dashboardOutlined',
                  url: '/FitnessChallenge/dashboard/employeeprogressview',
                  breadcrumbs: false,
                  type: 'item'
                }
              ]
          };

        }

        if(newUsers[0].role.includes('SuperAdmin')){
          dashboard = {
            id: 'group-dashboard',
            title: 'dashboard',
            type: 'group',
            icon: 'dashboardOutlined',
            children: [
              {
                id: 'dailyactivity',
                title: 'dailyactivity',
                icon: 'dashboardOutlined',
                url: '/FitnessChallenge/dashboard/employeeview',
                breadcrumbs: false,
                type: 'item'
              },
              {
                id: 'challengeprogess',
                title: 'challengeprogess',
                icon: 'dashboardOutlined',
                url: '/FitnessChallenge/dashboard/employeeprogressview',
                breadcrumbs: false,
                type: 'item'
              },
              {
                id: 'adminview',
                title: 'adminview',
                type: 'collapse',
                //url: '/FitnessChallenge/dashboard/adminview/adminlanding',
                icon: 'dashboardOutlined',
                breadcrumbs: false,
                children: [    
                  {
                    id: 'rankingstatistics',
                    title:'rankingstatistics',
                    type: 'item',
                    url: '/FitnessChallenge/dashboard/adminview/adminlanding',
                    breadcrumbs: true
                  }  ,  
                  {
                    id: 'managefitness',
                    title:'managefitness',
                    type: 'item',
                    url: '/FitnessChallenge/dashboard/adminview/managefitness',
                    breadcrumbs: true
                  }  ,         
                  {
                    id: 'manageusers',
                    title:'manageusers',
                    type: 'item',
                    url: '/FitnessChallenge/dashboard/adminview/manageusers',
                    breadcrumbs: true
                  }                  
                ]
              }
            ]
          };
        }

        if(newUsers[0].role.includes('HR')){

          dashboard = {
            id: 'group-dashboard',
            title: 'dashboard',
            type: 'group',
            icon: 'dashboardOutlined',
            children: [
              {
                id: 'dailyactivity',
                title: 'dailyactivity',
                icon: 'dashboardOutlined',
                url: '/FitnessChallenge/dashboard/employeeview',
                breadcrumbs: false,
                type: 'item'
              },
              {
                id: 'challengeprogess',
                title: 'challengeprogess',
                icon: 'dashboardOutlined',
                url: '/FitnessChallenge/dashboard/employeeprogressview',
                breadcrumbs: false,
                type: 'item'
              },
              {
                id: 'adminview',
                title: 'adminview',
                type: 'collapse',
                //url: '/FitnessChallenge/dashboard/adminview/adminlanding',
                icon: 'dashboardOutlined',
                breadcrumbs: false,
                children: [   
                  {
                    id: 'rankingstatistics',
                    title:'rankingstatistics',
                    type: 'item',
                    url: '/FitnessChallenge/dashboard/adminview/adminlanding',
                    breadcrumbs: true
                  }  
                  // ,   
                  // {
                  //   id: 'managefitness',
                  //   title:'managefitness',
                  //   type: 'item',
                  //   url: '/FitnessChallenge/dashboard/adminview/managefitness',
                  //   breadcrumbs: true
                  // }  ,         
                  // {
                  //   id: 'manageusers',
                  //   title:'manageusers',
                  //   type: 'item',
                  //   url: '/FitnessChallenge/dashboard/adminview/manageusers',
                  //   breadcrumbs: true
                  // }                  
                ]
              }
            ]
          };

        }


}
// ==============================|| MOCK SERVICES ||============================== //

services.onGet('/api/dashboard').reply(200, { dashboard: dashboard });
