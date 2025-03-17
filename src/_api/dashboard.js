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
    {
      id: 'dashboard',
      title: 'dashboard',
      type: 'collapse',
      icon: 'dashboardOutlined',
      children: [
        {
          id: 'default',
          title: 'default',
          type: 'item',
          url: '/dashboard/default',
          breadcrumbs: false
        },
        {
          id: 'analytics',
          title: 'analytics',
          type: 'item',
          url: '/dashboard/analytics',
          breadcrumbs: false
        }
      ]
    },
    {
      id: 'components',
      title: 'components',
      type: 'item',
      url: '/components-overview/buttons',
      icon: 'goldOutlined',
      target: true,
      chip: {
        label: 'new',
        color: 'primary',
        size: 'small',
        variant: 'combined'
      }
    },
    {
      id: 'employeeview',
      title: 'employeeview',
      icon: 'dashboardOutlined',
      url: '/dashboard/employeeview',
      breadcrumbs: false,
      type: 'item'
    }
  ]
};
//set user role accesss menu
if(window.localStorage.getItem('users') !== undefined && window.localStorage.getItem('users') !== null)
 { const localUsers = window.localStorage.getItem('users');
  var newUsers = JSON.parse(localUsers);
  //console.log(newUsers);
          if(newUsers[0].role.includes('Employee')){
            dashboard = {
              id: 'group-dashboard',
              title: 'dashboard',
              type: 'group',
              icon: 'dashboardOutlined',
              children: [
                {
                  id: 'employeeview',
                  title: 'employeeview',
                  icon: 'dashboardOutlined',
                  url: '/dashboard/employeeview',
                  breadcrumbs: false,
                  type: 'item'
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
                id: 'programmanagement',
                title: 'programmanagement',
                type: 'collapse',
                url: '/dashboard/programmanagerview/contract',
                icon: 'dashboardOutlined',
                children: [             
                  {
                    id: 'createworkorder',
                    title:'createworkorder',
                    type: 'item',
                    url: '/dashboard/programmanagerview/createworkorder',
                    breadcrumbs: true
                  }
                  ,
                  {
                    id: 'viewworkorders',
                    title:'viewworkorders',
                    type: 'item',
                    url: '/dashboard/programmanagerview/viewworkorders',
                    breadcrumbs: true
                  },
                  {
                    id: 'recruitingstatus',
                    title:'recruitingstatus',
                    type: 'item',
                    url: '/dashboard/programmanagerview/recruitingstatus',
                    breadcrumbs: true
                  },

                  
                  {
                    id: 'progressreport',
                    title:'progressreport',
                    type: 'item',
                    url: '/dashboard/programmanagerview/progressreport',
                    breadcrumbs: true
                  },
                  {
                    id: 'woprogressreport',
                    title:'woprogressreport',
                    type: 'item',
                    url: '/dashboard/programmanagerview/woprogressreport',
                    breadcrumbs: true
                  },
                  // {
                  //   id: 'vieworgchart',
                  //   title:'vieworgchart',
                  //   type: 'item',
                  //   url: '/dashboard/programmanagerview/org-chart',
                  //   breadcrumbs: true
                  // },
                  {
                    id: 'vieworg',
                    title:'vieworg',
                    type: 'collapse',
                    children: [
                        {
                          id: 'staffingstatus',
                          title:'Staffing Status',
                          type: 'item',
                          url: '/dashboard/programmanagerview/orgnization/basic',
                          breadcrumbs: true
                        },
                        {
                          id: 'orgnizationview',
                          title:'Orgnization View',
                          type: 'item',
                          url: '/dashboard/programmanagerview/orgnization/personal',
                          breadcrumbs: true
                        }
                    ]
                  },
                  // {
                  //   id: 'financials',
                  //   title:'View Financials/Hours',
                  //   type: 'item',
                  //   url: '/dashboard/programmanagerview/financials',
                  //   breadcrumbs: true
                  // },
                  {
                    id: 'rosters',
                    title:'rosters',
                    type: 'item',
                    url: '/dashboard/programmanagerview/rosters',
                    breadcrumbs: true
                  },
                  {
                    id: 'pastmprs',
                    title:'pastmprs',
                    type: 'item',
                    url: '/dashboard/programmanagerview/pastmprs',
                    breadcrumbs: true
                  },
                  {
                    id: 'financialsummary',
                    title:'financialsummary',
                    type: 'item',
                    url: '/dashboard/programmanagerview/financialsummary',
                    breadcrumbs: true
                  },
                  {
                    id: 'utilizationsummary',
                    title:'utilizationsummary',
                    type: 'item',
                    url: '/dashboard/programmanagerview/utilizationsummary',
                    breadcrumbs: true
                  }
                  ,
                  {
                    id: 'manageusers',
                    title:'manageusers',
                    type: 'item',
                    url: '/dashboard/programmanagerview/manageusers',
                    breadcrumbs: true
                  }                  
                ]
              }
            ]
          };
        }

        if(newUsers[0].role.includes('Incatech Accounting')){
          dashboard = {
            id: 'group-dashboard',
            title: 'dashboard',
            type: 'group',
            icon: 'dashboardOutlined',
            children: [
              {
                id: 'financialpersonnel',
                title: 'financialpersonnel',
                type: 'collapse',
                icon: 'dashboardOutlined',
                url: '/dashboard/financialpersonnelview',
                children: [   
                  {
                    id: 'financialsummary',
                    title:'financialsummary',
                    type: 'item',
                    url: '/dashboard/programmanagerview/financialsummary',
                    breadcrumbs: true
                  },
                  {
                    id: 'utilizationsummary',
                    title:'utilizationsummary',
                    type: 'item',
                    url: '/dashboard/programmanagerview/utilizationsummary',
                    breadcrumbs: true
                  }
                  ]
              }
            ]
          };
        }

        if(newUsers[0].role.includes('Admin')){

          dashboard = {
            id: 'group-dashboard',
            title: 'dashboard',
            type: 'group',
            icon: 'dashboardOutlined',
            children: [
              {
                id: 'dashboard',
                title: 'employeeview',
                //type: 'collapse',
                icon: 'dashboardOutlined',
                url: '/dashboard/employeeview',
                breadcrumbs: false,
                type: 'item',
                children: [
                  // {
                  //   id: 'default',
                  //   title: 'default',
                  //   type: 'item',
                  //   url: '/dashboard/default',
                  //   breadcrumbs: false
                  // },
                  // {
                  //   id: 'analytics',
                  //   title: 'analytics',
                  //   type: 'item',
                  //   url: '/dashboard/analytics',
                  //   breadcrumbs: false
                  // },
                  {
                    id: 'employeeview',
                    title: 'employeeview',
                    type: 'item',
                    url: '/dashboard/employeeview',
                    breadcrumbs: false
                  }
                ]
              }
            ]
          };

        }

        if(newUsers[0].role.includes('Division Manager')){
          dashboard = {
            id: 'group-dashboard',
            title: 'dashboard',
            type: 'group',
            icon: 'dashboardOutlined',
            children: [
              {
                id: 'divisionmanagement',
                title: 'divisionmanagement',
                type: 'collapse',
                url: '/dashboard/divisionmanagerview/contract',
                icon: 'dashboardOutlined',
                children: [             
                  {
                    id: 'recruitingstatus',
                    title:'recruitingstatus',
                    type: 'item',
                    url: '/dashboard/programmanagerview/recruitingstatus',
                    breadcrumbs: true
                  },                 
                  // {
                  //   id: 'vieworgchart',
                  //   title:'vieworgchart',
                  //   type: 'item',
                  //   url: '/dashboard/programmanagerview/org-chart',
                  //   breadcrumbs: true
                  // },
                  {
                    id: 'vieworg',
                    title:'vieworg',
                    type: 'collapse',
                    children: [
                        {
                          id: 'staffingstatus',
                          title:'Staffing Status',
                          type: 'item',
                          url: '/dashboard/programmanagerview/orgnization/basic',
                          breadcrumbs: true
                        },
                        {
                          id: 'orgnizationview',
                          title:'Orgnization View',
                          type: 'item',
                          url: '/dashboard/programmanagerview/orgnization/personal',
                          breadcrumbs: true
                        }
                    ]
                  },
                  {
                    id: 'rosters',
                    title:'rosters',
                    type: 'item',
                    url: '/dashboard/programmanagerview/rosters',
                    breadcrumbs: true
                  },
                  {
                    id: 'pastmprs',
                    title:'pastmprs',
                    type: 'item',
                    url: '/dashboard/programmanagerview/pastmprs',
                    breadcrumbs: true
                  },
                  {
                    id: 'financialsummary',
                    title:'financialsummary',
                    type: 'item',
                    url: '/dashboard/programmanagerview/financialsummary',
                    breadcrumbs: true
                  },
                  {
                    id: 'utilizationsummary',
                    title:'utilizationsummary',
                    type: 'item',
                    url: '/dashboard/programmanagerview/utilizationsummary',
                    breadcrumbs: true
                  }
                ]
              }
            ]
          };
        }
        if(newUsers[0].role.includes('Branch Manager')){
          dashboard = {
            id: 'group-dashboard',
            title: 'dashboard',
            type: 'group',
            icon: 'dashboardOutlined',
            children: [
              {
                id: 'branchmanagement',
                title: 'branchmanagement',
                type: 'collapse',
                url: '/dashboard/branchmanagerview/contract',
                icon: 'dashboardOutlined',
                children: [   
                  {
                    id: 'recruitingstatus',
                    title:'recruitingstatus',
                    type: 'item',
                    url: '/dashboard/programmanagerview/recruitingstatus',
                    breadcrumbs: true
                  },                         
                  {
                    id: 'vieworgchart',
                    title:'vieworgchart',
                    type: 'item',
                    url: '/dashboard/programmanagerview/orgnization/personal',
                    breadcrumbs: true
                  },
                  {
                    id: 'rosters',
                    title:'rosters',
                    type: 'item',
                    url: '/dashboard/programmanagerview/rosters',
                    breadcrumbs: true
                  },
                  {
                    id: 'workordermprs',
                    title:'workordermprs',
                    type: 'item',
                    url: '/dashboard/branchmanagerview/workordermprs',
                    breadcrumbs: true
                  },
                  {
                    id: 'financialsummary',
                    title:'financialsummary',
                    type: 'item',
                    url: '/dashboard/programmanagerview/financialsummary',
                    breadcrumbs: true
                  },
                  {
                    id: 'utilizationsummary',
                    title:'utilizationsummary',
                    type: 'item',
                    url: '/dashboard/programmanagerview/utilizationsummary',
                    breadcrumbs: true
                  }
                ]
              }
            ]
          };
        }

}
// ==============================|| MOCK SERVICES ||============================== //

services.onGet('/api/dashboard').reply(200, { dashboard: dashboard });
