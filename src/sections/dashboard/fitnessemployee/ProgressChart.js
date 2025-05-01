import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// project import
import useConfig from 'hooks/useConfig';

// third-party
import ReactApexChart from 'react-apexcharts';

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
        show: true
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        type: 'vertical',
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0
      }
    },
    dataLabels: {
      enabled: true
    },
    stroke: {
      curve: 'straight',
      width: 1
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
