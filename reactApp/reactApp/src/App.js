import React , {Component } from 'react';
import ReactDOM from 'react-dom';
import Timetree from "./d3/Timetree";
import App1 from './components/App';
import * as d3 from "d3";

const width = document.body.clientWidth ;
const height = document.body.clientHeight ;
const margin = {right : 50, left : 100, top : 50, bottom : 50};

class App extends Component{
  state = {
   maps:[],
   onScreenMap : "flare", 
  };

  componentDidMount(){
    Promise.all([
      // fetch(`${process.env.PUBLIC_URL}/flare-2.json`),
      // fetch(`${process.env.PUBLIC_URL}/world.json`),
      // fetch(`${process.env.PUBLIC_URL}/plane.json`),
      // fetch(`${process.env.PUBLIC_URL}/flare-2.json`),
      // fetch(`${process.env.PUBLIC_URL}/world.json`),
      // fetch(`${process.env.PUBLIC_URL}/plane.json`),
      // fetch(`${process.env.PUBLIC_URL}/flare-2.json`),
      fetch(`public/flare-2.json`),
      fetch(`public/world.json`),
      fetch(`public/plane.json`),
      fetch(`public/flare-2.json`),
      fetch(`public/world.json`),
      fetch(`public/plane.json`),
      fetch(`public/flare-2.json`),
      fetch(`public/world.json`),
      fetch(`public/plane.json`),
      fetch(`public/flare-2.json`),
      fetch(`public/world.json`),
      fetch(`public/plane.json`),
      fetch(`public/flare-2.json`),
      fetch(`public/world.json`),
      fetch(`public/plane.json`),
      fetch(`public/flare-2.json`),
      fetch(`public/world.json`),
      fetch(`public/plane.json`),
      fetch(`public/plane.json`),
    ]).then(responses => Promise.all(responses.map(resp => resp.json())))
    .then((map) => {
      //console.log("hello",flare, World, circle);
      this.setState({maps: map});
      this.setState({onScreenMap: map[0]});
    });

    // z holds a copy of the previous transform, so we can track its changes
    let z = d3.zoomIdentity;
     // set up the ancillary zooms and an accessor for their transforms
    const zoomX = d3.zoom().scaleExtent([0,100 ]);
    const svG = d3.select(this.refs.svG);
    const gx = d3.select(this.refs.x_Axis);
    const gtree = d3.select(this.refs.Timetree);
    const tx = () => d3.zoomTransform(gx.node());
    const xScale =d3.scaleTime().domain([new Date(2000, 0, 1, 0), new Date(2001, 0, 1, 2)]).range([0,width-margin.left]).nice();
    const xAxis = (g, scale) => g.call(d3.axisBottom(scale).ticks(12).tickSizeOuter(0));
    const line = d3.select(this.refs.svG).append("line")
                      .attr("y1", 0)
                      .attr("y2", height)
                      .attr("stroke", "rgba(255,0,0,1)")
                      .style("pointer-events","none");

    const zoom = d3.zoom()
        .scaleExtent([1,100 ])
        .on("zoom", function() {
          const e = d3.event;
          const t = e.transform;
          const k = t.k / z.k;
          const point = e.sourceEvent ? d3.mouse(this) : [width / 2, height / 2];

          if (k === 1) {
            // pure translation?
            gx.call(zoomX.translateBy, (t.x - z.x) / tx().k, 0);
          } else {
            // if not, we're zooming on a fixed point
            gx.call(zoomX.scaleBy, k, point);
          }
          let [x,y] = d3.mouse(this);
          line.attr("transform", `translate(${x} 0)`)
              .attr("stroke", "rgba(0,255,0,1)");

          z = t;
          // redraw();
          const xr = tx().rescaleX(xScale);
          gx.call(xAxis, xr);
          gtree.attr("transform",z);
    });

    d3.select(this.refs.svG)
          .call(zoom)
          .call(zoom.transform, d3.zoomIdentity.scale(0.8))
          .node();
          
    svG.on("mousemove" , function(){
              let [x,y] = d3.mouse(this);
              line
                .attr("transform", `translate(${x} 0)`)
                .attr("stroke", "rgba(255,0,0,1)") ;});
  }

  updateMap(index){
    this.setState({onScreenMap:this.state.maps[index]});
  }

  render(){
    const map = this.state.onScreenMap;
    console.log("map",map);
    return(
      <div className="App">
      <h1 >Hierarchy Structured Data</h1>
      <App1/>
      <div class = "row">
      <div id = "mapsButton" class="btn-group scroll">
      {this.state.maps.map((d,i) => (
        <button key={i} onClick={this.updateMap.bind(this,i)}>{d.name} </button>
      ))}
      </div>
      <svg ref = "svG"  >
          <g ref = "x_Axis"/> 
          <g ref = "y_Axis"/>
          <g ref = "Timetree" >
           <Timetree data={map}/>
          </g> 
      </svg>
      </div>
      </div>
      );
  }
}


export default App;