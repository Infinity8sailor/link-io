import React , {Component } from 'react';
import * as d3 from "d3";

const red = '#eb6a5b';
const green = '#b6e86f';
const blue = '#52b6ca';
//const colors = chroma.scale([blue, green, red]);
const width = document.body.clientWidth ;
const height = document.body.clientHeight ;

const margin = { top: 50, right: 50, bottom: 50, left: 100};
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

class Timetree extends Component{
  state = {
    treeLayout : d3.tree().size([innerHeight, innerWidth]),
    descents : [],
    paths : [],
  }
  
  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.data) return null; // data hasn't been loaded yet so do nothing
    const {data} = nextProps;
    const {treeLayout} = prevState;
    const root = d3.hierarchy(data);
    root.descendants().forEach((d, i) => {
           d.id = i;
           d._children = d.children;
           if ( d.depth && d.data.status === "green") d.children = null;
          });
    const links = treeLayout(root).links();  
    const linkPathGenerator = d3.linkHorizontal()
           .x(d => d.y)
           .y(d => d.x);
    const paths = links.map(d => d.children? null:linkPathGenerator(d));
    const descents = root.descendants(); 
    

    return {descents , paths};
  }

  render(){
    console.log("links data", this.state.descents);
    return(
      <>      
          <g ref='TRANSLATE' transform = {`translate(${margin.left},${margin.top})`}>
          {this.state.paths.map((d, i) => (<path key={i} d={d} />))}
          {this.state.descents.map((d, i) => (
            <>
            <text x={d.y} y={d.x} dy="0.32em" textAnchor={d._children ? "middle":"start"} fontSize = {3.25 - d.depth + 'em'} >
            {d.data.name}
            </text>
            </>
            ))}
          </g>
      </>
      );
  }
}

export default Timetree;

