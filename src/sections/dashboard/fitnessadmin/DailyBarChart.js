import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

// project import
import useConfig from 'hooks/useConfig';
//import { width } from '@mui/system';

// chart options
const barChartOptions = {
  chart: {
    type: 'bar',
    height: 250,
    toolbar: {
      show: false
    }
  },
  plotOptions: {
    bar: {
      columnWidth: '70%',
      borderRadius: 4
    }
  },
  dataLabels: {
    enabled: true
  },
  xaxis: {
    categories: ['Walking', 'Running', 'Yoga', 'Joggling', 'Swimming', 'Strength Training', 'Hiking', 'Cycling',
      'Other Intense', 'Other Moderate', 'Sports', 'Elliptical', 'Aerobic'
    ],
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  yaxis: {
    show: false
  },
  grid: {
    show: false
  }
};

// ==============================|| MONTHLY BAR CHART ||============================== //

const DailyBarChart = ({rdata}) => {

  const theme = useTheme();
  const { mode } = useConfig();

  const { primary, secondary } = theme.palette.text;
  const info = theme.palette.info.light;

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
  const [options, setOptions] = useState(barChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [info],
      xaxis: {
        labels: {
          style: {
            colors: [secondary, secondary, secondary, secondary, secondary, secondary, secondary]
          }
        }
      },
      tooltip: {
        theme: mode === 'dark' ? 'dark' : 'light'
      }
    }));
  }, [mode, primary, info, secondary]);

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="bar" height={250} width="100%" />
    </div>
  );
};

export default DailyBarChart;
