import React, { useLayoutEffect, useRef } from 'react';
import { OrgChart } from 'd3-org-chart';
import { selection, select } from "d3-selection";
import { max, min, sum, cumsum } from "d3-array";
import { tree, stratify } from "d3-hierarchy";
import { zoom, zoomIdentity } from "d3-zoom";
import { flextree } from 'd3-flextree';
import { linkHorizontal } from 'd3-shape';

const d3 = {
  selection,
  select,
  max,
  min,
  sum,
  cumsum,
  tree,
  stratify,
  zoom,
  zoomIdentity,
  linkHorizontal,
  flextree
}

export const OrgChartComponent = (props) => {
  const d3Container = useRef(null);
  let chart = null;

//   function addNode(node) {
//     chart.addNode(node);
//   }

function exportimg(){

    //chart.exportImg();

    chart.exportSvg();

    //chart.downloadImage();
}
  props.setClick(exportimg);

  // We need to manipulate DOM
  useLayoutEffect(() => {
    if (props.data && d3Container.current) {
      if (!chart) {
        chart = new OrgChart();
        
      }
      chart
        .container(d3Container.current)
        .layout("top")
        //.nodeButtonWidth(()=>0)
        //.nodeButtonHeight(()=>0)
        .initialZoom(0.8)
        .data(props.data)
        .nodeWidth((d) => {
          if(d.depth < 1)
          {
            return 400;}

          else
          {           
              return 350;       
          }
        })
        .nodeHeight((d) => {
          if(d.depth < 1)
          {
            return 80;}

          else
          {
              return 120;       
          }
        })

        // .onNodeClick((d, i, arr) => {
        //     console.log(d);
        //   console.log(i);
        //   console.log(arr);
        //   //props.onNodeClick(d);
        // })
        .nodeContent(function (d) {
            const colors = ['#278B8D', '#404040', '#0C5C73', '#33C6CB'];
            const color = colors[d.depth % colors.length];
            return `
            <div style="background-color:${color}; position:absolute;margin-top:-1px; margin-left:-1px;width:${d.width}px; height:${d.height}px;border-radius:5px">

            <div style="color:#fafafa;font-size:${
                d.depth < 2 ? 16 : 14
            }px;font-weight:bold;margin-top:5px;text-align: center;"> ${d.depth < 2 ? d.data.name : (d.data.name || '')} </div>
            <div style="color:#fafafa;margin-top:5px; text-align: center;"> ${
                d.depth < 2 ? d.data.positionName : ''
            } </div>
            
            <div style="padding:2px; padding-top:1px;margin-left:5px;text-align:left;">
                        ${d.data.rosters.map((item)=> { return `<div style="color:#fafafa;" > 👤 ${item}</div>`  }).join(' ')}



            </div> 

        </div>
        `;
                })
        .linkUpdate(function (d) {
          //console.log(d);
          if(d.id == "01"){
            d3.select(this)
              .style("stroke-dasharray", ("11, 11"))
          }
          d3.select(this)
              .attr("stroke", d => d.data._upToTheRootHighlighted ? '#E27396' : '#E4E2E9')
              .attr("stroke-width", d => d.data._upToTheRootHighlighted ? 2 : 7)
          
          if (d.data._upToTheRootHighlighted) {
              d3.select(this).raise()
          }
      })
        .render();
        chart.expandAll();
        //chart.fit();
        
        
    }
  }, [props.data, d3Container.current]);

  return (
    <div>
      <div ref={d3Container} />
    </div>
  );
};