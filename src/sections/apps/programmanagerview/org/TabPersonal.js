import React, {  useEffect,useState  } from 'react';
// material-ui
import { Stack, Button } from '@mui/material';
import { PictureOutlined} from '@ant-design/icons';

//import { data1 } from 'data/orgchart1';
import MainCard from 'components/MainCard';
import './programmanagerviewcss.css';
import { OrgChartComponent } from './OrgChart';
//import * as d3 from 'd3';
// ==============================|| ORGANIZATION CHARTS ||============================== //
import useHCSS from 'hooks/useHCSS';


const OrgChartPage = () => {
  const { GetOrg } = useHCSS();
  const [data, setData] = useState(null);
  let addNodeChildFunc = null;
  const localUsers = window.localStorage.getItem('users');
  var newUsers = JSON.parse(localUsers);
  //console.log(newUsers[0]);
  var userid = 'all';
  if(newUsers[0].role.includes('Branch Manager')){
    userid = newUsers[0].id;
  }




  function addNode() {
    const node = {
      nodeId: 'new Node',
      parentNodeId: 'O-6066',
    };

    addNodeChildFunc(node);
  }

  function onNodeClick(nodeId) {
     console.log('d3',nodeId);
  }

  useEffect(() => {

    const init = async () => {
      let listsres = await GetOrg(userid);
      setData(listsres.data);
      
    };

    init();
  }, [true]);

  return <MainCard >
     <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Button   variant="contained" color="inherit" style={{width: '240px', borderRadius: '15px' }}
                    size="medium"
                    startIcon={<PictureOutlined style={{ color: "blue", fontSize: '1.15rem' }} />}
                    sx={{ color: "blue"}}
                    onClick={() => addNode()}>
                    Export Org Chart
                  </Button>
     </Stack>
  <OrgChartComponent
    setClick={(click) => (addNodeChildFunc = click)}
    onNodeClick={onNodeClick}
    data={data}
  />
</MainCard>

};

export default OrgChartPage;
