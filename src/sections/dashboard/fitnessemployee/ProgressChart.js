import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// project import
import useConfig from 'hooks/useConfig';

// third-party
import ReactApexChart from 'react-apexcharts';
import dayjs from "dayjs";
// ==============================|| ORDERS CARD CHART ||============================== //

const ProgressChart = ({rdata, rcategories}) => {
  const theme = useTheme();
  const { mode } = useConfig();

  // chart options
  const areaChartOptions = {
    chart: {
      //height: 355,
      type: 'area',
      toolbar: {
        show: true,
        autoSelected: 'pan'
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        type: 'vertical',
        inverseColors: false,
        opacityFrom: 0.7,
        opacityTo: 0.9
      }
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: undefined,
      formatter: function (val) {
          return val
      },
      textAnchor: 'middle',
      distributed: false,
      offsetX: 0,
      offsetY: -5,
      style: {
          fontSize: '14px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 'bold',
          colors: undefined
      },
      background: {
        enabled: false,
        foreColor: '#fff',
        padding: 4,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#fff',
        opacity: 0.9,
        dropShadow: {
          enabled: false,
          top: 1,
          left: 1,
          blur: 1,
          color: '#000',
          opacity: 0.45
        }
      },
      dropShadow: {
          enabled: false,
          top: 1,
          left: 1,
          blur: 1,
          color: '#000',
          opacity: 0.45
      }
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    grid: {
      show: true,
      borderColor: '#90A4AE',
      strokeDashArray: 0,
      position: 'back',
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    }
  };
  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState(areaChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.primary.main, theme.palette.primary[700]],
      xaxis: {
        categories: rcategories,
        labels: {
          formatter: function(val) {
            return dayjs(val).format('MMM D');
          },
          style: {
            colors: [
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary
            ]
          }
        },
        axisBorder: {
          show: true,
          color: line
        },
        tickAmount: rcategories.length
      },
      yaxis: {
        labels: {
          style: {
            colors: [secondary]
          }
        }
      },
      grid: {
        borderColor: line
      },
      tooltip: {
        theme: mode === 'dark' ? 'dark' : 'light',
        y: {
          formatter(val) {
            return `${val}`;
          }
        }
      }
    }));
  }, [mode, primary, secondary, line, theme,rcategories ]);

 
  var [series] = useState([
    {name: 'Munites',
      data: rdata
    }
  ]);

if(rdata.length > 0){
   series = [
    {name: 'Munites',
      data: rdata
    }
  ];
}
else{
   series= [
    {name: 'Munites',
      data: [0, 0, 0, 0, 0, 0, 0,0,0, 0, 0, 0,0]
    }
  ];
}

  return <ReactApexChart options={options} series={series} type="area" height={400}  />

};

export default ProgressChart;
